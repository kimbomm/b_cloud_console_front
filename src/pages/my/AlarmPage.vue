<template>
  <q-page class="p-content p-my p-index">
    <div class="p-head">
      <q-breadcrumbs
        class="c_breadcrumb"
        gutter="none"
      >
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el
          label="Account"
          to="/"
        />
        <q-breadcrumbs-el label="내 알림" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="p-alarm">
        <div class="btn_area">
          <q-tabs
            v-model="tab"
            align="left"
            class="c_tabs"
          >
            <q-tab
              name="tabs1"
              label="내 정보"
            ></q-tab>
            <q-tab
              name="tabs2"
              label="내 알림"
            >
              <q-badge>19</q-badge>
            </q-tab>
            <q-tab
              name="tabs3"
              label="SSH key & API key"
            ></q-tab>
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
                  <q-icon
                    name="search"
                    class="ico_search"
                  />
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
          <CTable
            :title="title"
            :columns="columns"
            :data="data"
          />
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
import CTable from "src/components/common/CTable.vue";

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

const columns = [
  {
    name: "category",
    field: "category",
    label: "카테고리",
    align: "left",
    sortable: true,
  },
  {
    name: "content",
    field: "content",
    label: "내용",
    align: "left",
    sortable: true,
  },
  {
    name: "sendingTime",
    field: "sendingTime",
    label: "발송시간",
    align: "left",
    sortable: true,
  },
  {
    name: "readStatus",
    field: "readStatus",
    label: "읽음여부",
    align: "left",
    sortable: true,
  },
];
const data = [
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
@import "./src/css/mypage";
</style>
