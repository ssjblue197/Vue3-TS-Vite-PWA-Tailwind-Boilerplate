<script lang="ts" setup>
defineProps<{
  required?: boolean;
  label: string;
  id?: string;
  error?: string;
}>();
</script>
<template>
  <div>
    <div class="flex justify-between mb-2">
      <label :for="id" class="typo-small text-neutral-primary cursor-pointer">
        {{ label }}
        <span class="text-danger" v-if="required">*</span>
      </label>
    </div>

    <slot></slot>

    <div className="text-error mt-2 typo-small" v-if="error">
      {{ error }}
    </div>
  </div>
</template>
