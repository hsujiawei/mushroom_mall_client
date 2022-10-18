<script setup lang="ts">
import { SYSTEM_NAME } from '@/config';
import { loginFormConfig } from '@/config';
import { ref } from 'vue';
import type { UserLoginInfo } from '@/types';
import { FormInstance } from 'ant-design-vue';
import commonUtil from '@/utils/index';
import userService from '@/services/user';
import Http from '@/network';
import router from '@/router';
import localStoreUtil from '@/utils/store';
import useCommonStore from '@/store/common-store';
import useUserStore from '@/store/user-store';
import commonService from '@/services/common';

// ===================== Variables =====================
// 使用 commonStore
const commonStore = useCommonStore();

if (commonStore.tokenHasExpired) {
  // 判断登录是否已过期，过期显示提示信息
  commonUtil.showMessage('error', '登录已过期，请重新登录', undefined, commonUtil.MESSAGE_LOADING_KEY);
  // 改为 false
  commonStore.tokenHasExpired = false;
}

// 引用登录表单元素
const formRef = ref<FormInstance>();

// 控制登录按钮的加载动画
const loading = ref(false);
// 用户登录的数据
const userLoginInfo = ref<UserLoginInfo>({
  username: '',
  password: '',
  remember: false,
  code: '',
});
// 服务器返回的 base64 图片
const imageBase64Ref = ref('');

// ===================== Methods =======================
// 表单登录处理
const handleLogin = () => {
  // 对表单进行验证
  formRef.value
    ?.validate()
    .then(async () => {
      loading.value = true; // 开启登录按钮的加载状态
      // 判断用户输入的验证码是否正确
      if ((await commonService.verifyCode('/vc.png', userLoginInfo.value.code)).code !== Http.SUCCESS_CODE) {
        commonUtil.showMessage('error', '验证码错误', undefined, commonUtil.MESSAGE_LOADING_KEY);
        loading.value = false; // 取消加载状态
        userLoginInfo.value.code = ''; // 清空验证码
        handleVCImageClick(); // 刷新验证码图片
        return;
      }

      // 进入这里即表明验证成功
      // 对用户密码进行加密
      userLoginInfo.value.password = await commonUtil.encode(userLoginInfo.value.password);
      // 开始登录
      const result = await userService.login(userLoginInfo.value);
      if (result.code === Http.SUCCESS_CODE) {
        // 登录成功就将 token 存放到 localStore 中
        localStoreUtil.set('token', result.data.token);
        result.data.user.avatar = Http.OSS_IMAGE_PREFIX + result.data.user.avatar; // 给图片加上前缀
        // 将登录结果存放到 store 中
        useUserStore().changeUser(result.data.user);
        // 并在本地中也存储一份
        localStoreUtil.set(localStoreUtil.USER_KEY, result.data.user);
        // 清除过期信息
        commonStore.$patch((state) => (state.tokenHasExpired = false));
        // 显示登录成功消息，并跳转到首页
        commonUtil.showMessage('success', '登录成功', 1, commonUtil.MESSAGE_LOADING_KEY, () => {
          router.replace('/home');
        });
      } else {
        // 不是通用成功响应，就直接进入这里来进行处理
        commonUtil.showMessage('error', result.message, undefined, commonUtil.MESSAGE_LOADING_KEY);
        loading.value = false;

        // 获取密码字段元素，便于重新输入密码
        (document.querySelector('input[type=password]') as HTMLInputElement).focus();
        userLoginInfo.value.password = '';
      }
    })
    .catch(() => {
      // 处理表单认证错误
      loading.value = false;
      commonUtil.showMessage('error', '请完善登录信息');
    });
};
// 处理图片点击
const handleVCImageClick = async () => {
  // const result = await commonService.getBase64Image('/vc.png');
  // const result = await axios.get('http://localhost:6678/api/admin/common/vc.png');
  // console.log(result);
  imageBase64Ref.value = commonService.BASE64_IMAGE_PREFIX + (await commonService.getBase64Image('/vc.png')).data.base64;
};
handleVCImageClick();
// ===================== Vue Api =======================
</script>

<template>
  <div class="w-full h-full overflow-hidden flex items-center justify-center">
    <a-form class="-mt-52 w-[30rem] px-4 pt-3 pb-0 shadow-around rounded-md" :model="userLoginInfo" autocomplete="off" ref="formRef">
      <div class="w-full flex justify-center items-center flex-col mb-5">
        <h2 class="font-bold text-2xl tracking-widest">{{ SYSTEM_NAME }}</h2>
      </div>
      <!-- 根据配置生成表单域 -->
      <template v-for="(item, index) of loginFormConfig" :key="index">
        <!--  生成表单项 -->
        <a-form-item :name="item.name" :rules="item.rules">
          <!-- 表单域说明 -->
          <div v-if="item.label && item.label !== '记住我'" class="mb-2 tracking-wide">
            <span class="font-bold text-sm">{{ item.label }}</span>
          </div>
          <div :class="{ specially: item.name === 'code' }">
            <component
              v-model:[item.vModel]="userLoginInfo[item.name]"
              :is="item.component"
              :="{ ...item.antFormAttrs, placeholder: item.placeholder }">
              <template v-if="item.name === 'remember'">
                <!-- 如果是 checkedBox 则需要该字段 -->
                <span>{{ item.label }}</span>
              </template>
            </component>
            <img v-if="item.name === 'code'" :src="imageBase64Ref" class="code-image" @click="handleVCImageClick" />
          </div>
        </a-form-item>
      </template>

      <!-- 登录按钮 -->
      <a-form-item>
        <a-button
          type="primary"
          @click="handleLogin"
          :loading="loading"
          class="w-full bg-common font-bold py-5 flex items-center justify-center border-none"
          html-type="submit">
          登录
        </a-button>
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

.specially {
  @apply flex gap-x-3;
}
:deep(.specially .ant-input-affix-wrapper) {
  @apply w-[17rem];
}
.specially .code-image {
  @apply flex-auto h-[2.5rem] !border-none cursor-pointer;
}
</style>
