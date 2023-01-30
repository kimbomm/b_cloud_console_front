<template>
  <q-page class="p-content p-storage p-index">
    <div class="p-head">
      <q-breadcrumbs
        class="c_breadcrumb"
        gutter="none"
      >
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el
          label="Projects"
          to="/"
        />
        <q-breadcrumbs-el label="Storage" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="table_set">
        <div class="l_set_inner">
          <div class="search_area">
            <q-select
              outlined
              placeholder="이름 상태 생성자 검색"
              use-input
              clearable
              class="c_inpchip default_size"
            >
              <template v-slot:prepend>
                <q-icon
                  name="search"
                  class="ico_search"
                />
              </template>
            </q-select>
          </div>
          <div class="now_storage_view">
            <div class="storage_view_box">
              <div class="generate_num">
                <p class="gn_title">생성 가능 개수
                  <q-btn class="ibtn help">
                    <i class="ico help" /><span class="hidden">도움말</span>
                    <q-popup-edit
                      v-model="helpShow"
                      anchor="top middle"
                      self="top middle"
                      class="c_popover"
                    >
                      <div class="inner">
                        <p>스토리지는 개인당 최대 5개 생성할 수 있습니다.</p>
                      </div>
                    </q-popup-edit>
                  </q-btn>
                </p>
                <p class="gn_data"><span class="now_num">2</span> / 5</p>
              </div>
              <div class="individual_dose">
                <p class="id_title">개인 용량</p>
                <p class="id_data"><span class="now_gib">350</span> / 500</p>
                <p class="id_txt">GiB</p>
              </div>
            </div>
          </div>
        </div>
        <div class="r_set_inner">
          <div class="dose_modifying_btn">
            <CButton
              :size-types="2"
              :btn-types="4"
              :btn-names="btnName"
            />
          </div>
          <div class="storage_add_btn">
            <CButton
              :size-types="2"
              :btn-types="4"
              :btn-names="btnName2"
            />
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
      </div>
      <div class="table_main">
        <CTable
          :title="title"
          :columns="columns"
          :data="data"
          :action-buttons="actionButtons"
          @action="respAction"
        />
      </div>
      <div class="table_pagenav disflex_C mt32">
        <CPagination />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CButton from "components/common/CButton.vue";
import CDropdown from "components/common/CDropdown.vue";
import CPagination from "components/common/CPagination.vue";
import CTable from "src/components/common/CTable.vue";

const title = ref("Storage");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const btnName = ref("개인 용량 변경 요청");
const btnName2 = ref("스토리지 추가");
const optLabel = ref("10");
const helpShow = ref(false);

const optNumber = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);

const columns = [
  {
    name: "name",
    field: "name",
    label: "이름",
    align: "left",
    sortable: true,
  },
  {
    name: "account",
    field: "account",
    label: "설명",
    align: "left",
    sortable: false,
  },
  {
    name: "user",
    field: "user",
    label: "소유자",
    align: "left",
    sortable: true,
  },
  {
    name: "status",
    field: "status",
    label: "상태",
    align: "left",
    sortable: false,
    type: "tag",
  },
  {
    name: "usingData",
    field: "usingData",
    label: "사용량",
    align: "left",
    sortable: true,
  },
  {
    name: "createdAt",
    field: "createdAt",
    label: "생성일시",
    align: "left",
    sortable: true,
    type: "datetime",
  },
  {
    name: "authority",
    field: "authority",
    label: "접근권한",
    align: "left",
    sortable: false,
  },
];
const data = [
  {
    name: "개인작업용",
    account: "개인이용",
    user: "root.choi",
    status: "running",
    usingData: "45 / 100 GiB",
    createdAt: "2023.10.22 12:33:40",
    authority: "읽기전용",
  },
  {
    name: "개인작업용",
    account: "개인이용",
    user: "root.choi",
    status: "running",
    usingData: "45 / 100 GiB",
    createdAt: "2023.10.22 12:33:40",
    authority: "읽기전용",
  },
];

const actionButtons = [
  { name: "이용현황", event: "state" },
  { name: "공유관리", event: "share" },
  { name: "스냅샷 관리", event: "mngSnap" },
  { name: "스냅샷 생성", event: "crtSnap" },
  { name: "삭제", event: "delete" },
];
const respAction = (eventObj) => {
  const eventName = eventObj.event;
  // const rowData = eventObj.data;
  // console.log(rowData);
  switch (eventName) {
    case "state":
      break;
    case "share":
      break;
    case "mngSnap":
      break;
    case "crtSnap":
      break;
    case "delete":
      break;
    default:
      break;
  }
};
</script>

<style lang="scss" scoped>
</style>
