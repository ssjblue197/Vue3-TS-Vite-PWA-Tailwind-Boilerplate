<template>
  <div class="py-4">
    <div class="p-3 bg-primary-50 flex flex-row gap-2 items-center rounded-[12px]">
      <div class="flex-1 flex flex-col">
        <div class="text-left text-neutral-200">
          ID: <strong class="text-neutral-900">#4667</strong>
        </div>
        <div class="line-clamp-2">John Nguyen has just confirmed picking up the request</div>
      </div>
      <s-icon
        :src="$icon.render('iconArrowRight')"
        width="20"
        height="20"
        class="!text-neutral-900"
      ></s-icon>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
