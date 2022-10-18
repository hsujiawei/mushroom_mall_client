import { Rule } from 'ant-design-vue/lib/form';
import { ChartConfiguration } from 'chart.js';

// 完整用户字段信息
export interface UserInfo {
  readonly id: number;
  readonly username: string;
  readonly password?: string;
  readonly phoneNumber?: number;
  readonly avatar?: string;
  readonly token?: string;
}

// 用户登录信息
type UTemp = Required<Pick<UserInfo, 'username' | 'password'>>;
export type UserLoginInfo = { -readonly [P in keyof UTemp]: UTemp[P] } & {
  code: string; // 验证码
  remember: boolean; // 是否记住登录
};

// 侧边栏统一配置
export interface IAsideMenuConfig {
  key: string; // 侧边栏菜单的 key
  title: string; // 标题
  path?: string; // 路径
  icon?: string; // 图标
  subMenus?: IAsideMenuConfig[]; // 子菜单
}
// 登录表单
export interface ILoginFormConfig {
  label: string; // 表单的提示名称
  name: 'username' | 'password' | 'remember' | 'code'; // 和表单的 name 属性一致
  vModel: 'value' | 'checked'; // 为了使用 v-model 动态绑定
  component: string; // 指定使用 ant-design 哪个表单域
  placeholder?: string; // 表单的占位提示符
  rules?: Rule[]; // 表单验证规则
  antFormAttrs?: any; // ant-desing 表单属性，也可以添加自定义的 class 属性等
}

// 服务器响应数据格式
export interface IServerResponse {
  code: number;
  message: string;
  responseTime: string;
  data?: any;
}

// 图像配置
export interface IChartConfiguration extends ChartConfiguration {
  size?: {
    width: string;
    height: string;
  };
}

// 登录成功后的用户类型{
export interface IUser {
  id: number;
  username: string;
  phoneNumber: number;
  avatar: string;
  status: number;
  roles: {
    id: number;
    roleName: string;
    roleNameZh: string;
  }[];
  createTime: string;
}

// 分类
export interface ICategory {
  id: number;
  name: string;
  parentId: number;
  level: number;
  keywords: string;
  navStatus: boolean;
  showStatus: number;
  productCount: number;
  productUnit: string;
  icon: string;
  sort: number;
  key?: number;
  description: string;
}

export type TCategoryLable = {
  [K in keyof Pick<ICategory, 'id' | 'name' | 'keywords' | 'navStatus' | 'productUnit' | 'description'>]: string;
};
