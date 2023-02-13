<template>
  <q-page class="p-content p-billing p-index">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Billing" to="/billing/" />
      </q-breadcrumbs>
      <div class="top-btn">
        <h1 class="p-title">{{ ptitle }}</h1>
        <div class="billing_btn">
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
      <div class="pay-info mb30">
        <p class="pay-amount">총 비용</p>
        <p class="pay"><span>39,220,000</span>&nbsp;원</p>
        <p class="pay-notice">*CPU, GPU 자원 이용 금액만 집계된 비용입니다.</p>
      </div>
      <template v-if="defaultData == true">
        <div class="group">
          <div class="table_set">
            <q-select
              outlined
              placeholder="이름 타입 검색"
              use-input
              clearable
              class="c_inpchip wsize450"
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
            <!-- title -->
            <template #item-title="item">
              <a href="#">
                <span class="txt">{{ item.title }}</span>
              </a>
            </template>
            <!-- service -->
            <template #item-service="item">
              <span class="txt">{{ item.service }}</span>
            </template>
            <!-- 인스턴스 타입 -->
            <template #item-instanceType="item">
              <q-badge
                class="text instance icon"
                @click="onCopy(item)"
              >
                <span class="txt">{{ item.instanceType }}</span>

                <q-tooltip
                  anchor="bottom middle"
                  class="c_tooltip"
                >
                  <div class="inner">
                    {{ item.instanceType }}
                  </div>
                </q-tooltip>
              </q-badge>
            </template>
            <!-- startTime -->
            <template #item-startTime="item">
              <span class="txt">{{ item.startTime }}</span>
            </template>
            <!-- endTime -->
            <template #item-endTime="item">
              <span class="txt">{{ item.endTime }}</span>
            </template>
            <!-- usageTime -->
            <template #item-usageTime="item">
              <span class="txt">{{ item.usageTime }}</span>
            </template>
            <!-- pay -->
            <template #item-pay="item">
              <span class="txt">{{ item.pay }}</span>
            </template>
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

const defaultData = ref(true);
const title = ref("개인 이용 요금");
const btnName = ref("워크스페이스 요금조회");

useMeta(() => ({
  title: title.value,
}));

const optLabel = ref("10");
const optNumber = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);

// Table
const headers = [
  {
    text: "인스턴스/태스크 그룹 이름", value: "title", width: "300", sortable: true
  },
  {
    text: "서비스", value: "service", sortable: true
  },
  {
    text: "인스턴스 타입", value: "instanceType", sortable: true
  },
  {
    text: "시작시간", value: "startTime", sortable: true
  },
  {
    text: "종료시간", value: "endTime", sortable: true
  },
  {
    text: "사용시간", value: "usageTime", sortable: true
  },
  {
    text: "금액", value: "pay", sortable: true
  },
];
const items = [
  {
    title: "테스트용 inst",
    service: "인스턴스",
    instanceType: "V1.XLARGE",
    startTime: "2023.01.12 10:33:21",
    endTime: "-",
    usageTime: "183.01시간",
    pay: "283,292원"
  },
  {
    title: "테스트용 inst",
    service: "인스턴스",
    instanceType: "V1.XLARGE",
    startTime: "2023.01.12 10:33:21",
    endTime: "2023.01.12 10:33:21",
    usageTime: "183.01시간",
    pay: "283,292원"
  },
  {
    title: "테스트용 inst",
    service: "인스턴스",
    instanceType: "V1.XLARGE",
    startTime: "2023.01.12 10:33:21",
    endTime: "-",
    usageTime: "183.01시간",
    pay: "283,292원"
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
