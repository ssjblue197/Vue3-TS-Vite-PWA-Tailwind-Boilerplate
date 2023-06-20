<script lang="ts" setup>
import { ref } from 'vue';
import Input from './Input.vue';

const type = ref<string>('password');
const changeType = () => {
  if (type.value === 'password') {
    type.value = 'text';
    return;
  }
  type.value = 'password';
};
</script>
<template>
  <Input :type="type" :hasAppend="true">
    <template #append>
      <s-icon
        :src="$icon.render(type === 'password' ? 'iconEyeSlash' : 'iconEye')"
        width="20"
        height="20"
        class="!text-icon-default cursor-pointer"
        @click.prevent="changeType"
      ></s-icon>
    </template>
  </Input>
</template>
