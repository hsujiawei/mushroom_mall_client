<script setup lang="ts">
import useCategoryStore from '@/store/category-store';
import { ICategory } from '@/types';
import commonUtil from '@/utils';
import { SelectProps } from 'ant-design-vue';
import { FormInstance, Rule } from 'ant-design-vue/lib/form';
import { PropType, ref, onMounted, watch } from 'vue';

// ===================== Variables =====================
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: false,
  },
  data: {
    type: Object as PropType<Partial<ICategory>>,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(['cancel', 'change', 'add']);
const categoryStore = useCategoryStore();

// 下拉选中
const options = ref<SelectProps['options']>([{ label: '无父级分类', value: 0 }]);
categoryStore.categories.forEach((c) => options.value?.push({ label: c.name, value: c.id }));
let convertDate = ref<Partial<ICategory>>({});
// 表单元素
const formRef = ref<FormInstance>();
// 表单验证规则
const rules: Record<string, Rule[]> = {
  name: [
    {
      required: true,
      message: '类别名称不能为空',
    },
  ],
  parentId: [
    {
      required: true,
      message: '所属类别不能为空',
    },
  ],
  productUnit: [
    {
      required: true,
      message: '下属商品单位不能为空',
    },
    {
      max: 5,
      message: '单位名称不能超过5个字符',
    },
  ],
  description: [
    {
      required: true,
      message: '描述不能为空',
    },
    {
      max: 50,
      message: '描述信息不能操作50个字符',
    },
  ],
};
// convertDate.value.navStatus = convertDate.value.navStatus === 1? true : false;
// ===================== Methods =======================
// 数据更新
const updateData = () => {
  if (props.type === 'change') {
    Object.assign(convertDate.value, props.data); // 为了避免在页面上同步显示修改,这里取消响应式
    console.log('In Modal Change: ', convertDate.value);
  } else {
    convertDate.value = props.data;
    convertDate.value.parentId = 0;
  }
};
// 关闭 Modal 框
const handleModalClose = () => {
  emits('cancel');
};
// 点击修改
const handleClickChangeOrAdd = () => {
  if (props.type === 'change') emits('change', convertDate.value);
  else {
    // 添加商品执行认证
    formRef.value
      ?.validate()
      .then(() => {
        emits('add');
      })
      .catch(() => {
        commonUtil.showMessage('error', '请完善所需的信息');
      });
  }
};

// ===================== Vue =======================
watch(
  () => props.data,
  (newVal) => {
    updateData();
    console.log('watch props.data: ', newVal);
  }
);
onMounted(() => {
  updateData();
});
</script>

<template>
  <a-modal :title="title" :visible="visible" :footer="false" @cancel="handleModalClose">
    <a-form
      ref="formRef"
      :labelCol="{ span: 6 }"
      autocomplete="off"
      :rules="rules"
      :hideRequiredMark="type === 'change'"
      :model="convertDate">
      <a-form-item v-if="type === 'change'" label="编号">
        <a-input disabled v-model:value="convertDate.id" />
      </a-form-item>
      <a-form-item label="类别名称" name="name">
        <a-input v-model:value="convertDate.name" />
      </a-form-item>
      <a-form-item v-if="type === 'add'" label="所属父级" name="parentId">
        <a-select v-model:value="convertDate.parentId" :defaultActiveFirstOption="true" :options="options" style="width: 120px"> </a-select>
      </a-form-item>
      <a-form-item label="导航栏显示">
        <a-switch v-model:checked="convertDate.navStatus" />
      </a-form-item>
      <a-form-item label="下属商品单位" name="productUnit">
        <a-input v-model:value="convertDate.productUnit" />
      </a-form-item>
      <a-form-item label="关键字" name="keywords">
        <a-input v-model:value="convertDate.keywords" />
      </a-form-item>
      <a-form-item label="排序" name="sort">
        <a-input-number id="inputNumber" v-model:value="convertDate.sort" :min="1" :max="10" />
        <a-tooltip placement="right" class="ml-3">
          <template #title>
            <span>排序大小决定在前台显示的分类顺序，数值越大优先级越高</span>
          </template>
          <info-circle-outlined />
        </a-tooltip>
      </a-form-item>
      <a-form-item label="描述" name="description">
        <a-input v-model:value="convertDate.description" />
      </a-form-item>

      <div class="flex justify-center items-center">
        <a-button type="primary" :loading="loading" @click="handleClickChangeOrAdd" class="rounded-sm">
          {{ type === 'add' ? '添加' : '修改' }}
        </a-button>
      </div>
    </a-form>
  </a-modal>
</template>
