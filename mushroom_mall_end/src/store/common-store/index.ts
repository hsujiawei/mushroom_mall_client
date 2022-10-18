import { defineStore } from 'pinia';

const useCommonStore = defineStore('commonStore', {
  state: () => ({
    isMenuFold: false, // 侧边栏的菜单是否折叠，默认不折叠
    selectedKeys: [] as string[], // 菜单选中 key
    openKeys: [] as string[], // 打开的菜单 key
    breadCrumb: [] as string[], // 面包屑路径
    tokenHasExpired: false, // 用于判断 token 是否已过期
  }),

  getters: {
    getBreadCrumb(state) {
      return state.breadCrumb;
    },
  },
  actions: {
    changeSelectedKeys(payload: string[]) {
      console.log('change select keys');
      this.selectedKeys = payload;
      console.log('changed selectedKeys: ', this.selectedKeys);
    },
    changeOpenKeys(payload: string[]) {
      this.openKeys = payload;
    },
    changeBreadCrumb(payload: string[]) {
      this.breadCrumb = payload;
    },
  },
});

export default useCommonStore;
