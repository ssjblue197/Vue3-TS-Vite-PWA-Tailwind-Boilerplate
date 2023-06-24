<template>
  <div class="flex flex-nowrap gap-3 justify-start">
    <LaneTag
      v-for="filter in props.data"
      :key="filter.value"
      :title="filter.title"
      :value="filter.value"
      :count="filter.count"
      :disabled="props.modelValue.value !== filter.value"
      hideClear
      @click="setFilterActive(filter)"
    />
  </div>
</template>

<script setup lang="ts">
import LaneTag from './LaneTag.vue';

export interface FilterItem {
  title?: string;
  value?: string;
  count?: number;
}

interface Props {
  data: FilterItem[];
  modelValue: FilterItem;
}

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(defineProps<Props>(), {
  data: undefined,
  modelValue: undefined,
});

const setFilterActive = (filter: FilterItem) => {
  emit('update:modelValue', filter);
};
</script>

<style scoped></style>
