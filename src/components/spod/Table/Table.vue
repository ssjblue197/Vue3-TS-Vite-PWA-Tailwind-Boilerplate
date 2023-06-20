<script lang="ts" setup>
defineProps<{
  maxHeight?: number;
}>();
</script>
<template>
  <div
    class="relative overflow-auto"
    :style="{ 'max-height': maxHeight ? maxHeight + 'px' : 'auto' }"
  >
    <table class="w-full text-left text-neutral-primary">
      <slot></slot>
    </table>
  </div>
</template>
