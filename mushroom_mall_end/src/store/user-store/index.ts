import { defineStore } from 'pinia';
import { IUser } from '@/types';
import localStoreUtil from '@/utils/store';

const useUserStore = defineStore('userStore', {
  state: () => ({
    // 默认会先从本地找用户的信息
    user: localStoreUtil.get('user') as IUser,
  }),
  actions: {
    changeUser(user: IUser) {
      console.log('change User');
      this.user = user;
    },
  },
});

export default useUserStore;
