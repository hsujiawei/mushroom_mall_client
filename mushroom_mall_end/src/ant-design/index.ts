// 导入 ant-desing 样式
import 'ant-design-vue/dist/antd.css';
import { App } from 'vue';

// 从 ant-design 中导入所需的组件
import {
  Button,
  Layout,
  LayoutHeader,
  LayoutSider,
  LayoutContent,
  Menu,
  MenuItem,
  MenuItemGroup,
  SubMenu,
  Avatar,
  Dropdown,
} from 'ant-design-vue';

// 组件
const components = [
  Button,
  Layout,
  LayoutHeader,
  LayoutSider,
  LayoutContent,
  Menu,
  MenuItem,
  MenuItemGroup,
  SubMenu,
  Avatar,
  Dropdown,
];

import {
  HomeOutlined,
  ShoppingOutlined,
  DiffOutlined,
  AccountBookOutlined,
  SecurityScanOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  EditOutlined,
  ExportOutlined,
} from '@ant-design/icons-vue';
// icon
const icons = [
  HomeOutlined,
  ShoppingOutlined,
  DiffOutlined,
  AccountBookOutlined,
  SecurityScanOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  EditOutlined,
  ExportOutlined
];

export default function registerAntDesign(app: App) {
  components.forEach((c) => {
    // 将所有所需的组件注册成全局组件
    app.component(c.name, c);
  });
  icons.forEach((i) => {
    app.component(i.displayName, i);
  });
}
