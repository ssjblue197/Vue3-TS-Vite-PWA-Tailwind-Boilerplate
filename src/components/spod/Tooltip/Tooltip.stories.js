import STooltip from './Tooltip.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Tooltip',
  component: STooltip,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    hover: {
      control: { type: 'boolean' },
    },
    placement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  decorators: [() => ({ template: '<div class="s-28 mx-40"><story/></div>' })],
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { STooltip },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template:
    '<s-tooltip v-bind="args" content="Tooltip content">Tooltip</s-tooltip>',
});

export const Tooltip = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Tooltip.args = {
  hover: true,
};
