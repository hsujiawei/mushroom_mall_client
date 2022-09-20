<script setup lang="ts">
import useCommonStore from '@/store/common-store';
// ===================== Variables =====================
// 获取 common store
const commonStore = useCommonStore();

// ===================== Method =====================
// 菜单折叠处理方法
const handleMenuFold = () => {
  commonStore.$patch((state) => {
    state.isMenuFold = !state.isMenuFold;
  });
};
</script>

<template>
  <div class="w-full h-full px-6 flex">
    <div class="font-bold text-xl flex items-center gap-x-2 w-[13rem]">
      <img src="@/assets/images/logo.png" alt="logo" class="w-[2rem] h-5[2rem]" />
      <span>后台管理系统</span>
    </div>
    <div class="flex justify-between items-center w-full h-full">
      <div class="text-[1.45rem] cursor-pointer" @click="handleMenuFold">
        <menu-unfold-outlined v-if="commonStore.isMenuFold" />
        <menu-fold-outlined v-else />
      </div>
      <a-dropdown class="cursor-pointer">
        <a-avatar src="https://joeschmoe.io/api/v1/random" />
        <template #overlay>
          <a-menu>
            <a-menu-item key="0">
              <template #icon><edit-outlined /></template>
              <span class="text-sm">修改信息</span>
            </a-menu-item>
            <a-menu-item key="1">
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

<style scoped></style>
