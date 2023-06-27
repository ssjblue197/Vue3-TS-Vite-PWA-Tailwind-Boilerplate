<template>
  <div class="wrapper">
    <ScanQRCode
      title="Scan Employee Code to Login"
      subtitle="Align the QR code within the frame to scan"
      @result="onScan"
      @error="onError"
    >
      <template #default>
        <s-button
          outline
          class="!bg-white active:!opacity-80"
          @click="tryScanAgain"
          v-if="local.invalidQR"
        >
          Try again
        </s-button>
      </template>
    </ScanQRCode>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import ScanQRCode from '@/components/ScanQRCode.vue';
import { useRouter } from 'vue-router';
import EventBus from '@/utils/eventbus';
import { useAuthStore } from '@/stores/auth';
import { useNotificationStore } from '@/stores/notification';

const notificationStore = useNotificationStore();
const authStore = useAuthStore();
const router = useRouter();

interface Local {
  invalidQR: boolean;
}

const local: Local = reactive({
  invalidQR: false,
});

const onScan = async (decodedText: string) => {
  if (decodedText) {
    if (notificationStore.firebaseToken) {
      EventBus.$emit('changeState', 3);
      const payload = {
        code: decodedText,
        token: notificationStore.firebaseToken,
      };
      const data = await authStore.login(payload);
      if (data) {
        router.push({
          name: 'home',
        });
      } else {
        EventBus.$emit('changeState', 0);
      }
    }
  }
};

const tryScanAgain = () => {
  EventBus.$emit('changeState', 0);
  local.invalidQR = false;
};

const onError = () => {};
</script>

<style scoped></style>
