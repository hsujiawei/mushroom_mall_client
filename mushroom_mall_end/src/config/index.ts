import Http, { http } from '@/network';
import commonService from '@/services/common';
import { IAsideMenuConfig, ILoginFormConfig } from '@/types';

// 系统的名称，常用的常量都必须要使用大写
export const SYSTEM_NAME = '后台管理系统';

// 登录表单配置
export const loginFormConfig: ILoginFormConfig[] = [
  {
    label: '用户名',
    name: 'username',
    vModel: 'value',
    component: 'a-input',
    placeholder: '请输入用户名',
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      {
        min: 2,
        message: '用户名不能少于两个字符',
      },
    ],
    antFormAttrs: {
      allowClear: true,
      autofocus: true,
      bordered: false,
      class: 'form-item',
    },
  },
  {
    label: '密码',
    name: 'password',
    vModel: 'value',
    component: 'a-input-password',
    placeholder: '请输入密码',
    rules: [
      {
        required: true,
        message: '请输入密码',
      },
      {
        min: 6,
        message: '密码能少于 6 个字符',
      },
    ],
    antFormAttrs: {
      allowClear: true,
      bordered: false,
      class: 'form-item',
    },
  },
  {
    label: '验证码',
    name: 'code',
    vModel: 'value',
    component: 'a-input',
    placeholder: '请输入验证码',
    rules: [
      {
        required: true,
        message: '请输入验证码',
      },
      {
        len: 5,
        message: '验证码格式错误',
        trigger: 'blur',
        // 自定义验证，这里向服务器进行验证
      },
    ],
    antFormAttrs: {
      allowClear: true,
      bordered: false,
      class: 'form-item',
    },
  },
  {
    label: '记住我',
    name: 'remember',
    vModel: 'checked',
    component: 'a-checkbox',
  },
];

// 侧边栏配置
export const asideMenuConfig: IAsideMenuConfig[] = [
  {
    key: 'home',
    title: '首页',
    path: '/home',
    icon: 'home-outlined',
  },
  {
    key: 'user',
    title: '用户管理',
    icon: 'user-outlined',
    subMenus: [],
  },
  {
    key: 'goods',
    title: '商品管理',
    icon: 'shopping-outlined',
    subMenus: [
      {
        key: 'goods-list',
        title: '商品列表',
        path: '/goods/list',
        icon: 'gold-outlined',
      },
      {
        key: 'add-goods',
        title: '添加商品',
        path: '/goods/add',
        icon: 'appstore-add-outlined',
      },
      {
        key: 'classify-goods',
        title: '商品分类',
        path: '/goods/classify',
        icon: 'appstore-outlined',
      },
      {
        key: 'goods-type',
        title: '商品类型',
        path: '/goods/types',
        icon: 'group-outlined',
      },
      {
        key: 'brand-mana',
        title: '品牌管理',
        path: '/goods/brand-mana',
        icon: 'tag-outlined',
      },
    ],
  },
  {
    key: 'order',
    title: '订单管理',
    icon: 'diff-outlined',
    subMenus: [],
  },
  {
    key: 'market',
    title: '营销管理',
    icon: 'account-book-outlined',
    subMenus: [],
  },
  {
    key: 'auth',
    title: '权限管理',
    icon: 'security-scan-outlined',
    subMenus: [],
  },
];

export const HttpBaseConfig = {
  baseURL: 'https://localhost:6678/api/admin',
  timeout: 5000,
  withCredentials: true,
};
