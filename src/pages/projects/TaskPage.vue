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
        <q-breadcrumbs-el label="태스크" />
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

                <div class="c_segmentedTab">
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
                    :btn-names="'태스크 생성하기'"
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
            <div class="group">
              <CPagination />
            </div>
          </template>
          <template v-else>
            <div class="com_nondata_area">
              <div class="nondata_box">
                <p class="nondata_txt">생성된 태스크가 없습니다.</p>
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
import CTable from "src/components/common/CTable.vue";
import CPagination from "components/common/CPagination.vue";
import CDropdown from "components/common/CDropdown.vue";
import CButton from "components/common/CButton.vue";

const title = ref("Test Projects");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);

const tab = ref("tabs2");
const label = ref("전체");
const label2 = ref("10");
const selectedCheck = ref(null);
const segModel2 = ref("one");
const defaultData = ref(true);

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

// 그룹보기
const columns = [
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
    groupid: "21",
    groupName: "Taskgroup1",
    account: "태스크 그룹 설명태스크 그룹 설명태스크 그룹 설명태스크 그룹 설명",
    status: "running",
    createdAt: "2023.10.22 12:33:40",
    constructor: "root.choi (root.choi@kakaobrain.com)",
  },
  {
    groupid: "21",
    groupName: "Taskgroup1",
    account: "태스크 그룹 설명태스크 그룹 설명태스크 그룹 설명태스크 그룹 설명",
    status: "running",
    createdAt: "2023.10.22 12:33:40",
    constructor: "root.choi (root.choi@kakaobrain.com)",
  },
  {
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
    name: "id",
    field: "id",
    label: "태스크 ID",
    required: true,
    align: "center",
    sortable: true,
  },
  {
    name: "instance",
    field: "instance",
    label: "태스크 이름",
    align: "left",
    sortable: true,
    type: "link",
  },
  {
    name: "status",
    field: "status",
    label: "상태",
    align: "left",
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
    name: "instanceType",
    field: "instanceType",
    label: "인스턴스 타입",
    align: "left",
    type: "tooltip",
  },
  {
    name: "createdAt",
    field: "createdAt",
    label: "시작일시",
    align: "left",
    sortable: true,
    type: "datetime",
  },
  {
    name: "scheduledAt",
    field: "scheduledAt",
    label: "완료일시",
    align: "left",
    sortable: true,
    type: "datetime",
  },
  {
    name: "logCheck",
    field: "logCheck",
    label: "로그확인",
    align: "cneter",
    sortable: false,
  },
];
const data2 = [
  {
    id: 342,
    instance: "인스턴스 이름 인스턴스 이름 인스턴스 이름",
    status: "running",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    scheduledAt: "2023.01.12 10:33:21",
    createdBy: "Root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    id: 342,
    instance: "인스턴스 이름 인스턴스 이름 인스턴스 이름",
    status: "stopped",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    scheduledAt: "2023.01.12 10:33:21",
    createdBy: "Root.choi",
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
@import "./src/css/projects";
</style>
