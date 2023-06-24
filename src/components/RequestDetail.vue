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
        <s-tag class="!rounded-[12px] !h-[32px] leading-[1.4] text-[17px]" variant="information"
          >AA001A-CA</s-tag
        >
        <s-tag class="!rounded-[12px] !h-[32px] leading-[1.4] text-[17px]" variant="information"
          >AA052</s-tag
        >
        <s-tag class="!rounded-[12px] !h-[32px] leading-[1.4] text-[17px]" variant="information"
          >BB053C-CA</s-tag
        >
        <s-tag class="!rounded-[12px] !h-[32px] leading-[1.4] text-[17px]" variant="information"
          >BB017E-CA</s-tag
        >
        <s-tag class="!rounded-[12px] !h-[32px] leading-[1.4] text-[17px]" variant="information"
          >CC64A-CA</s-tag
        ></span
      >
    </div>
    <div class="flex flex-col gap-4 py-5" v-if="!props.hideDetail">
      <div class="flex justify-between">
        <span class="text-neutral-200">SKU</span>
        <span class="text-neutral-900">WORB3H2XL</span>
      </div>
      <div class="flex justify-between">
        <span class="text-neutral-200">Product</span>
        <span class="text-neutral-900 flex gap-2">
          <s-tag size="small">3600</s-tag>
          <s-tag size="small">Sand</s-tag>
          <s-tag size="small">XL</s-tag>
        </span>
      </div>
    </div>
    <TimeLine
      :data="[
        {
          title: 'Request by',
          name: 'John Nguyen',
          time: '08:43:19',
          done: true,
        },
        {
          title: 'Picked up by',
          name: 'John Nguyen',
          time: '08:43:19',
          done: false,
        },
        {
          title: 'Fulfilled by',
          name: 'John Nguyen',
          time: '08:43:19',
          done: false,
        },
      ]"
    />
    <slot name="bottom" />
  </div>
</template>

<script setup lang="ts">
import TimeLine from '@/components/TimeLine.vue';

interface Props {
  hideLocation?: boolean;
  hideDetail?: boolean;
  hideDivide?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hideLocation: false,
  hideDetail: false,
  hideDivide: false,
});
</script>

<style scoped></style>
