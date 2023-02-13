<template>
  <q-page class="p-content p-images p-index">
    <div class="p-head">
      <q-breadcrumbs
        class="c_breadcrumb"
        gutter="none"
      >
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Projects" to="/" />
        <q-breadcrumbs-el label="images" to="/images/" />
        <q-breadcrumbs-el label="내 이미지" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="container">
        <div class="header">
          <q-tabs v-model="tab" align="left" class="c_tabs">
            <q-tab name="tabs1" label="내이미지"/>
            <q-tab name="tabs2" label="기본 이미지"/>
            <q-tab name="tabs3" label="공유받은 이미지"/>
          </q-tabs>
        </div>
        <div class="table_set">
          <div class="c_inpgroup">
            <q-input
              outlined="outlined"
              v-model="suffix"
              placeholder="이미지 이름 검색"
              clearable="clearable"
              class="wsize_full">
              <template v-slot:prepend>
                  <q-icon name="search" class="ico_search"/>
              </template>
            </q-input>
          </div>
          <div class="select_drop">
            <CDropdown :label="optLabel" :options="optNumber" class="auto_size"/>
          </div>
        </div>
        <section class="section">
          <EasyDataTable
            :headers="headers"
            :items="items"
            :hide-footer="true"
            empty-message="정보가 없습니다."
            @click-row="showRow"
          >
            <!-- id -->
            <template #item-id="item">
              <span class="txt">{{ item.id }}</span>
            </template>
            <!-- title -->
            <template #item-title="item">
              <span class="txt">{{ item.title }}</span>
            </template>
            <template #item-version="item">
              <span class="txt">{{ item.version }}</span>
            </template>
            </EasyDataTable>
        </section>
        <div class="table_pagenav disflex_C">
          <CPagination />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup="setup">
import { ref } from "vue";
import { useMeta } from "quasar";
import CDropdown from "components/common/CDropdown.vue";
import CPagination from "src/components/common/CPagination.vue";

const title = ref("image");
useMeta(() => ({ title: title.value }));

const ptitle = ref(title);
const tab = ref("tabs2");
const optLabel = ref("10");

const headers = [
  {
    text: "이름", value: "id", width: 1160, sortable: true
  },
  {
    text: "NVIDA 드라이버 최소버전", value: "version", width: 332
  }
];
const items = [
  {
    id: "tensorflow 2.9.0  (python3, cuda11.2, ubuntu20.04)",
    version: "450.000.008"

  }, {
    id: "tensorflow 2.9.0  (python3, cuda11.2, ubuntu20.04)",
    version: "450.000.008"

  }, {
    id: "tensorflow 2.9.0  (python3, cuda11.2, ubuntu20.04)",
    version: "450.000.008"

  }
];

const optNumber = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 }
]);
</script>

<style lang="scss" scoped="scoped">
    @import "src/css/images.scss";
    @import "src/css/table.scss";
</style>
