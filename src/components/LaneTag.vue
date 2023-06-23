<template>
  <s-tag variant="information" class="!h-[40px]">
    <span class="flex flex-nowrap gap-2 items-center justify-center">
      <span class="text-primary">{{ props.lane }}</span>
      <s-tag size="small" variant="primary" class="rounded-lg">
        {{ props.count }}
      </s-tag>
      <s-icon
        :src="$icon.render('iconCloseGray')"
        width="24"
        height="24"
        class="!text-icon-default svg-line"
        @click="emit('clear')"
        v-show="props.lane.toLowerCase() !== 'all'"
      ></s-icon>
    </span>
  </s-tag>
</template>

<script setup lang="ts">
interface Props {
  lane?: string;
  count: number;
}

const emit = defineEmits(['clear']);

const props = withDefaults(defineProps<Props>(), {
  lane: 'All',
  count: 0,
});
</script>

<style scoped></style>
