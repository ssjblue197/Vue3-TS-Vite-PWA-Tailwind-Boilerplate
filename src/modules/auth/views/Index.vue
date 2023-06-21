<template>
  <div class="container">
    <ScanQRCode
      title="Scan Employee Code to Login"
      subtitle="Align the QR code within the frame to scan"
    >
      <template #default>
        <s-button outline class="!bg-white active:!opacity-80" @click="router.go(-1)">
          Cancel scanning
        </s-button>
      </template>
    </ScanQRCode>
  </div>
</template>

<script setup lang="ts">
import ScanQRCode from '@/components/ScanQRCode.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style scoped></style>
