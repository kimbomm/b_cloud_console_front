<template>
  <q-page class="p-content p-billing p-project">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Billing" to="/billing/" />
        <q-breadcrumbs-el label="비용상세(관리자 전용)" to="/billing/project" />
      </q-breadcrumbs>
      <div class="top-btn">
        <h1 class="p-title">{{ ptitle }}</h1>
        <div class="csv_btn">
          <CButton
            :size-types="2"
            :btn-types="5"
            :btn-names="btnName"
          />
        </div>
      </div>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="group-date">
        <div class="c_inpgroup">
          <q-input
            outlined
            v-model="date"
            placeholder="2022.01.01"
            class="inp_calendar"
          >
            <template v-slot:prepend>
              <q-icon class="ico_calendar">
                <q-popup-proxy :offset="[15, 18]" class="c_datepicker">
                  <q-date
                    v-model="date"
                    mask="YYYY.MM.DD"
                    class="datepicker"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
              outlined
              v-model="date"
              :value="dateRange"
              class="inp_calendar"
            >
              <template v-slot:prepend>
                <q-icon class="ico_calendar">
                  <q-popup-proxy :offset="[15, 18]" class="c_datepicker">
                    <q-date
                      v-model="dateRange"
                      mask="YYYY.MM.DD"
                      range
                      multiple
                      class="datepicker"
                    />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
        </div>
      </div>
      <div class="pay-info mb40">
        <p class="pay-amount">워크스페이스 총 비용</p>
        <p class="pay"><span>39,220,000</span>&nbsp;원</p>
      </div>
      <div class="group-tabs mb30">
        <q-tabs
          v-model="tab"
          align="left"
          class="c_tabs"
        >
          <q-tab name="tabs1" label="멤버"></q-tab>
          <q-tab name="tabs2" label="프로젝트"></q-tab>
          <q-tab name="tabs3" label="인스턴스 타입"></q-tab>
          <q-tab name="tabs4" label="스토리지"></q-tab>
        </q-tabs>
      </div>
      <template v-if="defaultData == true">
        <div class="group">
          <div class="table_set">
            <q-select
              outlined
              placeholder="프로젝트 이름 설명 검색"
              use-input
              clearable
              class="c_inpchip default_size"
            >
              <template v-slot:prepend>
                <q-icon name="search" class="ico_search" />
              </template>
            </q-select>
            <CDropdown
              v-model:selected="selectedBasic"
              :label="optLabel"
              :options="optNumber"
              class="auto_size"
            />
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
          </EasyDataTable>
        </section>
        <div class="group-page">
          <CPagination />
        </div>
      </template>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CButton from "components/common/CButton.vue";
import CDropdown from "components/common/CDropdown.vue";
import CPagination from "components/common/CPagination.vue";

const title = ref("워크스페이스 이용 요금");
const btnName = ref("CSV 다운로드");
const defaultData = ref(true);

useMeta(() => ({
  title: title.value,
}));

const tab = ref("tabs2");
const optLabel = ref("10");
const optNumber = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);
// Table
const headers = [
  {
    text: "프로젝트 이름", value: "projectName", width: "260", sortable: true
  },
  {
    text: "프로젝트 설명", value: "proExplain", sortable: false
  },
  {
    text: "이용요금", value: "useageFee", sortable: true
  },
];
const items = [
  {
    projectName: "Tester2",
    proExplain: "프로젝트 설명프로젝트 설명",
    useageFee: "283,292원"
  },
  {
    projectName: "테스터",
    proExplain: "프로젝트 설명프로젝트 설명프로젝트 설명프로젝트 설명",
    useageFee: "283,292원"
  },
  {
    projectName: "테스터",
    proExplain: "프로젝트 설명프로젝트 설명",
    useageFee: "283,292원"
  },
];
// Date Picker
const date = ref(null);
const dateRange = ref(
  { from: "2023.01.09", to: "2023.01.30" }
);

const ptitle = ref(title);
</script>

<style lang="scss" scoped>
@import 'src/css/table';
@import 'src/css/billing';
</style>
