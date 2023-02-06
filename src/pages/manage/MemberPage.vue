<template>
  <q-page class="p-content p-manage p-storage">
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
                    <p class="head_txt">스토리지 생성 개수<q-btn class="ibtn help">
                        <i class="ico help" /><span class="hidden">도움말</span>
                        <q-popup-edit
                          v-model="helpShow"
                          anchor="top middle"
                          self="top middle"
                          class="c_popover"
                        >
                          <div class="inner">
                            <p class="list_dot">스토리지는 개인당 최대 5개 생성할 수 있습니다. </p>
                            <p class="list_dot">워크스페이스 관리자는 워크스페이스당 최대 50개의 스토리지를 개인 스토리지와 별개로</p>
                            <!-- 생성할 수 있습니다. 최대 100자 제한 작성불가 확인 -->
                          </div>
                        </q-popup-edit>
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
                    <p class="head_txt">스토리지 사용량</p>
                  </div>
                </div>
                <div class="cont_main">
                  <p class="stg_percentage"><span class="now_percentage">209.3</span>TiB</p>
                  <p class="percentage_txt">/ 500TiB</p>
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
                    <p class="head_txt">할당 가능 용량</p>
                  </div>
                </div>
                <div class="cont_main">
                  <p class="stg_percentage"><span class="now_percentage">255</span>TiB</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="manage_main_area">
          <div class="btn_area">
            <q-tabs
              v-model="tab"
              align="left"
              class="c_tabs"
            >
              <q-tab
                name="tabs1"
                label="스토리지"
              ></q-tab>
              <q-tab
                name="tabs2"
                label="멤버"
              ></q-tab>
            </q-tabs>
          </div>
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
            </div>

            <div class="r_set_inner">
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
              :headers="headers"
              :items="items"
              :hide-footer="true"
              empty-message="정보가 없습니다."
              @click-row="showRow"
            >
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
import CDropdown from "components/common/CDropdown.vue";
import CPagination from "components/common/CPagination.vue";

const title = ref("Storage");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const label = ref("10");
const helpShow = ref(false);
const tab = ref("tabs2");

const options = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);

const headers = [
  {
    text: "이름", value: "title", width: 200, sortable: true
  },
  {
    text: "이메일", value: "email", width: 300, sortable: true
  },
  {
    text: "생성개수", value: "generated", width: 200, sortable: false
  },
  {
    text: "사용량", value: "usage", width: 200, sortable: true
  },
  {
    text: "할당량", value: "quota", width: 200, sortable: true
  },
  { text: "", value: "buttons", width: 150 },
];
const items = [
  {
    title: "root.choi",
    email: "root.choi@kakaobrain.com",
    generated: "3 / 5",
    usage: "100GiB",
    quota: "100GiB",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    title: "root.choi",
    email: "root.choi@kakaobrain.com",
    generated: "3 / 5",
    usage: "100GiB",
    quota: "100GiB",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    title: "root.choi",
    email: "root.choi@kakaobrain.com",
    generated: "3 / 5",
    usage: "100GiB",
    quota: "100GiB",
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
</script>

<style lang="scss" scoped>
@import "./src/css/manage";
@import "./src/css/table";
</style>
