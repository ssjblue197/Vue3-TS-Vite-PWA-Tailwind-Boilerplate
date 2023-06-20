<script setup lang="ts">
withDefaults(
  defineProps<{
    hasLastBorder?: boolean;
  }>(),
  {
    hasLastBorder: true,
  }
);
</script>
<template>
  <tr
    class="border-b border-border-base hover:bg-background-disable-hover"
    :class="{ 'last:border-none': !hasLastBorder }"
  >
    <slot></slot>
  </tr>
</template>
