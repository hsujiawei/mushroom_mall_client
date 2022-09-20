<script setup lang="ts">
import SiderView from '@/views/SiderView.vue';
import HeaderView from '@/views/HeaderView.vue';
import ContentView from '@/views/ContentView.vue';
</script>

<template>
  <a-layout :style="{ width: '100%', height: '100%' }">
    <HeaderView />
    <a-layout>
      <SiderView />
      <ContentView />
    </a-layout>
  </a-layout>
</template>

<style scoped></style>
