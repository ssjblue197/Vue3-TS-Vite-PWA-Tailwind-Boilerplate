<template>
  <div class="flex justify-between">
    <span class="text-neutral-200 flex gap-2">
      <span class="z-[2] w-5 h-5 rounded-full bg-success relative" v-if="props.done">
        <s-icon
          :src="$icon.render('iconBiCheck')"
          width="16"
          height="16"
          class="center !text-white svg-line"
        ></s-icon>
      </span>
      <span v-else class="relative bg-white z-[2] w-5 h-5 rounded-full border"> </span>
      {{ props.title }}
    </span>
    <span class="text-neutral-900 flex flex-col items-end">
      <span>{{ props.name }}</span>
      <span class="text-[12px] text-neutral-200"> {{ props.time }} </span>
    </span>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

interface Props {
  title?: string;
  name?: string;
  time?: string;
  done?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  name: 'N/A',
  time: '--:--:--',
  done: false,
});

onMounted(() => {
  // console.log(props);
});
</script>

<style scoped></style>
