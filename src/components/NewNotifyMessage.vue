<template>
  <div
    class="h-[98px] absolute left-[50%] translate-x-[-50%] top-4 w-[50%] max-w[512px] z-9999 rounded-[12px] shadow-sm bg-[rgba(19,19,19,0.08)] backdrop-blur-[12px] will-change-auto flex gap-1 flex-col p-[10px]"
  >
    <span class="flex justify-between text-neutral-200 text-[13px]">
      <span class="flex justify-between gap-[6px]">
        <span class="w-5 h-5 bg-white relative rounded">
          <s-icon
            width="14"
            height="14"
            :src="$icon.render('iconLogo')"
            class="center !text-neutral-900"
          ></s-icon>
        </span>
        <span>SWIFTPOD</span>
      </span>
      <span>now</span>
    </span>
    <span class="flex justify-between text-[17px] font-semibold text-neutral-900">
      {{ props.data?.title }}</span
    >
    <span class="flex justify-between text-neutral-900 text-[17px]">{{ props.data?.message }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  data?: any;
}

const props = withDefaults(defineProps<Props>(), {
  data: null,
});
</script>

<style scoped></style>
