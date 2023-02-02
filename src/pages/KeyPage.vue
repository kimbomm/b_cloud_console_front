<template>
  <q-page class="p-content p-my p-index">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Account" to="key" />
        <q-breadcrumbs-el label="SSH Key & API Key" to="key" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body key-body">
      <div class="group-tabs">
        <q-tabs
          v-model="tab"
          align="left"
          class="c_tabs"
        >
          <q-tab name="tabs1" label="내 정보"></q-tab>
          <q-tab name="tabs2" label="내 알림"></q-tab>
          <q-tab name="tabs3" label="SSH key & API key"></q-tab>
        </q-tabs>
      </div>
      <template v-if="visible === 'A'">
        <div class="key-box">
          <p class="key-box_title mt40">SSH Key</p>
          <div class="sign-up">
            <p class="mb30">SSH Key를 등록해주세요.</p>
              <CButton
                :size-types="2"
                :btn-types="1"
                :btn-names="btnSign"
              />
            </div>
          </div>
          <div class="key-box">
            <p class="key-box_title mt60">API Key</p>
            <div class="sign-up">
              <p>API Key를 생성해 주세요.</p>
              <p class="mb30">생성시 Secret key는 팝업에서 1회만 확인 가능합니다.</p>
              <CButton
                :size-types="2"
                :btn-types="1"
                :btn-names="btnCreate"
              />
            </div>
          </div>
      </template>
      <template v-else>
        <div class="flex-top mt40">
          <div class="notice-txt">
            <p class="name">SSH Key</p>
            <!-- 비활성화시 문구 -->
            <!-- <p class="disabled-txt">최대 5개까지 등록 가능합니다</p> -->
          </div>
          <CButton
            :size-types="2"
            :btn-types="4"
            :btn-names="btnSign"
          />
        </div>
        <template v-if="visibleTable">
          <div class="group">
            <CTable
              :title="title"
              :columns="columns"
              :data="data"
              :action-buttons="actionButtons"
              @action="respAction"
            />
          </div>
        </template>
        <div class="flex-top mt60">
          <p class="name">API Key</p>
          <div>
            <CButton
              :size-types="2"
              :btn-types="4"
              :btn-names="btnReCreate"
            />
            &nbsp;
            <CButton
              :size-types="2"
              :btn-types="4"
              :btn-names="btnDelete"
            />
          </div>
        </div>
        <div class="key-create">
          <p>689fd66a-b2c1-44bd-88d8-f0753fcb234b</p>
          <p>
            생성일시
            <span>2023.11.21 04:33pm</span>
          </p>
        </div>
      </template>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CButton from "components/common/CButton.vue";
import CTable from "src/components/common/CTable.vue";

const visible = ref("B");
const visibleTable = ref(true);

const title = ref("Account");
useMeta(() => ({
  title: title.value,
  visible,
}));

const tab = ref("tabs3");
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

/* Btn Group */
const ptitle = ref(title);
const btnSign = ref("등록하기");
const btnCreate = ref("생성하기");
const btnReCreate = ref("재생성");
const btnDelete = ref("삭제");
</script>

<style lang="scss" scoped>
@import 'src/css/key';
</style>
