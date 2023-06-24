<template>
  <div
    class="card p-6 shadow-lg border !rounded-lg pb-0 flex flex-col divide-y bg-white divide-neutral-50 max-h-[580px] overflow-y-scroll"
  >
    <div class="text-right text-primary leading-4">Mark all as read</div>
    <NotificationItem v-for="i in 20" :key="i" />
  </div>
</template>

<script setup lang="ts">
import NotificationItem from '@/components/NotificationItem.vue';
</script>

<style scoped></style>
