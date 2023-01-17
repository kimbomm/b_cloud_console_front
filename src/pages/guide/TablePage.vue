<template>
  <div class="p-content p-guide p-table">
    <div class="p-head">
      <h1 class="p-title">{{ title }}</h1>
    </div>
    <div class="p-body">
      <section class="section">
        <h2 class="h6">class="c_table"</h2>
        <div class="group">
          <div>
            <h5>Type 1</h5>
            <CTable
              :title="title"
              :columns="columns"
              :data="data"
              :action-buttons="actionButtons"
              @action="respAction"
            />
          </div>
          <div>
            <h5>Type 2</h5>
            <CTable
              :title="title"
              :columns="columns"
              :data="data"
              :selection="'multiple'"
            />
          </div>
          <div>
            <h5>Type 3</h5>
            <CTable
              :title="title"
              :columns="columns"
              :data="data"
              row-click
              @rowClick="onRowClick"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: "TablePage",
};
</script>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CTable from "src/components/common/CTable.vue";

const title = ref("Table");
useMeta(() => ({
  title: title.value,
}));

const columns = [
  {
    name: "id",
    field: "id",
    label: "ID",
    required: true,
    align: "left",
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
.section{
  h2{
    margin-bottom:10px;
  }
  ~ .section{
    margin-top:50px;
  }
}
.group{
  margin-top:20px;
}
</style>
