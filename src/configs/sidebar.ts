export interface Router {
  name: string;
  query?: { [key: string]: string };
  params?: { [key: string]: string };
}

export interface SidebarRouter {
  id?: string;
  name: string;
  icon?: string;
  iconClass?: string;
  permissions: string[];
  router: Router;
  isChildren?: boolean;
  children?: SidebarRouter[];
  allowView?: string[];
}

const sidebar: SidebarRouter[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: "iconDashboard",
    permissions: [],
    router: {
      name: "dashboard",
    },
  },
  {
    id: "admin",
    name: "Admin",
    icon: "iconUserOctagon",
    router: {
      name: "user",
    },
    permissions: [],
    children: [
      {
        name: "User",
        permissions: ["users.index"],
        router: {
          name: "user",
        },
      },
      {
        name: "Role",
        permissions: ["roles.index"],
        router: {
          name: "role",
        },
      },
    ],
  },
];

export default sidebar;
