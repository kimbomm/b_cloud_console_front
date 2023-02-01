<template>
  <q-page class="p-content p-projects p-make">
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
        <q-breadcrumbs-el
          label="태스크"
          to="/"
        />
        <q-breadcrumbs-el label="태스크 생성" />
      </q-breadcrumbs>
      <h1 class="p-title">
        {{ ptitle }}
      </h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="wrap p-task-detail">
        <div class="make_main_cont">
          <div class="s_01">
            <p class="sub_title">태스크 그룹 이름<i class="ess">*</i></p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textName"
                placeholder="최소 2자 최대 30자"
                clearable
                class="wsize608"
              />
            </div>
          </div>
          <div class="s_02">
            <p class="sub_title">태스크 설명</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textDesc"
                bottom-slots
                type="textarea"
                placeholder="태스크 설명 입력"
                clearable
                counter
                :count="10"
                maxlength="500"
                class="wsize_full hsize244"
                :input-style="{height: '100%'}"
              >
              </q-input>
            </div>
          </div>
          <div class="s_task_01">
            <div class="s_task01_head">
              <p class="sub_title2">태스크 입력<i class="ess">*</i></p>
              <q-checkbox
                v-model="chk1"
                label="Multiline 입력"
                class="c_checkbox"
              />
            </div>
            <div class="s_task01_main">
              <div class="s_task01_box com_border_box">
                <template v-if="chk1 === false">
                  <div class="task01_box_head">
                    <p class="sub_title">태스크 이름</p>
                    <p class="sub_title">명령어</p>
                  </div>
                  <div class="task01_box_main">
                    <div class="task_name_input">
                      <div class="c_inpgroup">
                        <q-input
                          outlined
                          v-model="taskName"
                          placeholder="최소 2자 최대 30자"
                          clearable
                          maxlength="30"
                          class="wsize210"
                        />
                      </div>
                    </div>
                    <div class="task_command_input">
                      <div class="c_inpgroup">
                        <q-input
                          outlined
                          v-model="textName2"
                          placeholder="명령어 입력"
                          clearable
                          class="wsize680"
                        />
                        <q-btn
                          type="button"
                          class="c_btn c_icon medium"
                        >
                          <i class="ico plus" /><span class="txt">Disabled</span>
                        </q-btn>
                        <q-btn
                          type="button"
                          class="c_btn c_icon line medium"
                        >
                          <i class="ico minus" /><span class="txt">Button</span>
                        </q-btn>
                      </div>
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="task01_box_head2">
                    <p class="sub_title">태스크 이름</p>
                  </div>
                  <div class="task01_box_main2">
                    <q-input
                      outlined
                      v-model="textDesc"
                      bottom-slots
                      type="textarea"
                      class="wsize_full hsize244"
                      :input-style="{height: '100%'}"
                    />
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="s_task_02">
            <p class="sub_title2">호스트 전체 준비 완료시 실행<q-btn class="ibtn help">
                <i class="ico help" /><span class="hidden">도움말</span>
                <q-popup-edit
                  v-model="helpShow"
                  anchor="top middle" self="top middle"
                  class="c_popover"
                >
                  <div class="inner">
                    태스크 그룹 내 모든 태스크의 호스트가 인식될 때까지 대기하였다가, 모두 완료되면 태스크가 실행됩니다.
                  </div>
                </q-popup-edit>
              </q-btn>
            </p>
            <q-toggle v-model="off" />
          </div>
          <div class="s_task_03">
            <p class="sub_title2">태스크 동시 실행 최대 개수 설정<q-btn class="ibtn help">
                <i class="ico help" /><span class="hidden">도움말</span>
                <q-popup-edit
                  v-model="helpShow"
                  anchor="top middle" self="top middle"
                  class="c_popover"
                >
                  <div class="inner">
                    동시 실행되는 태스크 최대 개수를 설정합니다.
                    <b>예시</b>
                    <p class="list_dot">5개 태스크 입력 후 최대 개수 3개로 설정</p>
                    <p class="list_dot">3개 태스크 실행, 2개 대기 상태로 진행</p>
                    <p class="list_dot">실행중인 3개 태스크 중 완료되는 태스크가 있는 경우 대기중인 태스크 실행 시작</p>
                  </div>
                </q-popup-edit>
              </q-btn>
            </p>
            <q-toggle v-model="off2" />
            <q-input
              outlined
              v-model="texterror"
              hint="최소 1, 최대 50 입력 가능"
              placeholder="50"
              class="c_inp wsize608"
            />
          </div>
          <div class="s_03 pb78">
            <p class="sub_title2">인스턴스 타입<i class="ess">*</i></p>
            <div class="s_03_main">
              <div class="s_03_tab">
                <q-tabs
                  v-model="tab"
                  align="left"
                  class="c_tabs"
                >
                  <q-tab
                    name="tabs1"
                    label="CPU"
                  ></q-tab>
                  <q-tab
                    name="tabs2"
                    label="GPU Tesla V100"
                  ></q-tab>
                  <q-tab
                    name="tabs3"
                    label="GPU Tesla A100_40G"
                  ></q-tab>
                </q-tabs>
              </div>

              <div class="s_03_table">
                <CTable
                  :title="title"
                  :columns="columns"
                  :data="data"
                  row-click
                  @rowClick="onRowClick"
                />
              </div>
              <div class="s_03_pagenav disflex_C mt32">
                <CPagination />
              </div>
            </div>
          </div>
          <div class="s_04 pb78">
            <p class="sub_title2">이미지<i class="ess">*</i></p>
            <div class="s_04_main">
              <div class="s_04_tab">
                <q-tabs
                  v-model="tab2"
                  align="left"
                  class="c_tabs"
                >
                  <q-tab
                    name="tabs1"
                    label="기본 이미지"
                  ></q-tab>
                  <q-tab
                    name="tabs2"
                    label="내이미지"
                  ></q-tab>
                  <q-tab
                    name="tabs3"
                    label="공유받은 이미지"
                  ></q-tab>
                </q-tabs>
              </div>

              <div class="s_04_table">
                <CTable
                  :title="title"
                  :columns="columns2"
                  :data="data2"
                  row-click
                  @rowClick="onRowClick"
                />
              </div>
              <div class="s_04_pagenav disflex_C mt32">
                <CPagination />
              </div>
            </div>
          </div>
          <div class="s_05 pb78">
            <p class="sub_title2">스토리지</p>
            <div class="s_05_main">
              <div class="s_05_table">
                <CTable
                  :title="title"
                  :columns="columns3"
                  :data="data3"
                  row-click
                  @rowClick="onRowClick"
                />
              </div>
              <div class="s_05_pagenav disflex_C mt32">
                <CPagination />
              </div>
            </div>
          </div>
          <div class="s_06 pb78">
            <p class="sub_title2">SSH Key<i class="ess">*</i></p>
            <div class="s_06_main">
              <div class="s_06_table">
                <CTable
                  :title="title"
                  :columns="columns4"
                  :data="data4"
                  row-click
                  @rowClick="onRowClick"
                />
              </div>
            </div>
          </div>
          <div class="s_task_04">
            <p class="sub_title2">Http Proxy 설정</p>
            <q-toggle v-model="off3" />
          </div>
          <div class="s_task_05">
            <p class="sub_title2">실패시 재시도 횟수</p>
            <div class="c_inpgroup">
              <p class="info_txt">최대 5회</p>
              <q-input
                outlined
                v-model="textName2"
                placeholder="포트 번호 입력"
                clearable
                class="wsize_full"
              />
            </div>
          </div>
          <div class="s_07">
            <div class="sub_title2">
              <p>포트 번호 입력</p>
              <span>최대 태스크 개수 만큼 입력 가능</span>
            </div>

            <div class="s_07_main wsize608">
              <div class="port_num_input">
                <div class="c_inpgroup">
                  <q-input
                    outlined
                    v-model="portNum"
                    placeholder="포트 번호 입력"
                    clearable
                    class="wsize_full"
                  />
                </div>
                <q-btn
                  type="button"
                  class="c_btn c_icon medium"
                  disabled
                >
                  <i class="ico plus" /><span class="txt">Disabled</span>
                </q-btn>
              </div>
              <div class="port_list_area">
                <ul class="port_list_box com_border_box">
                  <li>
                    <p>등록된 포트 번호가 없습니다.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="aside_cont">
          <div class="aside_box">
            <p class="section_title">태스크</p>
            <ul class="instance_data task_data">
              <li class="i_d01">
                <p class="i_data_title">그룹 이름</p>
                <p class="i_data_value">태스크 그룹 이름</p>
              </li>
              <li class="i_d02">
                <p class="i_data_title">태스크 개수</p>
                <p class="i_data_value">3</p>
              </li>
              <li class="i_d03">
                <p class="i_data_title">호스트 전체 준비 완료시 실행</p>
                <p class="i_data_value">Off</p>
              </li>
              <li class="i_d04">
                <p class="i_data_title">동시실행 최대 개수</p>
                <p class="i_data_value">3</p>
              </li>
              <li class="i_d05">
                <p class="i_data_title">인스턴스 타입</p>
                <p class="i_data_value">V100</p>
              </li>
              <li class="i_d06">
                <p class="i_data_title">GPU</p>
                <p class="i_data_value">1</p>
              </li>
              <li class="i_d07">
                <p class="i_data_title">CPU</p>
                <p class="i_data_value">14</p>
              </li>
              <li class="i_d08">
                <p class="i_data_title">Memory</p>
                <p class="i_data_value">122GB</p>
              </li>
              <li class="i_d09">
                <p class="i_data_title">Disk</p>
                <p class="i_data_value">80GiB</p>
              </li>
              <li class="i_d10">
                <p class="i_data_title">스토리지</p>
                <p class="i_data_value">aa프로젝트 1 스토리지 외 4개</p>
              </li>
              <li class="i_d11">
                <p class="i_data_title">Http proxy</p>
                <p class="i_data_value">On</p>
              </li>
              <li class="i_d11">
                <p class="i_data_title">재시도 횟수</p>
                <p class="i_data_value">0</p>
              </li>
              <li class="i_d12">
                <p class="i_data_title">추가 포트 번호</p>
                <p class="i_data_value">-</p>
              </li>
            </ul>
            <div class="make_btn">
              <template v-if="datacheck === datacheck">
                <CButton
                  :size-types="2"
                  :btn-types="11"
                  :btn-names="btnDis"
                />
              </template>
              <template v-else>
                <CButton
                  :size-types="2"
                  :btn-types="1"
                  :btn-names="btnName"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CPagination from "components/common/CPagination.vue";
