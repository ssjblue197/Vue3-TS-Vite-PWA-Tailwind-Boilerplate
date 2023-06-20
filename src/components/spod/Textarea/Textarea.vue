<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import { useTextareaAutosize } from '@vueuse/core';
import { computed, watch } from 'vue';
import { VARIANT } from './const';

const props = withDefaults(
  defineProps<{
    variant?: string;
    classes?: string;
    disabled?: boolean;
    value?: string;
  }>(),
  {
    variant: 'primary',
    classes: '',
    disabled: false,
  }
);

const { textarea, input } = useTextareaAutosize();
input.value = props.value || '';

watch(
  () => props.value,
  () => {
    input.value = props.value || '';
  }
);

const buildClasses = computed(() => {
  const disabledClasses = props.disabled
    ? 'bg-gray-100  pointer-events-none'
    : '';
  if (props.classes) return [props.classes, disabledClasses];
  return [VARIANT[props.variant], disabledClasses];
});
</script>
<template>
  <textarea
    ref="textarea"
    v-bind="$attrs"
    v-model="input"
    class="border border-border-base rounded-lg focus:outline-none block w-full p-3 overflow-y-hidden resize-none"
    :class="buildClasses"
  ></textarea>
</template>
