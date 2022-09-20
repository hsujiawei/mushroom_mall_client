<script setup lang="ts">
import SiderMain from '@/components/sider/SiderMain.vue';
import useCommonStore from '@/store/common-store';

// ===================== Variables =====================
const commonStore = useCommonStore();
</script>

<template>
  <a-layout-sider class="bg-white" :collapsed="commonStore.isMenuFold">
    <SiderMain />
  </a-layout-sider>
</template>

<style scoped></style>
