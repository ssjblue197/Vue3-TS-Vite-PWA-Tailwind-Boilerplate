import { defineStore } from 'pinia';

interface System {
  sidebarIsCollapse: boolean;
}

export const useSystemStore = defineStore({
  id: 'system',
  state: (): System => ({
    sidebarIsCollapse: false,
  }),
  getters: {
    isSidebarCollapse: (state) => state.sidebarIsCollapse,
  },
  actions: {
    toggleSidebar() {
      this.sidebarIsCollapse = !this.sidebarIsCollapse;
    },
    setSidebarIsCollapse(value: boolean) {
      this.sidebarIsCollapse = value;
    },
  },
});
