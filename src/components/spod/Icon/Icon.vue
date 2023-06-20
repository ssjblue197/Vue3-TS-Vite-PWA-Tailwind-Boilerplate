<script lang="ts" setup>
import InlineSvg from "vue-inline-svg";

import { getCurrentInstance } from "vue";

const instance = getCurrentInstance();
instance?.appContext.app.use(InlineSvg.InlineSvgComponent);

defineProps<{
  src: string;
}>();
</script>
<template>
  <inline-svg :src="src" fill="currentColor"></inline-svg>
</template>
