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
      <div class="wrap tab_instances">
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
          <EasyDataTable
            :headers="headers"
            :items="items"
            :hide-footer="true"
            empty-message="정보가 없습니다."
            @click-row="showRow"
          >
            <!-- phName -->
            <template #item-phName="item">
              <span class="txt clip">{{ item.phName }}</span>
            </template>
            <!-- title -->
            <template #item-title="item">
              <a href="#">
                <span class="txt">{{ item.title }}</span>
                <q-tooltip
                  anchor="bottom middle"
                  class="c_tooltip"
                >
                  <div class="inner">
                    {{ item.title }}
                  </div>
                </q-tooltip>
              </a>
            </template>
            <!--
              상태값(status)
              1. running, 운영중
              2. stopped, 정지
              3. error, 오류
              4. pending, 대기중
              5. stopping, 정지중
              6. deleting, 삭제중
              7. starting, 시작중
              8. unknown
            -->
            <template #item-status="item">
              <q-badge
                v-if="item.status === 'running'"
                class="green"
              >
                <span class="txt">운영중</span>
              </q-badge>
              <q-badge
                v-else-if="item.status === 'stopped'"
                class="orange"
              >
                <span class="txt">정지</span>
              </q-badge>
              <q-badge
                v-else-if="item.status === 'error'"
                class="orange"
              >
                <span class="txt">오류</span>
              </q-badge>
              <q-badge
                v-else-if="item.status === 'pending'"
                class="c_badge"
              >
                <span class="txt">대기중</span>
              </q-badge>
              <q-badge
                v-else-if="item.status === 'stopping'"
                class="c_badge"
              >
                <span class="txt">정지중</span>
              </q-badge>
              <q-badge
                v-else-if="item.status === 'deleting'"
                class="c_badge"
              >
                <span class="txt">삭제중</span>
              </q-badge>
              <q-badge
                v-else-if="item.status === 'starting'"
                class="c_badge"
              >
                <span class="txt">시작중</span>
              </q-badge>
              <q-badge
                v-else
                class="c_badge"
              >
                <span class="txt">Unknown</span>
              </q-badge>
            </template>
            <!-- ssh -->
            <template #item-ssh="item">
              <q-badge
                class="copy square ssh icon"
                @click="onCopy(item)"
              >
                <span class="txt">{{ item.ssh }}</span>
              </q-badge>
            </template>
            <!-- jupyterLab -->
            <template #item-jupyterLab="item">
              <q-badge
                class="copy square lab icon"
                @click="onCopy(item)"
              >
                <span class="txt">{{ item.jupyterLab }}</span>
              </q-badge>
            </template>
            <!-- 인스턴스 타입 -->
            <template #item-instanceType="item">
              <q-badge
                class="text instance icon"
                @click="onCopy(item)"
              >
                <span class="txt">{{ item.instanceType }}</span>

                <q-tooltip
                  anchor="bottom middle"
                  class="c_tooltip"
                >
                  <div class="inner">
                    {{ item.instanceType }}
                  </div>
                </q-tooltip>
              </q-badge>
            </template>
            <!-- cpu -->
            <template #item-cpu="item">
              <span class="txt">{{ item.cpu }}</span>
            </template>
            <!-- gpu -->
            <template #item-gpu="item">
              <span class="txt">{{ item.gpu }}</span>
            </template>
            <!-- createdAt -->
            <template #item-createdAt="item">
              <span class="txt clip">{{ item.createdAt }}</span>
            </template>
            <!-- createdBy -->
            <template #item-createdBy="item">
              <span class="txt clip">{{ item.createdBy }}</span>
            </template>
            <!-- 버튼 그룹 -->
            <template #item-buttons="item">
              <div v-if="actionButtons" class="cell btngroup">
                <q-btn class="c_btn ibtn dot">
                  <i class="ico dots" /><span class="txt">클릭</span>
                  <q-popup-edit
                    v-model="item.id"
                    class="dots_menu"
                    anchor="top right"
                  >
                    <q-list style="min-width: 100px">
                      <q-item
                        v-for="button in actionButtons"
                        :key="button.name"
                      >
                        <q-btn
                          class="item"
                          @click="onActions(button.event, item)"
                        >
                          <span class="txt">{{ button.name }}</span>
                        </q-btn>
                      </q-item>
                    </q-list>
                  </q-popup-edit>
                </q-btn>
              </div>
            </template>
          </EasyDataTable>
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
const tab = ref("tabs1");
const optLabel = ref("10");
const optLabel2 = ref("프로젝트 전체");
const optLabel3 = ref("상태 전체");

