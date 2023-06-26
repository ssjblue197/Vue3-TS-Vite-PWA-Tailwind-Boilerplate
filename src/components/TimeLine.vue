<template>
  <div
    class="flex flex-col gap-5 py-5 relative before:content-[''] before:w-0 before:h-[calc(100%-20px-68px)] before:absolute before:border-l-2 before:border-neutral-40 before:top-[30px] before:z-0 before:left-[9px] before:border-dashed"
  >
    <TimeLineMark
      v-for="(mark, idx) in props.data"
      :key="idx"
      :title="mark.title"
      :name="mark.name"
      :time="mark.time"
      :done="mark.done"
    />
  </div>
</template>

<script setup lang="ts">
import TimeLineMark from './TimeLineMark.vue';

export interface Mark {
  title?: string;
  name?: string;
  time?: string;
  done?: boolean;
}

interface Props {
  data: Mark[];
}

const props = withDefaults(defineProps<Props>(), {
  data: undefined,
});
</script>

<style scoped></style>
