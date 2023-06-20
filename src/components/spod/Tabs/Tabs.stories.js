import STabs from './Tabs.vue';
import STab from './Tab.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Tabs',
  component: {
    STabs,
    STab,
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: { STabs, STab },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `
    <s-tabs v-bind="args">
      <s-tab name="tab-1" title="Tab 1">Tab 1</s-tab>
      <s-tab name="tab-2" title="Tab 2">Tab 2</s-tab>
    </s-tabs>
  `,
});

export const Tabs = Template.bind({
  defaultTab: 'tab-2',
});
