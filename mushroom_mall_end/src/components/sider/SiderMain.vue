<script setup lang="ts">
import { MenuProps } from 'ant-design-vue';
import { asideMenuConfig } from '@/config';
import useCommonStore from '@/store/common-store';
import { ref, watch } from 'vue';

// ===================== Variables =====================
// selectedKeys 用于指定哪个菜单被选择，这里指定初始化就选中 home
const commonStore = useCommonStore();
// const selectedKeys = ref<string[]>([]);
// const openKeys = ref<string[]>([]);
// const handleClick: MenuProps['onClick'] = (e) => {
//   console.log('click', e);
// };
// const titleClick = (title: string) => {
//   console.log('titleClick: ', title);
// };
// watch(
//   () => openKeys,
//   (val) => {
//     console.log('I watch you.');

//     console.log('openKeys', val);
//   }
// );
</script>

<template>
  <!--     @click="handleClick" -->
  <a-menu
    v-model:openKeys="commonStore.openKeys"
    v-model:selectedKeys="commonStore.selectedKeys"
    mode="inline"
    theme="dark"
    class="text-menu-common w-full h-full">
    <!-- 生成侧边栏菜单 -->
    <template v-for="(item, index) of asideMenuConfig" :key="index">
      <a-menu-item v-if="!item.subMenus" :key="item.key">
        <template v-if="item.icon" #icon>
          <component :is="item.icon" />
        </template>
        <router-link :to="item.path!">{{ item.title }}</router-link>
        <!-- <span>{{ item.title }}</span> -->
      </a-menu-item>
      <!-- 如果有子菜单就使用下面的组件 -->
      <!-- @titleClick="titleClick" -->
      <template v-else>
        <a-sub-menu :key="item.key">
          <template v-if="item.icon" #icon>
            <component :is="item.icon" />
          </template>
          <template #title>{{ item.title }}</template>
          <!-- 生成子菜单 -->
          <template v-for="(subMenu, index) of item.subMenus" :key="index">
            <a-menu-item v-if="subMenu" :key="subMenu.key">
              <template v-if="subMenu.icon" #icon>
                <component :is="subMenu.icon" />
              </template>
              <router-link :to="subMenu.path!">{{ subMenu.title }}</router-link>
              <!-- <span>{{ subMenu.title }}</span> -->
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </template>
  </a-menu>
</template>

<style scoped>
/* :global(.ant-menu-root .ant-menu-item),
:global(.ant-menu-root .ant-menu-item .ant-menu-title-content a) {
  @apply text-menu-common !bg-transparent;
}

:global(.ant-menu-root .ant-menu-item-selected),
:global(.ant-menu-root .ant-menu-item-selected a),
:global(.ant-menu-root .ant-menu-submenu-vertical.ant-menu-submenu-selected) {
  @apply font-bold text-menu-selected !bg-transparent;
}

:global(.ant-menu-root .ant-menu-item-selected) {
  @apply !bg-s-i;
}

/* .ant-menu-item-selected a, .ant-menu-item-selected a:hover */

/* :global(.ant-menu-root .ant-menu-item-selected::after) {
  @apply border-menu-b-c;
}

:global(.ant-menu-root .ant-menu-submenu-open),
:global(.ant-menu-root .ant-menu-submenu-selected .ant-menu-submenu-title),
:global(.ant-menu-root .ant-menu-submenu-open .ant-menu-submenu-title),
:global(.ant-menu-root .ant-menu-submenu-open.ant-menu-submenu-active),
:global(.ant-menu-root .ant-menu-submenu-selected .ant-menu-submenu-active),
:global(.ant-menu-root .ant-menu-item:hover),
:global(.ant-menu-root .ant-menu-item:hover a),
:global(.ant-menu-root .ant-menu-item.ant-menu-item-selected a),
:global(.ant-menu-root .ant-menu-submenu .ant-menu-submenu-title:hover),
:global(.ant-menu-root .ant-menu-submenu .ant-menu-submenu-title:hover i) {
  @apply text-menu-selected;
}  */
</style>
