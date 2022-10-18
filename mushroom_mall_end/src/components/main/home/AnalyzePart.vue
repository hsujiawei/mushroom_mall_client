<script setup lang="ts">
import { ref } from 'vue';
import ChartMain from '@/components/common/ChartMain.vue';
import { ChartConfiguration } from 'chart.js';
import pattern from 'patternomaly';
import { IChartConfiguration } from '@/types';

// ===================== Variables =====================
// 用于使数值增加的工具方法
const summary = ref([ref(150), ref(88), ref(6698), ref(554)]);

// line chart 配置
const BarChartConfig: ChartConfiguration = {
  type: 'bar',
  data: {
    labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: pattern.generate(['#1f77b4']),
      },
      {
        data: [15, 29, 4, 85, 56, 25, 5],
        backgroundColor: pattern.generate(['rgb(0, 206, 201)']),
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    animations: {
      tensions: {
        type: 'color',
        duration: 1000,
        from: 'red',
        to: 'yellow',
        easing: 'linear',
        loop: true,
      },
    },
  },
  // options: {
  //   animations: {
  //     tension: {
  //       duration: 1000,
  //       easing: 'linear',
  //       from: 1,
  //       to: 0,
  //       loop: true,
  //     },
  //   },

  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //   },
  //   scales: {
  //     xAxis: {
  //       // The axis for this scale is determined from the first letter of the id as `'x'`
  //       // It is recommended to specify `position` and / or `axis` explicitly.
  //       display: false,
  //     },
  //     yAxis: {
  //       display: false,
  //     },
  //   },
  // },
};
const LineChartConfig: ChartConfiguration = {
  type: 'line',
  data: {
    labels: ['11', '21', '31', '41', '51', '61', '71'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: pattern.draw('triangle', 'rgb(255, 99, 132, 0.4)'), // with opacity,
        tension: 0.1,
      },
      {
        data: [99, 19, 84, 25, 67, 25, 49],
        fill: false,
        borderColor: pattern.draw('diagonal', 'rgb(9, 132, 227)'),
        tension: 0.1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true,
      },
    },
  },
};
const PieChartConfig: IChartConfiguration = {
  type: 'doughnut',
  data: {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          pattern.draw('square', '#1f77b4'),
          pattern.draw('dash', '#ff7f0e'),
          pattern.draw('diamond', '#2ca02c'),
          pattern.draw('line-vertical', '#17becf'),
        ],
        hoverOffset: 4,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'right',
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true,
      },
    },
  },
  size: {
    width: '20px',
    height: '20px',
  },
};
const LineChartConfig2: ChartConfiguration = {
  type: 'line',
  data: {
    labels: ['121', '212', '311', '41', '551', '61', '171'],
    datasets: [
      {
        data: [165, 259, 380, 381, 256, 155, 40],
        fill: true,
        borderColor: pattern.draw('plus', 'rgb(237, 76, 103)'),
        backgroundColor: 'rgba(237, 76, 103, 0.3)',
        tension: 0.1,
      },
      {
        data: [399, 119, 834, 235, 637, 235, 439],
        fill: true,
        borderColor: pattern.draw('cross', 'rgb(163, 203, 56)'),
        tension: 0.1,
        borderDash: [1, 7],
        borderWidth: 2,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true,
      },
    },
  },
};

const gridBackGroundColors = [
  'background: linear-gradient(rgb(242, 249, 254) 0%, rgb(230, 244, 254) 100%)',
  'background: linear-gradient(rgb(245, 254, 242) 0%, rgb(230, 254, 238) 100%)',
  'background: linear-gradient(rgb(248, 240, 255) 0%, rgb(220, 244, 254) 100%)',
  'background: linear-gradient(rgb(247, 247, 255) 0%, rgb(236, 236, 255) 100%)',
];
const parts = [BarChartConfig, LineChartConfig, PieChartConfig, LineChartConfig2];

// ===================== Methods =======================
summary.value.forEach((val) => {
  const endVal = val.value;
  val.value = 0;

  const updateCounter = () => {
    const increament = Math.ceil(endVal / 200);

    if (val.value < endVal) {
      val.value += increament;
      setTimeout(updateCounter, 1);
    }
  };

  updateCounter();
});
</script>

<template>
  <div class="w-full bg-white rounded-md pt-2 px-4 pb-4">
    <h2 class="font-bold text-base">商城分析</h2>
    <div class="grid grid-cols-4 gap-x-5">
      <template v-for="(item, index) of parts" :key="index">
        <div class="rounded-sm px-2 py-3 flex max-h-[8.5rem] overflow-hidden" :style="gridBackGroundColors[index]">
          <!-- 格子左侧 -->
          <div class="flex-1">
            <h2 class="font-bold text-statistic text-[1.08rem]">总访问人数</h2>
            <!-- <span class="text-2xl">5,992</span> -->
            <span class="text-2xl block mt-6"> {{ summary[3] }} </span>
            <div class="flex gap-x-2">
              <span class="flex items-end">较昨日</span>
              <span class="text-base text-red-600">{{ summary[2] }}</span>
              <span class="flex justify-center items-center text-red-600"><arrow-up-outlined /></span>
            </div>
          </div>
          <!-- 格子右侧 -->
          <div class="flex-1 overflow-hidden">
            <ChartMain :canvas-id="'id' + index" :config="item" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<!-- background: linear-gradient(rgb(245, 254, 242) 0%, rgb(230, 254, 238) 100%) -->
<!-- background: linear-gradient(rgb(242, 249, 254) 0%, rgb(230, 244, 254) 100%) -->
<!-- background: linear-gradient(rgb(247, 247, 255) 0%, rgb(236, 236, 255) 100%) -->
