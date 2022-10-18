<script setup lang="ts">
import useCommonStore from '@/store/common-store';
import { SYSTEM_NAME } from '@/config';
import { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';
import userService from '@/services/user';
import commonUtil from '@/utils';
import useUserStore from '@/store/user-store';
import { storeToRefs } from 'pinia';
import Http from '@/network';
import { useRouter } from 'vue-router';
import localStoreUtil from '@/utils/store';
import UserModalMain from '../common/UserModalMain.vue';
import { ref } from 'vue';
// ===================== Variables =====================
// 获取 common store
const commonStore = useCommonStore();
const userStroe = useUserStore();
// 获取 router
const router = useRouter();
const userStoreRef = storeToRefs(userStroe);
// 控制用户 Modal 框的显示或隐藏
const modalVisibleRef = ref(false);
// ===================== Methods =====================
// 菜单折叠处理方法
const handleMenuFold = () => {
  commonStore.$patch((state) => {
    state.isMenuFold = !state.isMenuFold;
  });
};
// 处理头像下拉菜单点击
const handleHeaderMenuClick = (event: MenuInfo) => {
  if (event.key === '0') {
    modalVisibleRef.value = true;
    console.log('父组件 visible: ', modalVisibleRef.value);
  }

  if (event.key === '1') {
    // 退出登录
    commonUtil.showModal({
      type: 'warning',
      title: '退出登录',
      closable: true,
      cancelText: '取消',
      content: '你确定要退出登录吗?',
      onOk: async () => {
        // 向服务器发送退出登录请求
        const result = await userService.logout(userStoreRef.user.value.username);
        if (result.code === Http.SUCCESS_CODE) {
          // 清空 token 和 user
          localStoreUtil.remove('token', 'user');
          // 跳转到登录页面
          router.replace('/login');
        }
      },
    });
  }
};
// 处理 Modal 框关闭
const handleModalCancel = () => {
  modalVisibleRef.value = false;
};
</script>

<template>
  <div class="w-full h-full px-6 flex bg-dark">
    <!-- LOGO -->
    <div class="font-bold text-white text-xl flex items-center gap-x-2 w-[13rem]">
      <!-- <img src="@/assets/images/logo.png" alt="logo" class="w-[2rem] h-5[2rem]" /> -->
      <span>{{ SYSTEM_NAME }}</span>
    </div>

    <!-- 头部信息 -->
    <div class="flex justify-between items-center text-white w-full h-full">
      <!-- 左侧菜单折叠 -->
      <div class="text-[1.35rem] cursor-pointer flex items-center" @click="handleMenuFold">
        <menu-unfold-outlined v-if="commonStore.isMenuFold" />
        <menu-fold-outlined v-else />
      </div>

      <!-- 最右边的用户头像 -->
      <a-dropdown class="w-[8rem]">
        <div class="flex gap-x-2 justify-center items-center cursor-pointer">
          <a-avatar :src="userStoreRef.user.value.avatar">
            <template #icon v-if="!userStoreRef.user.value.avatar">
              <UserOutlined />
            </template>
          </a-avatar>
          <span class="font-bold">Hi, {{ userStoreRef.user.value?.username }}</span>
          <caret-down-outlined />
        </div>
        <template #overlay>
          <a-menu class="rounded-md" @click="handleHeaderMenuClick">
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

  <!-- @cancel="handleModalCancel" -->
  <UserModalMain :visible="modalVisibleRef" @cancel="handleModalCancel" :user="userStroe.user" />
</template>
