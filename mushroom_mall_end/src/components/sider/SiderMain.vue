<script setup lang="ts">
import { MenuProps } from 'ant-design-vue';
import { ref, watch } from 'vue';
import { asideMenuConfig } from '@/config';

// ===================== Variables =====================
const selectedKeys = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);
const handleClick: MenuProps['onClick'] = (e) => {
  console.log('click', e);
};
const titleClick = (e: Event) => {
  console.log('titleClick', e);
};
watch(
  () => openKeys,
  (val) => {
    console.log('openKeys', val);
  }
);
</script>

<template>
  <a-menu
    id="dddddd"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    @click="handleClick"
    class="text-menu-common"
  >
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
      <a-sub-menu v-else :key="item.key + 1" @titleClick="titleClick">
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
  </a-menu>
</template>

<style scoped>
:global(.ant-menu-root .ant-menu-item-selected, .ant-menu-root
    .ant-menu-submenu-vertical.ant-menu-submenu-selected) {
  /* eslint-disable-next-line */
  @apply font-bold text-menu-selected !bg-transparent;
}

:global(.ant-menu-root .ant-menu-item-selected::after) {
  @apply border-menu-b-c;
}

:global(.ant-menu-root .ant-menu-submenu-open),
:global(.ant-menu-root .ant-menu-submenu-open .ant-menu-submenu-title i),
:global(.ant-menu-root .ant-menu-item:hover),
:global(.ant-menu-root .ant-menu-submenu .ant-menu-submenu-title:hover),
:global(.ant-menu-root .ant-menu-submenu .ant-menu-submenu-title:hover i) {
  @apply text-menu-selected;
}
</style>
