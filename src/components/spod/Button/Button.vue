<script lang="ts" setup>
import { computed } from 'vue';
import { SIZE, VARIANT } from './const';

const props = withDefaults(
  defineProps<{
    size?: string;
    variant?: string;
    pills?: boolean;
    outline?: boolean;
    classes?: string;
    disabled?: boolean;
    isLoading?: boolean;
  }>(),
  {
    size: 'default',
    variant: 'primary',
    pills: false,
    outline: false,
    classes: '',
    disabled: false,
  }
);

const buildClasses = computed(() => {
  if (props.disabled)
    return [
      '!bg-background-disable !border-background-disable focus:!bg-background-disable !text-neutral-disable hover:!text-neutral-disable cursor-no-drop',
      props.pills ? 'rounded-full' : 'rounded-lg',
      SIZE[props.size],
    ];

  if (props.classes) return [props.classes];

  return [
    SIZE[props.size],
    props.pills ? 'rounded-full' : 'rounded-lg',
    VARIANT[props.outline ? props.variant + '-outline' : props.variant],
    props.outline ? 'focus:bg-transparent hover:text-white' : 'text-white',
  ];
});
</script>
<template>
  <button
    :disabled="disabled"
    type="button"
    class="flex items-center justify-center border focus:outline-none px-5 font-normal"
    :class="buildClasses"
  >
    <div class="mr-2" v-if="isLoading">
      <div
        class="w-5 h-5 rounded-full animate-spin border border-solid border-primary border-t-transparent"
      ></div>
    </div>

    <slot></slot>
  </button>
</template>
