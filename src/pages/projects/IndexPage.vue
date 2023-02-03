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
      <div class="wrap p-memberInd">
        <ul class="com_h_cont">
          <li class="quota_cont">
            <div class="cont_head">
              <h3>
                <i class="ico quota" />
              </h3>

              <div class="cont_head_inner">
                <ul>
                  <li :class="{'now_view' : viewTab == 0}" @click="viewTab = 0">워크스페이스 할당량</li>
                  <li :class="{'now_view' : viewTab == 1}" @click="viewTab = 1">프로젝트 할당량</li>
                </ul>
              </div>
            </div>

            <div class="cont_main">
              <template v-if="viewTab == 0">
                <ul class="now_quota">
                  <li>
                    <div class="circle_progress"></div>
                    <div class="progress_info">
                      <p class="pro_info_name">Tesla V100</p>
                      <p class="pro_info_num">
                        <span class="now_using">50</span> / 100
                      </p>
                    </div>
                  </li>
                  <li>
                    <div class="circle_progress"></div>
                    <div class="progress_info">
                      <p class="pro_info_name">Tesla A100</p>
                      <p class="pro_info_num">
                        <span class="now_using">3</span> / 10
                      </p>
                    </div>
                  </li>
                  <li>
                    <div class="circle_progress"></div>
                    <div class="progress_info">
                      <p class="pro_info_name">CPU</p>
                      <p class="pro_info_num">
                        <span class="now_using">1002</span> / 2000
                      </p>
                    </div>
                  </li>
                </ul>
              </template>
              <template v-if="viewTab == 1">
                <ul class="now_quota">
                  <li>
                    <div class="circle_progress"></div>
                    <div class="progress_info">
                      <p class="pro_info_name">Tesla V100</p>
                      <p class="pro_info_num">
                        <span class="now_using">60</span> / 100
                      </p>
                    </div>
                  </li>
                  <li>
                    <div class="circle_progress"></div>
                    <div class="progress_info">
                      <p class="pro_info_name">Tesla A100</p>
                      <p class="pro_info_num">
                        <span class="now_using">5</span> / 10
                      </p>
                    </div>
                  </li>
                  <li>
                    <div class="circle_progress"></div>
                    <div class="progress_info">
                      <p class="pro_info_name">CPU</p>
                      <p class="pro_info_num">
                        <span class="now_using">1012</span> / 2000
                      </p>
                    </div>
                  </li>
                </ul>
              </template>
            </div>
          </li>
          <li class="cpu_rate com_area">
            <div class="cont_head">
              <h3>
                <i class="ico cpu" />
              </h3>

              <div class="cont_head_inner">
                <p class="head_txt">CPU 활용률</p>
                <p class="time_info"><i class="ico blue_clock" />최근 24시간</p>
              </div>
            </div>

            <div class="cont_main">
              <p class="percentage_txt">
                <span class="now_percentage">55.6</span> %
              </p>
            </div>
            <div class="cont_footer">
              <div class="progress_bar_area">
                <progress
                  value="75"
                  max="100"
                />
              </div>
            </div>
          </li>
          <li class="gpu_rate com_area">
            <div class="cont_head">
              <h3>
                <i class="ico gpu" />
              </h3>

              <div class="cont_head_inner">
                <p class="head_txt">GPU 활용률</p>
                <p class="time_info"><i class="ico purple_clock" />최근 24시간</p>
              </div>
            </div>

            <div class="cont_main">
              <p class="percentage_txt">
                <span class="now_percentage">55.6</span> %
              </p>
            </div>
            <div class="cont_footer">
              <div class="progress_bar_area">
                <progress
                  value="75"
                  max="100"
                />
              </div>
            </div>
          </li>
          <li class="cost_rate com_area">
            <div class="cont_head">
              <h3>
                <i class="ico cost" />
              </h3>

              <div class="cont_head_inner">
                <p class="head_txt">프로젝트 비용</p>
              </div>
            </div>

            <div class="cont_main">
              <p class="cost_txt">
                <span class="now_cost">39,220,000</span> 원
              </p>
            </div>
            <div class="cont_footer">
              <p class="cost_use_date">22.12.01 ~ 22.12.23</p>
            </div>
          </li>
        </ul>

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
            <div class="table_set">
              <div class="l_set_inner">
                <div class="c_inpgroup">
                  <q-input
                    outlined
                    v-model="suffix"
                    placeholder="이름, 상태, 생성자 검색"
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
                <div class="instance_make_btn">
                  <CButton
                    :size-types="2"
                    :btn-types="4"
                    :btn-names="'멤버 추가하기'"
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
            <div class="table_area">
              <EasyDataTable
                v-model:items-selected="itemsSelected"
                :headers="headers"
                :items="items"
                :hide-footer="true"
                :body-row-class-name="bodyRowClassNameFunction"
                empty-message="정보가 없습니다."
              >
                <!-- title -->
                <template #item-title="item">
                  <a href="#">
                    <span class="txt">{{ item.title }}</span>
                    <q-tooltip anchor="bottom middle" class="c_tooltip">
                      <div class="inner">
                        {{ item.title }}
                      </div>
                    </q-tooltip>
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
            </div>
            <div class="group">
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
import CPagination from "components/common/CPagination.vue";
import CDropdown from "components/common/CDropdown.vue";
import CButton from "components/common/CButton.vue";

const title = ref("Test Projects");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const tab = ref("tabs3");
const label2 = ref("10");
const viewTab = ref(0);

const options2 = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);

const headers = [
  {
    text: "이름", value: "title", width: 200, sortable: true
  },
  {
    text: "이메일", value: "email", width: 200, sortable: true
  },
  {
    text: "프로젝트 권한", value: "authority", width: 200, sortable: true
  },
  {
    text: "소개", value: "costumer", width: 200, sortable: false
  },
  { text: "", value: "buttons", width: 150 },
];
const items = [
  {
    title: "김카브",
    email: "root.choi@kakaobrain.com",
    authority: "프로젝트 매니저",
    costumer: "00팀 000담당",
  },
  {
    title: "김카브",
    email: "root.choi@kakaobrain.com",
    authority: "프로젝트 매니저",
    costumer: "00팀 000담당",
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
@import "./src/css/projects";
@import "./src/css/table";
</style>