import CButton from "components/common/CButton.vue";
import CTable from "src/components/common/CTable.vue";

const title = ref("태스크 생성");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const tab = ref("tabs1");
const tab2 = ref("tabs1");
const taskName = ref(null);
const portNum = ref(null);
const textName = ref(null);
const textName2 = ref(null);
const textDesc = ref(null);
const chk1 = ref(false);
const off = ref(false);
const off2 = ref(false);
const off3 = ref(false);
const texterror = ref("50");
const datacheck = ref(false);
const btnDis = ref("태스크 생성");
const btnName = ref("태스크 생성");

// 인스턴스 타입 테이블
const columns = [
  {
    name: "name",
    field: "name",
    label: "이름",
    required: true,
    align: "left",
  },
  {
    name: "cpu",
    field: "cpu",
    label: "CPU",
    align: "left",
  },
  {
    name: "memory",
    field: "memory",
    label: "Memory",
    align: "left",
  },
  {
    name: "disk",
    field: "disk",
    label: "Disk",
    align: "left",
  },
];
const data = [
  {
    name: "CG.nano",
    cpu: 7,
    memory: "18GiB",
    disk: "80GiB",
  },
  {
    name: "CG.nano",
    cpu: 7,
    memory: "18GiB",
    disk: "80GiB",
  },
];

