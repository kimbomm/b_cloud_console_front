<template>
  <q-page class="p-content p-images p-index">
    <div class="p-head">
       <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Projects" to="/" />
        <q-breadcrumbs-el label="images" to="/" />
        <q-breadcrumbs-el label="내 이미지" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="container">
        <div class="header">
          <q-tabs
           v-model="tab"
           align="left"
           class="c_tabs"
            >
    <q-tab name="tabs1" label="내이미지"/>
    <q-tab name="tabs2" label="기본 이미지" />
    <q-tab name="tabs3" label="공유받은 이미지" />
  </q-tabs>
         </div>
         <div class="table_set">
          <div class="search_area">
         <q-input
              outlined
              v-model="suffix"
              placeholder="이미지 이름 검색"
              clearable
              class="wsize_full"
            >
          <template v-slot:prepend>
            <q-icon name="search" class="ico_search" />
          </template>
        </q-input>
         </div>
           <div class="select_drop">
            <CDropdown
              v-model:selected="selectedBasic"
              :label="optLabel"
              :options="optNumber"
              class="auto_size"
            />
            </div>
            </div>
        <CTable
          :columns="columns"
          :data="data"
          :inviteRequest="false"
          ></CTable>
        <div class="imgpagination">
          <CPagination></CPagination>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CTable from "src/components/common/CTable.vue";
import CDropdown from "components/common/CDropdown.vue";
import CPagination from "src/components/common/CPagination.vue";

const title = ref("image");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const tab = ref("tabs2");
const optLabel = ref("10");
const columns = [
  {
    name: "id",
    field: "id",
    label: "이름",
    required: true,
    align: "left",
    sortable: true,
  },
  {
    name: "driverVersion",
    field: "driverVersion",
    label: "NVIDA 드라이브 최소 버전",
    required: true,
    align: "right",
    sortable: false,
  }
];
const data = [
  {
    id: "tensorflow 2.9.0 (python3, cuda11.2, ubuntu20.04)",
    driverVersion: "450.000.008",
  },
  {
    id: "tensorflow 2.9.0 (python3, cuda11.2, ubuntu20.04)",
    driverVersion: "450.000.008",
  },
  {
    id: "tensorflow 2.9.0 (python3, cuda11.2, ubuntu20.04)",
    driverVersion: "450.000.008",
  },

];

const optNumber = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);

</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    margin-top: 12px;
    margin-bottom: 30px;
  }
  .wsize_full {
    width: 450px;
    margin-bottom: 18px;
  }

  .imgpagination{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }
}
</style>
