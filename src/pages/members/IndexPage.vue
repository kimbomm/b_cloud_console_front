<template>
  <q-page class="p-content p-member p-index">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Member" to="/members/" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <!-- /* 멤버 - 메인(워크스페이스 관리자) */ -->
      <div v-if="visible === 'A'">
        <div class="flex-top table-set">
          <div class="set-l set">
            <div class="set-l_left">
              <q-input
                outlined
                v-model="suffix"
                placeholder="이름 이메일 검색"
              >
                <template v-slot:prepend>
                  <q-icon name="search" class="ico_search" />
                </template>
              </q-input>
            </div>
            <div class="set-l_right">
              <CDropdown
                v-model:selected="selectedCheck"
                :label="label"
                :options="options"
                :multiple="true"
              />
            </div>
          </div>
          <div class="set-r set">
            <div class="set-btn">
              <CButton
                :size-types="2"
                :btn-types="5"
                :btn-names="'멤버추가'"
              />
            </div>
            <div class="set-btn">
              <CButton
                :size-types="2"
                :btn-types="51"
                :btn-names="'멤버삭제'"
              />
            </div>
            <div class="set-btn select-d">
              <CDropdown
                v-model:selected="selectedBasic"
                :label="label3"
                :options="options2"
              />
            </div>
          </div>
        </div>
        <CTable
          :title="title"
          :columns="columns"
          :data="data"
          :action-buttons="actionButtons"
          @action="respAction"
          row-click
          @rowClick="onRowClick"
        />
        <div class="group">
          <CPagination />
        </div>
      </div>
      <!-- /* 멤버 - 메인(워크스페이스 멤버/정산관리자,게스트) */ -->
      <template v-else>
        <div class="flex-top table-set">
          <div class="set-l set">
            <div class="set-l_left">
              <q-input
                outlined
                v-model="suffix"
                placeholder="이름 상태 생성자 검색"
              >
                <template v-slot:prepend>
                  <q-icon name="search" class="ico_search" />
                </template>
              </q-input>
            </div>
            <div class="set-l_right">
              <CDropdown
                v-model:selected="selectedCheck"
                :label="label2"
                :options="options"
                :multiple="true"
              />
            </div>
          </div>
          <div class="set-r set">
            <div class="set-btn">
              <CButton
                :size-types="2"
                :btn-types="5"
                :btn-names="'멤버 초대 요청'"
              />
            </div>
            <div class="set-btn select-d">
              <CDropdown
                v-model:selected="selectedBasic"
                :label="label3"
                :options="options2"
              />
            </div>
          </div>
        </div>
        <CTable
          :title="title"
          :columns="columns"
          :data="data"
          :action-buttons="actionButtons"
          @action="respAction"
          row-click
          @rowClick="onRowClick"
        />
        <div class="group">
          <CPagination />
        </div>
      </template>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CDropdown from "components/common/CDropdown.vue";
import CButton from "components/common/CButton.vue";
import CTable from "src/components/common/CTable.vue";
import CPagination from "components/common/CPagination.vue";

const visible = ref("B");
const title = ref("워크스페이스 1 Member");
const label = ref("전체");
const label2 = ref("역활전체");
const label3 = ref("10");

useMeta(() => ({
  title: title.value,
  visible,
}));

const options = ref([
  { label: "역할전체", value: 0 },
  { label: "워크스페이스 관리자", value: 1 },
  { label: "워크스페이스 멤버", value: 2 },
  { label: "정산 관리자", value: 3 },
]);
const options2 = ref([
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
    align: "left",
  },
  {
    name: "name",
    field: "name",
    label: "이름",
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
    sortable: true,
    type: "copy",
  },
  {
    name: "JupyterLab",
    field: "JupyterLab",
    label: "JupyterLab",
    align: "left",
    sortable: true,
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
    sortable: true,
  },
  {
    name: "cpu",
    field: "cpu",
    label: "CPU",
    align: "left",
    sortable: true,
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
    sortable: true,
  },
];
const data = [
  {
    id: 1,
    name: "인스턴스 이름 인스턴스 이름 인스턴스 이름",
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
    name: "인스턴스 이름 인스턴스 이름 인스턴스 이름",
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

const ptitle = ref(title);
</script>

<style lang="scss" scoped>
</style>
