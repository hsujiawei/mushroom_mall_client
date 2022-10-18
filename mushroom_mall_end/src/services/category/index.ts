import { http } from '@/network';
import { ICategory } from '@/types';

class CategoryService {
  readonly #CATEGORY_SERVICE_URL_PREFIX = '/category';

  async getRootAll() {
    return await http.get(this.#CATEGORY_SERVICE_URL_PREFIX + '/categories', undefined, false);
  }
  async updateNavStatus(id: number, status: number) {
    return await http.put(this.#CATEGORY_SERVICE_URL_PREFIX + '/update_nav_status', { id, status }, false);
  }
  async updateCategory(category: any) {
    category = this.#convertCategoryToServer(category);
    return await http.put(this.#CATEGORY_SERVICE_URL_PREFIX, category);
  }
  async addNew(category: any) {
    category = this.#convertCategoryToServer(category);
    return await http.post(this.#CATEGORY_SERVICE_URL_PREFIX, category);
  }
  async delete(category: ICategory) {
    category = this.#convertCategoryToServer(category);
    return await http.delete(this.#CATEGORY_SERVICE_URL_PREFIX, category);
  }
  async batchDelete(ids: number[]) {
    return await http.delete(this.#CATEGORY_SERVICE_URL_PREFIX + '/batch', ids);
  }

  #convertCategoryToServer(category: any) {
    // 对 category 中的值进行处理
    category.navStatus = category.navStatus ? 1 : 0;
    return category;
  }
}

const categoryService = new CategoryService();

export default categoryService;
