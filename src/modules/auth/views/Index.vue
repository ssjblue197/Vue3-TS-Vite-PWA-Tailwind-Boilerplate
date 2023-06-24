<template>
  <div class="wrapper">
    <ScanQRCode
      title="Scan Employee Code to Login"
      subtitle="Align the QR code within the frame to scan"
      @result="onScan"
      @error="onError"
    >
      <!-- <template #default>
        <s-button outline class="!bg-white active:!opacity-80" @click="router.go(-1)">
          Cancel scanning
        </s-button>
      </template> -->
    </ScanQRCode>
  </div>
</template>

<script setup lang="ts">
import ScanQRCode from '@/components/ScanQRCode.vue';
import { useRouter } from 'vue-router';
import EventBus from '@/utils/eventbus';

const router = useRouter();

const onScan = (decodedText: string, decodedResult: any) => {
  console.log(decodedResult);
  router.push('/home');
  if (decodedText) {
    let isValidJSON = true;
    let result = {};

    try {
      result = JSON.parse(decodedText);
    } catch (error) {
      isValidJSON = false;
    }

    if (
      isValidJSON &&
      Object.keys(result).includes('employee_code') &&
      Object.keys(result).includes('department') &&
      Object.keys(result).length === 2
    ) {
      EventBus.$emit('changeState', 3);

      // const payload = {
      //   ...result,
      //   token: notificationStore.firebaseToken,
      // }

      //TODO Handle Login

      router.push('/home');
    }
  }
};

const onError = () => {};
</script>

<style scoped></style>
