<template>
  <div
    class="w-full border-b border-neutral-40 bg-white flex items-center flex-nowrap justify-between px-7 relative"
  >
    <span
      class="flex flex-nowrap gap-1 items-center cursor-pointer absolute left-7 top-[50%] translate-y-[-50%]"
      v-if="previousRoute && !hideNavigate"
      @click="
        router.push({
          name: String(previousRoute),
        })
      "
    >
      <s-icon
        :src="$icon.render('iconBack')"
        width="24"
        height="24"
        class="!text-icon-default svg-line"
      ></s-icon>
      <span v-show="previousRouteTitle">Back to {{ previousRouteTitle }}</span>
    </span>
    <span v-show="routeTitle" class="text-[28px] leading-[36px] text-neutral-900 center">
      {{ routeTitle }}
    </span>
    <span
      class="flex flex-nowrap gap-3 absolute right-7 top-[50%] translate-y-[-50%]"
      v-if="!hideAction"
    >
      <span class="rounded-full border border-neutral-40 p-2 cursor-pointer relative">
        <s-icon
          :src="$icon.render('iconRing')"
          width="20"
          height="20"
          class="!text-icon-default svg-line"
        ></s-icon>
        <span class="rounded bg-danger w-[6px] h-[6px] absolute top-2 right-[10px]"></span>
      </span>
      <s-icon
        :src="$icon.render('iconAvatar')"
        width="36"
        height="36"
        @click="local.showLogout = !local.showLogout"
      ></s-icon>
      <transition name="fade">
        <span
          class="card text-danger absolute right-2 top-[calc(100%+4px)] z-[2] p-3 px-8 shadow-lg border !rounded-tr-[0px] font-semibold"
          @click="handleLogout"
          v-if="local.showLogout"
        >
          Logout
        </span>
      </transition>
    </span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();
const { previousRoute, previousRouteTitle, routeTitle, hideNavigate, hideAction } = route.meta;

interface Local {
  showLogout?: boolean;
}

const local: Local = reactive({
  showLogout: false,
});

const handleLogout = () => {
  //TODO Handle logout
  local.showLogout = false;
  router.push({
    name: 'auth',
  });
};

onMounted(() => {
  console.log(previousRoute);
});
</script>

<style scoped></style>
