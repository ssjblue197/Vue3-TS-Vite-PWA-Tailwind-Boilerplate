<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import { computed } from 'vue';
import { useVModel } from '@vueuse/core';
import { INPUT_SIZE, LABEL_SIZE, VARIANT } from './const';
import makeid from '@/utils/makeid';

const props = withDefaults(
  defineProps<{
    size?: string;
    variant?: string;
    modelValue?: boolean | string[];
    inputClasses?: string;
    labelClasses?: string;
    disabled?: boolean;
  }>(),
  {
    size: 'default',
    variant: 'primary',
    modelValue: false,
    inputClasses: '',
    labelClasses: '',
    disabled: false,
  }
);

const model = useVModel(props, 'modelValue');

const buildInputClasses = computed(() => {
  const disabledClasses = props.disabled
    ? 'pointer-events-none bg-background-disable'
    : '';
  if (props.inputClasses) return [props.inputClasses, disabledClasses];
  return [INPUT_SIZE[props.size], VARIANT[props.variant], disabledClasses];
});

const buildLabelClasses = computed(() => {
  const disabledClasses = props.disabled
    ? 'text-neutral-disable pointer-events-none'
    : '';
  if (props.labelClasses) return [props.labelClasses, disabledClasses];
  return [LABEL_SIZE[props.size], disabledClasses];
});

const id = 's' + makeid(8);
</script>
<template>
  <div class="flex items-center">
    <input
      v-bind="$attrs"
      :disabled="disabled"
      v-model="model"
      :id="id"
      type="checkbox"
      class="rounded bg-white flex-none relative float-left appearance-none rounded border border-border-base outline-none before:pointer-events-none cursor-none checked:after:absolute checked:after:-mt-[2px] checked:after:block checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] indeterminate:after:absolute indeterminate:after:w-[0.5rem] indeterminate:after:border-[0.125rem] indeterminate:after:border-t-0 indeterminate:after:border-l-0 indeterminate:after:border-solid indeterminate:after:border-white hover:cursor-pointer focus:after:absolute indeterminate:after:left-1/2 indeterminate:after:top-1/2 indeterminate:after:-translate-x-1/2 indeterminate:after:-translate-y-1/2"
      :class="buildInputClasses"
    />
    <label :for="id" class="ml-2 cursor-pointer" :class="buildLabelClasses">
      <slot></slot>
    </label>
  </div>
</template>
