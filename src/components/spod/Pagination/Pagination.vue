<script lang="ts" setup>
import { computed, watch, ref } from "vue";
const emit = defineEmits(["update:modelValue", "change", "changeLimit"]);

const props = withDefaults(
  defineProps<{
    modelValue?: number;
    totalItems: number;
    sliceLength?: number;
    perPage?: number;
  }>(),
  {
    modelValue: 1,
    totalPages: 1,
    sliceLength: 2,
    perPage: 10,
  }
);

const newPerPage = ref<number>(props.perPage);

watch(
  () => props.perPage,
  () => {
    newPerPage.value = props.perPage;
  }
);

const setPage = (index: number) => {
  emit("update:modelValue", index);
};
const decreasePage = () => {
  emit("update:modelValue", props.modelValue - 1);
};
const increasePage = () => {
  emit("update:modelValue", props.modelValue + 1);
};
const computedTotalPages = computed(() => {
  if (!props.totalItems) return props.totalPages;
  if (!newPerPage.value) return props.totalPages;
  return Math.ceil(props.totalItems / newPerPage.value);
});
const isDecreaseDisabled = computed(() => props.modelValue <= 1);
const isIncreaseDisabled = computed(
  () => props.modelValue >= computedTotalPages.value
);
const isSetPageDisabled = (index: number) => index === props.modelValue;
const pagesToDisplay = computed(() => {
  if (!computedTotalPages.value) {
    return [1];
  }
  if (computedTotalPages.value <= props.sliceLength * 2 + 1) {
    const pages = [];
    for (let page = 1; page <= computedTotalPages.value; page++) {
      pages.push(page);
    }
    return pages;
  }
  if (props.modelValue <= props.sliceLength) {
    const pages = [];
    const slicedLength =
      Math.abs(props.modelValue - props.sliceLength) +
      props.modelValue +
      props.sliceLength +
      1;
    for (let page = 1; page <= slicedLength; page++) {
      pages.push(page);
    }
    return pages;
  }
  if (props.modelValue >= computedTotalPages.value - props.sliceLength) {
    const pages = [];
    for (
      let page = Math.abs(computedTotalPages.value - props.sliceLength * 2);
      page <= computedTotalPages.value;
      page++
    ) {
      pages.push(page);
    }
    return pages;
  }
  const pages = [];
  const startedPage =
    props.modelValue - props.sliceLength > 0
      ? props.modelValue - props.sliceLength
      : 1;
  for (
    let page = startedPage;
    page < props.modelValue + props.sliceLength + 1;
    page++
  ) {
    if (page >= computedTotalPages.value) break;
    pages.push(page);
  }
  return pages;
});

watch(
  () => props.modelValue,
  () => {
    emit("change", props.modelValue);
  }
);

interface PerPageItem {
  name: string;
  limit: number;
}

const perPages = ref<PerPageItem[]>([
  {
    name: "10/page",
    limit: 10,
  },
  {
    name: "20/page",
    limit: 20,
  },
  {
    name: "30/page",
    limit: 30,
  },
  {
    name: "40/page",
    limit: 40,
  },
  {
    name: "50/page",
    limit: 50,
  },
]);

const limit = ref<PerPageItem>(
  perPages.value.find((item) => item.limit === newPerPage.value) ||
    perPages.value[0]
);

const selectPerPage = () => {
  emit("changeLimit", limit.value.limit);
};
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="text-neutral-secondary typo-small">
      Show {{ totalItems ? (modelValue - 1) * perPage + 1 : 0 }}-{{
        modelValue * perPage > totalItems ? totalItems : modelValue * perPage
      }}/{{ totalItems }}
    </div>
    <div class="flex items-center space-x-5">
      <SSelect
        v-model="limit"
        :options="perPages"
        name="value"
        label="name"
        :trackBy="'limit'"
        class="!w-32"
        :allowEmpty="false"
        placeholder="Per page"
        @select="selectPerPage"
        open-direction="top"
      ></SSelect>
      <nav aria-label="Page navigation">
        <ul class="inline-flex space-x-2">
          <li>
            <button
              :disabled="isDecreaseDisabled"
              @click="decreasePage"
              class="flex items-center justify-center w-[42px] h-[42px] ml-0 leading-tight border border-border-base rounded !text-neutral-primary"
              :class="{
                'hover:text-primary hover:border-primary': !isDecreaseDisabled,
              }"
            >
              <s-icon
                :src="$icon.render('iconDown')"
                class="rotate-90 svg-line"
              ></s-icon>
            </button>
          </li>
          <li v-for="index in pagesToDisplay" :key="index">
            <button
              :disabled="isSetPageDisabled(index)"
              @click="setPage(index)"
              class="flex items-center justify-center w-[42px] h-[42px] ml-0 leading-tight border rounded"
              :class="{
                'text-primary border-primary': index === modelValue,
                'text-neutral-primary border-border-base hover:text-primary hover:border-primary':
                  index !== modelValue,
              }"
            >
              {{ index }}
            </button>
          </li>
          <li>
            <button
              :disabled="isIncreaseDisabled"
              @click="increasePage"
              class="flex items-center justify-center w-[42px] h-[42px] ml-0 leading-tight border border-border-base rounded !text-neutral-primary"
              :class="{
                'hover:text-primary hover:border-primary': !isIncreaseDisabled,
              }"
            >
              <s-icon
                :src="$icon.render('iconDown')"
                class="-rotate-90 svg-line"
              ></s-icon>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
