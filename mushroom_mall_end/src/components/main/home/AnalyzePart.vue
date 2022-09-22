<script setup lang="ts">
// ===================== Variables =====================

// ===================== Methods =======================
</script>

<template>
  <div class="w-full bg-white rounded-md py-2 px-4">
    <h2 class="font-bold text-base">商城分析</h2>
    <div class="grid grid-cols-4 gap-x-5">
      <div
        class="rounded-sm px-2 py-3 flex"
        style="background: linear-gradient(rgb(242, 249, 254) 0%, rgb(230, 244, 254) 100%)"
      >
        <!-- 格子左侧 -->
        <div class="flex-1">
          <h2 class="font-bold text-statistic text-[1.15rem]">总访问人数</h2>
          <span class="text-2xl">5,992</span>
          <div class="flex gap-x-2">
            <span>较昨日</span>
            <span>206.32</span>
            <span class="flex justify-center items-center text-red-500"><arrow-up-outlined /></span>
          </div>
        </div>
        <!-- 格子右侧 -->
        <div class="flex-1">1</div>
      </div>
      <div
        class="bg-red-300 rounded-sm px-2 py-3"
        style="background: linear-gradient(rgb(245, 254, 242) 0%, rgb(230, 254, 238) 100%)"
      >
        2
      </div>
      <div
        class="bg-red-300 rounded-sm px-2 py-3"
        style="background: linear-gradient(rgb(242, 249, 254) 0%, rgb(230, 244, 254) 100%)"
      >
        3
      </div>
      <div
        class="bg-red-300 rounded-sm px-2 py-3"
        style="background: linear-gradient(rgb(247, 247, 255) 0%, rgb(236, 236, 255) 100%)"
      >
        4
      </div>
    </div>
  </div>
</template>
