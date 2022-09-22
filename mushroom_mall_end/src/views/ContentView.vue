<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { string } from 'vue-types';

// 获取 route 对象
const route = useRoute();
const breadCrumbPaths = ref<string[]>([]);
watch(
  () => route.path,
  (newVal, oldVal) => {
    // 监听 route.path 的变化
    console.log('route path has been change.');
    console.log('new value: ', newVal);
    console.log('old value: ', oldVal);
  }
);

const transitionName = ref('slide');
</script>

<template>
  <a-layout-content class="p-3 m-2">
    <!-- 导航面包屑 -->
    <div class="w-full mb-2">
      <a-breadcrumb class="text-sm">
        <a-breadcrumb-item>
          <appstore-outlined />
        </a-breadcrumb-item>
        <!-- <a-breadcrumb-sparator></a-breadcrumb-sparator> -->
        <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <!-- <div class="w-full mb-2">
      <a-breadcrumb class="text-sm">
        <a-breadcrumb-item>
          <appstore-outlined />
        </a-breadcrumb-item>
        <a-breadcrumb-item><a href="">Application Center</a></a-breadcrumb-item>
        <a-breadcrumb-item><a href="">Application List</a></a-breadcrumb-item>
        <a-breadcrumb-item>An Application</a-breadcrumb-item>
      </a-breadcrumb>
    </div> -->
    <router-view v-slot="{ Component }">
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
</style>
