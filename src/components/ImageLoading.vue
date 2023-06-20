<script lang="ts" setup>
import { ref, watch } from 'vue';

const SIZE: Record<string, string> = {
  default: 'w-20 h-20',
  small: 'w-10 h-10',
  large: 'w-20 h-20',
};

const SIZE_IMAGE: Record<string, string> = {
  default: 'w-[26px]',
  small: 'w-[14px]',
  large: 'w-[26px]',
};

const SIZE_ICON: Record<string, string> = {
  default: '48',
  small: '24',
  large: '48',
};

const props = withDefaults(
  defineProps<{
    src: string;
    alt?: string;
    size?: 'small' | 'default' | 'large';
  }>(),
  {
    size: 'default',
  }
);

const image = ref();
const isLoading = ref<boolean>(false);
const isError = ref<boolean>(false);

const onLoad = () => {
  isLoading.value = true;
  image.value = new Image();
  image.value.src = props.src;
  isError.value = false;

  image.value.onload = () => {
    isLoading.value = false;
  };

  image.value.onerror = () => {
    isLoading.value = false;
    isError.value = true;
  };
};

watch(
  () => props.src,
  () => {
    onLoad();
  }
);

onLoad();
</script>
<template>
  <div v-if="isLoading">
    <div class="flex relative flex-col items-center">
      <div
        class="rounded-full animate-spin border border-solid border-primary border-t-transparent"
        :class="SIZE[size]"
      ></div>
      <div class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <img
          :class="SIZE_IMAGE[size]"
          src="@/assets/images/logo.png"
          alt="Logo"
          loading="lazy"
        />
      </div>
    </div>
  </div>

  <div v-else-if="!isLoading && isError">
    <s-icon
      :src="$icon.render('iconGallery')"
      :width="SIZE_ICON[size]"
      :height="SIZE_ICON[size]"
      class="!text-icon-default"
    ></s-icon>
  </div>

  <img v-else :src="src" loading="lazy" :alt="alt" class="" />
</template>
