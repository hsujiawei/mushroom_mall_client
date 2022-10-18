<script setup lang="ts">
// ===================== Variables =====================

// ===================== Methods =======================
</script>

<template>
  <div class="w-full bg-white rounded-md pt-2 px-4 pb-4 mt-5 flex gap-x-5 h-[13.5rem] overflow-hidden">
    <div class="flex-[2.9] border-r-[0.01rem] box-border">
      <div class="flex justify-between">
        <h2 class="font-bold text-base">轮播图配置</h2>
        <a href="#" class="mr-5">修改</a>
      </div>

      <a-image-preview-group>
        <div class="w-full h-full flex items-center justify-between gap-x-3 pr-3 pb-7">
          <a-image
            class="flex-1 h-full object-cover"
            :src="`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?`" />
          <a-image
            class="flex-1 h-full object-cover"
            :src="`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?`" />
          <a-image
            class="flex-1 h-full object-cover"
            :src="`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?`" />
          <a-image
            class="flex-1 h-full object-cover"
            :src="`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?`" />
          <a-image
            class="flex-1 h-full object-cover"
            :src="`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?`" />
        </div>
      </a-image-preview-group>

      <!-- <ChartMain canvas-id="screen" :config="LineChartConfig2" :gradient="['rgba(58, 123, 213, 1)', 'rgba(0, 210, 255, 0.3)']" /> -->
    </div>
    <div class="flex-[1.1]">
      <h2 class="font-bold text-base">其它配置</h2>
    </div>
  </div>
</template>

<style scoped>
:global(.ant-image-preview-mask) {
  @apply bg-black;
}
:global(.ant-image-preview-root .ant-image-preview-img-wrapper) {
  @apply flex items-center justify-center;
}

:global(.ant-image-preview-root .ant-image-preview-img-wrapper img) {
  @apply w-[45rem] max-h-[50rem] object-contain;
}
</style>
