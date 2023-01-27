<template>
  <q-page class="p-content p-projects p-make">
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
      <div class="wrap">
        <div class="make_main_cont">
          <div class="s_01">
            <p class="sub_title">인스턴스 이름<i class="ess">*</i></p>
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
            <p class="sub_title">인스턴스 설명</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textDesc"
                bottom-slots
                type="textarea"
                placeholder="인스턴스 설명 입력"
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
          <div class="s_03 pb78">
            <p class="sub_title2">인스턴스 타입<i class="ess">*</i></p>
            <div class="s_03_main">
              <div class="s_03_tab">
                <q-tabs
                  v-model="tab"
                  align="left"
                  class="c_tabs"
                >
                  <q-tab name="tabs1" label="CPU"></q-tab>
                  <q-tab name="tabs2" label="GPU Tesla V100"></q-tab>
                  <q-tab name="tabs3" label="GPU Tesla A100_40G"></q-tab>
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
                  <q-tab name="tabs1" label="기본 이미지"></q-tab>
                  <q-tab name="tabs2" label="내이미지"></q-tab>
                  <q-tab name="tabs3" label="공유받은 이미지"></q-tab>
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
              <div class="select_now_view">
                <p>
                  <span class="change_num">0</span> / 5
                </p>
                선택
              </div>
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
          <div class="s_07">
            <p class="sub_title2">포트 번호 입력</p>
            <div class="s_07_main wsize608">
              <div class="port_num_input">
                <div class="c_inpgroup">
                  <p class="info_txt">최대 10개</p>
                  <q-input
                    outlined
                    v-model="textName2"
                    placeholder="포트 번호 입력"
                    clearable
                    class="wsize_full"
                  />
                </div>
                <q-btn type="button" class="c_btn c_icon medium" disabled>
                  <i class="ico plus" /><span class="txt">Disabled</span>
                </q-btn>
              </div>
              <div class="port_list_area">
                <ul class="port_list_box com_border_box">
                  <li><p>등록된 포트 번호가 없습니다.</p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="aside_cont">
          <div class="aside_box">
            <p class="section_title">인스턴스</p>
            <ul class="instance_data">
              <li class="i_d01">
                <p class="i_data_title">이름</p>
                <p class="i_data_value">인스턴스 이름</p>
              </li>
              <li class="i_d02">
                <p class="i_data_title">인스턴스 타입</p>
                <p class="i_data_value">Tesla V100</p>
              </li>
              <li class="i_d03">
                <p class="i_data_title">GPU</p>
                <p class="i_data_value">1</p>
              </li>
              <li class="i_d04">
                <p class="i_data_title">CPU</p>
                <p class="i_data_value">14</p>
              </li>
              <li class="i_d05">
                <p class="i_data_title">Memory</p>
                <p class="i_data_value">122GB</p>
              </li>
              <li class="i_d06">
                <p class="i_data_title">Disk</p>
                <p class="i_data_value">80GiB</p>
              </li>
              <li class="i_d07">
                <p class="i_data_title">스토리지</p>
                <p class="i_data_value">개인 스토리지 외 3개</p>
              </li>
              <li class="i_d08">
                <p class="i_data_title">SSH/JupyterLab</p>
                <p class="i_data_value">SSH</p>
              </li>
              <li class="i_d09">
                <p class="i_data_title">포트번호</p>
                <p class="i_data_value">-</p>
              </li>
            </ul>
            <div class="make_btn">
              <CButton
                :size-types="2"
                :btn-types="11"
                :btn-names="btnDis"
              />
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

const title = ref("인스턴스 생성");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const tab = ref("tabs1");
const tab2 = ref("tabs1");
const btnDis = ref("인스턴스 생성");
const textName = ref(null);
const textName2 = ref(null);

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
</style>
