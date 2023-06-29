<template>
  <div class="wrapper">
    <ScanQRCode
      title="Scan Employee Code to Login"
      subtitle="Align the QR code within the frame to scan"
      @result="onScan"
      @error="onError"
    >
      <!-- <template #default>
        <s-button
          outline
          class="!bg-white active:!opacity-80"
          @click="tryScanAgain"
          v-if="local.invalidQR"
        >
          Try again
        </s-button>
      </template> -->
    </ScanQRCode>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import ScanQRCode from '@/components/ScanQRCode.vue';
import { useRouter } from 'vue-router';
import EventBus from '@/utils/eventbus';
import { useAuthStore } from '@/stores/auth';
import { useNotificationStore } from '@/stores/notification';
import { usePickingUpStore } from '@/stores/pickingup';

const pickingUpStore = usePickingUpStore();
const notificationStore = useNotificationStore();
const authStore = useAuthStore();
const router = useRouter();

// interface Local {
//   invalidQR: boolean;
// }

// const local: Local = reactive({
//   invalidQR: false,
// });

const onScan = async (decodedText: string) => {
  if (decodedText) {
    console.log(decodedText);
    if (notificationStore.firebaseToken) {
      EventBus.$emit('changeState', 3);
      const payload = {
        code: decodedText,
        token: notificationStore.firebaseToken,
      };
      const data = await authStore.login(payload);
      if (data && Object.keys(data).length > 0) {
        EventBus.$emit('changeState', 1);
        const currentPickup = await pickingUpStore.getCurrentPickingUp({
          employee_id: data?.employee?.id,
        });
        if (currentPickup && currentPickup?.status === 'picking_up') {
          router.push({
            name: 'picking-up',
          });
        } else {
          router.push({
            name: 'home',
          });
        }
      } else {
        // local.invalidQR = true;
        setTimeout(() => {
          EventBus.$emit('changeState', 0);
        }, 1000);
      }
    }
  }
};

// const tryScanAgain = () => {
//   EventBus.$emit('changeState', 0);
//   // local.invalidQR = false;
// };

onBeforeUnmount(() => {
  EventBus.$emit('changeState', 1);
});

const onError = () => {};
</script>

<style scoped></style>
