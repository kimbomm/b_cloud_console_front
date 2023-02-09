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
                      anchor="bottom middle"
                      self="bottom middle"
                      class="c_popover storage_pop"
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
        <EasyDataTable
          :headers="headers"
          :items="items"
          :hide-footer="true"
          empty-message="정보가 없습니다."
          @click-row="showRow"
        >
          <!--
            상태값(status)
            1. running, 운영중(개인)
            2. running_s, 운영중(공유)
            3. making, 생성중
            4. deleting, 삭제중
            5. restoring, 복원중
          -->
          <template #item-status="item">
            <q-badge
              v-if="item.status === 'running'"
              class="green"
            >
              <span class="txt">운영중(개인)</span>
            </q-badge>
            <q-badge
              v-else-if="item.status === 'running_s'"
              class="green"
            >
              <span class="txt">운영중(공유)</span>
            </q-badge>
            <q-badge
              v-else-if="item.status === 'making'"
              class="c_badge"
            >
              <span class="txt">생성중</span>
            </q-badge>
            <q-badge
              v-else-if="item.status === 'deleting'"
              class="c_badge"
            >
              <span class="txt">삭제중</span>
            </q-badge>
            <q-badge
              v-else-if="item.status === 'restoring'"
              class="c_badge"
            >
              <span class="txt">복원중</span>
            </q-badge>
          </template>
          <!-- 버튼 그룹 -->
          <template #item-buttons="item">
            <div v-if="actionButtons" class="cell btngroup">
              <q-btn class="c_btn ibtn dot">
                <i class="ico dots" /><span class="txt">클릭</span>
                <q-popup-edit
                  v-model="item.id"
                  class="dots_menu"
                  anchor="top right"
                >
                  <q-list style="min-width: 100px">
                    <q-item
                      v-for="button in actionButtons"
                      :key="button.name"
                    >
                      <q-btn
                        class="item"
                        @click="onActions(button.event, item)"
                      >
                        <span class="txt">{{ button.name }}</span>
                      </q-btn>
                    </q-item>
                  </q-list>
                </q-popup-edit>
              </q-btn>
            </div>
          </template>
        </EasyDataTable>
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

const headers = [
  {
    text: "이름", value: "title", width: 240, sortable: true
  },
  {
    text: "설명", value: "description", width: 240, sortable: false
  },
  {
    text: "소유자", value: "user", width: 190, sortable: true
  },
  {
    text: "상태", value: "status", width: 150, sortable: false
  },
  {
    text: "사용량", value: "usingData", width: 180, sortable: true
  },
  {
    text: "생성일시", value: "createdAt", width: 180, sortable: false
  },
  {
    text: "접근권한", value: "authority", width: 180, sortable: false
  },
  { text: "", value: "buttons", width: 80 },
];
const items = [
  {
    title: "개인작업용",
    description: "개인이용",
    user: "root.choi",
    status: "running_s",
    usingData: "45 / 100 GiB",
    createdAt: "2023.10.22 12:33:40",
    authority: "읽기전용",
  },
  {
    title: "개인작업용",
    description: "개인이용",
    user: "root.choi",
    status: "running",
    usingData: "45 / 100 GiB",
    createdAt: "2023.10.22 12:33:40",
    authority: "읽기전용",
  },
  {
    title: "개인작업용",
    description: "개인이용",
    user: "root.choi",
    status: "making",
    usingData: "45 / 100 GiB",
    createdAt: "2023.10.22 12:33:40",
    authority: "읽기전용",
  },
  {
    title: "개인작업용",
    description: "개인이용",
    user: "root.choi",
    status: "deleting",
    usingData: "45 / 100 GiB",
    createdAt: "2023.10.22 12:33:40",
    authority: "읽기전용",
  },
  {
    title: "개인작업용",
    description: "개인이용",
    user: "root.choi",
    status: "restoring",
    usingData: "45 / 100 GiB",
    createdAt: "2023.10.22 12:33:40",
    authority: "읽기전용",
  },
];

const actionButtons = [
  { name: "이용현황", event: "state" },
  { name: "공유관리", event: "share" },
  { name: "용량 변경", event: "doseModifying" },
  { name: "삭제", event: "delete" },
];

/**
 * 설명: row Action 버튼 이벤트
 * @param { string } eventName action event name
 * @param { object } rowData get table row data
 */
const onActions = (eventName, rowData) => {
  console.log(eventName, rowData);
};

const showRow = (item) => {
  console.log(item);
};
</script>

<style lang="scss" scoped>
@import "./src/css/storage";
@import "./src/css/table";
</style>
