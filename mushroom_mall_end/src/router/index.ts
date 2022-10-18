import commonUtils from '@/utils';
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';
import useCommonStore from '@/store/common-store';
import Http, { http } from '@/network';
import localStoreUtil from '@/utils/store';

const goodsRoutes: RouteRecordRaw[] = [
  {
    path: '/goods/list',
    name: '商品列表',
    component: () => import('@/components/main/goods/GoodsList.vue'),
    meta: {
      openKeys: 'goods', // 打开的菜单
      selectedKeys: 'goods-list', // 选中菜单
      parentLabel: '商品管理',
    },
  },
  {
    path: '/goods/add',
    name: '添加商品',
    component: () => import('@/components/main/goods/AddGoods.vue'),
    meta: {
      openKeys: 'goods',
      selectedKeys: 'add-goods', // 选中菜单
      parentLabel: '商品管理',
    },
  },
  {
    path: '/goods/classify',
    name: '商品分类',
    component: () => import('@/components/main/goods/ClassifyGoods.vue'),
    meta: {
      openKeys: 'goods',
      selectedKeys: 'classify-goods', // 选中菜单
      parentLabel: '商品管理',
    },
  },
  {
    path: '/goods/types',
    name: '商品类型',
    component: () => import('@/components/main/goods/GoodsTypes.vue'),
    meta: {
      openKeys: 'goods',
      selectedKeys: 'goods-type', // 选中菜单
      parentLabel: '商品管理',
    },
  },
  {
    path: '/goods/brand-mana',
    name: '品牌管理',
    component: () => import('@/components/main/goods/BrandManagement.vue'),
    meta: {
      openKeys: 'goods',
      selectedKeys: 'brand-mana', // 选中菜单
      parentLabel: '商品管理',
    },
  },
];

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
    component: () => import('@/views/AppMain.vue'),
    children: [
      {
        path: '/home',
        name: '首页',
        component: () => import('@/components/main/home/HomeMain.vue'),
        meta: {
          selectedKeys: 'home', // 选中菜单
        },
      },
      // 商品管理路径
      ...goodsRoutes,
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
router.beforeEach(async (to) => {
  commonUtils.showNprogress();
  // 如果是访问登录页面，则直接放行
  if (to.path === '/login') return true;

  // 其它页面在进行访问之前需要判断 token 是否有效 (一般服务器会对 token 进行自动续期)
  const result = await http.get('/common/token', undefined, false);

  const commonStore = useCommonStore(); // 需要用在这里，否则会不起效果?
  if (result.code !== Http.SUCCESS_CODE) {
    commonStore.$patch((state) => {
      state.tokenHasExpired = true;
    });
    // 移除过期 token
    localStoreUtil.remove('token');
    router.replace('/login');
    return false;
  }

  let { openKeys, selectedKeys, parentLabel } = to.meta;
  const breadCrumb: string[] = [];
  console.log('openKeys: ', openKeys, 'selectedKeys: ', selectedKeys);
  if (openKeys && parentLabel) {
    console.log('openKeys: ', openKeys, ', parentLable: ', parentLabel);
    commonStore.changeOpenKeys([openKeys as string]);
    breadCrumb.push(parentLabel as string);
  }
  commonStore.changeSelectedKeys([selectedKeys as string]);
  // 修改面包屑路径
  breadCrumb.push(to.name as string);
  commonStore.changeBreadCrumb(breadCrumb);
});

router.afterEach(() => {
  commonUtils.hideNprogress();
});

export default router;
