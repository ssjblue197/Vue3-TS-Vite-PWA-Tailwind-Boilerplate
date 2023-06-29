<template>
  <div
    class="w-full p-6 flex flex-col card h-fit"
    :class="{
      'divide-y divide-neutral-40': !props.hideDivide,
    }"
  >
    <div class="w-full text-left text-[20px] text-neutral-900 pb-5" v-if="props.showHeader">
      REQUEST DETAIL
    </div>
    <div
      class="flex flex-col gap-2 text-[17px] pb-5"
      v-if="!props.hideLocation"
      :class="{
        '!py-5': props.showHeader,
      }"
    >
      <span class="text-neutral-200">Location</span>
      <span class="text-neutral-900 flex flex-wrap gap-3">
        <template v-if="props.data?.locations && props.data?.locations?.length > 0">
          <s-tag
            class="!rounded-[12px] !h-[32px] leading-[1.4] text-[17px] shadow-sm active:shadow-none"
            variant="information"
            v-for="(location, index) in props.data?.locations"
            :key="index"
            @click.stop="emit('filterLane', location)"
            >{{ location }}</s-tag
          >
        </template>
        <template v-else>
          <s-tag
            class="!rounded-[12px] !h-[32px] leading-[1.4] text-[17px] !bg-neutral-40 !text-neutral-90"
            >N/A</s-tag
          >
        </template>
      </span>
    </div>
    <div class="flex flex-col gap-4 py-5" v-if="!props.hideDetail">
      <div class="flex justify-between">
        <span class="text-neutral-200">SKU</span>
        <span class="text-neutral-900">
          <s-tag
            class="!rounded-[12px] !h-[32px] leading-[1.4] text-[17px] shadow-sm active:shadow-none"
            variant="information"
            @click.stop="
              emit('filterKeyword', {
                title: props.data?.product?.name,
                value: props.data?.product?.sku,
              })
            "
            :class="{
              '!bg-neutral-40 !text-neutral-90': !props.data?.product?.sku,
            }"
            >{{ props.data?.product?.sku || 'N/A' }}</s-tag
          >
        </span>
      </div>
      <div class="flex justify-between">
        <span class="text-neutral-200">Product</span>
        <span class="text-neutral-900 flex gap-2">
          <s-tag
            class="shadow-sm active:shadow-none"
            size="small"
            :class="{
              '!bg-neutral-40 !text-neutral-90': !props.data?.product?.style,
            }"
            >{{ props.data?.product?.style || '--' }}</s-tag
          >
          <s-tag
            class="shadow-sm active:shadow-none"
            size="small"
            :class="{
              '!bg-neutral-40 !text-neutral-90': !props.data?.product?.color,
            }"
            >{{ props.data?.product?.color || '--' }}</s-tag
          >
          <s-tag
            class="shadow-sm active:shadow-none"
            size="small"
            :class="{
              '!bg-neutral-40 !text-neutral-90': !props.data?.product?.size,
            }"
            >{{ props.data?.product?.size || '--' }}</s-tag
          >
        </span>
      </div>
    </div>
    <TimeLine :data="generateTimeline(props.data)" />
    <slot name="bottom" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import TimeLine from '@/components/TimeLine.vue';
import type { Request } from '@/modules/fullfill-request/types';
import { STEP_EMPLOYEE } from '@/modules/fullfill-request/const';
import type { Mark as TimelineStep } from '@/components/TimeLine.vue';
import { formatDateTime } from '@/utils/helper';

interface Props {
  hideLocation?: boolean;
  hideDetail?: boolean;
  hideDivide?: boolean;
  data?: Request;
  showHeader: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hideLocation: false,
  hideDetail: false,
  hideDivide: false,
  data: undefined,
  showHeader: false,
});

const emit = defineEmits(['filterLane', 'filterKeyword']);

//TODO update type any
const generateTimeline = (data: any) => {
  const result: Array<TimelineStep> = [];
  Object.values(STEP_EMPLOYEE).forEach((step: string) => {
    switch (step) {
      case STEP_EMPLOYEE.create:
        result.push({
          title: 'Request by',
          name: data?.[step]?.name,
          time: formatDateTime(data?.created_at),
          done: !!data?.[`${step}_id`],
        });
        break;
      case STEP_EMPLOYEE.receive:
        result.push({
          title: 'Picked up by',
          name: data?.[step]?.name,
          time: formatDateTime(data?.received_at),
          done: !!data?.[`${step}_id`],
        });
        break;
      case STEP_EMPLOYEE.fulfill:
        result.push({
          title: 'Fulfilled by',
          name: data?.[step]?.name,
          time: formatDateTime(data?.fulfilled_at),
          done: !!data?.[`${step}_id`],
        });
        break;
      default:
        break;
    }
  });
  return result;
};

onMounted(() => {
  // console.log(props.data);
});
</script>

<style scoped></style>
