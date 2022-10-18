import { ICategory } from '@/types';
import { defineStore } from 'pinia';

const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    categories: [] as ICategory[],
  }),
  actions: {
    changeCategories(categories: ICategory[]) {
      this.categories = categories;
    },
  },
});

export default useCategoryStore;
