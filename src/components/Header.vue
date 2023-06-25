<template>
  <div
    class="w-full border-b border-neutral-40 bg-white flex items-center flex-nowrap justify-between px-7 relative"
  >
    <span
      class="flex flex-nowrap gap-1 items-center cursor-pointer absolute left-7 top-[50%] translate-y-[-50%] leading-[140%]"
      v-if="route.meta?.previousRoute && !route.meta?.hideNavigate"
      @click="
        router.push({
          name: String(route.meta?.previousRoute),
        })
      "
    >
      <s-icon
        :src="$icon.render('iconBack')"
        width="24"
        height="24"
        class="!text-icon-default svg-line"
      ></s-icon>
      <span v-show="route.meta?.previousRouteTitle"
        >Back to {{ route.meta?.previousRouteTitle }}</span
      >
    </span>
    <span
      v-show="route.meta?.routeTitle"
      class="text-[28px] leading-[36px] text-neutral-900 center"
    >
      {{ route.meta?.routeTitle }}
    </span>
    <span
      class="flex flex-nowrap gap-3 absolute right-7 top-[50%] translate-y-[-50%] z-[3]"
      v-if="!route.meta?.hideAction"
    >
      <span
        class="rounded-full border border-neutral-40 p-2 cursor-pointer relative"
        id="notification-popup"
      >
        <s-icon
          :src="$icon.render('iconRing')"
          width="20"
          height="20"
          class="!text-icon-default svg-line"
          @click="local.showNotification = !local.showNotification"
        ></s-icon>
        <span class="rounded bg-danger w-[6px] h-[6px] absolute top-2 right-[10px]"></span>
        <transition name="fade">
          <span
            class="absolute right-0 top-[calc(100%+4px)] w-[500px] bg-white z-[2]"
            v-show="local.showNotification"
          >
            <Notification />
          </span>
        </transition>
      </span>
      <span class="rounded-full border border-neutral-40 cursor-pointer relative" id="logout-popup">
        <s-icon
          :src="$icon.render('iconAvatar')"
          width="36"
          height="36"
          @click="local.showLogout = !local.showLogout"
          class="cursor-pointer relative"
        >
        </s-icon>
        <transition name="fade">
          <span
            class="card text-danger absolute right-0 top-[calc(100%+4px)] z-[2] p-6 shadow-lg border !rounded-lg w-[250px] text-left text-[17px] leading-[140%]"
            @click="handleLogout"
            v-show="local.showLogout"
          >
            Logout
          </span>
        </transition>
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Notification from '@/components/Nofitication.vue';
const route = useRoute();
const router = useRouter();

interface Local {
  showLogout?: boolean;
  showNotification: boolean;
}

const local: Local = reactive({
  showLogout: false,
  showNotification: false,
});

const handleLogout = () => {
  //TODO Handle logout
  local.showLogout = false;
  router.push({
    name: 'auth',
  });
};

onMounted(() => {
  const notificationPopup = document.getElementById('notification-popup');
  if (notificationPopup) {
    document.addEventListener('click', function (event: any) {
      const isClickedOutside = !notificationPopup.contains(event.target);
      if (isClickedOutside && local.showNotification) {
        // Perform your desired actions here
        local.showNotification = false;
      }
    });
  }
  const logoutPopup = document.getElementById('logout-popup');
  if (logoutPopup) {
    document.addEventListener('click', function (event: any) {
      const isClickedOutside = !logoutPopup.contains(event.target);
      if (isClickedOutside && local.showLogout) {
        // Perform your desired actions here
        local.showLogout = false;
      }
    });
  }
});
</script>

<style scoped></style>
