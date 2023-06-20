<script lang="ts" setup>
import type { PermissionPlugin } from '@/plugins/permission';
import { inject, computed } from 'vue';

const permission = inject<PermissionPlugin>('permission');

const props = defineProps<{
  permission: string | string[];
  tooltipClass?: string;
}>();

const hasPermission = computed(() => permission?.can(props.permission));
</script>
<template>
  <div>
    <slot v-if="hasPermission" :hasPermission="hasPermission"></slot>

    <s-tooltip
      v-else
      content="User not permission"
      :hover="true"
      :class="tooltipClass"
    >
      <slot :hasPermission="hasPermission"></slot>
    </s-tooltip>
  </div>
</template>
