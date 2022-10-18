<script setup lang="ts">
import { provide, watch, ref, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import useCommonStore from '@/store/common-store';

// ===================== Variables =====================
const commonStore = useCommonStore();
// 获取 route 对象
const route = useRoute();
// 存放面包屑的路径数据
// const breadCrumbPaths = ref<string[]>();
// const breadCrumbPaths = ;

// 处理组件重新加载
const isRouterAlive = ref(true);

// ===================== Methods =======================
// 该方法用于处理面包屑
const handleBreadCrumbRoutePath = (path: string = route.fullPath) => {
  // 使用 / 来分割路径，但会在第一个元素中多出来一个 '' 元素，需要将该元素去掉
  // breadCrumbPaths.value = path.split('/').splice(1);
};
// 重新加载组件
const handleRouterReload = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};
// ===================== Vue Api =======================
// 处理操作完成后重新加载页面数据
provide('reload', handleRouterReload);

watch(
  () => route.path,
  (newVal) => {
    // 监听 route.path 的变化
    console.log(route.name);
    handleBreadCrumbRoutePath(newVal);
  }
);
handleBreadCrumbRoutePath();
</script>
<template>
  <a-layout-content class="w-full min-h-screen overflow-y-auto px-4 py-2 pb-10 layout-scroll">
    <!-- 导航面包屑 -->
    <div class="w-full mb-2">
      <a-breadcrumb class="text-sm">
        <a-breadcrumb-item>
          <appstore-outlined />
        </a-breadcrumb-item>
        <!-- <a-breadcrumb-sparator></a-breadcrumb-sparator> -->
        <template v-for="(item, index) of commonStore.breadCrumb" :key="index">
          <a-breadcrumb-item>{{ item }}</a-breadcrumb-item>
        </template>
      </a-breadcrumb>
    </div>
    <router-view v-if="isRouterAlive" v-slot="{ Component }">
      <transition appear name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <!-- <transition name="fade" mode="out-in">
      <router-view />
    </transition> -->
  </a-layout-content>
</template>

<style scoped>
:deep(.anticon-appstore svg) {
  @apply -mt-[0.4rem];
}
.fade-enter-from {
  @apply opacity-0 -translate-y-[1rem] -translate-x-1;
}
.fade-leave-to {
  @apply opacity-0 translate-y-[1rem] translate-x-1;
}

.fade-enter-active,
.fade-leave-active {
  @apply transition-all duration-500;
}

.layout-scroll::-webkit-scrollbar {
  width: 5px;
  background-color: transparent;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
.layout-scroll::-webkit-scrollbar-thumb {
  background-color: #c3c3c3;
  border-radius: 10px;
}
</style>
