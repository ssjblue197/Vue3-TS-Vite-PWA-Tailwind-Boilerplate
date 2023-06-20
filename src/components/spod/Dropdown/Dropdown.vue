<script setup lang="ts">
import { computed, ref } from 'vue';
import {
  onClickOutside,
  useElementBounding,
  useWindowSize,
} from '@vueuse/core';

const { height: windowHeight } = useWindowSize();

type DropdownPlacement =
  | 'bottom-left'
  | 'bottom-right'
  | 'top-left'
  | 'top-right';

const props = withDefaults(
  defineProps<{
    placement?: DropdownPlacement;
    widthContent?: string;
    showIcon?: boolean;
    contentClasses?: string;
  }>(),
  {
    placement: 'bottom-left',
    widthContent: 'w-48',
    showIcon: true,
    contentClasses: '',
  }
);

const show = ref(false);
const dropdown = ref(null);
const dropdownContent = ref(null);
const defaultSpace = ref(8);

onClickOutside(dropdown, () => (show.value = false));

const { x, y, width, height } = useElementBounding(dropdown);
const { width: widthDropdownContent, height: heightDropdownContent } =
  useElementBounding(dropdownContent);

const positionLeft = computed(() => {
  let positionLeft = 'auto';
  switch (props.placement) {
    case 'bottom-right':
    case 'top-right':
      positionLeft = x.value + width.value - widthDropdownContent.value + 'px';
      break;
  }
  return positionLeft;
});

const positionTop = computed(() => {
  const placementBottom = y.value + height.value + defaultSpace.value;
  const placementTop =
    y.value - heightDropdownContent.value - defaultSpace.value;

  let positionTop = placementBottom + 'px';
  switch (props.placement) {
    case 'top-left':
    case 'top-right':
      positionTop = placementTop + 'px';
      break;
    case 'bottom-left':
    case 'bottom-right':
      if (placementBottom + heightDropdownContent.value > windowHeight.value) {
        positionTop = placementTop + 'px';
      }
      break;
  }

  return positionTop;
});

const onClose = () => {
  show.value = false;
};
</script>

<template>
  <div class="relative" ref="dropdown">
    <div @click="show = !show" class="cursor-pointer">
      <div class="flex items-center">
        <slot name="title"> </slot>
        <div
          v-if="showIcon"
          class="w-5 h-5 flex items-center justify-center"
          :class="{ 'rotate-180': show }"
        >
          <s-icon
            :src="$icon.render('iconDown')"
            class="!text-icon-default svg-line"
          ></s-icon>
        </div>
      </div>
    </div>
    <!-- Dropdown menu -->
    <div
      ref="dropdownContent"
      class="fixed z-20 bg-white rounded-lg overflow-hidden p-3 shadow-[0_0.6px_1.8px_rgba(0,0,0,0.1),0_3.2px_7.2px_rgba(0,0,0,0.13)]"
      :style="{ left: positionLeft, top: positionTop }"
      :class="[widthContent, contentClasses]"
      v-if="show"
    >
      <slot name="content" :onClose="onClose"> </slot>
    </div>
  </div>
</template>
