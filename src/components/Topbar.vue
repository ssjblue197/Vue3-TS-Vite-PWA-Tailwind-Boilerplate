<script lang="ts" setup>
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { useAccountStore } from '@/stores/account';

const { logout, profile } = useAccountStore();
</script>

<template>
  <nav class="bg-white border-b border-border-base z-30 w-full sticky top-0">
    <div
      class="grid grid-cols-3 flex items-center justify-between h-[60px] px-6"
    >
      <div class="col-span-2">
        <Breadcrumbs />
      </div>
      <div class="flex justify-end col-span-1">
        <s-dropdown placement="bottom-right" widthContent="w-64">
          <template #title>
            <div class="flex items-center">
              <img
                class="w-8 h-8 rounded-full"
                src="@/assets/images/avatar.png"
                :alt="profile?.name"
                loading="lazy"
              />
              <div class="ml-4 text-neutral-primary">
                {{ profile?.name }}
              </div>
            </div>
          </template>
          <template #content>
            <span
              @click="logout"
              class="cursor-pointer block p-3 text-neutral-primary rounded-lg hover:bg-background-disable-hover flex items-center"
            >
              <s-icon
                :src="$icon.render('iconLogout')"
                class="!text-icon-default mr-2 svg-line"
              ></s-icon>
              Sign out
            </span>
          </template>
        </s-dropdown>
      </div>
    </div>
  </nav>
</template>
