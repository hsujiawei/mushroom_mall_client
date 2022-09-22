<script setup lang="ts">
import useCommonStore from '@/store/common-store';
import { SYSTEM_NAME } from '@/config';
// ===================== Variables =====================
// 获取 common store
const commonStore = useCommonStore();
// 获取 route

// ===================== Methods =====================
// 菜单折叠处理方法
const handleMenuFold = () => {
  commonStore.$patch((state) => {
    state.isMenuFold = !state.isMenuFold;
  });
};
</script>

<template>
  <div class="w-full h-full px-6 flex">
    <!-- LOGO -->
    <div class="font-bold text-xl flex items-center gap-x-2 w-[13rem]">
      <!-- <img src="@/assets/images/logo.png" alt="logo" class="w-[2rem] h-5[2rem]" /> -->
      <span>{{ SYSTEM_NAME }}</span>
    </div>

    <!-- 头部信息 -->
    <div class="flex justify-between items-center w-full h-full">
      <!-- 左侧菜单折叠 -->
      <div class="text-[1.35rem] cursor-pointer flex items-center" @click="handleMenuFold">
        <menu-unfold-outlined v-if="commonStore.isMenuFold" />
        <menu-fold-outlined v-else />
      </div>

      <!-- 最右边的用户头像 -->
      <a-dropdown class="w-[10rem]">
        <div class="flex gap-x-2 justify-center items-center cursor-pointer">
          <a-avatar src="https://joeschmoe.io/api/v1/random" />
          <span class="font-bold">Hi, Hsu</span>
          <caret-down-outlined />
        </div>
        <template #overlay>
          <a-menu class="rounded-md">
            <a-menu-item key="0" class="py-2 rounded-md">
              <template #icon><edit-outlined /></template>
              <span class="text-sm">修改信息</span>
            </a-menu-item>
            <a-menu-item key="1" class="border-t-[0.05rem] py-2 text-red-500">
              <template #icon>
                <export-outlined />
              </template>
              <span class="text-sm">退出登录</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>
