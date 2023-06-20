<script lang="ts" setup>
import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import { ref, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { create } from '@/api/role';
import axios from 'axios';
import type { RoleParams } from '@/api/role';
import type { Permission } from '@/stores/account';
import PermissionList from './PermissionList.vue';
import { fetchAll as fetchAllPermission } from '@/api/permission';

const emit = defineEmits(['onCancel', 'onSubmit']);

const toast = useToast();

const schema = yup.object({
  name: yup.string().required('The field is required.'),
});

const { handleSubmit, errors } = useForm<RoleParams>({
  validationSchema: schema,
});
const { value: name } = useField<string>('name');
const isLoading = ref(false);
const isLoadingFetch = ref(false);
const permissions = ref<Permission[]>([]);
const permissionNames = ref<string[]>();
const isDisabled = computed(() => {
  return !permissionNames?.value?.length || !name.value;
});

const togglePermissionNames = (names: string[]) => {
  permissionNames.value = names;
};

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    const params = {
      ...values,
      permission_name: permissionNames.value,
    };
    await create(params);
    toast.success('Created role successfully');
    emit('onSubmit');
  } catch (e) {
    if (axios.isAxiosError(e)) {
      toast.error(e.response?.data?.error?.message ?? 'Created role fails');
    }
  } finally {
    isLoading.value = false;
  }
});

const onCancel = () => {
  emit('onCancel');
};

const fetchListPermission = async () => {
  isLoadingFetch.value = true;

  try {
    const { data } = await fetchAllPermission();
    permissions.value = data?.data || [];
  } catch (e) {
    if (axios.isAxiosError(e)) {
      toast.error(e.response?.data?.error?.message ?? 'Fetch list fails');
    }
  } finally {
    isLoadingFetch.value = false;
  }
};

fetchListPermission();
</script>
<template>
  <s-modal size="extra-large">
    <template #header>
      <h4 class="uppercase text-neutral-primary">Create Role</h4>
    </template>
    <template #body>
      <div v-if="isLoadingFetch" class="animate-pulse space-y-5">
        <div
          class="h-9 w-full bg-background-disable-hover rounded-lg"
          v-for="i in 5"
          :key="i"
        ></div>
      </div>
      <div v-else class="space-y-5">
        <div>
          <div class="flex justify-between mb-2">
            <label
              for="name"
              class="typo-small text-neutral-primary cursor-pointer"
            >
              Name
              <span class="text-danger">*</span>
            </label>
          </div>

          <s-input
            id="name"
            :variant="errors.name ? 'error' : 'primary'"
            v-model="name"
            class="w-full"
            placeholder="Name"
          >
          </s-input>
        </div>
        <PermissionList
          :permissions="permissions"
          @togglePermissionNames="togglePermissionNames"
        />
      </div>
    </template>
    <template #footer>
      <div class="flex space-x-4 justify-end">
        <s-button variant="secondary" class="min-w-[120px]" @click="onCancel">
          Cancel
        </s-button>
        <s-button
          class="min-w-[120px]"
          @click="onSubmit"
          :disabled="isLoading || isDisabled"
          :isLoading="isLoading"
        >
          Save
        </s-button>
      </div>
    </template>
  </s-modal>
</template>
