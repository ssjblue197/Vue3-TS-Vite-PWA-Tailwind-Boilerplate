// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseT = { children?: any[] };

export const flatten = <T extends BaseT>(node: T) => {
  let items: T[] = [];
  if (node?.children?.length) {
    for (let i = 0; i < node.children.length; i++) {
      const item = node.children[i];
      if (item?.children?.length) {
        items = [...items, ...item.children];
        flatten(item);
      } else {
        items = [...items, item];
      }
    }
  } else {
    items = [...items, node];
  }

  return items;
};
