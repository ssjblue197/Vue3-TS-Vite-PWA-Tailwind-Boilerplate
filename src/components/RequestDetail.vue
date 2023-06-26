<template>
  <div
    class="w-full px-6 py-4 flex flex-col card h-fit"
    :class="{
      'divide-y divide-neutral-40': !props.hideDivide,
    }"
  >
    <div class="flex flex-col gap-2 text-[17px] pb-5" v-if="!props.hideLocation">
      <span class="text-neutral-200">Location</span>
      <span class="text-neutral-900 flex flex-wrap gap-3">
        <template v-if="props.data?.locations && props.data?.locations?.length > 0">
          <s-tag
            class="!rounded-[12px] !h-[32px] leading-[1.4] text-[17px]"
            variant="information"
            v-for="(location, index) in props.data?.locations"
            :key="index"
            >{{ location }}</s-tag
          >
        </template>
        <template v-else>
          {{ props.data?.stock_level }}
        </template>
      </span>
    </div>
    <div class="flex flex-col gap-4 py-5" v-if="!props.hideDetail">
      <div class="flex justify-between">
        <span class="text-neutral-200">SKU</span>
        <span class="text-neutral-900">{{ props.data?.product?.sku }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-neutral-200">Product</span>
        <span class="text-neutral-900 flex gap-2">
          <s-tag size="small">{{ props.data?.product?.style }}</s-tag>
          <s-tag size="small">{{ props.data?.product?.color }}</s-tag>
          <s-tag size="small">{{ props.data?.product?.size }}</s-tag>
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
}

const props = withDefaults(defineProps<Props>(), {
  hideLocation: false,
  hideDetail: false,
  hideDivide: false,
  data: undefined,
});
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
          title: 'Picked up by',
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
