<script lang="ts" setup>
import { inject } from 'vue';
import type { Tab } from './type';

defineProps<{
  title: string;
  name: string;
  disabled?: boolean;
}>();

const tabActive = inject<Tab>('tabActive');
</script>
<template>
  <div v-if="tabActive && tabActive?.name === name">
    <slot></slot>
  </div>
</template>
