import SInputPassword from './InputPassword.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'InputPassword',
  component: SInputPassword,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SInputPassword },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<s-input-password v-bind="args"></s-input-password>',
});

export const InputPassword = Template.bind({});
