<script setup lang="ts">
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useAccountStore } from "@/stores/account";
import { ref } from "vue";

const account = useAccountStore();

const schema = yup.object({
  username: yup.string().required("The field is required."),
  password: yup
    .string()
    .required("The field is required.")
    .min(6, "Password must be at least 6 characters"),
});
const { handleSubmit, errors } = useForm({
  validationSchema: schema,
});
const { value: username } = useField("username");
const { value: password } = useField("password");

const isLoading = ref(false);

const onSubmit = handleSubmit(async (values) => {
  const { username, password } = values;
  isLoading.value = true;
  await account.login({ username: username ?? "", password: password ?? "" });
  isLoading.value = false;
});
</script>

<template>
  <div class="bg-white">
    <div class="flex justify-center h-screen">
      <div class="grid grid-cols-1 w-full lg:grid-cols-2">
        <div
          class="login-bg bg-cover bg-no-repeat bg-center hidden lg:block"
        ></div>
        <div class="flex items-center w-full p-6 justify-center">
          <div class="flex-1 max-w-[300px]">
            <div class="text-center">
              <div class="flex items-center justify-center mb-5">
                <img
                  class="w-10"
                  src="@/assets/images/logo.png"
                  alt=""
                  loading="lazy"
                />
              </div>
              <h2 class="text-primary">Hey, hello again!</h2>
              <p class="text-base mt-2 text-neutral-secondary">
                Every day at work is a good day!
              </p>
            </div>

            <div class="mt-10">
              <form @submit="onSubmit">
                <s-form-field
                  id="username"
                  label="Username"
                  required
                  :error="errors.username"
                >
                  <s-input
                    id="username"
                    :variant="errors.username ? 'error' : 'primary'"
                    v-model="username"
                    class="w-full"
                    placeholder="Enter username"
                  >
                </s-input>
                </s-form-field>

                <s-form-field
                  :class="{
                    'mt-2': errors.username,
                    'mt-5': !errors.username,
                  }"
                  id="password"
                  label="Password"
                  required
                  :error="errors.password"
                >
                  <s-input-password
                    id="password"
                    :variant="errors.password ? 'error' : 'primary'"
                    v-model="password"
                    class="w-full"
                    placeholder="Enter password"
                  >
                  </s-input-password>
                </s-form-field>

                <div
                  :class="{
                    'mt-4': errors.password,
                    'mt-8': !errors.password,
                  }"
                >
                  <s-button
                    :disabled="isLoading"
                    class="w-full"
                    type="submit"
                    :isLoading="isLoading"
                  >
                    Sign in
                  </s-button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-bg {
  background-image: url("@/assets/images/login-bg.png");
}
</style>
