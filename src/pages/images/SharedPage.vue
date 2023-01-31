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
              placeholder="이름,설명,공유자 검색"
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

const title = ref("Image");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const tab = ref("tabs3");
const optLabel = ref("10");

const columns = [
  {
    name: "id",
    field: "id",
    label: "이름",
    required: true,
    align: "left",
    sortable: true,
    class: "id",
  },
  {
    name: "instance",
    field: "instance",
    label: "설명",
    required: true,
    align: "left",
    sortable: false,
  },
  {
    name: "image",
    field: "image",
    label: "기본 이미지",
    align: "left",
    sortable: true,
  },
  {
    name: "sharedBy",
    field: "sharedBy",
    label: "공유자",
    align: "left",
    sortable: false,
  },
  {
    name: "sharedAt",
    field: "sharedAt",
    label: "공유일시",
    align: "left",
    sortable: true,
    type: "datetime"
  },
];
const data = [
  {
    id: "내이미지01",
    instance: "테스트용 이미지 생성 테스트 테스트",
    image: "tensorflow 2.9.0(python3, cuda11.2, ubutun20.04)",
    sharedBy: "김카브(root.choi@kakaobrain.com)",
    sharedAt: "2023.10.11 12:30:31"
  },
  {
    id: "내이미지02",
    instance: "테스트용 이미지 생성 테스트 테스트",
    image: "tensorflow 2.9.0(python3, cuda11.2, ubutun20.04)",
    sharedBy: "ewa(ewa.e@gmail.com)",
    sharedAt: "2023.10.11 12:30:31"
  },
  {
    id: "내이미지03",
    instance: "테스트용 이미지 생성 테스트 테스트",
    image: "tensorflow 2.9.0(python3, cuda11.2, ubutun20.04)",
    sharedBy: "ewa(ewa.e@gmail.com)",
    sharedAt: "2023.10.11 12:30:31"
  },

];

const optNumber = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);

</script>

<style lang="scss" scoped>
@import "src/css/images.scss";
</style>
