<template>
  <q-page class="p-content p-manage p-storage">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Workapace Manager" to="/" />
        <q-breadcrumbs-el label="Storage" />
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
                    <p class="head_txt">
                      스토리지 생성 개수<q-btn class="ibtn help">
                        <i class="ico help"
                          ><span class="hidden">도움말</span>
                          <q-popup-edit
                            v-model="helpShow"
                            anchor="top middle"
                            self="top middle"
                            class="c_popover storage_popover"
                          >
                            <div class="inner">
                              <p class="list_dot">
                                스토리지는 개인당 최대 5개 생성할 수 있습니다.
                              </p>
                              <p class="list_dot">
                                워크스페이스 관리자는 워크스페이스당 최대 50개의
                                스토리지를 개인 스토리지와 별개로 생성할 수
                                있습니다.
                              </p>
                            </div>
                          </q-popup-edit>
                        </i>
                      </q-btn>
                    </p>
                  </div>
                </div>
                <div class="cont_main">
                  <p class="percentage_txt">
                    <span class="now_percentage">12</span>/ 50
                  </p>
                </div>
                <div class="cont_footer">
                  <p class="progress_percentage_txt">75%</p>
                  <div class="progress_bar_area">
                    <progress value="75" max="100" />
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
                    <p class="head_txt">스토리지 사용량</p>
                  </div>
                </div>
                <div class="cont_main">
                  <p class="stg_percentage">
                    <span class="now_percentage">209.3</span>TiB
                  </p>
                  <p class="percentage_txt">/ 500TiB</p>
                </div>
                <div class="cont_footer">
                  <p class="progress_percentage_txt">75%</p>
                  <div class="progress_bar_area">
                    <progress value="75" max="100" />
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
                    <p class="head_txt">할당 가능 용량</p>
                  </div>
                </div>
                <div class="cont_main">
                  <p class="stg_percentage">
                    <span class="now_percentage">255</span>TiB
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="manage_main_area">
          <div class="btn_area">
            <q-tabs v-model="tab" align="left" class="c_tabs">
              <q-tab name="tabs1" label="스토리지"></q-tab>
              <q-tab name="tabs2" label="멤버"></q-tab>
            </q-tabs>
          </div>
          <div class="table_set">
            <div class="l_set_inner">
              <div class="search_area">
                <q-input
                  outlined
                  v-model="suffix"
                  placeholder="스토리지 이름, 소유자 검색"
                  class="wsize292"
                >
                  <template v-slot:prepend>
                    <q-icon name="search" class="ico_search" />
                  </template>
                </q-input>
              </div>
            </div>

            <div class="r_set_inner">
              <div class="quota_set_btn">
                <!-- <q-btn
                  btnTypes="4"
                  type="button"
                  class="c_btn line medium"
                  @click="mngStorageAddModal = true"
                >
                  <span class="txt">스토리지 추가</span> -->
                <c-button
                  :size="'medium'"
                  :outline="true"
                  :btn-names="'스토리지 추가'"
                />
              </div>
              <div class="view_cont_num">
                <c-dropdown
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
              :headers="headers"
              :items="items"
              :hide-footer="true"
              :body-row-class-name="bodyRowClassNameFunction"
              empty-message="정보가 없습니다."
              @click-row="showRow"
            >
              <!-- title -->
              <template #item-title="item">
                <span class="txt">{{ item.title }}</span>
              </template>
              <!-- Description -->
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
              <!-- user -->
              <template #item-user="item">
                <span class="txt">{{ item.user }}</span>
              </template>
              <!--
                상태값(status)
                1. running, 운영중(개인)
                2. running_s, 운영중(공유)
                3. making, 생성중
                4. deleting, 삭제중
                5. restoring, 복원중
              -->
              <template #item-status="item">
                <q-badge v-if="item.status === 'running'" class="green">
                  <span class="txt">운영중(개인)</span>
                </q-badge>
                <q-badge v-if="item.status === 'running_s'" class="green">
                  <span class="txt">운영중(공유)</span>
                </q-badge>
                <q-badge v-if="item.status === 'making'" class="c_badge">
                  <span class="txt">생성중</span>
                </q-badge>
                <q-badge v-if="item.status === 'deleting'" class="c_badge">
                  <span class="txt">삭제중</span>
                </q-badge>
                <q-badge v-if="item.status === 'restoring'" class="c_badge">
                  <span class="txt">복원중</span>
                </q-badge>
              </template>
              <!-- usage -->
              <template #item-usage="item">
                <span class="txt">{{ item.usage }}</span>
              </template>
              <!-- createdAt -->
              <template #item-createdAt="item">
                <span class="txt">{{ item.createdAt }}</span>
              </template>
              <!-- 버튼 그룹 -->
              <template #item-buttons="item">
                <div v-if="actionButtons || item.buttons" class="cell btngroup">
                  <!-- 초대 요청 확인 -->
                  <q-btn v-if="item.buttons" class="c_btn">
                    <span class="txt">{{ item.buttons.name }}</span>
                  </q-btn>

                  <!-- row action menu -->
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
          <div class="table_pagenav disflex_C">
            <CPagination />
          </div>
        </div>
      </div>
    </div>
  </q-page>

  <!-- Start : [관리 - 스토리지] 관리자 스토리지 추가 팝업 -->
  <q-dialog v-model="mngStorageAddModal" class="c_dialog large">
    <q-card>
      <q-card-section class="c_dialog_body">
        <p class="title">
          <strong>관리자 스토리지 추가</strong>
        </p>
        <section class="section">
          <p class="sub_title">이름<i class="ess">*</i></p>
          <div class="c_inpgroup">
            <q-input
              outlined
              v-model="textName"
              placeholder="최소 2자 최대 30자"
              clearable
              class="wsize_full"
            />
          </div>
        </section>
        <section class="section">
          <p class="sub_title">설명</p>
          <div class="c_inpgroup">
            <q-input
              outlined
              v-model="textDesc"
              bottom-slots
              type="textarea"
              placeholder="스토리지 설명"
              clearable
              counter
              :count="10"
              maxlength="500"
              class="wsize_full hsize244"
              :input-style="{ height: '100%' }"
            >
              <!-- <template v-slot:hint>
                  Description
                </template> -->
            </q-input>
          </div>
        </section>
        <section class="section">
          <p class="sub_title">스토리지 용량</p>
          <div class="c_inpgroup flex-end">
            <q-input
              outlined
              v-model="quota2"
              type="number"
              placeholder="50GiB 단위 입력"
              clearable
              class="inp_unit"
            >
              <template v-slot:append>
                <span class="unit">GiB</span>
              </template>
            </q-input>
            <span class="desc"> / 20,000 GiB</span>
          </div>
        </section>
      </q-card-section>
      <q-card-actions class="c_dialog_foot">
        <q-btn
          label="취소"
          class="line"
          @click="triggerStorageWarning('top-right')"
          v-close-popup
        />
        <q-btn
          label="확인"
          class="primary"
          @click="triggerStorageSuccess('top-right')"
          v-close-popup
          disable
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- End : [관리 - 스토리지] 관리자 스토리지 추가 팝업 -->
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CDropdown from "components/common/CDropdown.vue";
import CPagination from "components/common/CPagination.vue";
import CButton from "components/common/CButton.vue";

