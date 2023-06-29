<template>
  <div class="wrapper">
    <Header class="h-[68px]" />
    <router-view v-slot="{ Component }">
      <component :is="Component" class="!h-[calc(100vh-68px)]" />
    </router-view>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useSocket } from '@/services/socket';
import Header from '@/components/Header.vue';
import { useAuthStore } from '@/stores/auth';
import { FIREBASE_EVENTS } from '@/utils/const';

import EventBus from '@/utils/eventbus';

const authStore = useAuthStore();
const socket = useSocket();

const handshakeWS = async () => {
  if (authStore.employee) {
    socket.setAuth({
      warehouse_id: authStore.employee?.warehouse_id,
    });
    socket.current.connect();
    socket.current.on('internal_request', (data: any) => {
      console.log('ws data:', data);
      if (
        data.warehouse_id &&
        Number(data.warehouse_id) === Number(authStore.employee?.warehouse_id)
      ) {
        console.log(data.event_name);

        if (data.event_name) {
          switch (data.event_name) {
            case FIREBASE_EVENTS.EVENT_CREATE:
              EventBus.$emit(FIREBASE_EVENTS.EVENT_CREATE);
              break;
            case FIREBASE_EVENTS.EVENT_RECEIVE:
              EventBus.$emit(FIREBASE_EVENTS.EVENT_RECEIVE);
              break;
            case FIREBASE_EVENTS.EVENT_FULFILL:
              EventBus.$emit(FIREBASE_EVENTS.EVENT_FULFILL);
              break;
            case FIREBASE_EVENTS.EVENT_REJECT:
              EventBus.$emit(FIREBASE_EVENTS.EVENT_REJECT);
              break;
            case FIREBASE_EVENTS.EVENT_RELEASE:
              EventBus.$emit(FIREBASE_EVENTS.EVENT_RELEASE);
              break;
            case FIREBASE_EVENTS.EVENT_TIMEOUT:
              EventBus.$emit(FIREBASE_EVENTS.EVENT_TIMEOUT);
              break;
            case FIREBASE_EVENTS.EVENT_CONFIRM:
              EventBus.$emit(FIREBASE_EVENTS.EVENT_CONFIRM);
              break;
            case FIREBASE_EVENTS.EVENT_UPDATE_PRIORITY:
              EventBus.$emit(FIREBASE_EVENTS.EVENT_UPDATE_PRIORITY);
              break;
            case FIREBASE_EVENTS.EVENT_REPORT_MISSING_BOX:
              EventBus.$emit(FIREBASE_EVENTS.EVENT_REPORT_MISSING_BOX);
              break;
            default:
              break;
          }
        }
      }
    });
  }
};

onMounted(async () => {
  await handshakeWS();
});
</script>
