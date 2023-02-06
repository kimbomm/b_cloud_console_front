<template>
  <q-page class="p-content p-projects p-index">
    <div class="p-head">
      <q-breadcrumbs
        class="c_breadcrumb"
        gutter="none"
      >
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el
          label="Projects"
          to="/"
        />
        <q-breadcrumbs-el
          label="Test Project"
          to="/"
        />
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
      <div class="wrap">
        <ProjectDashboard />

        <div class="com_m_cont">
          <div class="change_tab_btn">
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
              <q-tab
                name="tabs3"
                label="멤버"
              >
                <q-badge>0</q-badge>
              </q-tab>
            </q-tabs>
          </div>
          <template v-if="defaultData == true">
            <div class="table_set">
              <div class="l_set_inner">
                <div class="c_inpgroup">
                  <q-input
                    outlined
                    v-model="suffix"
                    placeholder="이름, 상태, 생성자 검색"
                    class="wsize292"
                  >
                    <template v-slot:prepend>
                      <q-icon
                        name="search"
                        class="ico_search"
                      />
                    </template>
                  </q-input>
                </div>

                <div class="c_selectgroup">
                  <CDropdown
                    v-model:selected="selectedCheck"
                    :label="label"
                    :options="options"
                    :multiple="true"
                  />
                </div>
              </div>

              <div class="r_set_inner">
                <div class="instance_make_btn">
                  <CButton
                    :size-types="2"
                    :btn-types="4"
                    :btn-names="'인스턴스 생성하기'"
                  />
                </div>

                <div class="view_cont_num">
                  <CDropdown
                    v-model:selected="selectedBasic"
                    :label="label2"
                    :options="options2"
                  />
                </div>
              </div>
            </div>
            <div class="change_table_area">
              <EasyDataTable
                :headers="headers"
                :items="items"
                :hide-footer="true"
                empty-message="정보가 없습니다."
                @click-row="showRow"
              >
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
                  1. running, 운영중, 실행중
                  2. stopped, 정지 | 오류 | 취소 | 실패
                  3. 생성중 | 삭제중 | 대기중 | 재시작중
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
                    v-else
                    class="c_badge"
                  >
                    <span class="txt">생성중</span>
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
            <div class="group">
              <CPagination />
            </div>
          </template>
          <template v-else>
            <div class="com_nondata_area">
              <div class="nondata_box">
                <p class="nondata_txt">생성된 인스턴스가 없습니다.</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import ProjectDashboard from "src/components/pages/ProjectDashboard.vue";
// import CTable from "src/components/common/CTable.vue";
import CPagination from "components/common/CPagination.vue";
import CDropdown from "components/common/CDropdown.vue";
import CButton from "components/common/CButton.vue";

const title = ref("Test Projects");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const tab = ref("tabs1");
const label = ref("전체");
const label2 = ref("10");
const selectedCheck = ref(null);
// const viewTab = ref("0");
const defaultData = ref(true);
const headers = [
  {
    text: "ID", value: "id", sortable: false, checkbox: true
  },
  {
    text: "이름", value: "title", sortable: true
  },
  {
    text: "상태", value: "status", sortable: true
  },
  {
    text: "ssh", value: "ssh", sortable: false
  },
  {
    text: "JupyterLab", value: "jupyterLab", sortable: false
  },
  {
    text: "인스턴스 타입", value: "instanceType", width: 140, sortable: true
  },
  {
    text: "GPU", value: "gpu", sortable: false
  },
  {
    text: "CPU", value: "cpu", sortable: false
  },
  {
    text: "생성일시", value: "createdAt", sortable: true
  },
  {
    text: "생성자", value: "createdBy", sortable: true
  },
  { text: "", value: "buttons", width: 80 },
];
const items = [
  {
    id: 132,
    title: "A인스턴스A인스턴스A인스턴스A인스턴스A인스턴스A인 30자",
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
    id: 34,
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
    id: 99999,
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
];
const actionButtons = [
  { name: "이용현황", event: "state" },
  { name: "공유관리", event: "share" },
  { name: "스냅샷 관리", event: "mngSnap" },
  { name: "스냅샷 생성", event: "crtSnap" },
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

const options = ref([
  { label: "전체", value: 0 },
  { label: "운영중", value: 1 },
  { label: "정지중", value: 2 },
  { label: "삭제중", value: 3 },
  { label: "삭제", value: 4 },
]);
const options2 = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
