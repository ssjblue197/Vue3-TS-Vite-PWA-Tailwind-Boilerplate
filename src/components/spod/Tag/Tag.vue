<script lang="ts" setup>
import { computed } from 'vue';
import { VARIANT, SIZE } from './const';
const props = withDefaults(
  defineProps<{
    variant?: string;
    href?: string;
    size?: string;
  }>(),
  {
    variant: 'secondary',
    size: 'default',
  }
);

const buildClasses = computed(() => {
  return [SIZE[props.size], VARIANT[props.variant]];
});

const wrapperType = computed(() => (props.href ? 'a' : 'span'));
</script>
<template>
  <component
    :is="wrapperType"
    :class="buildClasses"
    :href="href"
    class="py-1 px-3 rounded-lg typo-caption flex items-center justify-center"
  >
    <slot name="before" />
    <slot></slot>
  </component>
</template>
