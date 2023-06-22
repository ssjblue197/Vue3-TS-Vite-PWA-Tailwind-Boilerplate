<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import NewNotifyMessage from '@/components/NewNotifyMessage.vue';
const route = useRoute();

const layoutName = computed(() => {
  return route.meta.layout;
});

interface Local {
  showMessage: boolean;
}

const local: Local = reactive({
  showMessage: false,
});
</script>

<template>
  <div class="container text-black" id="main">
    <DefaultLayout v-if="layoutName === 'default'" />
    <MainLayout v-if="layoutName === 'main'" />
    <transition name="slide-fade-down" appear>
      <NewNotifyMessage v-if="local.showMessage" />
    </transition>
  </div>
</template>

<style scoped></style>