const title = ref("Storage");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const label = ref("10");
const helpShow = ref(false);
const tab = ref("tabs1");

const options = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);

const headers = [
  {
    text: "이름",
    value: "title",
    width: 130,
    sortable: true,
  },
  {
    text: "설명",
    value: "desc",
    width: 280,
    widthAuto: true,
    sortable: true,
  },
  {
    text: "소유자",
    value: "user",
    width: 110,
    sortable: true,
  },
  {
    text: "상태",
    value: "status",
    width: 120,
    sortable: true,
  },
  {
    text: "사용량",
    value: "usage",
    width: 120,
    sortable: true,
  },
  {
    text: "생성일시",
    value: "createdAt",
    width: 170,
    sortable: true,
  },
  { text: "", value: "buttons", width: 220 },
];
const items = [
  {
    title: "aa프로젝트",
    desc: "개인이용 35자 이후 점처리",
    user: "Root.choi",
    status: "running",
    usage: "45 / 100GiB",
    createdAt: "2023.01.12 10:33:40",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
    buttons: {
      name: "용량변경요청",
    },
  },
  {
    title: "aa프로젝트",
    desc: "개인이용 35자 이후 점처리",
    user: "Root.choi",
    status: "running_s",
    usage: "45 / 100GiB",
    createdAt: "2023.01.12 10:33:40",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    title: "aa프로젝트",
    desc: "개인이용 35자 이후 점처리",
    user: "Root.choi",
    status: "making",
    usage: "45 / 100GiB",
    createdAt: "2023.01.12 10:33:40",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    title: "aa프로젝트",
    desc: "개인이용 35자 이후 점처리",
    user: "Root.choi",
    status: "deleting",
    usage: "45 / 100GiB",
    createdAt: "2023.01.12 10:33:40",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    title: "aa프로젝트",
    desc: "개인이용 35자 이후 점처리개인이용 35자 이후 점처리개인이용 35자 이후 점처리",
    user: "Root.choi",
    status: "restoring",
    usage: "45 / 100GiB",
    createdAt: "2023.01.12 10:33:40",
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
  { name: "용량 변경", event: "doseModifying" },
  { name: "삭제", event: "delete" },
];

/**
 * 버튼 및 checkbox 에 대한 이벤트 존재할 시 class 삽입
 */
const bodyRowClassNameFunction = (item) => {
  const classList = [];
  if (item.buttons) classList.push("row-button");
  if (item.checkbox) classList.push("row-selected");
  return classList.join(" ");
};

const mngStorageAddModal = ref(false);
const textName = ref(null);
const textDesc = ref(null);
</script>

<style lang="scss" scoped>
@import "./src/css/manage";
@import "./src/css/table";
</style>
