<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  inheritAttrs: false,
});
</script>

<script lang="ts" setup>
import { computed } from "vue";
import { useVModel } from "@vueuse/core";
import { INPUT_SIZE, LABEL_SIZE, VARIANT } from "./const";
import makeid from "@/utils/makeid";

const props = withDefaults(
  defineProps<{
    size?: string;
    variant?: string;
    modelValue?: boolean | number | string | object;
    inputClasses?: string;
    labelClasses?: string;
    disabled?: boolean;
  }>(),
  {
    size: "small",
    variant: "primary",
    inputClasses: "",
    labelClasses: "",
    disabled: false,
  }
);

const model = useVModel(props, "modelValue");

const buildInputClasses = computed(() => {
  const disabledClasses = props.disabled ? "pointer-events-none" : "";
  if (props.inputClasses) return [props.inputClasses, disabledClasses];
  return [INPUT_SIZE[props.size], VARIANT[props.variant], disabledClasses];
});

const buildLabelClasses = computed(() => {
  const disabledClasses = props.disabled
    ? "text-gray-400 pointer-events-none"
    : "";
  if (props.labelClasses) return [props.labelClasses, disabledClasses];
  return [LABEL_SIZE[props.size], disabledClasses];
});

const id = "s" + makeid(8);
</script>
<template>
  <div class="flex items-start">
    <input
      :id="id"
      type="radio"
      class="focus:outline-none cursor-pointer relative top-1"
      :disabled="disabled"
      v-model="model"
      v-bind="$attrs"
      :class="buildInputClasses"
    />
    <label :for="id" class="ml-2 cursor-pointer" :class="buildLabelClasses"
      ><slot></slot
    ></label>
  </div>
</template>
