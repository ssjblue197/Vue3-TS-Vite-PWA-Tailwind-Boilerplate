<template>
  <div class="wrapper flex flex-col justify-end p-4">
    <div
      class="flex-1 flex items-center justify-center text-[34px] font-[600] text-neutral-900 m-auto"
    >
      I want to...
    </div>
    <div class="w-full flex flex-col gap-4 items-center pb-6">
      <!-- <s-button
        v-if="authStore.employee?.department.toLowerCase() === 'pulling'"
        class="w-[650px] h-[52px]"
        variant="primary"
        @click="
          router.push({
            name: 'pulling-spotter',
          })
        "
        >Go to Pulling Inventory Spotter</s-button
      > -->
      <!-- v-if="authStore.employee?.department.toLowerCase() === 'inventory'" -->
      <s-button
        class="w-[650px] h-[52px]"
        variant="primary"
        @click="
          router.push({
            name: 'fulfill-request',
          })
        "
        >Fullfill request</s-button
      >
      <!-- <s-button class="w-[650px] h-[52px]" outline>Option 2</s-button> -->
      <!-- <s-button class="w-[650px] h-[52px]" outline>Option 3</s-button> -->
      <s-button class="w-[650px] h-[52px]" variant="danger" @click="handleLogout">Logout</s-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  //TODO Handle logout
  authStore.employee = null;
  authStore.time_checking_id = null;
  router.push({
    name: 'auth',
  });
};
</script>

<style scoped></style>
