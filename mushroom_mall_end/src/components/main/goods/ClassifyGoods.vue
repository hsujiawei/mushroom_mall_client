<script setup lang="ts">
import Http from '@/network';
import categoryService from '@/services/category';
import { ICategory } from '@/types';
import commonUtil from '@/utils';
import { TableColumnType } from 'ant-design-vue';
import { ref, onMounted, reactive, inject } from 'vue';
import CategoryModalMain from '@/components/common/CategoryModalMain.vue';
import useCategoryStore from '@/store/category-store';

// ===================== Variables =====================
const categoryStore = useCategoryStore();
const columns: TableColumnType[] = [
  {
    title: '编号',
    key: 'id',
    dataIndex: 'id',
  },
  {
    title: '分类名称',
    key: 'name',
    dataIndex: 'name',
    // ellipsis: true,
  },
  {
    title: '级别',
    key: 'level',
    dataIndex: 'level',
  },
  {
    title: '下级分类数量',
    key: 'productCount',
    dataIndex: 'productCount',
    // ellipsis: true,
  },
  {
    title: '数量单位',
    key: 'productUnit',
    dataIndex: 'productUnit',
    // ellipsis: true,
  },
  {
    title: '导航栏显示',
    key: 'navStatus',
    dataIndex: 'navStatus',
    // ellipsis: true,
  },
  // {
  //   title: '是否显示',
  //   key: 'isShow',
  //   dataIndex: 'isShow',
  // },
  {
    title: '排序',
    key: 'sort',
    dataIndex: 'sort',
  },
  {
    title: '关键字',
    key: 'keywords',
    dataIndex: 'keywords',
    // ellipsis: true,
  },
  {
    title: '描述',
    key: 'description',
    dataIndex: 'description',
    // ellipsis: true,
  },
  {
    title: '操作',
    key: 'operate',
    dataIndex: 'operate',
  },
];
// 获取组件重新加载方法
const reload = inject<() => void>('reload');

// const rootCategories = ref<ICategory[]>();
// 表格加载数据动画
const tableLoadingRef = ref(false);
// 选中
const checkeds = reactive({
  indeterminate: false,
  checkAll: false,
  selectedRowKeys: [] as number[],
});
// modal 的类型
const modalType = ref('add');
// 现在的分类
const currentCate = ref<Partial<ICategory>>();
// 是否显示查看 modal
const isModalShow = ref(false);
// modal 中的按钮是否加载
const isButtonLoadingInModal = ref(false);

