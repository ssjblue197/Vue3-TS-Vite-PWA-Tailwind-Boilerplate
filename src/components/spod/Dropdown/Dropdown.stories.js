import SDropdown from './Dropdown.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Dropdown',
  component: SDropdown,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    placement: {
      control: { type: 'select' },
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SDropdown },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<s-dropdown v-bind="args" class="inline-block">
  <template #title> Dropdown </template>
  <template #content>
    <div class="px-3 py-2">
      Dropdown content
    </div>
  </template>
</s-dropdown>`,
});

export const Dropdown = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Dropdown.args = {};
