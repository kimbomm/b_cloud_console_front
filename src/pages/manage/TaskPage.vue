<template>
  <q-page class="p-content p-manage p-instance">
    <div class="p-head">
      <q-breadcrumbs
        class="c_breadcrumb"
        gutter="none"
      >
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el
          label="Workspace Manager"
          to="/"
        />
        <q-breadcrumbs-el
          label="Instance & Tasks"
          to="/"
        />
        <q-breadcrumbs-el label="태스크" />
      </q-breadcrumbs>
      <div class="p-detail-head">
        <h1 class="p-title">{{ ptitle }}</h1>
        <div class="resource_employ_btn">
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
      <div class="wrap tab_task">
        <div class="tab_area">
          <q-tabs
            v-model="tab"
            align="left"
            class="c_tabs"
          >
            <q-tab
              name="tabs1"
              label="인스턴스"
            >
              <q-badge>36</q-badge>
            </q-tab>
            <q-tab
              name="tabs2"
              label="태스크"
            >
              <q-badge>19</q-badge>
            </q-tab>
          </q-tabs>
        </div>
        <div class="table_set">
          <div class="l_set_inner">
            <div class="search_input">
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
            <div class="table_view_tab">
              <q-btn-toggle
                v-model="segModel2"
                class="c_tabcontrol medium"
                toggle-color="primary"
                flat
                :options="[
                  {label: '그룹보기', value: 'one'},
                  {label: '태스크보기', value: 'two'}
                ]"
              />
            </div>
            <div class="project_select">
              <CDropdown
                v-model:selected="selectedBasic"
                :label="optLabel2"
                :options="optNumber2"
                :multiple="true"
                class="wsize230"
              />
            </div>
            <div class="state_select">
              <CDropdown
                v-model:selected="selectedBasic"
                :label="optLabel3"
                :options="optNumber3"
                :multiple="true"
                class="wsize230"
              />
            </div>
          </div>
          <div class="r_set_inner">
            <div class="dropdown_area">
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
          <template v-if="segModel2 === 'one'">
            <CTable
              :title="title"
              :columns="columns"
              :data="data"
              :action-buttons="actionButtons"
              @action="respAction"
            />
          </template>
          <template v-else-if="segModel2 === 'two'">
            <CTable
              :title="title"
              :columns="columns2"
              :data="data2"
              :action-buttons="actionButtons"
              @action="respAction"
            />
          </template>
        </div>
        <div class="table_pagenav disflex_C mt32">
          <CPagination />
        </div>
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

const title = ref("Instance & Task");
useMeta(() => ({
  title: title.value,
}));
const optNumber = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "30", value: 2 },
]);
const optNumber2 = ref([
  { label: "프로젝트 전체", value: 0 },
  { label: "프로젝트1", value: 1 },
  { label: "프로젝트2", value: 2 },
  { label: "프로젝트3", value: 3 },
]);
const optNumber3 = ref([
  { label: "상태 전체", value: 0 },
  { label: "시작중", value: 1 },
  { label: "운영중", value: 2 },
  { label: "정지중", value: 3 },
  { label: "정지", value: 4 },
  { label: "삭제중", value: 5 },
  { label: "대기중", value: 6 },
  { label: "오류", value: 7 },
]);

const ptitle = ref(title);
const btnName = ref("리소스 사용이력");
const tab = ref("tabs2");
const optLabel = ref("10");
const optLabel2 = ref("프로젝트 전체");
const optLabel3 = ref("상태 전체");
const segModel2 = ref("one");