// ===================== Methods =======================
// 加载数据
const loadingCategories = async () => {
  tableLoadingRef.value = true;
  // 获取全部父级分类
  let categories = (await categoryService.getRootAll()).data.categories as ICategory[];
  categories = categories.map((value: any, index) => {
    value.key = value.id;
    // 将状态为 1/0 的转换为 true/false
    value.navStatus = value.navStatus === 1 ? true : false;
    return value;
  });
  // 存储一份到 Store 中
  categoryStore.changeCategories(categories);
  tableLoadingRef.value = false;
};
// 关闭导航栏显示
const handleNavStatusClick = async (category: ICategory) => {
  const result = await categoryService.updateNavStatus(category.id, category.navStatus == true ? 1 : 0);
  // 操作失败时才显示弹窗
  if (result.code !== Http.SUCCESS_CODE) commonUtil.showMessage('error', '操作失败');
};
// 删除操作
const handleDeleteCategory = (category: ICategory) => {
  commonUtil.showModal({
    type: 'warning',
    title: '警告',
    closable: true,
    content: '你确定要删除吗',
    onOk: async () => {
      const result = await categoryService.delete(category);
      if (result.code === Http.SUCCESS_CODE) {
        commonUtil.showMessage('success', '删除成功', 1, commonUtil.MESSAGE_LOADING_KEY);
        loadingCategories();
      } else commonUtil.showMessage('error', '删除失败', 1, commonUtil.MESSAGE_LOADING_KEY);
    },
  });
};
// 查看分类操作
const handleViewCategory = (category: ICategory) => {
  // reload!();
  currentCate.value = category;
  isModalShow.value = true;
  modalType.value = 'change';
};
// 添加新的分类
const handleClickAddNewCategory = () => {
  isModalShow.value = true;
  modalType.value = 'add';
  currentCate.value = {
    name: '',
    parentId: 0,
    navStatus: false,
    productUnit: '',
    description: '',
  };
};
// 关闭 Modal
const handleModalCancel = () => {
  isModalShow.value = false;
};
// 选中操作
const rowSelection = ref({
  onChange: (selectedRowKeys: number[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`);
    checkeds.selectedRowKeys = selectedRowKeys;
  },
});
// 批量删除
const handleBatchDelete = () => {
  commonUtil.showModal({
    type: 'warn',
    title: '警告',
    content: `你确定要删除这${checkeds.selectedRowKeys.length}条数据吗?`,
    closable: true,
    okText: '确定',
    onOk: async () => {
      // 进行删除
      const result = await categoryService.batchDelete(checkeds.selectedRowKeys);
      if (result.code === Http.SUCCESS_CODE) {
        // 从数据中删除
        // 清空 selectedRowKeys 中的数据，从而隐藏批量删除按钮
        checkeds.selectedRowKeys = [];
        commonUtil.showMessage('success', result.message, undefined, commonUtil.MESSAGE_LOADING_KEY);
        loadingCategories();
      } else commonUtil.showMessage('error', result.message, undefined, commonUtil.MESSAGE_LOADING_KEY);
    },
  });
};
// 修改分类
const handleChangeCategory = async (category: ICategory) => {
  // 按钮loading
  isButtonLoadingInModal.value = true;
  const result = await categoryService.updateCategory(category);
  if (result.code === Http.SUCCESS_CODE) {
    commonUtil.showMessage('success', result.message, 1, commonUtil.MESSAGE_LOADING_KEY);
    loadingCategories(); // 重新加载数据
    isModalShow.value = false; // 关闭 modal 框
  } else commonUtil.showMessage('error', result.message, 1, commonUtil.MESSAGE_LOADING_KEY);
  isButtonLoadingInModal.value = false;
};
// 添加分类
const handleAddCategory = async () => {
  isButtonLoadingInModal.value = true;
  const result = await categoryService.addNew(currentCate.value);
  if (result.code === Http.SUCCESS_CODE) {
    commonUtil.showMessage('success', result.message, 1, commonUtil.MESSAGE_LOADING_KEY);
    loadingCategories(); // 重新加载数据
    // 关闭框
    isModalShow.value = false;
    isButtonLoadingInModal.value = false;
  } else commonUtil.showMessage('error', result.message, 1, commonUtil.MESSAGE_LOADING_KEY);
};
// ===================== Vue Api =======================
onMounted(async () => {
  await loadingCategories();
});
</script>

<template>
  <div class="h-[85vh]">
    <a-card class="w-full h-full rounded-md">
      <template #title>
        <div class="flex gap-x-5 items-center">
          <span class="font-bold">商品分类</span>
        </div>
      </template>
      <!-- 操作按钮 -->
      <div class="flex justify-between items-center mb-5">
        <div class="flex gap-x-3">
          <a-button type="primary" @click="handleClickAddNewCategory" class="rounded-sm flex items-center">
            <plus-outlined /> <span>添加</span>
          </a-button>
          <a-tooltip placement="top">
            <template #title>
              <span>支持JSON、CSV 、EXCEL格式</span>
            </template>
            <a-button type="default" class="rounded-sm flex items-center">
              <span>批量导入</span>
            </a-button>
          </a-tooltip>

          <a-button @click="handleBatchDelete" v-if="checkeds.selectedRowKeys.length > 1" type="danger" class="rounded-sm"
            >删除全部</a-button
          >
        </div>
        <div>
          <a-button type="delfault" class="rounded-sm flex items-center"> <download-outlined /> <span>导出</span></a-button>
        </div>
      </div>

      <!-- :scroll="{ x: 1500 }" -->
      <a-table :columns="columns" :loading="tableLoadingRef" :data-source="categoryStore.categories" :row-selection="rowSelection">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'navStatus'">
            <a-switch @click="handleNavStatusClick(record)" v-model:checked="record.navStatus" />
          </template>
          <template v-else-if="column.key === 'operate'">
            <a href="#" class="operate" @click.prevent="handleViewCategory(record)">查看下级</a>
            <a href="#" class="operate" @click.prevent="handleViewCategory(record)">修改</a>
            <a href="#" @click.prevent="handleDeleteCategory(record)" class="operate text-red-600">删除</a>
          </template>
        </template>
      </a-table>
    </a-card>

    <CategoryModalMain
      v-if="currentCate && modalType.length > 0"
      :type="modalType"
      title="分类详情"
      :data="currentCate!"
      :visible="isModalShow"
      :loading="isButtonLoadingInModal"
      @cancel="handleModalCancel"
      @add="handleAddCategory"
      @change="handleChangeCategory" />
  </div>
</template>

<style scoped>
.operate {
  @apply py-2 px-4 rounded-md hover:bg-gray-100;
}
:deep(.ant-card-body) {
  @apply h-full;
}
:global(.ant-table-wrapper),
:global(.ant-spin-nested-loading),
:global(.ant-spin-container) {
  @apply h-full;
}
:global(.ant-table) {
  @apply h-[78%] overflow-hidden;
}
:global(.ant-pagination-item-link) {
  @apply !flex !justify-center !items-center;
}
</style>
