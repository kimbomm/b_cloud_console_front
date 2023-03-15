<template>
  <q-page class="p-content p-projects p-index">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Projects" to="/" />
        <q-breadcrumbs-el :label="projectInfo.name" to="/" />
        <q-breadcrumbs-el :label="selectedTab" />
      </q-breadcrumbs>
      <h1 class="p-title">
        {{ projectInfo.name }}
      </h1>
      <q-btn class="ibtn setmenu">
        <i class="ico set" /><span class="hidden">설정</span>
        <q-menu class="set_menu">
          <q-list style="min-width: 100px">
            <q-item>
              <q-btn class="item" @click="projectCreateModal = true">
                <span class="txt">이름/설명 편집</span>
              </q-btn>
              <UpdateProjectPopup
                v-model="projectCreateModal"
                :projectCreateModal="projectCreateModal"
                @updateProject="updateProject"
                :projectInfo="projectInfo"
                :getListProject="getListProject"
                :newProjectDescription="newProjectDescription"
              />
            </q-item>
            <q-item>
              <q-btn class="item" @click="quotaChangeModal = true">
                <span class="txt">할당량 변경 요청</span>
              </q-btn>

              <QuotaChangeRequest
                v-model="quotaChangeModal"
                :quotaChangeModal="quotaChangeModal"
                @updateProject="updateProject"
                :projectInfo="projectInfo"
                @update:quotaChangeModal="(value)=>{quotaChangeModal = value}"

              />

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
        <span class="txt">{{ newProjectDescription }}</span>
      </p>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="wrap p-memberInd">
        <ProjectDashboard />

        <div class="com_m_cont">
          <div class="change_tab_btn">
            <q-tabs v-model="tabModel" align="left" class="c_tabs">
              <c-tab v-model:value="tabModel" :tabs="tabs" />
            </q-tabs>
          </div>

          <q-tab-panels v-model="tabModel">
            <q-tab-panel name="instances">
              <!-- 인스턴스 -->
              <InstancePage
                :tabModel="tabModel"
                @update:instanceTotal="instanceTotal = $event"
              />
            </q-tab-panel>
            <q-tab-panel name="task_gorup">
              <!-- 태스크 -->
              <TaskPage :tabModel="tabModel" @update:taskTotal="taskTotal = $event" />
            </q-tab-panel>
            <q-tab-panel name="member">
              <!-- 멤버 -->
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </q-page>

  <!-- Start : [프로젝트 - 멤버관리] 멤버 - 추가 -->
  <q-dialog v-model="projectMemberAddModal" class="c_dialog medium">
    <q-card>
      <q-card-section class="c_dialog_body">
        <p class="title">
          <strong>프로젝트 멤버 추가</strong>
        </p>

        <div class="c_group">
          <div class="c_inpgroup">
            <q-select
              outlined
              v-model="shareChipModel"
              placeholder="사용자 이메일 입력"
              use-input
              use-chips
              multiple
              input-debounce="0"
              @new-value="createValue"
              :options="filterOptions"
              @filter="chipFilterFn"
              class="c_inpchip"
            >
              <template v-slot:prepend>
                <q-icon name="search" class="ico_search" />
              </template>
              <template v-slot:append>
                <div class="slotopt"></div>
              </template>
              <template v-slot:no-option>
                <q-item class="no_data">
                  <q-item-section> 검색 결과 없습니다. </q-item-section>
                </q-item>
              </template>
            </q-select>
            <div class="c_selectgroup f_start">
              <CDropdown
                v-model:selected="memberSelModel"
                :label="'프로젝트 관리자'"
                :options="memberSelOptions"
                :type="'text'"
              />
            </div>
          </div>
          <q-btn class="c_btn medium add">
            <span class="txt">추가하기</span>
          </q-btn>
        </div>
        <!-- 검색 완료 -->
        <!-- <q-list class="p_list membermng">
          <q-item class="item">
            <i class="ico member" />
            <q-item-section class="item_card">
              <q-item-label class="name">root.choi</q-item-label>
              <q-item-label class="mail">root.choi@kakaobrain.com</q-item-label>
            </q-item-section>
            <CDropdown
              v-model:selected="memberSelModel"
              :label="'멤버'"
              :options="memberSelOptions"
              :type="'text'"
            />
          </q-item>
          <q-item class="item">
            <i class="ico member" />
            <q-item-section class="item_card">
              <q-item-label class="name">김나온</q-item-label>
              <q-item-label class="mail">naon12@gmail.com</q-item-label>
            </q-item-section>
            <CDropdown
              v-model:selected="memberSelModel"
              :label="'멤버'"
              :options="memberSelOptions"
              :type="'text'"
            />
          </q-item>
          <q-item class="item">
            <i class="ico member" />
            <q-item-section class="item_card">
              <q-item-label class="name">김나온</q-item-label>
              <q-item-label class="mail">naon12@gmail.com</q-item-label>
            </q-item-section>
            <CDropdown
              v-model:selected="memberSelModel"
              :label="'멤버'"
              :options="memberSelOptions"
              :type="'text'"
            />
          </q-item>
        </q-list> -->
      </q-card-section>
      <q-card-actions class="c_dialog_foot">
        <q-btn label="취소" class="line" v-close-popup />
        <q-btn label="확인" class="primary" v-close-popup disable />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- End : [프로젝트 - 멤버관리] 멤버 - 추가 -->
