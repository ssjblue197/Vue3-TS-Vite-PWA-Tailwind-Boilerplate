import SModal from './Modal.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Modal',
  component: SModal,
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        '4xl',
        '5xl',
        '6xl',
        '7xl',
      ],
    },
    position: {
      control: { type: 'select' },
      options: [
        'bottom-left',
        'bottom-right',
        'bottom-center',
        'top-left',
        'top-center',
        'top-right',
        'center-left',
        'center',
        'center-right',
      ],
    },
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SModal },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<s-modal v-bind="args">
    <template #header>
      <div class="flex items-center text-lg">Header</div>
    </template>
    <template #body>
      Body
    </template>
    <template #footer>
      Footer
    </template>
  </s-modal>`,
});

export const Modal = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Modal.args = {};
