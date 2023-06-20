<script lang="ts" setup>
import Input from './Input.vue';
import { useAttrs } from 'vue';
import { useVModel } from '@vueuse/core';

const attrs = useAttrs();

const model = useVModel(attrs?.modelValue || '');
</script>
<template>
  <Input
    :type="'color'"
    class="!pl-20 !pr-3 h-[42px] cursor-pointer rounded-lg bg-transparent"
    :hasPrepend="true"
  >
    <template #prepend>
      <div v-if="$attrs.disabled">
        {{ $attrs.modelValue }}
      </div>
      <Input
        v-else
        parentClasses="pr-10 pl-0 z-10 "
        class="border-none !px-0 absolute top-1/2 -translate-y-1/2"
        v-model="model"
        v-bind="$attrs"
      />
    </template>
  </Input>
</template>
<style lang="scss">
input[type='color'] {
  &::-webkit-color-swatch {
    @apply p-0 border border-border-base rounded-full w-6 h-6 float-right;
  }
  &::-webkit-color-swatch-wrapper {
    @apply p-0 border border-border-base rounded rounded-full w-6 h-6 float-right;
  }
}
</style>
