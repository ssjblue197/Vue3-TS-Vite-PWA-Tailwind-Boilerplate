<template>
  <div class="w-full px-6 py-4 flex flex-col divide-y divide-neutral-40 card h-fit">
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
          <span class="z-[2] w-5 h-5 rounded-full bg-success relative">
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
          <span class="relative bg-white z-[2] w-5 h-5 rounded-full border"> </span>
          Picked up by
        </span>
        <span class="text-neutral-900 flex flex-col items-end">
          <span>N/A</span>
          <span class="text-[12px] text-neutral-200"> --:--:-- </span>
        </span>
      </div>
      <div class="flex justify-between">
        <span class="text-neutral-200 flex gap-2">
          <span class="relative bg-white z-[2] w-5 h-5 rounded-full border"> </span>
          Fulfilled by
        </span>
        <span class="text-neutral-900 flex flex-col items-end">
          <span>N/A</span>
          <span class="text-[12px] text-neutral-200"> --:--:-- </span>
        </span>
      </div>
    </div>
    <slot name="bottom" />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
