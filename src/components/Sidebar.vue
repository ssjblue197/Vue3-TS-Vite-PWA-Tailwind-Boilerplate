<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, watch, computed } from "vue";
import MenuItem from "@/components/MenuItem.vue";
import { useAccountStore } from "@/stores/account";
import { useSystemStore } from "@/stores/system";
import { generate } from "@/utils/sidebar";
import { useWindowSize } from "@vueuse/core";

const { width } = useWindowSize();
const isTablet = computed(() => Boolean(width.value <= 1366));

const { userPermission } = useAccountStore();

const sidebar = ref(generate(userPermission));

const systemStore = useSystemStore();
const { isSidebarCollapse } = storeToRefs(systemStore);
const { toggleSidebar, setSidebarIsCollapse } = systemStore;

watch(
  () => isTablet.value,
  () => {
    setSidebarIsCollapse(isTablet.value);
  }
);

if (isTablet.value) {
  setSidebarIsCollapse(isTablet.value);
}
</script>
<template>
  <aside
    class="w-full overflow-y-auto border-r border-border-base flex lg:flex flex-shrink-0 flex-col transition-width duration-75 h-full"
    :class="{
      'pb-3': isSidebarCollapse,
      'pb-5 px-6': !isSidebarCollapse,
    }"
  >
    <span
      class="cursor-pointer absolute w-8 h-8 flex items-center justify-center rounded-full z-10 top-[108px] left-[270px] bg-white rotate-90 shadow-[0_0.6px_1.8px_rgba(0,0,0,0.1),0_3.2px_7.2px_rgba(0,0,0,0.13)]"
      :class="{ 'left-[54px] !-rotate-90': isSidebarCollapse }"
      @click="toggleSidebar"
      v-if="!isTablet"
    >
      <s-icon
        :src="$icon.render('iconDown')"
        class="!text-icon-default svg-line"
      ></s-icon
    ></span>
    <div class="relative flex-1 flex flex-col min-h-0 bg-white pt-0">
      <div class="flex-1 flex flex-col">
        <div
          class="pb-3 pt-5 sticky top-0 bg-white z-10"
          :class="{ 'py-4 mb-[88px]': isSidebarCollapse }"
        >
          <div
            class="flex items-center"
            :class="{ 'justify-center': isSidebarCollapse }"
          >
            <div class="mx-3" :class="{ 'mx-0': isSidebarCollapse }">
              <img
                class="min-w-[26px] w-[26px]"
                src="@/assets/images/logo.png"
                alt="Logo"
                loading="lazy"
              />
            </div>
            <h3 v-if="!isSidebarCollapse">SWIFTPOD</h3>
          </div>
          <div
            class="typo-small text-neutral-disable mt-10"
            v-if="!isSidebarCollapse"
          >
            Menu
          </div>
        </div>
        <ul class="space-y-2">
          <MenuItem
            v-for="(item, index) in sidebar"
            :key="index"
            :menuItem="item"
          />
        </ul>
      </div>
    </div>
  </aside>
</template>
