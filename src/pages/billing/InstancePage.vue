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
      <template v-if="visibleTable">
        <div class="group-load">
          <div class="group-table">
            <CTable
              :title="title"
              :columns="columns"
              :data="data"
              :action-buttons="actionButtons"
              @action="respAction"
            />
            <div class="group-table_page">
              <CPagination />
            </div>
        </div>
        </div>

        <!-- 오픈시, 서비스 준비중 안내 문구 표기 -->
        <!-- <div class="group-table preparing">
          <p>서비스 준비중입니다.</p>
        </div> -->
      </template>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CButton from "components/common/CButton.vue";
import CDropdown from "components/common/CDropdown.vue";
import CTable from "src/components/common/CTable.vue";
import CPagination from "components/common/CPagination.vue";

const title = ref("워크스페이스 이용 요금");
const btnName = ref("CSV 다운로드");
const visibleTable = ref(true);

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

const columns = [
  {
    name: "id",
    field: "id",
    label: "ID",
    required: true,
    align: "center",
    sortable: true,
  },
  {
    name: "instance",
    field: "instance",
    label: "인스턴스 이름",
    align: "left",
    sortable: true,
    type: "link",
  },
  {
    name: "status",
    field: "status",
    label: "상태",
    align: "left",
    sortable: true,
    type: "tag",
  },
  {
    name: "ssh",
    field: "ssh",
    label: "ssh",
    align: "left",
    sortable: false,
    type: "copy",
  },
  {
    name: "JupyterLab",
    field: "JupyterLab",
    label: "JupyterLab",
    align: "left",
    sortable: false,
    type: "copy",
  },
  {
    name: "instanceType",
    field: "instanceType",
    label: "인스턴스 타입",
    align: "left",
    sortable: true,
    type: "tooltip",
  },
  {
    name: "gpu",
    field: "gpu",
    label: "GPU",
    align: "left",
    sortable: false,
  },
  {
    name: "cpu",
    field: "cpu",
    label: "CPU",
    align: "left",
    sortable: false,
  },
  {
    name: "createdAt",
    field: "createdAt",
    label: "생성일시",
    align: "left",
    sortable: true,
    type: "datetime"
  },
  {
    name: "createdBy",
    field: "createdBy",
    label: "생성자",
    align: "left",
    sortable: false,
  },
];
const data = [
  {
    id: 1,
    instance: "인스턴스 이름 인스턴스 이름 인스턴스 이름",
    status: "running",
    ssh: "ssh",
    JupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "Root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal"
    }
  },
  {
    id: 2,
    instance: "인스턴스 이름 인스턴스 이름 인스턴스 이름",
    status: "stopped",
    ssh: "ssh",
    JupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "Root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal"
    }
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

// Date Picker
const date = ref(null);
const dateRange = ref(
  { from: "2023.01.09", to: "2023.01.30" }
);

const ptitle = ref(title);
</script>

<style lang="scss" scoped>
@import 'src/css/billing';
</style>
