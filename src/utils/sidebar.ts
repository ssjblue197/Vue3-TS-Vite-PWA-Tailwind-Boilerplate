import sidebarItems from "@/configs/sidebar";
import type { SidebarRouter } from "@/configs/sidebar";
import type { UserPermission } from "@/stores/account";
import { flatten } from "./flatten";

export const hasMatch = (
  userPermissions: UserPermission,
  permissions: string[]
): boolean => {
  if (userPermissions.is_superadmin) return true;
  if (!permissions?.length) return false;
  for (let i = 0; i <= permissions.length; i++) {
    const permission = permissions[i];
    if (userPermissions.permissions.includes(permission)) {
      return true;
    }
  }

  return false;
};

export const generate = (userPermissions: UserPermission): SidebarRouter[] => {
  const convertSidebar = sidebarItems.map((item: SidebarRouter) => {
    return {
      ...item,
      children: item?.children?.length
        ? item.children?.map((sItem: SidebarRouter) => {
            return {
              ...sItem,
              isChildren: true,
            };
          })
        : [],
    };
  });
  if (userPermissions.is_superadmin) return convertSidebar;
  const items = convertSidebar;
  let newItem: SidebarRouter[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (hasMatch(userPermissions, item.permissions)) {
      newItem = [...newItem, item];
    }
    if (!item.children?.length) {
      continue;
    }
    let childItems: SidebarRouter[] = [];
    for (let j = 0; j < item.children.length; j++) {
      const childItem = item.children[j];
      if (hasMatch(userPermissions, childItem.permissions)) {
        childItems = [...childItems, childItem];
      }
    }
    if (childItems.length) {
      newItem = [
        ...newItem,
        {
          ...item,
          children: childItems,
          router: {
            name: childItems[0].router.name,
          },
        },
      ];
    }
  }

  return newItem;
};

export const acceptRouteNames = (userPermissions: UserPermission): string[] => {
  const items = generate(userPermissions);
  let convertItems: SidebarRouter[] = [];
  for (let i = 0; i < items.length; i++) {
    convertItems = [...convertItems, ...flatten<SidebarRouter>(items[i])];
  }

  const routeNames = [];
  for (let i = 0; i < convertItems.length; i++) {
    const item = convertItems[i];
    routeNames.push(item.router.name);
    if (item.allowView?.length) {
      routeNames.push(...item.allowView);
    }
  }

  const mySet: Set<string> = new Set(routeNames);

  return Array.from(mySet);
};
