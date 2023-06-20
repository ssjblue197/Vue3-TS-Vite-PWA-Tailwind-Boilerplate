import SRadio from './Radio.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Radio',
  component: SRadio,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'default', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary'],
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SRadio },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<s-radio v-bind="args">Radio</s-radio>',
});

export const Radio = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Radio.args = {};
