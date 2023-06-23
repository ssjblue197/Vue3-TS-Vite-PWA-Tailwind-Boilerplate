<template>
  <div class="main-container text-black" id="main">
    <DefaultLayout v-if="layoutName === 'default'" />
    <MainLayout v-if="layoutName === 'main'" />
    <transition name="slide-fade-down" appear>
      <NewNotifyMessage v-if="local.showMessage" />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import NewNotifyMessage from '@/components/NewNotifyMessage.vue';
import { useSocket } from '@/services/socket';

const socket = useSocket();
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

onMounted(() => {
  socket.asyncConnect();
});
</script>

<style scoped></style>
