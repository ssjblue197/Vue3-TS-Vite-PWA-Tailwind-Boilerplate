<script lang="ts" setup>
import type { Permission } from '@/stores/account';
import { flatten } from '@/utils/flatten';
import { ref, computed } from 'vue';

const emit = defineEmits(['toggleAction']);

const props = defineProps<{
  item: Permission;
  hasChildren?: boolean;
  indexItem?: number;
}>();

const toggleChildren = ref<boolean>(false);

const isShowIcon = computed(() => {
  if (!props?.item?.children?.length) return false;
  for (let i = 0; i < props.item.children.length; i++) {
    const pItem = props.item.children[i];
    if (pItem?.children?.length) return true;
  }
  return false;
});

const allAccessValue = computed(() => {
  return props?.item?.name + '.*';
});

const noAccessValue = computed(() => {
  return props?.item?.name + '.no_access';
});

const clickAction = (actionName: string) => {
  emit('toggleAction', actionName);
};

const isNoAccess = computed(() => {
  return !flatten<Permission>(props.item).filter((i) => i.active).length;
});

const isFullAccess = computed(() => {
  const items = flatten<Permission>(props.item);
  const activeItems = items.filter((i) => i.active);

  return items.length === activeItems.length;
});
</script>
<template>
  <div
    class="px-4 pt-5 flex w-fulll before:content-['']"
    :class="{
      'pb-2 border-b border-border-base': !hasChildren,
      'w-[calc(100%+400px)] relative before:absolute before:border-border-base before:border-t before:w-[calc(100%+16px)] before:-top-0 before:-left-0 before:h-[1px]':
        hasChildren,
    }"
  >
    <div class="w-16">
      <s-icon
        v-if="isShowIcon"
        :src="$icon.render('iconArrowDown')"
        width="24"
        height="24"
        class="min-w-[24px] cursor-pointer"
        :class="{ '-rotate-90': !toggleChildren }"
        @click="toggleChildren = !toggleChildren"
      >
      </s-icon>
    </div>

    <div class="w-16">{{ indexItem }}</div>

    <div class="w-64 text-neutral-primary mb-3">
      {{ item?.display_name }}
    </div>

    <div class="flex items-center flex-wrap flex-1">
      <div
        class="flex items-center justify-center min-w-[108px] p-2 px-4 rounded-xl cursor-pointer hover:bg-primary hover:text-white mb-3 mr-3"
        @click="clickAction(noAccessValue)"
        :class="{
          'bg-primary text-white': isNoAccess,
          'text-neutral-disable bg-background-disable': !isNoAccess,
        }"
      >
        No Access
      </div>

      <div
        class="flex items-center justify-center min-w-[108px] p-2 px-4 rounded-xl cursor-pointer hover:bg-primary hover:text-white mb-3 mr-3"
        @click="clickAction(allAccessValue)"
        :class="{
          'bg-primary text-white': isFullAccess,
          'text-neutral-disable bg-background-disable': !isFullAccess,
        }"
      >
        All Access
      </div>

      <template v-for="children in item.children" :key="children.id">
        <div
          v-if="!children.children?.length"
          class="flex items-center justify-center min-w-[108px] p-2 px-4 rounded-xl cursor-pointer hover:bg-primary hover:text-white mb-3 mr-3"
          :class="{
            'bg-primary text-white': children.active,
            'text-neutral-disable bg-background-disable': !children.active,
          }"
          @click="clickAction(children.name)"
        >
          {{ children.display_name || '' }}
        </div>
      </template>

      <template v-for="children in item?.children" :key="children.id">
        <template v-if="children?.children?.length">
          <template v-if="toggleChildren">
            <PermissionItem
              :item="children"
              :key="children.id"
              :hasChildren="true"
              class="-ml-[400px]"
              @toggleAction="(actionName: string) => emit('toggleAction', actionName)"
            />
          </template>
        </template>
      </template>
    </div>
  </div>
</template>
