<template>
  <q-page class="p-content p-billing p-member">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Billing" to="/billing/" />
        <q-breadcrumbs-el label="비용상세(관리자 전용)" to="/billing/member" />
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
        <div class="fakebg">
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
              placeholder="이름, 이메일 검색"
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
            <!-- name -->
            <template #item-name="item">
              <span class="txt">{{ item.name }}</span>
            </template>
            <!-- email -->
            <template #item-email="item">
              <span class="txt">{{ item.email }}</span>
            </template>
            <!-- useageFee -->
            <template #item-useageFee="item">
              <span class="txt">{{ item.useageFee }}</span>
            </template>
          </EasyDataTable>
        </section>
        <div class="group-page">
          <CPagination />
        </div>
      </template>
      <!-- 서비스 준비중입니다. -->
      <template v-else>
        <div class="group">
          <div class="table_set">
            <q-select
              outlined
              placeholder="이름, 이메일 검색"
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
            :items="nodata"
            :hide-footer="true"
            :body-row-class-name="bodyRowClassNameFunction"
            empty-message="서비스 준비중입니다."
          >
          </EasyDataTable>
        </section>
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

const tab = ref("tabs1");
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
    text: "이름", value: "name", width: 244, sortable: true
  },
  {
    text: "이메일", value: "email", sortable: true
  },
  {
    text: "이용요금", value: "useageFee", width: 342, sortable: true
  },
];
const items = [
  {
    name: "Tester2",
    email: "root.choi@kakaobrain.com",
    useageFee: "283,292원"
  },
  {
    name: "테스터",
    email: "root.choi@kakaobrain.com",
    useageFee: "283,292원"
  },
  {
    name: "테스터",
    email: "root.choi@kakaobrain.com",
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

const ptitle = ref(title);
</script>

<style lang="scss" scoped>
@import 'src/css/table';
@import 'src/css/billing';
</style>
