<template>
  <div
    class="card px-6 shadow-lg border !rounded-lg py-0 flex flex-col bg-white relative divide-neutral-50 divide-y"
  >
    <div class="text-right text-primary leading-4 sticky top-0 bg-white pt-6 pb-4">
      Mark all as read
    </div>
    <div class="max-h-[580px] overflow-y-scroll divide-neutral-50 divide-y">
      <NotificationItem v-for="i in 20" :key="i" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NotificationItem from '@/components/NotificationItem.vue';
</script>

<style scoped></style>
