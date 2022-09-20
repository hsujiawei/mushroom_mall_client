<script setup lang="ts">
import { MenuProps } from 'ant-design-vue';
import { ref, watch } from 'vue';

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
  >
    <!-- 首页选项 -->
    <a-menu-item key="1">
      <template #icon>
        <HomeOutlined />
      </template>
      <span>首页</span>
    </a-menu-item>

    <!-- 用户管理 -->
    <a-sub-menu key="sub2" @titleClick="titleClick">
      <template #icon>
        <user-outlined />
      </template>
      <template #title>商品管理</template>
      <a-menu-item key="5">Option 5</a-menu-item>
      <a-menu-item key="6">Option 6</a-menu-item>
      <a-sub-menu key="sub3" title="Submenu">
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu>
    </a-sub-menu>

    <!-- 商品选项 -->
    <a-sub-menu key="sub2" @titleClick="titleClick">
      <template #icon>
        <shopping-outlined />
      </template>
      <template #title>商品管理</template>
      <a-menu-item key="5">Option 5</a-menu-item>
      <a-menu-item key="6">Option 6</a-menu-item>
      <a-sub-menu key="sub3" title="Submenu">
        <a-menu-item key="7">Option 7</a-menu-item>
        <a-menu-item key="8">Option 8</a-menu-item>
      </a-sub-menu>
    </a-sub-menu>

    <!-- 订单选项 -->
    <a-sub-menu key="sub4">
      <template #icon>
        <diff-outlined />
      </template>
      <template #title>订单管理</template>
      <a-menu-item key="9">Option 9</a-menu-item>
      <a-menu-item key="10">Option 10</a-menu-item>
      <a-menu-item key="11">Option 11</a-menu-item>
      <a-menu-item key="12">Option 12</a-menu-item>
    </a-sub-menu>

    <!-- 销售选项 -->
    <a-sub-menu key="sub5">
      <template #icon>
        <account-book-outlined />
      </template>
      <template #title>营销管理</template>
    </a-sub-menu>

    <!-- 权限选项 -->
    <a-sub-menu key="sub6">
      <template #icon>
        <security-scan-outlined />
      </template>
      <template #title>权限管理</template>
    </a-sub-menu>
  </a-menu>
</template>

<style scoped></style>
