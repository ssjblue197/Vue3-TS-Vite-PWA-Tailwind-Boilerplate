import SAlert from './Alert.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Alert',
  component: SAlert,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'warning', 'success'],
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SAlert },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<s-alert v-bind="args">alert</s-alert>',
});

export const Alert = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Alert.args = {};
