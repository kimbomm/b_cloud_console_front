<template>
  <q-page class="p-content p-manage p-instance">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Workspace Manager" to="/" />
        <q-breadcrumbs-el label="Instance & Tasks" to="/" />
        <q-breadcrumbs-el label="태스크" />
      </q-breadcrumbs>
      <div class="p-detail-head">
        <h1 class="p-title">{{ ptitle }}</h1>
        <div class="resource_employ_btn">
          <!-- <q-btn btnTypes="4" type="button" class="c_btn line medium">
            <i class="ico plus" /><span class="txt">리소스 사용이력</span>
          </q-btn> -->
          <c-button
            :size="'medium'"
            :outline="true"
            :btn-names="'리소스 사용이력'"
          >
            <template #prepend>
              <i class="ico plus" />
            </template>
          </c-button>
        </div>
      </div>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <di class="wrap tab_task">
        <div class="tab_area">
          <q-tabs v-model="tab" align="left" class="c_tabs">
            <q-tab name="tabs1" label="인스턴스">
              <q-badge>36</q-badge>
            </q-tab>
            <q-tab name="tabs2" label="태스크">
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
                  <q-icon name="search" class="ico_search" />
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
                  { label: '그룹보기', value: 'one' },
                  { label: '태스크보기', value: 'two' },
                ]"
              />
            </div>
            <div class="project_select">
              <c-dropdown
                v-model:selected="selectedBasic"
                :label="optLabel2"
                :options="optNumber2"
                :multiple="true"
                class="wsize230"
              />
            </div>
            <div class="state_select">
              <c-dropdown
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
              <c-dropdown
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
            <EasyDataTable
              :headers="groupHeaders"
              :items="groupItems"
              :hide-footer="true"
              empty-message="정보가 없습니다."
              @click-row="showRow"
            >
              <!-- pjName -->
              <template #item-pjName="item">
                <span class="txt">{{ item.pjName }}</span>
              </template>
              <!-- groupid -->
              <template #item-groupid="item">
                <span class="txt">{{ item.groupid }}</span>
              </template>
              <!-- groupName -->
              <template #item-groupName="item">
                <a href="#">
                  <span class="txt">{{ item.groupName }}</span>
                  <q-tooltip anchor="bottom middle" class="c_tooltip">
                    <div class="inner">
                      {{ item.groupName }}
                    </div>
                  </q-tooltip>
                </a>
              </template>
              <!-- desc -->
              <template #item-desc="item">
                <a href="#">
                  <span class="txt">{{ item.desc }}</span>
                  <q-tooltip anchor="bottom middle" class="c_tooltip">
                    <div class="inner">
                      {{ item.desc }}
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

                  <q-popup-edit
                    v-model="badgeGroup"
                    self="bottom middle"
                    class="badge_menu"
                  >
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
                <span class="txt">{{ item.createdAt }}</span>
              </template>
              <!-- constructor -->
              <template #item-constructor="item">
                <span class="txt">{{ item.constructor }}</span>
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
              :headers="taskHeaders"
              :items="taskItems"
              :hide-footer="true"
              empty-message="정보가 없습니다."
              @click-row="showRow"
            >
              <!-- pjName -->
              <template #item-pjName="item">
                <span class="txt">{{ item.pjName }}</span>
              </template>
              <!-- groupName -->
              <template #item-groupName="item">
                <span class="txt">{{ item.groupName }}</span>
              </template>
              <!-- taskname -->
              <template #item-taskName="item">
                <a href="#">
                  <span class="txt">{{ item.taskName }}</span>
                  <q-tooltip anchor="bottom middle" class="c_tooltip">
                    <div class="inner">
                      {{ item.taskName }}
                    </div>
                  </q-tooltip>
                </a>
              </template>
              <!--
                상태값(status)
                1. running, 실행중
                2. finished, 완료
                3. stopped, 취소
                4. failure, 실패
                5. error, 에러
                6. pending, 대기중
                7. making, 생성중
                8. cancel, 취소
                9. canceling, 취소중
                10. deleting, 삭제중
                11. unknown
              -->
              <template #item-status="item">
                <q-badge v-if="item.status === 'running'" class="green">
                  <span class="txt">실행중</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'finished'" class="orange">
                  <span class="txt">완료</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'stopped'" class="orange">
                  <span class="txt">취소</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'failure'" class="orange">
                  <span class="txt">실패</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'error'" class="orange">
                  <span class="txt">에러</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'pending'" class="c_badge">
                  <span class="txt">대기중</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'making'" class="c_badge">
                  <span class="txt">생성중</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'cancel'" class="c_badge">
                  <span class="txt">취소</span>
                </q-badge>
                <q-badge
                  v-else-if="item.status === 'canceling'"
                  class="c_badge"
                >
                  <span class="txt">취소중</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'deleting'" class="c_badge">
                  <span class="txt">삭제중</span>
                </q-badge>
                <q-badge v-else class="c_badge">
                  <span class="txt">Unknown</span>
                </q-badge>
              </template>
              <!-- ssh -->
              <template #item-ssh="item">
                <q-badge class="copy square ssh icon" @click="onCopy(item)">
                  <span class="txt">{{ item.ssh }}</span>
                </q-badge>
              </template>
              <!-- 인스턴스 타입 -->
              <template #item-instanceType="item">
                <q-badge class="text instance" @click="onCopy(item)">
                  <span class="txt"
                    >{{ item.instanceType
                    }}<i class="ico details">
                      <q-tooltip
                        anchor="bottom middle"
                        class="c_tooltip insTypeTool"
                      >
                        <div class="inner">
                          {{ item.instanceType }}
                        </div>
                      </q-tooltip></i
                    >
                  </span>
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
              <!-- createdBy -->
              <template #item-createdBy="item">
                <span class="txt">{{ item.createdBy }}</span>
              </template>
              <!-- createdAt -->
              <template #item-createdAt="item">
                <span class="txt">{{ item.createdAt }}</span>
              </template>
              <!-- endDate -->
              <template #item-endDate="item">
                <span class="txt">{{ item.endDate }}</span>
              </template>
              <!-- log -->
              <template #item-log="item">
                <a href="#">
                  <span class="txt logbadge">{{ item.log }}</span>
                </a>
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
            <c-pagination />
          </template>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CDropdown from "components/common/CDropdown.vue";
