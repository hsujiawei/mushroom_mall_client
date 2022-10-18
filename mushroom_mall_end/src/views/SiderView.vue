<script setup lang="ts">
import SiderMain from '@/components/sider/SiderMain.vue';
import useCommonStore from '@/store/common-store';

// ===================== Variables =====================
const commonStore = useCommonStore();
</script>

<template>
  <!-- class="bg-white" -->
  <a-layout-sider :collapsed="commonStore.isMenuFold">
    <SiderMain />
  </a-layout-sider>
</template>

<style scoped></style>
