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
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Input,
  Checkbox,
  InputPassword,
  Divider,
  Row,
  Col,
  BreadcrumbSeparator,
  Card,
  Table,
  Switch,
  Image,
  ImagePreviewGroup,
  Space,
  Modal,
  Upload,
  Descriptions,
  DescriptionsItem,
  Badge,
  Tooltip,
  Select,
  InputNumber,
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
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Input,
  Checkbox,
  InputPassword,
  Divider,
  Row,
  Col,
  BreadcrumbSeparator,
  Card,
  Table,
  Switch,
  Image,
  ImagePreviewGroup,
  Space,
  Modal,
  Upload,
  Descriptions,
  DescriptionsItem,
  Badge,
  Tooltip,
  Select,
  InputNumber,
];

// 导入所需的 icon
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
  CaretDownOutlined,
  AppstoreOutlined,
  ArrowUpOutlined,
  AppstoreAddOutlined,
  UnorderedListOutlined,
  TagOutlined,
  GroupOutlined,
  GoldOutlined,
  PlusOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons-vue';
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
  ExportOutlined,
  CaretDownOutlined,
  AppstoreOutlined,
  ArrowUpOutlined,
  AppstoreAddOutlined,
  UnorderedListOutlined,
  TagOutlined,
  GroupOutlined,
  GoldOutlined,
  PlusOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
];

export default function registerAntDesign(app: App) {
  components.forEach((c) => {
    // 将所有所需的组件注册成全局组件
    app.component(c.name, c);
  });
  icons.forEach((i) => {
    // 将所有需要的 icon 都作为全局组件
    app.component(i.displayName, i);
  });
}
