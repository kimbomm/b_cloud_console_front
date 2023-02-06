<template>
  <q-page class="p-content p-billing p-instance">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Billing" to="/billing/" />
        <q-breadcrumbs-el label="비용상세(관리자 전용)" to="/billing/instance" />
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
      <div class="ins-wrap">
        <div class="group-tabs">
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
        <div class="table_set">
          <CDropdown
            v-model:selected="selectedBasic"
            :label="optLabel"
            :options="optNumber"
            class="auto_size"
          />
        </div>
      </div>
      <template v-if="defaultData == true">
        <div class="group-load">
          <div class="group-table">
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
            <div class="group-table_page">
              <CPagination />
            </div>
          </div>
        </div>
      </template>
      <!-- 서비스 준비중입니다. -->
      <template v-else>
        <div class="group-load">
          <div class="group-table">
            <section class="section">
              <EasyDataTable
                :headers="headers"
                :items="nodata"
                :hide-footer="true"
                :body-row-class-name="bodyRowClassNameFunction"
                empty-message="서비스 준비중입니다."
              >
              </EasyDataTable>
            </section>
          </div>
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
const title = ref("워크스페이스 이용 요금");
const btnName = ref("CSV 다운로드");

useMeta(() => ({
  title: title.value,
}));

const tab = ref("tabs3");
const optLabel = ref("10");
const optNumber = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);
// Table
const nodata = [];
const headers = [
  {
    text: "타입", value: "type", width: "350", sortable: true
  },
  {
    text: "타입상세", value: "typeDetail", sortable: true
  },
  {
    text: "이용시간", value: "useHours", width: "230", sortable: true
  },
  {
    text: "이용금액", value: "useageFee", width: "230", sortable: true
  },
];
const items = [
  {
    type: "테스트용 inst",
    typeDetail: "1GPU, 14CPU, MEM 122GiB, DISK 80GiB",
    useHours: "128.04시간",
    useageFee: "283,292원"
  },
  {
    type: "테스트용 inst",
    typeDetail: "1GPU, 14CPU, MEM 122GiB, DISK 80GiB",
    useHours: "128.04시간",
    useageFee: "283,292원"
  },
  {
    type: "테스트용 inst",
    typeDetail: "1GPU, 14CPU, MEM 122GiB, DISK 80GiB",
    useHours: "128.04시간",
    useageFee: "283,292원"
  },
];
/**
 * 버튼 및 checkbox 에 대한 이벤트 존재할 시 class 삽입
 */
const bodyRowClassNameFunction = (item) => {
  const classList = [];
  if (item.buttons) classList.push("row-button");
  if (item.checkbox) classList.push("row-selected");
  return classList.join(" ");
};

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
