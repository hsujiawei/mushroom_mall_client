<script setup lang="ts">
import { computed, PropType } from 'vue';
import { registerables } from 'chart.js';
import Chart from 'chart.js/auto';
import { onMounted } from 'vue';

import { IChartConfiguration } from '@/types';
// ===================== Variables =====================
const canvasIdC = computed(() => props.canvasId);
const canvasDefaultSize = {
  height: '100%',
  width: '100%',
  cursor: 'pointer',
};

// ===================== Methods =======================

// ===================== Vue Api =======================
const props = defineProps({
  canvasId: {
    type: String,
    required: true,
  },
  config: {
    // 图形配置，数据、颜色等
    type: Object as PropType<IChartConfiguration>,
    required: true,
  },
  gradient: Object as PropType<string[]>,
});

onMounted(() => {
  // Chart.register(LineController, BarController, PieController);
  Chart.register(...registerables);
  const canvas = (document.getElementById(canvasIdC.value) as HTMLCanvasElement).getContext('2d');
  const config = props.config;
  if (props.gradient) {
    const gradient = canvas?.createLinearGradient(0, 0, 0, 400);
    gradient?.addColorStop(0, props.gradient[0]);
    gradient?.addColorStop(1, props.gradient[1]);
    const config = props.config;
    config.data.datasets[0].backgroundColor = gradient;
  }
  if (props.config.size) {
    // 如果传入了 size，则使用自定义的 size
    canvasDefaultSize.height = props.config.size.height;
    canvasDefaultSize.width = props.config.size.width;
  }
  new Chart(canvas!, config);
});
</script>

<template>
  <canvas :id="canvasIdC" :style="canvasDefaultSize"></canvas>
</template>