// 이미지 테이블
const columns2 = [
  {
    name: "name",
    field: "name",
    label: "이름",
    required: true,
    align: "left",
  },
  {
    name: "nvida",
    field: "nvida",
    label: "NVIDA 드라이브 최소버전",
    align: "left",
    sortable: false,
  },
];
const data2 = [
  {
    name: "tensorflow 2.9.0  (python3, cuda11.2, ubuntu20.04)",
    nvida: "450.0008",
  },
  {
    name: "tensorflow 2.9.0  (python3, cuda11.2, ubuntu20.04)",
    nvida: "450.0008",
  },
];

// 스토리지 테이블
const columns3 = [
  {
    name: "name",
    field: "name",
    label: "이름",
    required: true,
    align: "left",
  },
  {
    name: "account",
    field: "account",
    label: "설명",
    align: "left",
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
    name: "user",
    field: "user",
    label: "소유자",
    align: "left",
  },
  {
    name: "authority",
    field: "authority",
    label: "접근권한",
    align: "left",
    sortable: false,
  },
];
const data3 = [
  {
    name: "프로젝트",
    account: "aa개인 스토리지",
    status: "running",
    user: "root.choi",
    authority: "읽기쓰기",
  },
  {
    name: "프로젝트",
    account: "aa개인 스토리지",
    status: "stopped",
    user: "root.choi",
    authority: "읽기쓰기",
  },
  {
    name: "프로젝트",
    account: "aa개인 스토리지",
    status: "running",
    user: "root.choi",
    authority: "읽기쓰기",
  },
];

// SSH Key 테이블
const columns4 = [
  {
    name: "name",
    field: "name",
    label: "이름",
    required: true,
    align: "left",
  },
  {
    name: "fingerprint",
    field: "fingerprint",
    label: "Fingerprint",
    align: "left",
    sortable: false,
  },
  {
    name: "registrationDat",
    field: "registrationDat",
    label: "등록일시",
    align: "left",
    sortable: false,
  },
];
const data4 = [
  {
    name: "개인용",
    fingerprint: "61:a2:62:d0:7e:3d:c9:0a:4e:fe:83:6c:14:bc:fa:0f",
    registrationDat: "2023.11.21  04:33:34",
  },
  {
    name: "개인용",
    fingerprint: "61:a2:62:d0:7e:3d:c9:0a:4e:fe:83:6c:14:bc:fa:0f",
    registrationDat: "2023.11.21  04:33:34",
  },
];
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
</style>
