import { Rule } from 'ant-design-vue/lib/form';

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
export type UserLoginInfo = Required<Pick<UserInfo, 'username' | 'password'>> & {
  code?: string; // 验证码
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
  name: 'username' | 'password' | 'remember'; // 和表单的 name 属性一致
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