</template>
<script setup>
import { ref, watch, computed } from "vue";
import { useMeta } from "quasar";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { ProjectService } from "src/services";
import { useProjectStore } from "stores/useProjectStore.js";
import { $utils } from "src/utils/utils";

import ProjectDashboard from "src/components/pages/ProjectDashboard.vue";
// import CTable from "src/components/common/CTable.vue";
import CTab from "src/components/common/CTab.vue";

import CDropdown from "components/common/CDropdown.vue";
import InstancePage from "src/pages/workspace/projects/components/InstancePage.vue";
import TaskPage from "src/pages/workspace/projects/components/TaskPage.vue";
import UpdateProjectPopup from "./components/UpdateProjectPopup.vue";
import QuotaChangeRequest from "./components/QuotaChangeRequest.vue";

const route = useRoute();
const { setIsProjectChange } = useProjectStore();

const projectInfo = ref({});
const getListProject = ref({});
const newProjectDescription = ref("");

const projectCreateModal = ref(false);
const quotaChangeModal = ref(false);
const instanceTotal = ref(0);
const taskTotal = ref(0);
const memberTotal = ref(0);

useMeta(() => ({
  title: projectInfo.value.name,
}));

// 프로젝트 탭
/**
 * route hash값 존재시
 * tabModel 셋팅: 탭 이동
 */

const tabModel = ref("instances");

const tabs = ref([
  { name: "instances", label: "인스턴스", total: instanceTotal },
  { name: "task_gorup", label: "태스크", total: taskTotal },
  { name: "member", label: "멤버", total: memberTotal },
]);

const getTabsName = computed(() => tabs.value.map((tab) => tab.name));
const { hash } = route;
function setTabModel(hs) {
  const nHash = $utils.getHash(hs || hash);
  if (nHash && getTabsName.value.includes(nHash)) {
    tabModel.value = nHash;
  } else {
    const [firstValue] = getTabsName.value;
    tabModel.value = firstValue;
  }
}
setTabModel();

onBeforeRouteUpdate((to) => {
  setTabModel(to.hash);
});

const selectedTab = computed(() => {
  const select = tabs.value.find((tab) => tab.name === tabModel.value);
  return select ? select.label : "";
});

// 프로젝트 상세
const getProjectInfo = async () => {
  try {
    projectInfo.value = await ProjectService.getProject(
      route.params.workspaceId,
      route.params.projectId
    );
  } catch (error) {
    console.log(error);
    // router.replace({ name: "NotFound" }); //없는페이지 에러처리
    // throw error;
  }
};

const getProjectList = async () => {
  try {
    const { projects } = await ProjectService.getListProject(route.params.workspaceId);
    getListProject.value = projects;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// 현재 프로젝트 페이지 정보
const fetchProjectDescription = (projectId) => {
  const project = getListProject.value.find((p) => p.id === parseInt(projectId, 10));
  newProjectDescription.value = project.description;
};

const updateInfo = async () => {
  await getProjectList();
  await fetchProjectDescription(route.params.projectId);
};

watch(
  () => route.params.projectId,
  async () => {
    await Promise.all([updateInfo(), getProjectInfo()]);
  },
  { immediate: true }
);

const projectMemberAddModal = ref(false);
const memberSelOptions = ["프로젝트 관리자", "멤버"];
const stringOptions = [];
const filterOptions = ref(stringOptions);
const createValue = (val, done) => {
  if (val.length > 0) {
    if (!stringOptions.includes(val)) {
      stringOptions.push(val);
    }
    done(val, "toggle");
  }
};
const chipFilterFn = (val, update) => {
  update(() => {
    if (val === "") {
      filterOptions.value = stringOptions;
    } else {
      const needle = val.toLowerCase();
      filterOptions.value = stringOptions.filter(
        (v) => v.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};

const updateProject = () => {
  console.log("updateProject실행");
  updateInfo();
  getProjectInfo();
  setIsProjectChange(true);
};
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
