<template>
  <q-page class="p-content p-support p-index">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Workspace Manager" to="/support" />
        <q-breadcrumbs-el label="Support" to="/support" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="flex-top">
        <p class="sub-text">문의내역</p>
        <CButton
          :size-types="2"
          :btn-types="4"
          :btn-names="supportBtn"
          to="/support/write"
        />
      </div>
      <div class="group">
        <CTable
          :table="table"
          :columns="columns"
          :data="data"
          row-click
          @rowClick="onRowClick"
        />
      </div>
      <CPagination class="page-nation" />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CButton from "components/common/CButton.vue";
import CTable from "src/components/common/CTable.vue";
import CPagination from "components/common/CPagination.vue";

const title = ref("Support");
const btn = ref("문의하기");
const ptitle = ref(title);
const supportBtn = ref(btn);

const table = ref("Table");
const pageNation = ref("Pagination");

useMeta(() => ({
  title: title.value,
  pageNation,
}));

const columns = [
  {
    name: "id",
    field: "id",
    label: "ID",
    required: true,
    align: "center",
    sortable: true,
  },
  {
    name: "instance",
    field: "instance",
    label: "인스턴스 이름",
    align: "left",
    sortable: true,
    type: "link",
  },
  {
    name: "instanceType",
    field: "instanceType",
    label: "인스턴스 타입",
    align: "left",
    sortable: true,
    type: "tooltip",
  },
  {
    name: "createdAt",
    field: "createdAt",
    label: "생성일시",
    align: "left",
    sortable: true,
    type: "datetime"
  },
  // {
  //   name: "createdBy",
  //   field: "createdBy",
  //   label: "생성자",
  //   align: "left",
  //   sortable: false,
  // },
];
const data = [
  {
    id: 1,
    instance: "인스턴스 이름 인스턴스 이름 인스턴스 이름",
    instanceType: "V1.XLARGE",
    createdAt: "2023.01.12 10:33:21",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal"
    }
  },
  {
    id: 2,
    instance: "인스턴스 이름 인스턴스 이름 인스턴스 이름",
    instanceType: "V1.XLARGE",
    createdAt: "2023.01.12 10:33:21",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal"
    }
  },
];
</script>

<style lang="scss" scoped>
</style>
