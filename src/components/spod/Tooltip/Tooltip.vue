<script setup lang="ts">
import Popper from 'vue3-popper';
</script>

<template>
  <Popper arrow>
    <slot></slot>
    <template #content="{ close }">
      <slot name="content" :close="close"></slot>
    </template>
  </Popper>
</template>
<style>
:root {
  --popper-theme-background-color: #ffffff;
  --popper-theme-background-color-hover: #ffffff;
  --popper-theme-text-color: #333333;
  --popper-theme-border-width: 1px;
  --popper-theme-border-style: solid;
  --popper-theme-border-color: #eeeeee;
  --popper-theme-border-radius: 6px;
  --popper-theme-padding: 12px 16px;
  --popper-theme-box-shadow: 0 6px 30px -6px rgba(0, 0, 0, 0.25);
}
</style>
