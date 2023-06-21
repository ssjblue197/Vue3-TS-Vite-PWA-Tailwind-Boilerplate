<template>
  <div class="w-full flex flex-col justify-start p-6 pb-0 bg-neutral-10 gap-6">
    <div class="flex justify-between items-center">
      <span class="text-[22px] leading-[28px] text-neutral-900"> Total: 120 request(s) </span>
      <s-button variant="primary" class="w-[220px] !h-[40px]"> Scan location code </s-button>
    </div>

    <div class="flex gap-7">
      <div
        class="flex-1 flex-col flex gap-5 max-h-[calc(100vh-68px-40px-24px-24px)] overflow-y-auto"
      >
        <RequestItem v-for="i in 20" :key="i" />
      </div>
      <div
        class="w-[390px] px-6 py-4 flex flex-col divide-y divide-neutral-40 bg-white rounded-[16px] shadow-[0px_6px_20px_rgba(0,0,0,0.06)] h-fit"
      >
        <div class="flex flex-col gap-2 text-[17px] pb-5">
          <span class="text-neutral-200">Location</span>
          <span class="text-neutral-900"> AA001A-CA, AA052, BB053C-CA, BB017E-CA, CC64A-CA </span>
        </div>
        <div class="flex flex-col gap-4 py-5">
          <div class="flex justify-between">
            <span class="text-neutral-200">SKU</span>
            <span class="text-neutral-900">WORB3H2XL</span>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-200">Product</span>
            <span class="text-neutral-900 flex gap-2">
              <s-tag>3600</s-tag>
              <s-tag>Sand</s-tag>
              <s-tag>XL</s-tag>
            </span>
          </div>
        </div>
        <div
          class="flex flex-col gap-5 py-5 relative before:content-[''] before:w-0 before:h-[calc(100%-20px-68px)] before:absolute before:border-l-2 before:border-neutral-40 before:top-[30px] before:z-0 before:left-[9px] before:border-dashed"
        >
          <div class="flex justify-between">
            <span class="text-neutral-200 flex gap-2">
              <span class="relative z-[2] w-5 h-5 rounded-full bg-success relative">
                <s-icon
                  :src="$icon.render('iconBiCheck')"
                  width="16"
                  height="16"
                  class="center !text-white svg-line"
                ></s-icon>
              </span>
              Request by
            </span>
            <span class="text-neutral-900 flex flex-col items-end">
              <span>John Nguyen</span>
              <span class="text-[12px] text-neutral-200"> 08:43:19 </span>
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-200 flex gap-2">
              <span class="relative bg-white z-[2] w-5 h-5 rounded-full border relative"> </span>
              Picked up by
            </span>
            <span class="text-neutral-900 flex flex-col items-end">
              <span>N/A</span>
              <span class="text-[12px] text-neutral-200"> --:--:-- </span>
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-neutral-200 flex gap-2">
              <span class="relative bg-white z-[2] w-5 h-5 rounded-full border relative"> </span>
              Fulfilled by
            </span>
            <span class="text-neutral-900 flex flex-col items-end">
              <span>N/A</span>
              <span class="text-[12px] text-neutral-200"> --:--:-- </span>
            </span>
          </div>
        </div>
        <s-button variant="primary" class="!h-[48px]">Pick up now</s-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RequestItem from '@/components/RequestItem.vue';
</script>

<style scoped></style>
