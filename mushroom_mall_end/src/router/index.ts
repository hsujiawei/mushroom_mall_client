import commonUtils from '@/utils';
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/AppMain.vue'),
    children: [
      {
        path: '/home',
        name: '首页',
        component: () => import('@/components/main/home/HomeMain.vue'),
      },
      // 商品管理路径
      {
        path: '/goods/list',
        name: '商品列表',
        component: () => import('@/components/main/goods/GoodsList.vue'),
      },
      {
        path: '/goods/add',
        name: '添加商品',
        component: () => import('@/components/main/goods/AddGoods.vue'),
      },
      {
        path: '/goods/classify',
        name: '商品分类',
        component: () => import('@/components/main/goods/ClassifyGoods.vue'),
      },
      {
        path: '/goods/types',
        name: '商品类型',
        component: () => import('@/components/main/goods/GoodsTypes.vue'),
      },
      {
        path: '/goods/brand-mana',
        name: '商标管理',
        component: () => import('@/components/main/goods/BrandManagement.vue'),
      },
    ],
  },

  {
    path: '/login',
    name: '登录',
    component: () => import('@/views/LoginView.vue'),
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});

// 添加路由守卫
router.beforeEach(() => {
  commonUtils.showNprogress();
});

router.afterEach(() => {
  commonUtils.hideNprogress();
});

export default router;
