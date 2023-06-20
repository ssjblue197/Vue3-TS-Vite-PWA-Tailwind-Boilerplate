<script lang="ts" setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { changePassword } from "@/api/user";
import type { ChangePasswordParams } from "@/api/user";
import axios from "axios";
import type { User } from "@/modules/user/types";

const emit = defineEmits(["onCancel", "onSubmit"]);
const props = defineProps<{
  item: User;
}>();

const toast = useToast();

const schema = yup.object({
  new_password: yup
    .string()
    .required("The field is required.")
    .min(6, "Password must be at least 6 characters"),
  new_password_confirmation: yup
    .string()
    .required("The field is required.")
    .min(6, "Password must be at least 6 characters")
    .oneOf([yup.ref("new_password")], "Confirm password same New password"),
});

const { handleSubmit, errors } = useForm<ChangePasswordParams>({
  validationSchema: schema,
});

const { value: new_password } = useField<string>("new_password");
const { value: new_password_confirmation } = useField<string>(
  "new_password_confirmation"
);

const isLoading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    await changePassword(props.item.id, values);
    toast.success("Change password successfully");
    emit("onSubmit");
  } catch (e) {
    if (axios.isAxiosError(e)) {
      toast.error(e.response?.data?.error?.message ?? "Change password fails");
    }
  } finally {
    isLoading.value = false;
  }
});

const onCancel = () => {
  emit("onCancel");
};
</script>
<template>
  <s-modal v-if="item">
    <template #header>
      <h4 class="uppercase text-neutral-primary">Change password</h4>
    </template>
    <template #body>
      <div class="space-y-5">
        <div>
          <div class="flex justify-between mb-2">
            <label
              for="new_password"
              class="typo-small text-neutral-primary cursor-pointer"
            >
              New password
              <span class="text-danger">*</span>
            </label>
          </div>

          <s-input-password
            id="new_password"
            :variant="errors.new_password ? 'error' : 'primary'"
            v-model="new_password"
            class="w-full"
            placeholder="New password"
          >
          </s-input-password>

          <div class="mt-2">
            <div class="flex items-center">
              <s-icon
                :src="$icon.render('iconCheck')"
                class="mr-2 !text-icon-default"
                :class="{
                  '!text-success': new_password && !errors.new_password,
                }"
              >
              </s-icon>
              <span
                class="text-neutral-disable typo-small"
                :class="{
                  'text-success': new_password && !errors.new_password,
                }"
              >
                at least 6 characters
              </span>
            </div>
          </div>
        </div>
        <div>
          <div class="flex justify-between mb-2">
            <label
              for="confirm_password"
              class="typo-small text-neutral-primary cursor-pointer"
            >
              Confirm password
              <span class="text-danger">*</span>
            </label>
          </div>

          <s-input-password
            id="confirm_password"
            :variant="errors.new_password_confirmation ? 'error' : 'primary'"
            v-model="new_password_confirmation"
            class="w-full"
            placeholder="New password"
          >
          </s-input-password>

          <div class="mt-2">
            <div class="flex items-center">
              <s-icon
                :src="$icon.render('iconCheck')"
                class="mr-2 !text-icon-default"
                :class="{
                  '!text-success':
                    new_password && new_password === new_password_confirmation,
                }"
              >
              </s-icon>
              <span
                class="text-neutral-disable typo-small"
                :class="{
                  'text-success':
                    new_password && new_password === new_password_confirmation,
                }"
              >
                same characters as the "New password"
              </span>
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
          :disabled="isLoading"
          :isLoading="isLoading"
        >
          Save
        </s-button>
      </div>
    </template>
  </s-modal>
</template>
