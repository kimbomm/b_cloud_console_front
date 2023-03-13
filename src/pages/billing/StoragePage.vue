<template>
  <q-page class="p-content p-billing p-storage">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Billing" to="/billing/" />
        <q-breadcrumbs-el label="비용상세(관리자 전용)" to="/billing/storage" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
      <c-button
        :outline="true"
        :size="'small'"
        :btn-names="'CSV 다운로드'"
        class="top_btn down"
      >
        <template #prepend>
          <i class="ico plus"></i>
        </template>
      </c-button>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="fakebg w292 mb40">
        <div class="from">
          <q-input
            outlined
            v-model="dateFrom"
            placeholder="2023.01.01"
            class="inp_calendar"
          >
            <template v-slot:prepend>
              <q-icon class="ico_calendar">
                <q-popup-proxy :offset="[0, 0]" class="c_datepicker">
                  <q-date
                    v-model="dateFrom"
                    mask="YYYY.MM.DD"
                    class="datepicker"
                  />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <i class="bar" />
          <div class="to">
            <q-input
              outlined
              v-model="dateTo"
              placeholder="2023.01.01"
              class="inp_calendar"
            >
              <template v-slot:prepend>
                <q-icon class="ico_calendar">
                  <q-popup-proxy
                    :offset="[150, 0]"
                    class="c_datepicker"
                  >
                  <q-date
                    v-model="dateTo"
                    mask="YYYY.MM.DD"
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
      <div class="table_set">
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
        <c-dropdown
          v-model:selected="selectedBasic"
          :label="optLabel"
          :options="optNumber"
          class="auto_size"
        />
      </div>
      <template v-if="defaultData == true">
        <easy-data-table
          :headers="headers"
          :items="items"
          :hide-footer="true"
          empty-message="정보가 없습니다."
          @click-row="showRow"
        >
          <!-- date -->
          <template #item-date="item">
            <span class="txt">{{ item.date }}</span>
          </template>
          <!-- storageAmount -->
          <template #item-storageAmount="item">
            <span class="txt">{{ item.storageAmount }}</span>
          </template>
          <!-- useageFee -->
          <template #item-useageFee="item">
            <span class="txt">{{ item.useageFee }}</span>
          </template>
        </easy-data-table>
        <c-pagination />
      </template>
      <!-- 서비스 준비중입니다. -->
      <template v-else>
        <easy-data-table
          :headers="headers"
          :items="nodata"
          :hide-footer="true"
          :body-row-class-name="bodyRowClassNameFunction"
          empty-message="서비스 준비중입니다."
        />
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

useMeta(() => ({
  title: title.value,
}));

const tab = ref("tabs4");
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
    text: "날짜", value: "date", width: 244, sortable: true
  },
  {
    text: "스토리지 용량", value: "storageAmount", sortable: true
  },
  {
    text: "이용요금", value: "useageFee", width: 315, sortable: true
  },
];
const items = [
  {
    date: "2023.12.31",
    storageAmount: "3.5TiB",
    useageFee: "283,292원"
  },
  {
    date: "2023.12.31",
    storageAmount: "3.5TiB",
    useageFee: "283,292원"
  },
  {
    date: "2023.12.31",
    storageAmount: "3.5TiB",
    useageFee: "283,292원"
  },
];
// Date Form
const dateFrom = ref(null);
const dateTo = ref(null);

const ptitle = ref(title);
</script>

<style lang="scss" scoped>
@import 'src/css/table';
@import 'src/css/billing';
</style>
