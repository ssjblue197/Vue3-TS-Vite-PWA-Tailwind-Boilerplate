<template>
  <s-tag
    variant="information"
    class="!h-[40px]"
    :class="{
      '!bg-neutral-30': disabled,
    }"
  >
    <span class="flex flex-nowrap gap-2 items-center justify-center">
      <span
        class="text-primary"
        :class="{
          '!text-neutral-90': disabled,
        }"
        >{{ displayTitle(props.title) }}</span
      >
      <s-tag
        v-if="!props.hideCount"
        size="small"
        variant="primary"
        class="rounded-lg"
        :class="{
          '!bg-neutral-90': disabled,
        }"
      >
        {{ props.count }}
      </s-tag>
      <s-icon
        :src="$icon.render('iconClose')"
        width="24"
        height="24"
        class="!text-icon-default svg-line"
        @click="emit('clear')"
        v-show="props.title.toLowerCase() !== 'all' && !props.hideClear"
      ></s-icon>
    </span>
  </s-tag>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  isLane?: boolean;
  value?: string;
  count?: number;
  disabled?: boolean;
  hideClear?: boolean;
  hideCount?: boolean;
}

const emit = defineEmits(['clear']);

const props = withDefaults(defineProps<Props>(), {
  title: 'All',
  isLane: false,
  count: 0,
  value: 'all',
  disabled: false,
  hideClear: false,
  hideCount: false,
});

const displayTitle = (title: string) => {
  if (title === 'All') return title;
  if (!props.isLane) return title;
  if (title.length < 2) return title;
  if (title.charAt(0) === title.charAt(1)) {
    return `Lane ${title.slice(0, 2)}`;
  } else {
    return 'Lane Other';
  }
};
</script>

<style scoped></style>
