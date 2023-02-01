<template>
  <q-page class="p-content p-manage p-project">
    <div class="p-head">
      <q-breadcrumbs
        class="c_breadcrumb"
        gutter="none"
      >
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el
          label="Workapace Manager"
          to="/"
        />
        <q-breadcrumbs-el label="Projects" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="wrap">
        <div class="manage_main_head">
          <ul class="main_box">
            <li class="box_list01">
              <div class="mmh_cont01 mmh_com">
                <div class="cont_head">
                  <h3>
                    <i class="ico cpu" />
                  </h3>

                  <div class="cont_head_inner">
                    <p class="head_txt">CPU 할당량</p>
                  </div>
                </div>
                <div class="cont_main">
                  <p class="percentage_txt">
                    <span class="now_percentage">1345</span>/ 2500
                  </p>
                </div>
                <div class="cont_footer">
                  <p class="progress_percentage_txt">75%</p>
                  <div class="progress_bar_area"></div>
                </div>
              </div>
            </li>
            <li class="box_list02">
              <div class="mmh_cont02 mmh_com">
                <div class="cont_head">
                  <h3>
                    <i class="ico cpu" />
                  </h3>

                  <div class="cont_head_inner">
                    <p class="head_txt">Tesla V100 할당량</p>
                  </div>
                </div>
                <div class="cont_main">
                  <p class="percentage_txt">
                    <span class="now_percentage">32</span>/ 500
                  </p>
                </div>
                <div class="cont_footer">
                  <p class="progress_percentage_txt">75%</p>
                  <div class="progress_bar_area"></div>
                </div>
              </div>
            </li>
            <li class="box_list03">
              <div class="mmh_cont03 mmh_com">
                <div class="cont_head">
                  <h3>
                    <i class="ico cpu" />
                  </h3>

                  <div class="cont_head_inner">
                    <p class="head_txt">Tesla A100_40G 할당량</p>
                  </div>
                </div>
                <div class="cont_main">
                  <p class="percentage_txt">
                    <span class="now_percentage">122</span>/ 400
                  </p>
                </div>
                <div class="cont_footer">
                  <p class="progress_percentage_txt">12%</p>
                  <div class="progress_bar_area"></div>
                </div>
              </div>
            </li>
            <li class="box_list04">
              <div class="mmh_cont04 mmh_com">
                <div class="cont_head">
                  <h3>
                    <i class="ico cpu" />
                  </h3>

                  <div class="cont_head_inner">
                    <p class="head_txt">Tesla A100_80G 할당량</p>
                  </div>
                </div>
                <div class="cont_main">
                  <p class="percentage_txt">
                    <span class="now_percentage">43</span>/ 300
                  </p>
                </div>
                <div class="cont_footer">
                  <p class="progress_percentage_txt">75%</p>
                  <div class="progress_bar_area"></div>
                </div>
              </div>
            </li>
            <li class="box_list03">
              <div class="mmh_cont03 mmh_com">
                <div class="cont_head">
                  <h3>
                    <i class="ico cpu" />
                  </h3>

                  <div class="cont_head_inner">
                    <p class="head_txt">Tesla A100_40G 할당량</p>
                  </div>
                </div>
                <div class="cont_main">
                  <p class="percentage_txt">
                    <span class="now_percentage">122</span>/ 400
                  </p>
                </div>
                <div class="cont_footer">
                  <p class="progress_percentage_txt">12%</p>
                  <div class="progress_bar_area"></div>
                </div>
              </div>
            </li>
            <li class="box_list04">
              <div class="mmh_cont04 mmh_com">
                <div class="cont_head">
                  <h3>
                    <i class="ico cpu" />
                  </h3>

                  <div class="cont_head_inner">
                    <p class="head_txt">Tesla A100_80G 할당량</p>
                  </div>
                </div>
                <div class="cont_main">
                  <p class="percentage_txt">
                    <span class="now_percentage">43</span>/ 300
                  </p>
                </div>
                <div class="cont_footer">
                  <p class="progress_percentage_txt">75%</p>
                  <div class="progress_bar_area"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="manage_main_area">
          <div class="table_set">
            <div class="l_set_inner">
              <div class="search_area">
                <q-input
                  outlined
                  v-model="suffix"
                  placeholder="카테고리, 제목 검색"
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
              <div class="usage_info">
                <div class="usage_box">
                  <p class="usage_title">사용량
                    <q-btn class="ibtn help">
                      <i class="ico help" /><span class="hidden">도움말</span>
                      <q-popup-edit
                        v-model="helpShow"
                        anchor="top middle"
                        self="top middle"
                        class="c_popover"
                      >
                        <div class="inner">
                          <p class="list_dot">할당량 대비 사용량을 표기합니다.(현재 사용량 / 할당량)</p>
                          <p class="list_dot">할당량 OFF시 현재 사용량만 표기됩니다.</p>
                        </div>
                      </q-popup-edit>
                    </q-btn>
                  </p>
                  <p class="com_tag"><i class="ico state_low" />0% ~ 50%</p>
                  <p class="com_tag"><i class="ico state_middle" />51% ~ 90%</p>
                  <p class="com_tag"><i class="ico state_high" />91% ~ 100%</p>
                </div>
              </div>
            </div>

            <div class="r_set_inner">
              <div class="quota_set_btn">
                <CButton
                  :size-types="2"
                  :btn-types="4"
                  :btn-names="btnName"
                />
              </div>
              <div class="view_cont_num">
                <CDropdown
                  v-model:selected="selectedBasic"
                  :label="label"
                  :options="options"
                  class="auto_size"
                />
              </div>
            </div>
          </div>
          <div class="table_inner">
            <CTable
              :title="title"
              :columns="columns"
              :data="data"
              :action-buttons="actionButtons"
              @action="respAction"
            />
          </div>
          <div class="table_pagenav disflex_C">
            <CPagination />
          </div>
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
import CTable from "src/components/common/CTable.vue";

