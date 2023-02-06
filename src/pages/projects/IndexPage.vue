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
import ProjectDashboard from "src/components/pages/ProjectDashboard.vue";
// import CTable from "src/components/common/CTable.vue";
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
// const viewTab = ref(0);

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
