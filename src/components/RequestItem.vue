<template>
  <div
    class="w-full flex flex-col px-5 py-4 rounded-[16px] bg-white shadow-[0px_6px_20px_rgba(0,0,0,0.06)] gap-2 hover:border-information-300 hover:border over relative"
  >
    <div class="flex flex-row justify-between overflow-hidden">
      <span class="flex flex-nowrap gap-2">
        <span class="font-semibold text-neutral-200">
          ID: <strong class="text-neutral-900">#9738</strong>
        </span>
        <s-tag variant="primary" class="gap-1 items-center flex !bg-information-300 !h-5">
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
        <s-tag variant="danger" class="gap-1 items-center flex !h-5"> New </s-tag>
        <s-tag class="gap-1 items-center flex !h-5 !bg-low-warning"> Uncheck </s-tag>
        <s-tag class="gap-1 items-center flex !h-5 text-white !bg-high-warning"> Uncheck </s-tag>
      </span>
      <span class="flex gap-1 text-[13px]">
        <span class="text-neutral-90"> Age: </span>
        <span class="text-primary-200"> 4 hours </span>
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
          <span class="text-[17px] text-neutral-900"> 3600/SAND/XL </span>
        </s-tag>
        <s-tag class="!border-neutral-40 border !bg-white gap-2 py-2 px-4">
          <template #before>
            <s-icon
              :src="$icon.render('iconLocation')"
              width="24"
              height="24"
              class="!text-white cursor-pointer svg-line"
            >
            </s-icon>
          </template>
          <span class="text-[17px] text-neutral-900"> 3600/SAND/XL </span>
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

<script setup lang="ts"></script>

<style scoped></style>