const title = ref("Project");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const label = ref("10");
const btnName = ref("기본 할당량 설정");
const helpShow = ref(false);

const options = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);

const columns = [
  {
    name: "pjName",
    field: "pjName",
    label: "프로젝트 이름",
    align: "left",
    sortable: true,
  },
  {
    name: "account",
    field: "account",
    label: "프로젝트 설명",
    align: "left",
    sortable: false,
  },
  {
    name: "quota",
    field: "quota",
    label: "할당량 설정",
    align: "left",
    sortable: true,
    type: "tag",
  },
  {
    name: "gpu",
    field: "gpu",
    label: "GPU",
    align: "left",
    sortable: true,
  },
  {
    name: "v100",
    field: "v100",
    label: "V100",
    align: "left",
    sortable: true,
  },
  {
    name: "a100400g",
    field: "a100400g",
    label: "A100_400G",
    align: "left",
    sortable: true,
  },
  {
    name: "a10080g",
    field: "a10080g",
    label: "A100_80G",
    align: "left",
    sortable: true,
  },
];
const data = [
  {
    pjName: "aa프로젝트",
    account: "프로젝트 설명프로젝트 설명프로젝트 설명",
    quota: "ON",
    gpu: "44 / 100",
    v100: "2 / 100",
    a100400g: "13 / 100",
    a10080g: "33 / 100",
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
    account: "프로젝트 설명프로젝트 설명프로젝트 설명",
    quota: "running",
    gpu: "44 / 100",
    v100: "2 / 100",
    a100400g: "13 / 100",
    a10080g: "33 / 100",
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
    account: "프로젝트 설명프로젝트 설명프로젝트 설명",
    quota: "ON",
    gpu: "44 / 100",
    v100: "2 / 100",
    a100400g: "13 / 100",
    a10080g: "33 / 100",
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
    account: "프로젝트 설명프로젝트 설명프로젝트 설명",
    quota: "ON",
    gpu: "44 / 100",
    v100: "2 / 100",
    a100400g: "13 / 100",
    a10080g: "33 / 100",
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
    account: "프로젝트 설명프로젝트 설명프로젝트 설명",
    quota: "ON",
    gpu: "44 / 100",
    v100: "2 / 100",
    a100400g: "13 / 100",
    a10080g: "33 / 100",
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
@import "./src/css/manage";
</style>
