<script setup lang="ts">
// ===================== Variables =====================

import { TableColumnType } from 'ant-design-vue';
import { PropType } from 'vue';

// 表格列配置，指定表格列名等
// const columns = [
//   {
//     title: 'name',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: 'Age',
//     dataIndex: 'age',
//     key: 'age',
//   },
//   {
//     title: 'Address',
//     dataIndex: 'address',
//     key: 'address',
//   },
//   {
//     title: 'Tags',
//     key: 'tags',
//     dataIndex: 'tags',
//   },
//   {
//     title: 'Action',
//     key: 'action',
//   },
// ];
// 表格数据
// const data = [
//   {
//     key: 'age',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];
// ===================== Methods =======================
// ===================== Vue Api =======================
defineProps({
  columns: {
    required: true,
    type: Object as PropType<TableColumnType[]>,
  },
  data: {
    required: true,
    type: Object,
  },
  pagination: Object as PropType<boolean | Object>,
});
</script>

<template>
  <div class="w-full h-full bg-red-500">
    <a-table :columns="columns" :data-source="data" :pagination="pagination"> </a-table>
  </div>
</template>

<style scoped>
:global(.ant-table-cell::before) {
  @apply hidden;
}
:global(.ant-table-thead .ant-table-cell) {
  @apply py-2;
}
:global(.ant-table-thead .ant-table-cell:first-child) {
  @apply rounded-tl-md rounded-bl-md;
}
:global(.ant-table-thead .ant-table-cell:last-child) {
  @apply rounded-tr-md rounded-br-md;
}
:global(.ant-table-tbody .ant-table-cell) {
  @apply py-3;
}
</style>
