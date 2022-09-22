<script setup lang="ts">
import { SYSTEM_NAME } from '@/config';
import { loginFormConfig } from '@/config';
import { ref } from 'vue';
import type { UserLoginInfo } from '@/types';

// ===================== Variables =====================
// 控制登录按钮的加载动画
const loading = ref(false);
const test = ref('');
// 用户登录的数据
// const userLoginInfo = ref<UserLoginInfo>({
//   username: '',
//   password: '',
//   remember: false,
// });
const userLoginInfo = ref({
  username: '',
  password: '',
  remember: false,
});

// ===================== Methods =======================
// 表单登录处理
const handleLogin = () => {
  console.log('User Login Info: ', userLoginInfo.value);
};
</script>

<template>
  <div class="w-full h-full overflow-hidden flex items-center justify-center">
    <a-form class="-mt-52 w-[30rem] px-4 pt-3 pb-0 shadow-around rounded-md">
      <div class="w-full flex justify-center items-center flex-col mb-5">
        <h2 class="font-bold text-2xl tracking-widest">{{ SYSTEM_NAME }}</h2>
      </div>
      <!-- 根据配置生成表单域 -->
      <template v-for="(item, index) of loginFormConfig" :key="index">
        <a-form-item :name="item.name" :reules="item.rules">
          <!-- 表单域说明 -->
          <div v-if="item.label && item.label !== '记住我'" class="mb-2 tracking-wide">
            <span class="font-bold text-sm">{{ item.label }}</span>
          </div>
          <component
            v-model:[item.vModel]="userLoginInfo[item.name]"
            :is="item.component"
            :="{ ...item.antFormAttrs, placeholder: item.placeholder }"
          >
            <template v-if="item.label === '记住我'">
              <!-- 如果是 checkedBox 则需要该字段 -->
              <span>{{ item.label }}</span>
            </template>
          </component>
        </a-form-item>
      </template>

      <!-- 登录按钮 -->
      <a-form-item>
        <a-button
          type="primary"
          @click="handleLogin"
          :loading="loading"
          class="w-full bg-common font-bold py-5 flex items-center justify-center border-none"
          html-type="submit"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
.form-item {
  @apply !border !border-solid !border-[#e4e6fc] py-2;
}
.form-item:focus-within {
  @apply !border-menu-b-c;
}

:deep(.ant-checkbox-inner, .ant-checkbox-inner:hover) {
  @apply bg-[#f1f1f1] !border-transparent;
}
:deep(.ant-checkbox-checked .ant-checkbox-inner) {
  @apply bg-common;
}
:deep(.ant-btn-loading-icon) {
  @apply flex items-center justify-center;
}
</style>
