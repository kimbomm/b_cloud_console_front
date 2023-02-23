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
                  <q-btn
                    btnTypes=4
                    type="button"
                    class="c_btn line medium"
                    to="/projects/taskdetail"
                  >
                    <span class="txt">태스크 생성하기</span>
                  </q-btn>
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
                <EasyDataTable
                  :headers="headers"
                  :items="items"
                  :hide-footer="true"
                  empty-message="정보가 없습니다."
                  @click-row="showRow"
                >
                  <!-- id -->
                  <template #item-id="item">
                    <span class="txt clip">{{ item.id }}</span>
                  </template>
                  <!-- groupTitle -->
                  <template #item-groupTitle="item">
                    <a href="#">
                      <span class="txt">{{ item.groupTitle }}</span>
                      <q-tooltip
                        anchor="bottom middle"
                        class="c_tooltip"
                      >
                        <div class="inner">
                          {{ item.groupTitle }}
                        </div>
                      </q-tooltip>
                    </a>
                  </template>
                  <!-- description -->
                  <template #item-description="item">
                    <a href="#">
                      <span class="txt clip">{{ item.description }}</span>
                      <q-tooltip
                        anchor="bottom middle"
                        class="c_tooltip"
                      >
                        <div class="inner">
                          {{ item.description }}
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
                    <q-badge v-if="item.status === 'running'" class="green">
                      <span class="txt">운영중</span>
                    </q-badge>
                    <q-badge v-else-if="item.status === 'stopped'" class="orange">
                      <span class="txt">정지</span>
                    </q-badge>
                    <q-item v-else-if="item.status === 'group'" class="badge_group">
                      <div class="badge">
                        <q-badge class="green">
                          <span class="txt">7</span>
                        </q-badge>
                        <q-badge class="orange">
                          <span class="txt">20</span>
                        </q-badge>
                        <q-badge class="c_badge">
                          <span class="txt">27</span>
                        </q-badge>
                      </div>

                      <q-popup-edit v-model="badgeGroup" self="bottom middle" class="badge_menu">
                        <div class="inner">
                          <q-list>
                            <q-item>
                              <q-item-section>
                                <div class="badge_item">
                                  <q-badge class="green">
                                    <span class="txt">실행중</span>
                                  </q-badge>
                                  <span class="count">2</span>
                                </div>
                              </q-item-section>
                              <q-item-section>
                                <div class="badge_item">
                                  <q-badge>
                                    <span class="txt">생성중</span>
                                  </q-badge>
                                  <span class="count">2</span>
                                </div>
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                <div class="badge_item">
                                  <q-badge class="green">
                                    <span class="txt">완료</span>
                                  </q-badge>
                                  <span class="count">5</span>
                                </div>
                              </q-item-section>
                              <q-item-section>
                                <div class="badge_item">
                                  <q-badge>
                                    <span class="txt">재시작중</span>
                                  </q-badge>
                                  <span class="count">5</span>
                                </div>
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                <div class="badge_item">
                                  <q-badge class="orange">
                                    <span class="txt">취소</span>
                                  </q-badge>
                                  <span class="count">10</span>
                                </div>
                              </q-item-section>
                              <q-item-section>
                                <div class="badge_item">
                                  <q-badge>
                                    <span class="txt">취소중</span>
                                  </q-badge>
                                  <span class="count">10</span>
                                </div>
                              </q-item-section>
                            </q-item>
                            <q-item>
                              <q-item-section>
                                <div class="badge_item">
                                  <q-badge class="orange">
                                    <span class="txt">실패</span>
                                  </q-badge>
                                  <span class="count">10</span>
                                </div>
                              </q-item-section>
                              <q-item-section>
                                <div class="badge_item">
                                  <q-badge>
                                    <span class="txt">삭제중</span>
                                  </q-badge>
                                  <span class="count">10</span>
                                </div>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </div>
                      </q-popup-edit>
                    </q-item>
                    <q-badge v-else class="c_badge">
                      <span class="txt">생성중</span>
                    </q-badge>
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
              </template>
              <template v-else-if="segModel2 === 'two'">
                <EasyDataTable
                  :headers="headers2"
                  :items="items2"
                  :hide-footer="true"
                  empty-message="정보가 없습니다."
                  @click-row="showRow"
                >
                  <!-- groupTitle -->
                  <template #item-groupTitle="item">
                    <span class="txt clip">{{ item.groupTitle }}</span>
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
                    1. finished, 완료
                    2. stopped, 실패
                    3. pending, 대기중
                    4. making, 생성중
                    5. starting, 실행중
                    6. canceling, 취소중
                    7. cancel, 취소
                    8. deleting, 삭제중
                    9. unknown
                  -->
                  <template #item-status="item">
                    <q-badge
                      v-if="item.status === 'finished'"
                      class="green"
                    >
                      <span class="txt">완료</span>
                    </q-badge>
                    <q-badge
                      v-else-if="item.status === 'stopped'"
                      class="orange"
                    >
                      <span class="txt">실패</span>
                    </q-badge>
                    <q-badge
                      v-else-if="item.status === 'pending'"
                      class="c_badge"
                    >
                      <span class="txt">대기중</span>
                    </q-badge>
                    <q-badge
                      v-else-if="item.status === 'making'"
                      class="c_badge"
                    >
                      <span class="txt">생성중</span>
                    </q-badge>
                    <q-badge
                      v-else-if="item.status === 'starting'"
                      class="c_badge"
                    >
                      <span class="txt">실행중</span>
                    </q-badge>
                    <q-badge
                      v-else-if="item.status === 'canceling'"
                      class="c_badge"
                    >
                      <span class="txt">취소중</span>
                    </q-badge>
                    <q-badge
                      v-else-if="item.status === 'deleting'"
                      class="c_badge"
                    >
                      <span class="txt">삭제중</span>
                    </q-badge>
                    <q-badge
                      v-else-if="item.status === 'cancel'"
                      class="c_badge"
                    >
                      <span class="txt">취소</span>
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
                    class="text instance"
                    @click="onCopy(item)"
                  >
                    <span class="txt">{{ item.instanceType }}<i class="ico details">
                      <q-tooltip
                        anchor="bottom middle"
                        class="c_tooltip insTypeTool"
                      >
                        <div class="inner">
                          {{ item.instanceType }}
                        </div>
                      </q-tooltip></i>
                    </span>
                  </q-badge>
                  </template>
                  <!-- gpu -->
                  <template #item-gpu="item">
                    <span class="txt">{{ item.gpu }}</span>
                  </template>
                  <!-- cpu -->
                  <template #item-cpu="item">
                    <span class="txt">{{ item.cpu }}</span>
                  </template>
                  <!-- createdBy -->
                  <template #item-createdBy="item">
                    <span class="txt">{{ item.createdBy }}</span>
                  </template>
                  <!-- startDate -->
                  <template #item-startDate="item">
                    <span class="txt">{{ item.startDate }}</span>
                  </template>
                  <!-- endDate -->
                  <template #item-endDate="item">
                    <span class="txt">{{ item.endDate }}</span>
                  </template>
                  <!-- logCheck -->
                  <template #item-logCheck="item">
                    <a href="#">
                      <span class="txt logbadge">{{ item.logCheck }}</span>
                    </a>
                  </template>
                  <!-- 버튼 그룹 -->
                  <template #item-buttons="item">
                    <div v-if="actionButtons2" class="cell btngroup">
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
// import CTable from "src/components/common/CTable.vue";
import CPagination from "components/common/CPagination.vue";
import CDropdown from "components/common/CDropdown.vue";

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
const headers = [
  {
    text: "그룹 ID", value: "id", width: 100, sortable: false, checkbox: true
  },
  {
    text: "그룹 이름", value: "groupTitle", width: "30%", sortable: true
  },
  {
    text: "설명", value: "description", width: "30%", sortable: false
  },
  {
    text: "상태", value: "status", width: 170, sortable: false
  },
  {
    text: "생성일시", value: "createdAt", width: 210, sortable: true
  },
  {
    text: "생성자", value: "createdBy", width: 350, sortable: true
  },
  { text: "", value: "buttons", width: 80 },
];
const items = [
  {
    id: 21,
    groupTitle: "Taskgroup1Taskgroup1Taskgroup1",
    status: "group",
    description: "태스크 그룹 설명",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi (root.choi@kakaobrain.com)",
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
    id: 21,
    groupTitle: "Taskgroup1Taskgroup1Taskgroup1Taskgroup1Taskgroup1Taskgroup1Taskgroup1Taskgroup1Taskgroup1",
    status: "group",
    description: "태스크 그룹 설명",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi (root.choi@kakaobrain.com)",
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
    id: 21,
    groupTitle: "Taskgroup1",
    status: "group",
    description: "태스크 그룹 설명",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi (root.choi@kakaobrain.com)",
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
];
// 테스크보기
const headers2 = [
  {
    text: "그룹 이름", value: "groupTitle", width: 130, sortable: true
  },
  {
    text: "태스크 이름", value: "title", width: 133, sortable: true
  },
  {
    text: "상태", value: "status", width: 105, sortable: true
  },
  {
    text: "ssh", value: "ssh", width: 80, sortable: false
  },
  {
    text: "인스턴스 타입", value: "instanceType", width: 140, sortable: true
  },
  {
    text: "GPU", value: "gpu", width: 65, sortable: false
  },
  {
    text: "CPU", value: "cpu", width: 65, sortable: false
  },
  {
    text: "생성자", value: "createdBy", width: 80, sortable: true
  },
  {
    text: "시작일시", value: "startDate", width: 155, sortable: true
  },
  {
    text: "완료일시", value: "endDate", width: 155, sortable: true
  },
  {
    text: "로그확인", value: "logCheck", width: 70, sortable: false,
  },
  { text: "", value: "buttons", width: 80 },
];
const items2 = [
  {
    groupTitle: "그룹12",
    title: "asdasdasdsaasdasdasdsa 30자",
    status: "finished",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    startDate: "2023.01.12 10:33:21",
    endDate: "2023.01.12 10:33:21",
    logCheck: "log",
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
    groupTitle: "그룹12",
    title: "asdasdasdsa 30자",
    status: "stopping",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    startDate: "2023.01.12 10:33:21",
    endDate: "2023.01.12 10:33:21",
    logCheck: "log",
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
    groupTitle: "그룹12",
    title: "asdasdasdsaasdasdasdsaasdasdasdsaasdasdasdsaasdasdasdsaasdasdasdsaasdasdasdsaasdasdasdsaasdasdasdsaasdasdasdsaasdasdasdsaasdasdasdsaasdasdasdsaasdasdasdsaasdasdasdsaasdasdasdsa",
    status: "stopped",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    startDate: "2023.01.12 10:33:21",
    endDate: "2023.01.12 10:33:21",
    logCheck: "log",
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
    groupTitle: "그룹12",
    title: "asdasdasdsaasdasdasdsa 30자",
    status: "pending",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    startDate: "2023.01.12 10:33:21",
    endDate: "2023.01.12 10:33:21",
    logCheck: "log",
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
    groupTitle: "그룹12",
    title: "asdasdasdsa 30자",
    status: "starting",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    startDate: "2023.01.12 10:33:21",
    endDate: "2023.01.12 10:33:21",
    logCheck: "log",
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
    groupTitle: "그룹12",
    title: "asdasdasdsaasdasdasdsaasdasdasdsaasdasdasdsa",
    status: "making",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    startDate: "2023.01.12 10:33:21",
    endDate: "2023.01.12 10:33:21",
    logCheck: "log",
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
    groupTitle: "그룹12",
    title: "asdasdasdsaasdasdasdsa 30자",
    status: "canceling",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    startDate: "2023.01.12 10:33:21",
    endDate: "2023.01.12 10:33:21",
    logCheck: "log",
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
    groupTitle: "그룹12",
    title: "asdasdasdsa 30자",
    status: "cancel",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    startDate: "2023.01.12 10:33:21",
    endDate: "2023.01.12 10:33:21",
    logCheck: "log",
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
    groupTitle: "그룹12",
    title: "asdasdasdsaasdasdasdsaasdasdasdsaasdasdasdsa",
    status: "deleting",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    startDate: "2023.01.12 10:33:21",
    endDate: "2023.01.12 10:33:21",
    logCheck: "log",
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
const actionButtons = [
  { name: "재생성", event: "regeneratory" },
  { name: "취소", event: "cancel" },
  { name: "삭제", event: "delete" },
];
const actionButtons2 = [
  { name: "재생성", event: "regeneratory" },
  { name: "취소", event: "cancel" },
  { name: "삭제", event: "delete" },
];
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
