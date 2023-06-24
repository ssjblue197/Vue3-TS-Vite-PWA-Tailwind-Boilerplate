<script lang="ts" setup>
import VueMultiselect from 'vue-multiselect';
</script>
<template>
  <VueMultiselect selectLabel="" deselectLabel="" selectedLabel="" v-bind="$attrs" />
</template>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style lang="scss">
.multiselect__select {
  height: 40px;
  &::before {
    @apply mt-0 absolute top-1/2 right-4 -translate-y-1/2;
  }
}
.multiselect__tags,
.multiselect__content-wrapper {
  @apply border-border-base z-10;
  font-size: inherit;
}
.multiselect__option--selected.multiselect__option--highlight,
.multiselect__option--highlight {
  @apply bg-transparent text-primary;
}
.multiselect__option--selected {
  @apply bg-transparent text-primary font-normal;
}
.multiselect,
.multiselect__tags {
  min-height: 42px;
  @apply rounded-lg;
}
.multiselect__tags {
  @apply pl-3;
}
.multiselect__placeholder {
  @apply pt-0 mb-2;
}
.multiselect__input,
.multiselect__single {
  @apply pl-0 mb-0;
  min-height: auto;
  line-height: inherit;
}
.multiselect__tag {
  @apply mr-2 mb-0 rounded-lg bg-background-link border border-border-base text-neutral-primary font-normal;
  .multiselect__tag-icon {
    &:after {
      @apply text-base text-icon-default -mt-[1px] leading-[22px];
    }
  }
}
.multiselect.is-error {
  .multiselect__tags {
    @apply border-error;
  }
}
.multiselect__option--group {
  @apply bg-transparent text-neutral-primary font-semibold uppercase #{!important};
}
.multiselect__content {
  @apply w-full;
}
.multiselect__option {
  @apply truncate #{!important};
  &:after {
    @apply bg-primary #{!important};
  }
}
</style>
