import SToggle from './Toggle.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Toggle',
  component: SToggle,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
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
  components: { SToggle },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<s-toggle v-bind="args">Toggle</s-toggle>',
});

export const Toggle = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Toggle.args = {};
