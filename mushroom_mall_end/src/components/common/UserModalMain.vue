<script setup lang="ts">
import Http from '@/network';
import commonService from '@/services/common';
import userService from '@/services/user';
import useUserStore from '@/store/user-store';
import { IUser } from '@/types';
import commonUtil from '@/utils';
import { UploadProps } from 'ant-design-vue';
import { FileType } from 'ant-design-vue/lib/upload/interface';
import { PropType, ref } from 'vue';
import localStoreUtil from '@/utils/store';

// 定义该组件的属性
const props = defineProps({
  user: {
    type: Object as PropType<IUser>,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(['cancel']);
// 展示用户账号的状态
// const userAccountStatus = ref<{
//   status: string;
//   text: string;
// }>();
// 对用户状态进行初始化

// ===================== Variables =====================
// 获取 UserStore
const useStore = useUserStore();
const userRef = ref(useStore.user);
// 用户的头像 url 或选中上传文件的 url
// const userAvatarRef = ref<string>(props.user.avatar);
let userAvatarRef = ref(userRef.value.avatar);
// 控制显示或隐藏
// const visibleComp = computed(() => props.visible);
// 最终上传的文件，通过 beforeUpload 来进行获取
const fileRef = ref<File>();
// 按钮加载
const isLoading = ref(false);

// ===================== Methods =======================
// 对上传的文件进行校验，为了实现点击按钮后才进行上传，该方法必须要返回 false
const handleAvatarBeforeUpload: UploadProps['beforeUpload'] = async (file) => {
  if (/(^image\/)/.test(file.type)) {
    console.log('判定通过, file type: ', file);
    // 判断上传的是否是图片
    userAvatarRef.value = await syncAvatar(new FileReader(), file);
    fileRef.value = file;
    return false;
  }
  commonUtil.showMessage('error', '文件格式错误仅，支持上传图片');
  return false; // 如果不上图片则直接进行拦截
};
// 为了获取文件上传的同步结果，这里封装一个工具方法
const syncAvatar = (fileReader: FileReader, file: FileType): Promise<string> => {
  return new Promise((resolve) => {
    fileReader.onload = (e) => {
      // 同步返回 base64 的图片
      resolve((e.currentTarget as FileReader).result as string);
    };
    fileReader.readAsDataURL(file);
  });
};
// 自定义头像上传
const handleAvatarUpload = async (file: File) => {
  // 注意!!注意!!：上传文件必须要指定 Content-Type 为 multipart/form-data
  const result = await commonService.getUploadSecure('/oss-secure');
  // 获取上传的文件的后缀
  const ext = file.name.substring(file.name.lastIndexOf('.'));
  // 生成最终的上传文件名
  const finalName = `avatar/${userRef.value.username}_${userRef.value.id}/${Date.now()}${ext}`;
  const data = {
    // 账号 AccessKey
    OSSAccessKeyId: result.data.accessId,
    policy: result.data.policy,
    Signature: result.data.signature,
    // 上传的文件名 (可以包含路径)
    key: finalName,
    // 实际上传的文件
    file: file,
    success_action_status: '200', // 指定响应码
  };
  if ((await commonService.postUpload(result.data.host, data)) !== undefined) {
    return finalName; // 上传成功后将文件名返回
  }
};

// 关闭 Modal
const handleModalCancel = () => {
  emit('cancel');
};

// 处理点击按钮进行头像上传和更新基本信息
const handleUpdateClick = async () => {
  isLoading.value = true;
  // 判断 file 是否为空，为空则表示不需要更新头像
  if (fileRef.value) userRef.value.avatar = (await handleAvatarUpload(fileRef.value))!;
  // 向后台对信息进行修改
  const result = await userService.update(userRef.value.id, userRef.value.username, userRef.value.avatar);
  console.log(result);
  if (result.code === Http.SUCCESS_CODE) {
    commonUtil.showMessage('success', result.message, 1, commonUtil.MESSAGE_LOADING_KEY);
    // 更新用户信息
    result.data.user.avatar = Http.OSS_IMAGE_PREFIX + result.data.user.avatar; // 给图片加上路径
    useStore.changeUser(result.data.user);
    localStoreUtil.set(localStoreUtil.USER_KEY, result.data.user);
    isLoading.value = false;
    return;
  }
  commonUtil.showMessage('error', result.message, 1, commonUtil.MESSAGE_LOADING_KEY);
};
</script>

<template>
  <a-modal :visible="visible" title="修改用户信息" class="w-[30rem]" :footer="null" @cancel="handleModalCancel" ok-text="hello">
    <div class="flex justify-center items-center h-[6rem]">
      <a-upload name="file" :showUploadList="false" :beforeUpload="handleAvatarBeforeUpload">
        <a-avatar :size="100" :src="userAvatarRef">
          <template #icon v-if="!userAvatarRef">
            <UserOutlined />
          </template>
        </a-avatar>
      </a-upload>
    </div>
    <div class="flex gap-y-3 flex-col">
      <div class="flex gap-x-3">
        <span class="w-[4rem] text-right">用户名: </span>
        <span>{{ user.username }}</span>
      </div>
      <div class="flex gap-x-3">
        <span class="w-[4rem] text-right">手机号码: </span>
        <span>{{ user.phoneNumber }}</span>
      </div>
      <div class="flex gap-x-3">
        <span class="w-[4rem] text-right">用户角色: </span>
        <span>{{ user.roles[0].roleNameZh }}</span>
      </div>
      <div class="flex gap-x-3">
        <span class="w-[4rem] text-right">账号状态: </span>
        <a-badge v-if="user.status > 0" status="success" text="正常" />
        <a-badge v-else status="error" text="封禁中" />
      </div>
      <div class="flex gap-x-3">
        <span class="w-[4rem] text-right">创建时间: </span>
        <span>{{ user.createTime }}</span>
      </div>
    </div>
    <div class="flex justify-center items-center mt-3">
      <a-button :loading="isLoading" type="primary" @click="handleUpdateClick" class="rounded-md">保存</a-button>
    </div>
  </a-modal>
</template>

<style scoped>
:global(.ant-modal-content),
:global(.ant-modal-content .ant-modal-header) {
  @apply rounded-md;
}
</style>
