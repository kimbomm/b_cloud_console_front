<template>
  <q-page class="p-content p-billing p-instance">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Billing" to="/billing/" />
        <q-breadcrumbs-el
          label="비용상세(관리자 전용)"
          to="/billing/instance"
        />
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
                <q-popup-proxy :offset="[150, 0]" class="c_datepicker">
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
        <q-tabs v-model="tab" align="left" class="c_tabs">
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
        <div class="table_inner">
          <easy-data-table
            :headers="headers"
            :items="items"
            :hide-footer="true"
            empty-message="정보가 없습니다."
            @click-row="showRow"
          >
            <!-- type -->
            <template #item-type="item">
              <span class="txt">{{ item.type }}</span>
            </template>
            <!-- typeDetail -->
            <template #item-typeDetail="item">
              <span class="txt">{{ item.typeDetail }}</span>
            </template>
            <!-- useHours -->
            <template #item-useHours="item">
              <span class="txt">{{ item.useHours }}</span>
            </template>
            <!-- useageFee -->
            <template #item-useageFee="item">
              <span class="txt">{{ item.useageFee }}</span>
            </template>
          </easy-data-table>
          <c-pagination />
        </div>
      </template>
      <!-- 서비스 준비중입니다. -->
      <template v-else>
        <div class="table_inner">
          <easy-data-table
            :headers="headers"
            :items="nodata"
            :hide-footer="true"
            :body-row-class-name="bodyRowClassNameFunction"
            empty-message="서비스 준비중입니다."
          />
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
    text: "타입",
    value: "type",
    width: 345,
    sortable: true,
  },
  {
    text: "타입상세",
    value: "typeDetail",
  },
  {
    text: "이용시간",
    value: "useHours",
    width: 218,
    sortable: true,
  },
  {
    text: "이용금액",
    value: "useageFee",
    width: 185,
    sortable: true,
  },
];
const items = [
  {
    type: "테스트용 inst",
    typeDetail: "1GPU, 14CPU, MEM 122GiB, DISK 80GiB",
    useHours: "128.04시간",
    useageFee: "283,292원",
  },
  {
    type: "테스트용 inst",
    typeDetail: "1GPU, 14CPU, MEM 122GiB, DISK 80GiB",
    useHours: "128.04시간",
    useageFee: "283,292원",
  },
  {
    type: "테스트용 inst",
    typeDetail: "1GPU, 14CPU, MEM 122GiB, DISK 80GiB",
    useHours: "128.04시간",
    useageFee: "283,292원",
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
// Date Form
const dateFrom = ref(null);
const dateTo = ref(null);

const ptitle = ref(title);
</script>

<style lang="scss" scoped>
@import "src/css/billing";
</style>
