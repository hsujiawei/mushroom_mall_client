<script setup lang="ts">
import ChartMain from '@/components/common/ChartMain.vue';
import { ChartConfiguration } from 'chart.js';
import pattern from 'patternomaly';
import TableMain from '@/components/common/TableMain.vue';
import { IChartConfiguration } from '@/types';
// ===================== Variables =====================
const LineChartConfig2: IChartConfiguration = {
  type: 'line',
  data: {
    labels: ['121', '212', '311', '41', '551', '61', '171'],
    datasets: [
      {
        label: '畜',
        data: [165, 259, 380, 381, 256, 155, 40],
        fill: true,
        borderColor: 'rgb(255, 255, 255)',
        borderWidth: 1,
        tension: 0.4,
      },
      {
        label: '人',
        data: [399, 119, 834, 235, 637, 235, 439],
        fill: true,
        borderColor: 'rgb(255, 255, 255)',
        backgroundColor: pattern.draw('zigzag-vertical', 'rgb(255, 0, 0)'),
        tension: 0.4,
        borderDash: [1, 7],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        display: false,
      },
    },
    // animations: {
    //   tension: {
    //     duration: 2500,
    //     easing: 'linear',
    //     from: 1,
    //     to: 0,
    //     loop: true,
    //   },
    // },
  },
  size: {
    width: '100%',
    height: '100%',
  },
};
const columns = [
  {
    title: '排名',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: '商品名',
    dataIndex: 'goods_name',
    key: 'goods_name',
  },
  {
    title: '销售量',
    dataIndex: 'sales',
    key: 'sales',
  },
  {
    title: '评论数',
    dataIndex: 'common_count',
    key: 'common_count',
  },
];
const data = [
  {
    key: '1',
    rank: '1',
    goods_name: '风味牛肉干',
    sales: 8872,
    common_count: 1252,
  },
  {
    key: '1',
    rank: '2',
    goods_name: '风味牛肉干',
    sales: 8872,
    common_count: 1252,
  },
  {
    key: '1',
    rank: '3',
    goods_name: '风味牛肉干',
    sales: 8872,
    common_count: 1252,
  },
  {
    key: '1',
    rank: '4',
    goods_name: '风味牛肉干',
    sales: 8872,
    common_count: 1252,
  },
  {
    key: '1',
    rank: '5',
    goods_name: '风味牛肉干',
    sales: 8872,
    common_count: 1252,
  },
  {
    key: '1',
    rank: '6',
    goods_name: '风味牛肉干',
    sales: 8872,
    common_count: 1252,
  },
];
// ===================== Methods =======================
</script>

<template>
  <div class="w-full bg-white rounded-md pt-2 px-4 pb-4 mt-5 flex gap-x-5 h-[25rem] overflow-hidden">
    <div class="flex-[2.9] overflow-hidden">
      <div class="flex justify-between">
        <h2 class="font-bold text-base">商城分析</h2>
        <RouterLink to="#" class="pt-[0.15rem]">查看更多</RouterLink>
      </div>
      <ChartMain
        canvas-id="screen"
        :config="LineChartConfig2"
        :gradient="['rgba(58, 123, 213, 1)', 'rgba(0, 210, 255, 0.3)']"
        :size="{ width: '100%', height: '95%' }" />
      <!-- <ChartMain canvas-id="screen" :config="LineChartConfig2" :gradient="['rgba(58, 123, 213, 1)', 'rgba(0, 210, 255, 0.3)']" /> -->
    </div>
    <div class="flex-[1.1]">
      <h2 class="font-bold text-base">热销商品</h2>
      <a-table :columns="columns" :data-source="data" :pagination="false" />
    </div>
  </div>
</template>
