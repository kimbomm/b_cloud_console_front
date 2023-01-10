<template>
  <div>
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
      />
    </div>
  </div>
</template>
<script setup>
import CTable from "src/components/common/CTable.vue";

const title = "테이블 타이틀";
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
// const realData = [
//   {
//     base_image_name: "pytorch-ngc-22.08-py3",
//     container_name: "mesos-63b2c8e9-3754-4d35-827d-07d3f47a0e67",
//     cpu_utilization: 0,
//     created_at: "2023-01-09T23:25:30.810+09:00",
//     extra_ports: [
//       {
//         container_port: 31219,
//         host_port: 31219
//       }
//     ],
//     flavor: "cg.small",
//     gpu_utilization: 0,
//     host: "csi-cloud-cpu18.cloud.kakaobrain.com",
//     id: "31a4a71b-4f8d-4dc3-9cdb-8c1c6716cb36",
//     image_name: "pytorch ngc 22.08 (python3, cuda 11.7, ubuntu 20.04)",
//     image_tag: "pytorch-ngc-22.08-py3",
//     min_nvidia_driver_version: 450.0008,
//     nickname: "instance test1",
//     owner: {
//       email: "qhals0710@gmail.com",
//       id: 2168,
//       role: "user",
//       zones: [
//         "public:normal",
//         "public:a2xlarge"
//       ]
//     },
//     project: {
//       description: "test for freeive",
//       id: 1186,
//       name: "Freeive-test",
//       workspace: {
//         id: 231,
//         name: "BCLOUD"
//       }
//     },
//     resource: {
//       cpus: 14,
//       gpu_device_model: "NONE",
//       gpus: 0,
//       mem: 124928,
//       zone: "public:normal"
//     },
//     ssh_endpoint: {
//       host: "ex-instance.cloud.kakaobrain.com",
//       port: 12731
//     },
//     ssh_port: 31218,
//     started_at: "2023-01-09T23:32:08.245+09:00",
//     status: "running",
//     type: "ssh"
//   },
// ];

const actionButtons = [
  { name: "이용현황", event: "state" },
  { name: "공유관리", event: "share" },
  { name: "스냅샷 관리", event: "mngSnap" },
  { name: "스냅샷 생성", event: "crtSnap" },
  { name: "삭제", event: "delete" },
];
const respAction = (eventObj) => {
  const eventName = eventObj.event;
  const rowData = eventObj.data;
  console.log(rowData);
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
