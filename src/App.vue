<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import LayoutAuth from '@/layouts/LayoutAuth.vue';
import LayoutDefault from '@/layouts/LayoutDefault.vue';
import { useAccountStore } from '@/stores/account';

const accountStore = useAccountStore();
const { isLogged } = storeToRefs(accountStore);
const router = useRouter();
const route = useRoute();

watch(isLogged, () => {
  if (!isLogged.value) {
    !['/login'].includes(route.path) && router.push('login');
  }
});
const layoutName = computed(() => {
  return route.meta.layout;
});
</script>

<template>
  <LayoutAuth v-if="!isLogged && layoutName === 'auth'" />
  <template v-else-if="isLogged">
    <LayoutDefault v-if="layoutName === 'default'" />
  </template>
</template>

<style></style>
