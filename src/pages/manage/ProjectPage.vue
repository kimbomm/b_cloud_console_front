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
                  <div class="progress_bar_area">
                    <progress
                      value="75"
                      max="100"
                    />
                  </div>
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
                  <div class="progress_bar_area">
                    <progress
                      value="75"
                      max="100"
                    />
                  </div>
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
                  <div class="progress_bar_area">
                    <progress
                      value="75"
                      max="100"
                    />
                  </div>
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
                  <div class="progress_bar_area">
                    <progress
                      value="75"
                      max="100"
                    />
                  </div>
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
                  <div class="progress_bar_area">
                    <progress
                      value="75"
                      max="100"
                    />
                  </div>
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
                  <div class="progress_bar_area">
                    <progress
                      value="75"
                      max="100"
                    />
                </div>
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
                  <p class="com_tag"><i class="ico low" />0% ~ 50%</p>
                  <p class="com_tag"><i class="ico middle" />51% ~ 90%</p>
                  <p class="com_tag"><i class="ico high" />91% ~ 100%</p>
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
            <EasyDataTable
              :headers="mngTaskHeader"
              :items="mngTaskItems"
              :hide-footer="true"
              empty-message="정보가 없습니다."
            >
              <!-- title -->
              <template #item-title="item">
                <span class="txt">{{ item.title }}</span>
              </template>
              <!-- Description -->
              <template #item-desc="item">
                <a href="#">
                  <span class="txt">{{ item.desc }}</span>
                </a>
              </template>
              <!--
                상태값(status)
                1. running, 운영중, 실행중, ON
                2. stopped, 정지 | 오류 | 취소 | 실패
                3. 생성중 | 삭제중 | 대기중 | 재시작중 | OFF
              -->
              <template #item-status="item">
                <q-badge
                  v-if="item.status === 'running'"
                  class="green"
                >
                  <span class="txt">ON</span>
                </q-badge>
                <q-badge
                  v-else
                  class="c_badge"
                >
                  <span class="txt">OFF</span>
                </q-badge>
              </template>
              <!-- GPU -->
              <template #item-gpu="item">
                <!--
                  사용량(usage)
                  1. row : 0% ~ 50%
                  2. middle : 51% ~ 90%
                  3. high : 91% ~ 100%
                -->
                <q-item v-if="item.status === 'running'" class="cell">
                  <div v-if="item.gpu === 'row'" class="usage">
                    <i class="ico row" />
                    <span class="txt">44 / 100</span>
                  </div>
                  <div v-else-if="item.gpu === 'middle'" class="usage">
                    <i class="ico middle" />
                    <span class="txt">13 / 100</span>
                  </div>
                  <div v-else-if="item.gpu === 'high'" class="usage">
                    <i class="ico high" />
                    <span class="txt">33 / 100</span>
                  </div>
                  <div v-else class="usage">
                    <span class="txt">-</span>
                  </div>
                </q-item>
                <q-item v-else class="cell">
                  <div v-if="item.gpu === 'row'" class="usage">
                    <span class="txt">543</span>
                  </div>
                  <div v-else-if="item.gpu === 'middle'" class="usage">
                    <span class="txt">23</span>
                  </div>
                  <div v-else-if="item.gpu === 'high'" class="usage">
                    <span class="txt">44</span>
                  </div>
                  <div v-else class="usage">
                    <span class="txt">-</span>
                  </div>
                </q-item>
              </template>
              <!-- V100 -->
              <template #item-v100="item">
                <!--
                  사용량(usage)
                  1. row : 0% ~ 50%
                  2. middle : 51% ~ 90%
                  3. high : 91% ~ 100%
                -->
                <q-item v-if="item.status === 'running'" class="cell">
                  <div v-if="item.v100 === 'row'" class="usage">
                    <i class="ico row" />
                    <span class="txt">2 / 100</span>
                  </div>
                  <div v-else-if="item.v100 === 'middle'" class="usage">
                    <i class="ico middle" />
                    <span class="txt">13 / 100</span>
                  </div>
                  <div v-else-if="item.v100 === 'high'" class="usage">
                    <i class="ico high" />
                    <span class="txt">33 / 100</span>
                  </div>
                  <div v-else class="usage">
                    <span class="txt">-</span>
                  </div>
                </q-item>
                <q-item v-else class="cell">
                  <div v-if="item.v100 === 'row'" class="usage">
                    <span class="txt">12</span>
                  </div>
                  <div v-else-if="item.v100 === 'middle'" class="usage">
                    <span class="txt">23</span>
                  </div>
                  <div v-else-if="item.v100 === 'high'" class="usage">
                    <span class="txt">44</span>
                  </div>
                  <div v-else class="usage">
                    <span class="txt">-</span>
                  </div>
                </q-item>
              </template>
              <!-- A100_400G -->
              <template #item-g400="item">
                <!--
                  사용량(usage)
                  1. row : 0% ~ 50%
                  2. middle : 51% ~ 90%
                  3. high : 91% ~ 100%
                -->
                <q-item v-if="item.status === 'running'" class="cell">
                  <div v-if="item.g400 === 'row'" class="usage">
                    <i class="ico row" />
                    <span class="txt">44 / 100</span>
                  </div>
                  <div v-else-if="item.g400 === 'middle'" class="usage">
                    <i class="ico middle" />
                    <span class="txt">13 / 100</span>
                  </div>
                  <div v-else-if="item.g400 === 'high'" class="usage">
                    <i class="ico high" />
                    <span class="txt">33 / 100</span>
                  </div>
                  <div v-else class="usage">
                    <span class="txt">-</span>
                  </div>
                </q-item>
                <q-item v-else class="cell">
                  <div v-if="item.g400 === 'row'" class="usage">
                    <span class="txt">543</span>
                  </div>
                  <div v-else-if="item.g400 === 'middle'" class="usage">
                    <span class="txt">23</span>
                  </div>
                  <div v-else-if="item.g400 === 'high'" class="usage">
                    <span class="txt">44</span>
                  </div>
                  <div v-else class="usage">
                    <span class="txt">-</span>
                  </div>
                </q-item>
              </template>
              <!-- A100_80G -->
              <template #item-g80="item">
                <!--
                  사용량(usage)
                  1. row : 0% ~ 50%
                  2. middle : 51% ~ 90%
                  3. high : 91% ~ 100%
                -->
                <q-item v-if="item.status === 'running'" class="cell">
                  <div v-if="item.g80 === 'row'" class="usage">
                    <i class="ico row" />
                    <span class="txt">44 / 100</span>
                  </div>
                  <div v-else-if="item.g80 === 'middle'" class="usage">
                    <i class="ico middle" />
                    <span class="txt">13 / 100</span>
                  </div>
                  <div v-else-if="item.g80 === 'high'" class="usage">
                    <i class="ico high" />
                    <span class="txt">33 / 100</span>
                  </div>
                  <div v-else class="usage">
                    <span class="txt">-</span>
                  </div>
                </q-item>
                <q-item v-else class="cell">
                  <div v-if="item.g80 === 'row'" class="usage">
                    <span class="txt">543</span>
                  </div>
                  <div v-else-if="item.g80 === 'middle'" class="usage">
                    <span class="txt">23</span>
                  </div>
                  <div v-else-if="item.g80 === 'high'" class="usage">
                    <span class="txt">44</span>
                  </div>
                  <div v-else class="usage">
                    <span class="txt">-</span>
                  </div>
                </q-item>
              </template>
              <!-- 버튼 그룹 -->
              <template #item-buttons="item">
                <div v-if="actionButtons2" class="cell">
                  <q-btn class="c_btn ibtn dot">
                    <i class="ico dots" /><span class="txt">클릭</span>
                    <q-popup-edit
                      v-model="item.id"
                      class="dots_menu"
                      anchor="top right"
                    >
                      <q-list style="min-width: 100px">
                        <q-item
                          v-for="button in actionButtons2"
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

