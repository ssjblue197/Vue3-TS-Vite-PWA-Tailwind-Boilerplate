<script lang="ts" setup>
import { remove } from '@/api/user';
import type { User } from '@/modules/user/types';
import axios from 'axios';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';

const emit = defineEmits(['onCancel', 'onSubmit']);
const props = defineProps<{
  item: User;
}>();

const onCancel = () => {
  emit('onCancel');
};
const toast = useToast();
const isLoading = ref<boolean>(false);

const onSubmit = async () => {
  isLoading.value = true;
  try {
    await remove(props.item.id);
    toast.success('Delete user successfully');
    emit('onSubmit');
  } catch (e) {
    if (axios.isAxiosError(e)) {
      toast.error(e.response?.data?.error?.message ?? 'Delete user fails');
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <s-modal v-if="item">
    <template #header>
      <h4 class="uppercase text-neutral-primary">Delete confirmation</h4>
    </template>
    <template #body>
      <div class="text-neutral-secondary">
        Do you really want to delete
        <span class="text-neutral-primary font-semibold">
          {{ item.first_name }} {{ item.last_name }}
        </span>
        user? This process cannot be undone.
      </div>
    </template>
    <template #footer>
      <div class="flex space-x-4 justify-end">
        <s-button variant="secondary" class="min-w-[120px]" @click="onCancel">
          Cancel
        </s-button>
        <s-button
          class="min-w-[120px]"
          variant="danger"
          @click="onSubmit"
          :disabled="isLoading"
          :isLoading="isLoading"
        >
          Confirm
        </s-button>
      </div>
    </template>
  </s-modal>
</template>
