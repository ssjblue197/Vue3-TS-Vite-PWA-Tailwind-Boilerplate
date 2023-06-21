<script lang="ts" setup>
import { computed } from 'vue';
import { VARIANT } from './const';
const props = withDefaults(
  defineProps<{
    variant?: string;
    href?: string;
  }>(),
  {
    variant: 'secondary',
  }
);
const wrapperType = computed(() => (props.href ? 'a' : 'span'));
</script>
<template>
  <component
    :is="wrapperType"
    :class="VARIANT[variant]"
    :href="href"
    class="py-1 px-3 rounded-lg typo-caption flex items-center justify-center"
  >
    <slot name="before" />
    <slot></slot>
  </component>
</template>
