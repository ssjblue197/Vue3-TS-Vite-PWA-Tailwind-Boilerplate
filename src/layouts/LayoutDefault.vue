<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { inject, ref } from 'vue';
import { useAccountStore } from '@/stores/account';
import type { PermissionPlugin } from '@/plugins/permission';
import LayoutLoading from './LayoutLoading.vue';

import Topbar from '@/components/Topbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import { useSystemStore } from '@/stores/system';

const { userPermission } = useAccountStore();
const accountStore = useAccountStore();

const permission = inject<PermissionPlugin>('permission');
permission?.setUserPermission(userPermission);
const systemStore = useSystemStore();
const { isSidebarCollapse } = storeToRefs(systemStore);
const isLoading = ref<boolean>(false);

const fetchData = async () => {
  isLoading.value = true;
  await accountStore.getProfile();
  isLoading.value = false;
};

fetchData();
</script>
<template>
  <LayoutLoading v-if="isLoading" />

  <div class="layout-default h-screen" v-else>
    <div class="flex h-screen">
      <div class="w-[288px] h-full" :class="{ 'w-[72px]': isSidebarCollapse }">
        <Sidebar />
      </div>
      <div
        id="main"
        class="w-[calc(100%-288px)] h-full overflow-y-auto"
        :class="{ 'w-[calc(100%-72px)]': isSidebarCollapse }"
      >
        <Topbar />
        <div
          class="p-6 bg-background-disable-lower min-h-[calc(100vh-61px)] shadow-[0_0.3px_0.9px_rgba(0,0,0,0.1),0_1.6px_3.6px_rgba(0,0,0,0.13)]"
        >
          <router-view v-slot="{ Component }">
            <component
              :is="Component"
              class="h-full p-6 rounded bg-white overflow-y-auto"
            />
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>
