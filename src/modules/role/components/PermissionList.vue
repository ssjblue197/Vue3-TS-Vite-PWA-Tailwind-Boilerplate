<script lang="ts" setup>
import { reactive } from 'vue';
import type { Permission } from '@/stores/account';
import PermissionItem from './PermissionItem.vue';
import { flatten } from '@/utils/flatten';
import { clone } from 'ramda';

const props = defineProps<{
  permissions: Permission[];
}>();

const emit = defineEmits(['togglePermissionNames']);

const permissionState = reactive<Permission[]>(clone(props.permissions));

const getAllFlatten = () => {
  let items: Permission[] = [];
  for (let i = 0; i < permissionState.length; i++) {
    items = [...items, ...flatten<Permission>(permissionState[i])];
  }
  return items;
};

const toggleAction = (actionName: string) => {
  const actions = actionName.split('.');
  const lastAction = actions.pop();

  if (lastAction == '*') {
    const permissionByAction = getItemByPath(actions);
    permissionByAction && setActiveToNode(permissionByAction, true);
  } else if (lastAction == 'no_access') {
    const permissionByAction = getItemByPath(actions);
    permissionByAction && setActiveToNode(permissionByAction, false);
  } else {
    actions.push(lastAction as string);
    const permissionByAction = getItemByPath(actions);
    permissionByAction &&
      (permissionByAction.active = !permissionByAction.active);
  }

  const activeNames = getAllFlatten()
    .filter((item) => item.active)
    .map((i) => i.name);
  emit('togglePermissionNames', activeNames);
};

const getItemByPath = (actions: string[]) => {
  let permissionByAction: Permission | undefined;
  let path = '';
  for (let i = 0; i < actions.length; i++) {
    path += i == 0 ? actions[i] : '.' + actions[i];
    permissionByAction =
      i == 0
        ? permissionState.find((item) => item.name == path)
        : permissionByAction?.children?.find((item) => item.name == path);
  }
  return permissionByAction;
};

const setActiveToNode = (node: Permission, isActive: boolean) => {
  node.active = isActive;
  if (node.children && node.children.length > 0)
    node.children?.forEach((item) => setActiveToNode(item, isActive));
};
</script>
<template>
  <div>
    <div
      class="p-4 border-b border-border-base flex uppercase text-neutral-primary font-bold"
    >
      <div class="w-16"></div>
      <div class="w-16">#</div>
      <div class="w-64">Name</div>
      <div class="flex items-center flex-wrap flex-1">Permission</div>
    </div>
    <template v-for="(item, index) in permissionState" :key="index">
      <PermissionItem
        :item="item"
        @toggleAction="toggleAction"
        :indexItem="index + 1"
      />
    </template>
  </div>
</template>