// 그룹보기
const columns = [
  {
    name: "pjName",
    field: "pjName",
    label: "프로젝트 이름",
    align: "left",
    sortable: false,
  },
  {
    name: "groupid",
    field: "groupid",
    label: "그룹ID",
    align: "left",
    sortable: false,
  },
  {
    name: "groupName",
    field: "groupName",
    label: "그룹이름",
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
    name: "status",
    field: "status",
    label: "상태",
    align: "left",
    sortable: false,
    type: "tag",
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
    name: "constructor",
    field: "constructor",
    label: "생성자",
    align: "left",
    sortable: true,
  },
];
const data = [
  {
    pjName: "AA프로젝트",
    groupid: "21",
    groupName: "Taskgroup1",
    account: "태스크 그룹 설명태스크 그룹 설명태스크 그룹 설명태스크 그룹 설명",
    status: "running",
    createdAt: "2023.10.22 12:33:40",
    constructor: "root.choi (root.choi@kakaobrain.com)",
  },
  {
    pjName: "AA프로젝트",
    groupid: "21",
    groupName: "Taskgroup1",
    account: "태스크 그룹 설명태스크 그룹 설명태스크 그룹 설명태스크 그룹 설명",
    status: "running",
    createdAt: "2023.10.22 12:33:40",
    constructor: "root.choi (root.choi@kakaobrain.com)",
  },
  {
    pjName: "AA프로젝트",
    groupid: "21",
    groupName: "Taskgroup1",
    account: "태스크 그룹 설명태스크 그룹 설명태스크 그룹 설명태스크 그룹 설명",
    status: "running",
    createdAt: "2023.10.22 12:33:40",
    constructor: "root.choi (root.choi@kakaobrain.com)",
  },
];
// 테스크보기
const columns2 = [
  {
    name: "pjName",
    field: "pjName",
    label: "프로젝트 이름",
    align: "left",
    sortable: false,
  },
  {
    name: "groupName",
    field: "groupName",
    label: "그룹 이름",
    align: "left",
    sortable: true,
  },
  {
    name: "task",
    field: "task",
    label: "태스크 이름",
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
    name: "ssh",
    field: "ssh",
    label: "ssh",
    align: "left",
    sortable: false,
    type: "copy",
  },
  {
    name: "instanceType",
    field: "instanceType",
    label: "인스턴스 타입",
    align: "left",
    sortable: false,
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
    name: "createdBy",
    field: "createdBy",
    label: "생성자",
    align: "left",
    sortable: false,
  },
  {
    name: "startDate",
    field: "startDate",
    label: "시작일시",
    align: "left",
    sortable: true,
    type: "datetime",
  },
  {
    name: "endDate",
    field: "endDate",
    label: "완료일시",
    align: "left",
    sortable: true,
    type: "datetime",
  },
  {
    name: "log",
    field: "log",
    label: "로그확인",
    align: "left",
    sortable: false,
    type: "copy",
  },
];
const data2 = [
  {
    pjName: "aa프로젝트",
    groupName: "그룹12",
    task: "aatask1",
    status: "running",
    ssh: "ssh",
    JupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    startDate: "2023.01.12 10:33:14",
    endDate: "2023.01.12 10:33:14",
    log: "log",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    pjName: "aa프로젝트",
    groupName: "그룹12",
    task: "aatask1",
    status: "running",
    ssh: "ssh",
    JupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    startDate: "2023.01.12 10:33:14",
    endDate: "2023.01.12 10:33:14",
    log: "log",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    pjName: "aa프로젝트",
    groupName: "그룹12",
    task: "aatask1",
    status: "stopped",
    ssh: "ssh",
    JupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    startDate: "2023.01.12 10:33:14",
    endDate: "2023.01.12 10:33:14",
    log: "log",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    pjName: "aa프로젝트",
    groupName: "그룹12",
    task: "aatask1",
    status: "running",
    ssh: "ssh",
    JupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    startDate: "2023.01.12 10:33:14",
    endDate: "2023.01.12 10:33:14",
    log: "log",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    pjName: "aa프로젝트",
    groupName: "그룹12",
    task: "aatask1",
    status: "running",
    ssh: "ssh",
    JupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    startDate: "2023.01.12 10:33:14",
    endDate: "2023.01.12 10:33:14",
    log: "log",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
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
@import "./src/css/manage";
</style>
