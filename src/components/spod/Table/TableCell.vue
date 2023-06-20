<script lang="ts" setup>
defineProps<{
  maxWidthClass?: string;
}>();
</script>

<template>
  <td class="p-4 whitespace-nowrap">
    <div :class="[maxWidthClass, { truncate: maxWidthClass }]">
      <slot></slot>
    </div>
  </td>
</template>
