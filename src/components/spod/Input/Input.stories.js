import SInput from './Input.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Input',
  component: SInput,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'default', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'danger',
        'error',
        'warning',
        'success',
      ],
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SInput },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<s-input v-bind="args"></s-input>',
});

export const Input = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Input.args = {
  placeholder: 'Typing here',
};
