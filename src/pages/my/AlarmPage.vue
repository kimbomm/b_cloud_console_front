<template>
  <q-page class="p-content p-my p-index">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Account" to="/" />
        <q-breadcrumbs-el label="내 알림" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="p-alarm">
        <div class="btn_area">
          <q-tabs v-model="tab" align="left" class="c_tabs">
            <q-tab name="tabs1" label="내 정보"></q-tab>
            <q-tab name="tabs2" label="내 알림">
              <q-badge>19</q-badge>
            </q-tab>
            <q-tab name="tabs3" label="SSH key & API key"></q-tab>
          </q-tabs>
        </div>
        <div class="table_set">
          <div class="l_set_inner">
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="suffix"
                placeholder="카테고리, 제목 검색"
                class="wsize450"
              >
                <template v-slot:prepend>
                  <q-icon name="search" class="ico_search" />
                </template>
              </q-input>
            </div>
          </div>

          <div class="r_set_inner">
            <div class="view_cont_num">
              <CDropdown
                v-model:selected="selectedBasic"
                :label="label"
                :options="options"
              />
            </div>
          </div>
        </div>
        <div class="table_inner">
          <EasyDataTable
            :headers="headers"
            :items="items"
            :hide-footer="true"
            empty-message="정보가 없습니다."
            @click-row="showRow"
          >
            <!-- category -->
            <template #item-category="item">
              <span class="txt">{{ item.category }}</span>
            </template>
            <!-- content -->
            <template #item-content="item">
              <span class="txt">{{ item.content }}</span>
            </template>
            <!-- sendingTime -->
            <template #item-sendingTime="item">
              <span class="txt">{{ item.sendingTime }}</span>
            </template>
            <!-- readStatus -->
            <template #item-readStatus="item">
              <span class="txt">{{ item.readStatus }}</span>
            </template>
          </EasyDataTable>
        </div>
        <div class="table_pagenav disflex_C">
          <CPagination />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CPagination from "components/common/CPagination.vue";
import CDropdown from "components/common/CDropdown.vue";

const title = ref("Account");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const tab = ref("tabs2");
const label = ref("10");

const options = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);

const headers = [
  {
    text: "카테고리",
    value: "category",
    width: 200,
    sortable: true,
  },
  {
    text: "내용",
    value: "content",
    sortable: true,
  },
  {
    text: "발송시간",
    value: "sendingTime",
    width: 250,
    sortable: true,
  },
  {
    text: "읽음여부",
    value: "readStatus",
    width: 150,
    sortable: true,
  },
];
const items = [
  {
    category: "멤버",
    content: "신규 멤버 추가 요청이 있습니다",
    sendingTime: "2023.10.11 12:30:31",
    readStatus: "읽지않음",
  },
  {
    category: "인스턴스",
    content: "72시간 동안 운영 중입니다.",
    sendingTime: "2023.10.11 12:30:31",
    readStatus: "읽음",
  },
  {
    category: "태스크",
    content: "신규 멤버 추가 요청이 있습니다",
    sendingTime: "2023.10.11 12:30:31",
    readStatus: "읽지않음",
  },
  {
    category: "멤버",
    content: "신규 멤버 추가 요청이 있습니다",
    sendingTime: "2023.10.11 12:30:31",
    readStatus: "읽음",
  },
  {
    category: "프로젝트",
    content: "신규 멤버 추가 요청이 있습니다",
    sendingTime: "2023.10.11 12:30:31",
    readStatus: "읽지않음",
  },
];
</script>

<style lang="scss" scoped>
@import "./src/css/my";
@import "./src/css/table";
</style>
