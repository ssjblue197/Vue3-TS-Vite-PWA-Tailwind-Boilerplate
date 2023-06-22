<template>
  <div class="w-full aspect-square relative">
    <div class="w-full aspect-square rounded-full border-[8px] border-neutral-40 relative">
      <span class="text-information-300 text-[34px] font-semibold center">
        {{ displayTimmer }}
      </span>
    </div>
    <div
      class="w-full z-[2] top-0 absolute aspect-square rounded-full border-[8px] border-information-300"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, onBeforeUnmount, computed } from 'vue';
import { formatTime } from '@/utils/helper';
interface Props {
  time: number;
}
const props = withDefaults(defineProps<Props>(), {
  time: 30 * 60,
});

interface Local {
  countdownInterval?: NodeJS.Timer;
  currentTime: number;
}
const local: Local = reactive({
  countdownInterval: undefined,
  currentTime: props.time,
});

const displayTimmer = computed(() => {
  return formatTime(local.currentTime);
});

onMounted(() => {
  console.log(formatTime(props.time));
  local.countdownInterval = setInterval(() => {
    if (local.currentTime > 0) {
      local.currentTime -= 1;
    } else {
      clearInterval(local.countdownInterval);
    }
  }, 1000);
});

onBeforeUnmount(() => {
  if (local.countdownInterval) {
    clearInterval(local.countdownInterval);
  }
});
</script>

<style scoped></style>
