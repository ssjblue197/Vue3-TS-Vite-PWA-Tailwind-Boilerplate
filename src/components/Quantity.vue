<template>
  <span class="flex flex-row flex-nowrap gap-8 h-[52px]">
    <span
      class="h-full aspect-square relative rounded-lg border-neutral-40 bg-white border shadow-sm active:shadow-none"
    >
      <s-icon
        :src="$icon.render('iconMinus')"
        width="28"
        height="28"
        class="!text-neutral-200 center"
        @click="handleDecreaseQuantity"
      ></s-icon>
    </span>
    <span class="text-[34px] font-semibold leading-[130%] text-neutral-900">
      {{ local.current }}/{{ props.total }}
    </span>
    <span
      class="h-full aspect-square relative rounded-lg border-neutral-40 bg-white border shadow-sm active:shadow-none"
    >
      <s-icon
        :src="$icon.render('iconPlus')"
        width="28"
        height="28"
        class="!text-neutral-200 center"
        @click="handleIncreaseQuantity"
      ></s-icon>
    </span>
  </span>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

interface Props {
  modelvalue?: number;
  total?: number;
}
interface Local {
  current: number;
}

const emit = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<Props>(), {
  modelvalue: 0,
  total: 5,
});

const local: Local = reactive({
  current: props.modelvalue,
});

const handleDecreaseQuantity = () => {
  if (local.current > 0) {
    local.current -= 1;
    emit('update:modelValue', local.current);
  }
};

const handleIncreaseQuantity = () => {
  if (local.current < props.total) {
    local.current += 1;
    emit('update:modelValue', local.current);
  }
};
</script>

<style scoped></style>
