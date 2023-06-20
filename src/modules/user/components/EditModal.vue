<script lang="ts" setup>
import * as yup from 'yup';
import { useForm, useField } from 'vee-validate';
import { ref, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { update } from '@/api/user';
import type { UserParams } from '@/api/user';
import axios from 'axios';
import type { Role } from '@/modules/role/types';
import type { User } from '../types';
import { useAccountStore } from '@/stores/account';
import { fetchAll as fetchAllRole } from '@/api/role';

const emit = defineEmits(['onCancel', 'onSubmit']);
const props = defineProps<{
  item: User;
}>();
const account = useAccountStore();
const toast = useToast();
const roles = ref<Role[]>([]);

const schema = yup.object({
  first_name: yup.string().required('The field is required.'),
  last_name: yup.string().required('The field is required.'),
  username: yup.string().required('The field is required.'),
  role: yup.object().required('The field is required.'),
  is_active: yup.boolean().required('The field is required.'),
});

const { handleSubmit, errors } = useForm<UserParams>({
  validationSchema: schema,
});

const { value: first_name } = useField<string>('first_name');
const { value: last_name } = useField<string>('last_name');
const { value: username } = useField<string>('username');
const { value: is_active } = useField<boolean>('is_active');
const { value: role } = useField<Role | undefined>('role');

is_active.value = props?.item?.is_active ?? false;
first_name.value = props?.item?.first_name ?? '';
last_name.value = props?.item?.last_name ?? '';
username.value = props?.item?.username ?? '';

const hasChange = computed(() => {
  if (
    props.item.first_name !== first_name.value ||
    props.item.last_name !== last_name.value ||
    props.item.username !== username.value ||
    props.item.is_active !== is_active.value ||
    props.item?.roles?.[0]?.id !== role?.value?.id
  ) {
    return true;
  }
  return false;
});

const isLoading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    await update(props.item.id, values);
    toast.success('Update user successfully');
    emit('onSubmit');
    if (props.item.id === account?.profile?.id) {
      account.getProfile();
    }
  } catch (e) {
    if (axios.isAxiosError(e)) {
      toast.error(e.response?.data?.error?.message ?? 'Update user fails');
    }
  } finally {
    isLoading.value = false;
  }
});

const onCancel = () => {
  emit('onCancel');
};

const fetchListRole = async () => {
  const { data } = await fetchAllRole({});
  roles.value = data?.data || [];
  role.value =
    (props?.item?.roles?.length &&
      roles.value.find((item) => item.id === props.item?.roles?.[0]?.id)) ||
    undefined;
};

fetchListRole();
</script>
<template>
  <s-modal>
    <template #header>
      <h4 class="uppercase text-neutral-primary">Edit User</h4>
    </template>
    <template #body>
      <div class="mb-4 pb-6 border-b border-border-base">
        <h3 class="text-neutral-secondary mb-3">Profile Info</h3>
        <div class="space-y-5">
          <div>
            <div class="flex justify-between mb-2">
              <label
                for="first_name"
                class="typo-small text-neutral-primary cursor-pointer"
              >
                First name
                <span class="text-danger">*</span>
              </label>
            </div>

            <s-input
              id="first_name"
              :variant="errors.first_name ? 'error' : 'primary'"
              v-model="first_name"
              class="w-full"
              placeholder="First name"
            >
            </s-input>
          </div>

          <div>
            <div class="flex justify-between mb-2">
              <label
                for="last_name"
                class="typo-small text-neutral-primary cursor-pointer"
              >
                Last name
                <span class="text-danger">*</span>
              </label>
            </div>

            <s-input
              id="last_name"
              :variant="errors.last_name ? 'error' : 'primary'"
              v-model="last_name"
              class="w-full"
              placeholder="Last name"
            >
            </s-input>
          </div>
        </div>
      </div>
      <div>
        <h3 class="text-neutral-secondary mb-3">User account</h3>
        <div class="space-y-5">
          <div>
            <div class="flex justify-between mb-2">
              <label
                for="username"
                class="typo-small text-neutral-primary cursor-pointer"
              >
                User name
                <span class="text-danger">*</span>
              </label>
            </div>

            <s-input
              id="username"
              :variant="errors.username ? 'error' : 'primary'"
              v-model="username"
              class="w-full"
              placeholder="User name"
            >
            </s-input>
          </div>

          <div>
            <div class="flex justify-between mb-2">
              <label class="typo-small text-neutral-primary cursor-pointer">
                Role
                <span class="text-danger">*</span>
              </label>
            </div>
            <s-select
              label="name"
              track-by="id"
              v-model="role"
              :options="roles"
              placeholder="Select role"
              :class="{ 'is-error': errors.role }"
            ></s-select>
          </div>

          <div>
            <div class="flex justify-between mb-2">
              <label class="typo-small text-neutral-primary cursor-pointer">
                Status
                <span class="text-danger">*</span>
              </label>
            </div>
            <div class="flex space-x-8 items-center">
              <s-radio name="status" v-model="is_active" :value="true">
                Active
              </s-radio>
              <s-radio name="status" v-model="is_active" :value="false">
                Inactive
              </s-radio>
            </div>
          </div>
        </div>
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
          :disabled="isLoading || !hasChange"
          :isLoading="isLoading"
        >
          Save
        </s-button>
      </div>
    </template>
  </s-modal>
</template>
