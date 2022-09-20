import { defineStore } from 'pinia';

const useCommonStore = defineStore('commonStore', {
  state: () => ({
    isMenuFold: false, // 侧边栏的菜单是否折叠，默认不折叠
  }),
});

export default useCommonStore;
