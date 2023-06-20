import SPagination from './Pagination.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Pagination',
  component: SPagination,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { SPagination },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<s-pagination v-bind="args"></s-pagination>',
});

export const Pagination = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Pagination.args = {
  totalItems: 10,
};
