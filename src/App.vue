<template>
  <div class="wrapper text-black" id="main">
    <DefaultLayout v-if="layoutName === 'default'" />
    <MainLayout v-if="layoutName === 'main'" />
    <transition name="slide-fade-down" appear>
      <NewNotifyMessage v-if="notificationStore.newMessage" :data="notificationStore.newMessage" />
    </transition>
  </div>
  <Teleport to="body">
    <div
      v-if="local.showPopupEnableNotify && checkAppInstalled()"
      class="wraper !z-[9998] bg-[rgba(10,11,13,0.3)] backdrop-blur-[12px] absolute top-0 left-0 w-screen h-screen text-white flex flex-col justify-end"
    >
      <div
        class="w-[80%] mb-5 flex flex-col p-5 items-center bg-white rounded-[28px] gap-5 relative mx-auto"
      >
        <span class="text-neutral-900 font-semibold text-xl">Notification</span>
        <div class="text-neutral-900 text-xl px-4">
          Please enable notify to use this application.
        </div>
        <s-button class="!w-full !h-[52px]" @click="handleEnableNotify" variant="primary">
          Enable Notify
        </s-button>
      </div>
    </div>
  </Teleport>
  <!-- <Teleport to="body">
    <div
      v-if="!checkAppInstalled()"
      class="wraper !z-[9999] bg-[rgba(10,11,13,0.3)] backdrop-blur-[12px] absolute top-0 left-0 w-screen h-screen text-white flex flex-col justify-end"
    >
      <div
        class="px-20 mb-5 flex flex-row p-5 items-center bg-white rounded-[28px] gap-5 justify-center relative mx-auto"
      >
        <div class="flex flex-col px-4 text-neutral-900">
          <span class="text-xl flex flex-nowrap gap-1 items-center">
            <strong>Install this application:</strong>
          </span>
          <span class="text-lg flex flex-nowrap gap-1 items-center mt-1">
            Tap
            <s-icon
              :src="$icon.render('iconBoxUp')"
              width="24"
              height="24"
              class="!text-icon-default"
            ></s-icon
            >on navigation bar</span
          >
          <span class="text-lg"> Tap <strong>Add to homescreen</strong> </span>
        </div>
        <img src="@/assets/images/logo.png" alt="icon" class="h-full" />
      </div>
    </div>
  </Teleport> -->
</template>

<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '@/layouts/MainLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import NewNotifyMessage from '@/components/NewNotifyMessage.vue';
import { useSocket } from '@/services/socket';
import { checkAppInstalled } from '@/utils/device';
import { useNotificationStore } from '@/stores/notification';
import { getToken } from 'firebase/messaging';
import { messaging } from '@/utils/firebase';

const socket = useSocket();
const route = useRoute();
const notificationStore = useNotificationStore();

const layoutName = computed(() => {
  return route.meta.layout;
});

interface Local {
  showPopupEnableNotify: boolean;
  deferredPrompt: any;
}

const local: Local = reactive({
  showPopupEnableNotify: false,
  deferredPrompt: null,
});

const handleEnableNotify = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.warn('Notification permission granted.');
      // Retrieve the registration token
      local.showPopupEnableNotify = false;
      const token = await getToken(messaging);
      console.warn('new token fcm:', token);
      notificationStore.firebaseToken = token;
    } else {
      console.warn('Notification permission denied.');
    }
  } catch (error) {
  } finally {
    local.showPopupEnableNotify = false;
  }
};

const refreshFCMToken = async () => {
  if (Notification.permission === 'granted') {
    try {
      const token = await getToken(messaging);
      const notificationStore = useNotificationStore();
      notificationStore.firebaseToken = token;
    } catch (error) {
      console.warn(error);
    }
  }
};

onMounted(() => {
  socket.asyncConnect();
  refreshFCMToken();
  if (Notification.permission !== 'granted') {
    local.showPopupEnableNotify = true;
  }
});
</script>

<style scoped></style>
