<template>
  <q-page class="p-content p-projects p-index">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Projects" to="/" />
        <q-breadcrumbs-el label="Test Project" to="/" />
        <q-breadcrumbs-el label="인스턴스" />
      </q-breadcrumbs>
      <h1 class="p-title">
        {{ ptitle }}
      </h1>
      <q-btn class="ibtn setmenu">
        <i class="ico set" /><span class="hidden">설정</span>
        <q-menu class="set_menu">
          <q-list style="min-width: 100px">
            <q-item>
              <q-btn class="item">
                <span class="txt">이름/설명 편집</span>
              </q-btn>
            </q-item>
            <q-item>
              <q-btn class="item">
                <span class="txt">할당량 변경 요청</span>
              </q-btn>
            </q-item>
            <q-item>
              <q-btn class="item">
                <span class="txt">프로젝트 삭제</span>
              </q-btn>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <p class="desc">
        <span class="txt">Your Summary Information Of The Workspace</span>
      </p>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <p class="sub_title">Type01</p>
        <CTable
          :title="title"
          :columns="columns"
          :data="data"
          :action-buttons="actionButtons"
          @action="respAction"
        />
      </section>
      <section class="section">
        <p class="sub_title">Type02</p>
        <CTable
          :title="title"
          :columns="columns"
          :data="data"
          :selection="'multiple'"
        />
      </section>
      <section class="section">
        <p class="sub_title">Type03</p>
        <CTable
          :title="title"
          :columns="columns"
          :data="data"
          row-click
          @rowClick="onRowClick"
        />
      </section>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CTable from "src/components/common/CTable.vue";

const title = ref("Projects");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);

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
    align: "center",
    sortable: true,
    type: "link",
  },
  {
    name: "status",
    field: "status",
    label: "상태",
    align: "center",
    sortable: true,
    type: "tag",
  },
  {
    name: "ssh",
    field: "ssh",
    label: "ssh",
    align: "center",
    sortable: true,
    type: "copy",
  },
  {
    name: "JupyterLab",
    field: "JupyterLab",
    label: "JupyterLab",
    align: "center",
    sortable: true,
    type: "copy",
  },
  {
    name: "instanceType",
    field: "instanceType",
    label: "인스턴스 타입",
    align: "center",
    sortable: true,
    type: "tooltip",
  },
  {
    name: "gpu",
    field: "gpu",
    label: "GPU",
    align: "center",
    sortable: true,
  },
  {
    name: "cpu",
    field: "cpu",
    label: "CPU",
    align: "center",
    sortable: true,
  },
  {
    name: "createdAt",
    field: "createdAt",
    label: "생성일시",
    align: "center",
    sortable: true,
    type: "datetime"
  },
  {
    name: "createdBy",
    field: "createdBy",
    label: "생성자",
    align: "center",
    sortable: true,
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
// const onRowClick = (rowData) => {
//   console.log("row click Data::", rowData);
// };
</script>
<style lang="scss" scoped>
.sub_title{
  margin-bottom:10px;
}
.section:not(:first-child){
  margin-top:40px;
}
</style>
