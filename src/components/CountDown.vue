<template>
  <div class="w-full aspect-square relative">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="fill-none stroke-none">
        <circle class="stroke-neutral-40 stroke-[5px]" cx="50" cy="50" r="45" />
        <path
          id="base-timer-path-remaining"
          stroke-dasharray="283"
          :class="`base-timer__path-remaining ${local.remainingPathColor}`"
          d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
        ></path>
      </g>
    </svg>
    <span class="text-information-300 text-[34px] font-semibold center">
      {{ displayTimmer }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, onBeforeUnmount, computed } from 'vue';
import { formatTime } from '@/utils/helper';
interface Props {
  time: number;
}

const emit = defineEmits(['end']);
const props = withDefaults(defineProps<Props>(), {
  time: 30 * 60,
});

const WARNING_THRESHOLD = (props.time * 50) / 100;
const ALERT_THRESHOLD = (props.time * 25) / 100;

const COLOR_CODES = {
  info: {
    color: 'green',
  },
  warning: {
    color: 'orange',
    threshold: WARNING_THRESHOLD,
  },
  alert: {
    color: 'red',
    threshold: ALERT_THRESHOLD,
  },
  transparent: {
    color: 'transparent',
  },
};

const FULL_DASH_ARRAY = 283;

interface Local {
  countdownInterval?: NodeJS.Timer;
  currentTime: number;
  timePassed: number;
  remainingPathColor: string;
}
const local: Local = reactive({
  countdownInterval: undefined,
  currentTime: props.time,
  timePassed: 0,
  remainingPathColor: COLOR_CODES.info.color,
});

const displayTimmer = computed(() => {
  return formatTime(local.currentTime);
});
const calculateTimeFraction = () => {
  const rawTimeFraction = local.currentTime / props.time;
  return rawTimeFraction - (1 / props.time) * (1 - rawTimeFraction);
};

const setCircleDasharray = () => {
  const circleDasharray = `${(calculateTimeFraction() * FULL_DASH_ARRAY).toFixed(0)} 283`;
  document
    .getElementById('base-timer-path-remaining')
    ?.setAttribute('stroke-dasharray', circleDasharray);
};

const setRemainingPathColor = (timeLeft: number) => {
  const { alert, warning, info, transparent } = COLOR_CODES;

  // If the remaining time is less than or equal to 5, remove the "warning" class and apply the "alert" class.
  if (timeLeft === 0) {
    document.getElementById('base-timer-path-remaining')?.classList.remove(alert.color);
    document.getElementById('base-timer-path-remaining')?.classList.add(transparent.color);
  }
  if (timeLeft <= alert.threshold) {
    document.getElementById('base-timer-path-remaining')?.classList.remove(warning.color);
    document.getElementById('base-timer-path-remaining')?.classList.add(alert.color);

    // If the remaining time is less than or equal to 10, remove the base color and apply the "warning" class.
  } else if (timeLeft <= warning.threshold) {
    document.getElementById('base-timer-path-remaining')?.classList.remove(info.color);
    document.getElementById('base-timer-path-remaining')?.classList.add(warning.color);
  }
};

onMounted(() => {
  local.countdownInterval = setInterval(() => {
    if (local.currentTime > 0) {
      local.currentTime -= 1;
      local.timePassed += 1;
      setCircleDasharray();
      setRemainingPathColor(local.currentTime);
    } else {
      clearInterval(local.countdownInterval);
      emit('end');
    }
  }, 1000);
});

onBeforeUnmount(() => {
  if (local.countdownInterval) {
    clearInterval(local.countdownInterval);
  }
});
</script>

<style scoped>
.base-timer__path-remaining {
  /* Just as thick as the original ring */
  stroke-width: 5px;

  /* Rounds the line endings to create a seamless circle */
  stroke-linecap: round;

  /* Makes sure the animation starts at the top of the circle */
  transform: rotate(90deg);
  transform-origin: center;

  /* One second aligns with the speed of the countdown timer */
  transition: 1s linear all;

  /* Allows the ring to change color when the color value updates */
  stroke: currentColor;
}

.base-timer__svg {
  /* Flips the svg and makes the animation to move left-to-right */
  transform: scaleX(-1);
}

.base-timer__path-remaining.green {
  color: #6874f9;
}

.base-timer__path-remaining.orange {
  color: orange;
}

.base-timer__path-remaining.red {
  color: red;
}

.base-timer__path-remaining.transparent {
  color: transparent;
}
</style>
