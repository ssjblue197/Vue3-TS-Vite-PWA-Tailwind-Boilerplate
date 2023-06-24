<template>
  <div class="wrapper">
    <Header class="h-[68px]" />
    <router-view v-slot="{ Component }">
      <component :is="Component" class="!h-[calc(100vh-68px)]" />
    </router-view>
  </div>
</template>
<script lang="ts" setup>
import Header from '@/components/Header.vue';
</script>
