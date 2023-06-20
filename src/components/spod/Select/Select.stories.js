import SSelect from './Select.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Select',
  component: SSelect,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SSelect },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<s-select v-bind="args"></s-select>`,
});

export const Select = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Select.args = {
  options: ['Select 1', 'Select 2', 'Select 3'],
};
