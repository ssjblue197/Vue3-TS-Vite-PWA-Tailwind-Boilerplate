<script lang="ts" setup>
import { computed } from 'vue';
import { VARIANT, ICON } from './const';

const props = withDefaults(
  defineProps<{
    variant?: string;
  }>(),
  {
    variant: 'primary',
  }
);

const buildClasses = computed(() => {
  return [VARIANT[props.variant]];
});
</script>
<template>
  <div
    :class="buildClasses"
    v-bind="$attrs"
    class="break-word flex p-5 rounded-lg text-neutral-primary alert"
  >
    <div class="flex-[0_0_20px] mr-4">
      <s-icon
        width="24"
        height="24"
        :src="$icon.render('iconInfoCircle')"
        class="svg-line"
        :class="ICON[props.variant]"
      ></s-icon>
    </div>
    <slot></slot>
  </div>
</template>
<style lang="scss">
.alert {
  a {
    @apply text-primary;
    &:hover {
      @apply opacity-80;
    }
  }
}
</style>