import CPagination from "components/common/CPagination.vue";
import CButton from "components/common/CButton.vue";

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
const tab = ref("tabs2");
const optLabel = ref("10");
const optLabel2 = ref("프로젝트 전체");
const optLabel3 = ref("상태 전체");
const segModel2 = ref("one");

// 그룹보기
const groupHeaders = [
  {
    text: "프로젝트 이름",
    value: "pjName",
    width: 135,
    sortable: false,
  },
  {
    text: "그룹ID",
    value: "groupid",
    width: 65,
    sortable: false,
  },
  {
    text: "그룹 이름",
    value: "groupName",
    width: 133,
    widthAuto: true,
    sortable: true,
  },
  {
    text: "설명",
    value: "desc",
    width: 133,
    widthAuto: true,
    sortable: false,
  },
  {
    text: "상태",
    value: "status",
    width: 160,
    sortable: false,
  },
  {
    text: "생성일시",
    value: "createdAt",
    width: 160,
    sortable: true,
  },
  {
    text: "생성자",
    value: "constructor",
    width: 260,
    sortable: true,
  },
  { text: "", value: "buttons", width: 80 },
];
const groupItems = [
  {
    pjName: "AA프로젝트",
    groupid: "21",
    groupName: "Taskgroup1",
    desc: "태스크 그룹 설명",
    status: "group",
    createdAt: "2023.10.22 12:33:40",
    constructor: "root.choi (root.choi@kakaobrain.com)",
  },
  {
    pjName: "AA프로젝트",
    groupid: "21",
    groupName: "Taskgroup1Taskgroup1Taskgroup1",
    desc: "태스크 그룹 설명태스크 그룹 설명",
    status: "group",
    createdAt: "2023.10.22 12:33:40",
    constructor: "root.choi (root.choi@kakaobrain.com)",
  },
  {
    pjName: "AA프로젝트",
    groupid: "21",
    groupName: "Taskgroup1",
    desc: "태스크 그룹 설명",
    status: "group",
    createdAt: "2023.10.22 12:33:40",
    constructor: "root.choi (root.choi@kakaobrain.com)",
  },
];
// 테스크보기
const taskHeaders = [
  {
    text: "프로젝트 이름",
    value: "pjName",
    width: 135,
    sortable: false,
  },
  {
    text: "그룹 이름",
    value: "groupName",
    width: 115,
    sortable: true,
  },
  {
    text: "태스크 이름",
    value: "taskName",
    width: 160,
    widthAuto: true,
    sortable: true,
  },
  {
    text: "상태",
    value: "status",
    width: 105,
    sortable: false,
  },
  {
    text: "ssh",
    value: "ssh",
    width: 80,
    sortable: false,
  },
  {
    text: "인스턴스 타입",
    value: "instanceType",
    width: 130,
    sortable: false,
  },
  {
    text: "GPU",
    value: "gpu",
    width: 60,
    sortable: false,
  },
  {
    text: "CPU",
    value: "cpu",
    width: 60,
    sortable: false,
  },
  {
    text: "생성자",
    value: "createdBy",
    width: 85,
    sortable: true,
  },
  {
    text: "생성일시",
    value: "createdAt",
    width: 160,
    sortable: true,
  },
  {
    text: "완료일시",
    value: "endDate",
    width: 160,
    sortable: true,
  },
  {
    text: "로그확인",
    value: "log",
    width: 80,
    sortable: false,
  },
  { text: "", value: "buttons", width: 80 },
];
const taskItems = [
  {
    pjName: "aa프로젝트",
    groupName: "그룹12",
    taskName: "aatask1",
    status: "running",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    createdAt: "2023.01.12 10:33:14",
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
    taskName: "aatask1aatask1aatask1aatask1",
    status: "error",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    createdAt: "2023.01.12 10:33:14",
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
    taskName: "aatask1",
    status: "cancel",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    createdAt: "2023.01.12 10:33:14",
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
    taskName: "aatask1",
    status: "deleting",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    createdAt: "2023.01.12 10:33:14",
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
    taskName: "aatask1aatask1aatask1aatask1",
    status: "stopped",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    createdAt: "2023.01.12 10:33:14",
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
    taskName: "aatask1",
    status: "canceling",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    createdAt: "2023.01.12 10:33:14",
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
    taskName: "aatask1",
    status: "group",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    createdAt: "2023.01.12 10:33:14",
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
    taskName: "aatask1aatask1aatask1aatask1",
    status: "finished",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    createdAt: "2023.01.12 10:33:14",
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
    taskName: "aatask1",
    status: "making",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    createdAt: "2023.01.12 10:33:14",
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
    taskName: "aatask1aatask1aatask1aatask1",
    status: "failure",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    createdAt: "2023.01.12 10:33:14",
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
    taskName: "aatask1aatask1aatask1aatask1",
    status: "pending",
    ssh: "ssh",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdBy: "root.choi",
    createdAt: "2023.01.12 10:33:14",
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
  { name: "재생성", event: "regeneratory" },
  { name: "취소", event: "cancel" },
  { name: "삭제", event: "delete" },
];
</script>

<style lang="scss" scoped>
@import "./src/css/manage";
@import "./src/css/table";
</style>
