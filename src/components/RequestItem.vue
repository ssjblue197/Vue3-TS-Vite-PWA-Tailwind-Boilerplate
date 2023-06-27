<template>
  <div
    class="w-full flex flex-col px-5 py-4 rounded-[16px] bg-white shadow-[0px_6px_20px_rgba(0,0,0,0.06)] gap-2 hover:border-information-300 hover:border over relative"
    :class="{
      'border border-information-300': props.active,
    }"
  >
    <div class="flex flex-row justify-between overflow-hidden">
      <span class="flex flex-nowrap gap-2">
        <span class="font-semibold text-neutral-200">
          ID: <strong class="text-neutral-900">#{{ props.data?.id }}</strong>
        </span>
        <s-tag
          variant="primary"
          class="gap-1 items-center flex !bg-information-300 !h-5"
          v-if="props.data?.priority"
        >
          <template #before>
            <s-icon
              :src="$icon.render('iconStarFill')"
              width="16"
              height="16"
              class="cursor-pointer"
            >
            </s-icon>
          </template>
          Priority
        </s-tag>
        <!-- <s-tag variant="danger" class="gap-1 items-center flex !h-5"> New </s-tag>
        <s-tag class="gap-1 items-center flex !h-5 !bg-low-warning"> Uncheck </s-tag>
        <s-tag class="gap-1 items-center flex !h-5 text-white !bg-high-warning"> Uncheck </s-tag> -->
      </span>
      <span class="flex gap-1 text-[13px]">
        <span class="text-neutral-90"> Age: </span>
        <span class="text-primary-200"> {{ timeFromNow(props.data?.created_at) }} </span>
      </span>
    </div>
    <div class="flex flex-row justify-between items-center overflow-hidden">
      <span class="flex flex-nowrap gap-2">
        <s-tag class="!border-neutral-40 border !bg-white gap-2 py-2 px-4">
          <template #before>
            <s-icon
              :src="$icon.render('iconShirt')"
              width="24"
              height="24"
              class="!text-white cursor-pointer"
            >
            </s-icon>
          </template>
          <span class="text-[17px] text-neutral-900 max-w-[160px] truncate">
            {{ props.data?.product?.name }}
          </span>
        </s-tag>
        <s-tag
          class="!border-neutral-40 border bg-white gap-2 py-2 px-4"
          :class="{
            '!bg-success-50': props.data?.stock_level === STOCK_LEVEL.in_coming,
            '!bg-danger-50': props.data?.stock_level === STOCK_LEVEL.out_of_stock,
          }"
        >
          <template #before>
            <s-icon
              :src="$icon.render('iconLocation')"
              width="24"
              height="24"
              class="!text-white cursor-pointer svg-line"
            >
            </s-icon>
          </template>
          <span class="text-[17px] text-neutral-900 max-w-[160px] truncate leading-[140%]">
            {{ props.data && displayLocation(props?.data) }}
          </span>
        </s-tag>
      </span>
      <span class="flex flex-nowrap gap-2">
        <s-icon
          :src="$icon.render('iconBox')"
          width="24"
          height="24"
          class="!text-white cursor-pointer svg-line"
        >
        </s-icon>
        <span class="text-neutral-900 text-[22px]"> 1 </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import type { Request } from '@/modules/fullfill-request/types';
import { STOCK_LEVEL } from '@/modules/fullfill-request/const';
import { timeFromNow } from '@/utils/helper';
interface Props {
  data?: Request;
  active?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  data: undefined,
  active: false,
});

const displayLocation = (data: Request) => {
  if (data.locations.length > 0) {
    return props.data?.locations?.join(', ');
  } else {
    return props.data?.stock_level;
  }
};

onMounted(() => {
  // console.log(props.data);
});
</script>

<style scoped></style>
