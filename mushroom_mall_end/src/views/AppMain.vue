<script setup lang="ts">
import SiderView from '@/views/SiderView.vue';
import HeaderView from '@/views/HeaderView.vue';
import ContentView from '@/views/ContentView.vue';
// ===================== Variables =====================

// ===================== Methods =======================
</script>

<template>
  <a-layout class="w-full h-screen">
    <HeaderView />
    <a-layout>
      <SiderView />
      <ContentView />
    </a-layout>
  </a-layout>
</template>