const headers = [
  {
    text: "프로젝트 이름", value: "phName", width: 150, sortable: false, checkbox: true
  },
  {
    text: "인스턴스 이름", value: "title", width: 300, sortable: true
  },
  {
    text: "상태", value: "status", width: 160, sortable: true
  },
  {
    text: "ssh", value: "ssh", width: 80, sortable: false
  },
  {
    text: "JupyterLab", value: "jupyterLab", width: 150, sortable: false
  },
  {
    text: "인스턴스 타입", value: "instanceType", width: 140, sortable: true
  },
  {
    text: "GPU", value: "gpu", width: 80, sortable: false
  },
  {
    text: "CPU", value: "cpu", width: 80, sortable: false
  },
  {
    text: "생성일시", value: "createdAt", width: 180, sortable: true
  },
  {
    text: "생성자", value: "createdBy", width: 120, sortable: true
  },
  { text: "", value: "buttons", width: 80 },
];
const items = [
  {
    phName: "aa프로젝트",
    title: "A인스턴스A인스턴스A인스턴스A인스턴스A인스턴스A인A인스턴스A인스턴스A인스턴스A인스턴스A인스턴스A인A인스턴스A인스턴스A인스턴스A인스턴스A인스턴스A인 30자",
    status: "running",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
    buttons: {
      name: "초대요청 확인"
    }
  },
  {
    phName: "aa프로젝트",
    title: "A인스턴스A인스턴스10자",
    status: "stopped",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    }
  },
  {
    phName: "aa프로젝트",
    title: "A인스턴스A인스턴스A인스턴스A인 20자",
    status: "group",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    }
  },
  {
    phName: "aa프로젝트",
    title: "A인스턴스A인스턴스A인스턴스A인스턴스A인스턴스A인A인스턴스A인스턴스A인스턴스A인스턴스A인스턴스A인 30자",
    status: "error",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
    buttons: {
      name: "초대요청 확인"
    }
  },
  {
    phName: "aa프로젝트",
    title: "A인스턴스A인스턴스10자",
    status: "pending",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    }
  },
  {
    phName: "aa프로젝트",
    title: "A인스턴스A인스턴스A인스턴스A인 20자",
    status: "stopping",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    }
  },
  {
    phName: "aa프로젝트",
    title: "A인스턴스A인스턴스A인스턴스A인스턴스A인스턴스A인 30자",
    status: "deleting",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
    buttons: {
      name: "초대요청 확인"
    }
  },
  {
    phName: "aa프로젝트",
    title: "A인스턴스A인스턴스10자",
    status: "starting",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    }
  },
];

const actionButtons = [
  { name: "정지", event: "stop" },
  { name: "시작", event: "start" },
  { name: "이미지 생성", event: "makingImg" },
  { name: "삭제", event: "delete" },
];

/**
 * 설명: 복사하기 버튼 이벤트
 * @param { object } rowData get table row data
 */
const onCopy = (rowData) => {
  console.log(rowData);
};

/**
 * 설명: row Action 버튼 이벤트
 * @param { string } eventName action event name
 * @param { object } rowData get table row data
 */
const onActions = (eventName, rowData) => {
  console.log(eventName, rowData);
};

const showRow = (item) => {
  console.log(item);
};
</script>

<style lang="scss" scoped>
@import "./src/css/manage";
@import "./src/css/table";
</style>
