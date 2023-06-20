<script lang="ts" setup>
import { useSlots, ref, provide, watch } from 'vue';
import type { Tab } from './type';

const props = defineProps<{
  tabDefault?: string;
}>();
const emit = defineEmits(['setActiveTab']);

const slots = useSlots();
const defaultSlots = slots.default && slots.default();

const tabs = ref<Tab[]>(
  (defaultSlots?.length &&
    defaultSlots.map((tab) => {
      return {
        title: tab?.props?.title || '',
        name: tab?.props?.name || '',
        disabled: Boolean(tab?.props?.disabled),
      };
    })) ||
    []
);

const active = ref(props.tabDefault || tabs.value?.[0]?.name);

const getTabActive = () => {
  if (!active.value) return;
  return tabs.value.find((tab) => tab.name === active.value);
};

const tabActive = ref(getTabActive());

const setTabActive = (tab: Tab) => {
  if (tab.disabled || tab.name === tabActive.value?.name) return;
  active.value = tab.name;
  tabActive.value = getTabActive();
};

watch(
  () => tabActive.value,
  () => {
    if (!tabActive.value?.name) return;
    emit('setActiveTab', tabActive.value?.name);
  }
);

watch(
  () => props.tabDefault,
  () => {
    if (!props.tabDefault) return;
    active.value = props.tabDefault;
    tabActive.value = getTabActive();
  }
);

provide('tabActive', tabActive);
</script>
<template>
  <div>
    <div class="text-center text-neutral-secondary border-b border-border-base">
      <ul class="flex flex-wrap -mb-px space-x-2">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          @click="setTabActive(tab)"
        >
          <span
            :disabled="tab.disabled"
            class="cursor-pointer inline-block p-3 border-b-2 border-transparent rounded-t-lg"
            :class="{
              'hover:text-primary hover:border-primary': !tab.disabled,
              '!border-primary text-primary':
                tabActive && tabActive.name === tab.name && !tab.disabled,
              'text-neutral-disable border-border-base cursor-no-drop':
                tab.disabled,
            }"
          >
            {{ tab.title }}
          </span>
        </li>
      </ul>
    </div>
    <div class="mt-3">
      <slot></slot>
    </div>
  </div>
</template>
