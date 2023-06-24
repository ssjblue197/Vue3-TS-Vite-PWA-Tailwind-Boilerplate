<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { computed } from 'vue';
import { LABEL_SIZE, VARIANT, INPUT_SIZE } from './const';

const props = withDefaults(
  defineProps<{
    size?: string;
    variant?: string;
    modelValue?: boolean;
    inputClasses?: string;
    labelClasses?: string;
    disabled?: boolean;
  }>(),
  {
    size: 'small',
    variant: 'success',
    inputClasses: '',
    labelClasses: '',
    disabled: false,
  }
);

const model = useVModel(props, 'modelValue');

const buildInputClasses = computed(() => {
  const disabledClasses = props.disabled
    ? 'peer-checked:bg-neutral-disable bg-neutral-disable'
    : '';
  if (props.inputClasses) return [props.inputClasses, disabledClasses];
  return [INPUT_SIZE[props.size], VARIANT[props.variant], disabledClasses];
});

const buildLabelClasses = computed(() => {
  const disabledClasses = props.disabled ? 'text-neutral-disable' : '';
  if (props.labelClasses) return [props.labelClasses, disabledClasses];
  return [LABEL_SIZE[props.size], disabledClasses];
});
</script>
<template>
  <label
    class="relative inline-flex items-center h-[30px]"
    :class="[props.disabled ? 'pointer-events-none' : 'cursor-pointer']"
  >
    <input
      type="checkbox"
      class="sr-only peer"
      v-bind="$attrs"
      v-model="model"
      :disabled="disabled"
    />
    <!-- peer-focus:ring-4 peer-focus:ring-blue-300 -->
    <div
      :class="buildInputClasses"
      class="bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all after:top-1/2 after:-translate-y-1/2"
    ></div>
    <span v-if="$slots.default" class="ml-3" :class="buildLabelClasses">
      <slot></slot>
    </span>
  </label>
</template>
