import STable from './Table.vue';
import STableBody from './TableBody.vue';
import STableCell from './TableCell.vue';
import STableHead from './TableHead.vue';
import STableHeadCell from './TableHeadCell.vue';
import STableRow from './TableRow.vue';

// More on default export: https://storybook.js.org/docs/vue/writing-stories/introduction#default-export
export default {
  title: 'Table',
  component: {
    STable,
    STableBody,
    STableCell,
    STableHead,
    STableHeadCell,
    STableRow,
  },
  // More on argTypes: https://storybook.js.org/docs/vue/api/argtypes
  argTypes: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args) => ({
  // Components used in your story `template` are defined in the `components` object
  components: {
    STable,
    STableBody,
    STableCell,
    STableHead,
    STableHeadCell,
    STableRow,
  },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: `<s-table v-bind="args">
    <s-table-head>
      <s-table-head-cell>Product name</s-table-head-cell>
      <s-table-head-cell>Color</s-table-head-cell>
      <s-table-head-cell>Category</s-table-head-cell>
      <s-table-head-cell>Price</s-table-head-cell>
      <s-table-head-cell>Action</s-table-head-cell>
    </s-table-head>
    <s-table-body>
      <s-table-row>
        <s-table-cell>Apple MacBook Pro 17"</s-table-cell>
        <s-table-cell>Sliver</s-table-cell>
        <s-table-cell>Laptop</s-table-cell>
        <s-table-cell> $2999 </s-table-cell>
        <s-table-cell>
          <a
            href="#"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >Edit</a
          >
        </s-table-cell>
      </s-table-row>
      <s-table-row>
        <s-table-cell>Apple MacBook Pro 17"</s-table-cell>
        <s-table-cell>Sliver</s-table-cell>
        <s-table-cell>Laptop</s-table-cell>
        <s-table-cell> $2999 </s-table-cell>
        <s-table-cell>
          <a
            href="#"
            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >Edit</a
          >
        </s-table-cell>
      </s-table-row>
    </s-table-body>
  </s-table>`,
});

export const Table = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Table.args = {};
