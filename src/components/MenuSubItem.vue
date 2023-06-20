<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { ref, computed, watch, reactive } from 'vue';
import MenuItem from '@/components/MenuItem.vue';
import { useSystemStore } from '@/stores/system';

import type { SidebarRouter } from '@/configs/sidebar';

const systemStore = useSystemStore();
const { isSidebarCollapse } = storeToRefs(systemStore);

const props = defineProps<{
  menuItem: SidebarRouter;
  routeNameActive: string;
  routeNames: string[];
}>();

const isActive = computed(() => {
  if (isSidebarCollapse.value) {
    return false;
  }
  return props.routeNames?.includes(props.routeNameActive);
});

const show = ref(isActive.value);
const style = reactive<{ top: string; bottom: string }>({
  top: 'auto',
  bottom: 'auto',
});

const toggleShow = () => {
  if (isActive.value) {
    show.value = true;
    return;
  }
  show.value = !show.value;
};

const onMouseover = ($event: MouseEvent) => {
  if (!isSidebarCollapse.value || !$event.target) return;
  const { top } = (
    ($event.target as HTMLElement).closest('.has-children') as HTMLElement
  ).getBoundingClientRect();

  if (top > window.innerHeight - 300) {
    style.top = 'auto';
    style.bottom = window.innerHeight - top - 48 + 'px';
  } else {
    style.top = top + 'px';
    style.bottom = 'auto';
  }

  show.value = true;
};

const onMouseleave = () => {
  if (!isSidebarCollapse.value) return;
  show.value = false;
};

watch(
  () => isActive.value,
  () => {
    show.value = isActive.value;
  }
);
</script>
<template>
  <li
    v-if="menuItem"
    @mouseover="($event) => onMouseover($event)"
    @mouseleave="onMouseleave"
    class="has-children"
  >
    <router-link
      :to="{
        name: menuItem.router.name,
        query: menuItem.router?.query ? menuItem.router?.query : {},
        params: menuItem.router?.params ? menuItem.router?.params : {},
      }"
      class="text-neutral-secondary rounded-lg flex items-center p-3 group cursor-pointer hover:text-accent-hover relative"
      @click="toggleShow"
      :class="{
        'justify-center': isSidebarCollapse,
        '!text-neutral-primary': isActive && !isSidebarCollapse,
        '!text-primary':
          routeNames?.includes(routeNameActive) && isSidebarCollapse,
      }"
    >
      <template v-if="menuItem.icon">
        <s-icon
          :src="$icon.render(menuItem.icon)"
          width="24"
          height="24"
          class="min-w-[24px]"
        ></s-icon>
      </template>
      <template v-if="!isSidebarCollapse">
        <span class="flex-1 text-left whitespace-nowrap ml-3">{{
          menuItem.name
        }}</span>
        <s-icon
          :class="[
            {
              'rotate-180': show,
            },
            menuItem.iconClass,
          ]"
          :src="$icon.render('iconDown')"
          class="!text-icon-default svg-line min-w-[16px]"
        ></s-icon>
      </template>
    </router-link>
    <ul
      v-show="show"
      :class="{
        'z-50 p-3 fixed left-[64px] w-[250px] bg-white rounded-lg max-h-[300px] overflow-y-auto shadow-[0_0.6px_1.8px_rgba(0,0,0,0.1),0_3.2px_7.2px_rgba(0,0,0,0.13)]':
          isSidebarCollapse,
        'space-y-2 ml-5': !isSidebarCollapse,
      }"
      :style="style"
    >
      <MenuItem
        v-for="(item, index) in menuItem.children"
        :key="index"
        :menuItem="item"
      />
    </ul>
  </li>
</template>
