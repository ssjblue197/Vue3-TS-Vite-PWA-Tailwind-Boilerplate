<template>
  <div class="wrapper flex flex-col justify-end p-4">
    <div
      class="flex-1 flex items-center justify-center text-[34px] font-[600] text-neutral-900 m-auto"
    >
      I want to...
    </div>
    <div class="w-full flex flex-col gap-4 items-center">
      <s-button
        class="w-[650px] h-[52px]"
        variant="primary"
        @click="
          router.push({
            name: 'pulling-spotter',
          })
        "
        >Go to Pulling Inventory Spotter</s-button
      >
      <s-button
        class="w-[650px] h-[52px]"
        variant="primary"
        @click="
          router.push({
            name: 'fulfill-request',
          })
        "
        >Fullfill request</s-button
      >
      <s-button class="w-[650px] h-[52px]" outline>Option 2</s-button>
      <s-button class="w-[650px] h-[52px]" outline>Option 3</s-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style scoped></style>