const mngTaskHeader = [
  {
    text: "프로젝트 이름", value: "title", width: 300, sortable: true
  },
  {
    text: "프로젝트 설명", value: "desc", sortable: false
  },
  {
    text: "할당량 설정", value: "status", width: 130, sortable: true
  },
  {
    text: "GPU", value: "gpu", width: 150, sortable: true
  },
  {
    text: "V100", value: "v100", width: 150, sortable: true
  },
  {
    text: "A100_400G", value: "g400", width: 150, sortable: true
  },
  {
    text: "A100_80G", value: "g80", width: 150, sortable: true
  },
  { text: "", value: "buttons", width: 80 },
];
const mngTaskItems = [
  {
    title: "aa프로젝트1",
    desc: "프로젝트 설명프로젝트 설명프로젝트 설명",
    status: "running",
    gpu: "row",
    v100: "row",
    g400: "middle",
    g80: "high",
    buttons: {
      name: "초대요청 확인"
    }
  },
  {
    title: "aa프로젝트1",
    desc: "프로젝트 설명프로젝트 설명프로젝트 설명",
    status: "",
    gpu: "row",
    v100: "row",
    g400: "middle",
    g80: "high",
    buttons: {
      name: "초대요청 확인"
    }
  },
];

const actionButtons2 = [
  { name: "편집", event: "edit" },
  { name: "삭제", event: "delete" },
];

/**
 * 설명: 복사하기 버튼 이벤트
 * @param { object } rowData get table row data
 */

/**
 * 설명: row Action 버튼 이벤트
 * @param { string } eventName action event name
 * @param { object } rowData get table row data
 */
const onActions = (eventName, rowData) => {
  console.log(eventName, rowData);
};
</script>

<style lang="scss" scoped>
@import "./src/css/manage";
@import "./src/css/table";
</style>
