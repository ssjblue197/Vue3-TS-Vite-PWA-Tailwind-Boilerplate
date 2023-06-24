<script lang="ts" setup>
import { UseElementBounding } from '@vueuse/components';
import type { ModalSize, ModalPosition } from './types';
import { SIZE, POSITION } from './const';
import { useWindowSize } from '@vueuse/core';

withDefaults(
  defineProps<{
    size?: ModalSize;
    position?: ModalPosition;
    showClose?: boolean;
  }>(),
  {
    size: 'default',
    position: 'top-center',
    showClose: true,
  }
);

const emit = defineEmits(['close']);
const closeModal = () => {
  emit('close');
};

const { height: windowHeight } = useWindowSize();
</script>
<template>
  <div>
    <div class="bg-gray-900 bg-opacity-50 fixed inset-0 z-50" />
    <div
      tabindex="-1"
      class="overflow-y-auto p-6 overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex"
      :class="`${POSITION[position]}`"
    >
      <div class="relative w-full h-full md:h-auto" :class="`${SIZE[size]}`">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow">
          <!-- Modal header -->
          <div
            class="py-4 px-6 rounded-t-lg flex justify-between items-center"
            :class="$slots.header ? 'border-b border-border-base ' : ''"
          >
            <span class="text-neutral-900 text-[20px]"> <slot name="header" /></span>

            <button
              @click="closeModal"
              type="button"
              class="!text-icon-active hover:!text-primary"
              v-if="showClose"
            >
              <slot name="close-icon">
                <s-icon
                  width="20"
                  height="20"
                  class="svg-line"
                  :src="$icon.render('iconClose')"
                ></s-icon>
              </slot>
            </button>
          </div>
          <!-- Modal body -->
          <UseElementBounding v-slot="{ height }">
            <div
              class="p-6 break-word bg-neutral-10"
              :class="[
                $slots.header ? '' : 'pt-0',
                $slots.footer ? 'max-h-[calc(100vh-190px)]' : 'max-h-[calc(100vh-120px)]',
                { 'overflow-y-auto': height >= windowHeight - 200 },
              ]"
            >
              <slot name="body" />
            </div>
          </UseElementBounding>
          <!-- Modal footer -->
          <div v-if="$slots.footer" class="py-3 px-6 rounded-b-lg border-border-base border-t">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
