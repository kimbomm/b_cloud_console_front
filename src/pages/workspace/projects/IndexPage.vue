<template>
  <q-page class="p-content p-projects p-index">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Projects" to="/" />
        <q-breadcrumbs-el :label="projectInfo.name" to="/" />
        <q-breadcrumbs-el label="멤버" />
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

              <!-- Start : 프로젝트 생성 팝업 -->
              <q-dialog v-model="projectCreateModal" class="c_dialog medium">
                <q-card>
                  <q-card-section class="c_dialog_body">
                    <p class="title">
                      <strong>프로젝트 이름/설명 변경</strong>
                    </p>
                    <section class="section" aria-label="프로젝트 이름">
                      <p class="sub_title">프로젝트 이름<i class="ess">*</i></p>
                      <div class="c_inpgroup">
                        <c-input-text
                          v-model:value="projectName"
                          placeholder="최소 2자 최대 30자 입력"
                          :rules="inputRules"
                          class="wsize_full"
                        />
                      </div>
                    </section>
                    <section class="section" aria-label="프로젝트 설명">
                      <p class="sub_title">프로젝트 설명</p>
                      <div class="c_inpgroup">
                        <c-input-text
                          ref="userName"
                          v-model:value="projectDescription"
                          placeholder="소개글을 입력해주세요"
                          type="textarea"
                          class="wsize_full hsize244"
                          :bottom-slots="true"
                          :maxlength="100"
                          :counter="true"
                          :input-style="{ height: '100%' }"
                          clearable
                          outlined
                          :disable="isValidProjectDescription"
                        />
                      </div>
                    </section>
                  </q-card-section>
                  <q-card-actions class="c_dialog_foot">
                    <q-btn
                      label="취소"
                      class="line"
                      v-close-popup
                      @click="cancleProject()"
                    />
                    <q-btn
                      label="확인"
                      class="primary"
                      @click="updateProject()"
                      v-close-popup
                      :disable="isValidProjectSave"
                    />
                  </q-card-actions>
                </q-card>
              </q-dialog>
              <!-- End : 프로젝트 생성 팝업 -->
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
        <span class="txt">{{ projectInfo.description }}</span>
      </p>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="wrap p-memberInd">
        <ProjectDashboard />

        <div class="com_m_cont">
          <div class="change_tab_btn">
            <q-tabs v-model="tab" align="left" class="c_tabs">
              <q-tab name="tabs1" label="인스턴스">
                <q-badge>36</q-badge>
              </q-tab>
              <q-tab name="tabs2" label="태스크">
                <q-badge>19</q-badge>
              </q-tab>
              <q-tab name="tabs3" label="멤버">
                <q-badge>0</q-badge>
              </q-tab>
            </q-tabs>
          </div>
          <div class="table_set">
            <div class="l_set_inner">
              <div class="c_inpgroup">
                <q-input outlined v-model="suffix" placeholder="이름, 상태, 생성자 검색">
                  <template v-slot:prepend>
                    <q-icon name="search" class="ico_search" />
                  </template>
                </q-input>
              </div>
            </div>

            <div class="r_set_inner">
              <div class="instance_make_btn">
                <q-btn
                  btnTypes="4"
                  type="button"
                  class="c_btn line medium"
                  @click="projectMemberAddModal = true"
                >
                  <span class="txt">멤버 추가하기</span>
                </q-btn>
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
                <span class="txt">{{ item.title }}</span>
              </template>
              <!-- email -->
              <template #item-email="item">
                <span class="txt">{{ item.email }}</span>
              </template>
              <!-- authority -->
              <template #item-authority="item">
                <span class="txt">{{ item.authority }}</span>
              </template>
              <!-- costumer -->
              <template #item-costumer="item">
                <span class="txt">{{ item.costumer }}</span>
              </template>
              <!-- 버튼 그룹 -->
              <template #item-buttons="item">
                <div v-if="actionButtons" class="cell btngroup">
                  <q-btn class="c_btn ibtn dot">
                    <i class="ico dots" /><span class="txt">클릭</span>
                    <q-popup-edit v-model="item.id" class="dots_menu" anchor="top right">
                      <q-list style="min-width: 100px">
                        <q-item v-for="button in actionButtons" :key="button.name">
                          <q-btn class="item" @click="onActions(button.event, item)">
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
import { ref, watch } from "vue";
import { useMeta } from "quasar";
import { useRoute } from "vue-router";
import { ProjectService } from "src/services";
import { $useCmFn } from "src/composables/useCommonFunction.js";

import ProjectDashboard from "src/components/pages/ProjectDashboard.vue";
// import CTable from "src/components/common/CTable.vue";
import CPagination from "components/common/CPagination.vue";
import CDropdown from "components/common/CDropdown.vue";
import CInputText from "components/common/CInputText.vue";

// import CDialog from "src/components/common/CDialog.vue";

const route = useRoute();
const { workspaceId, projectId } = route.params;

const projectInfo = ref({});

const projectCreateModal = ref(false);
const projectName = ref("");
const projectDescription = ref("");

const getListProject = ref([]);
const isValidProjectDescription = ref(true);
const isValidProjectSave = ref(true);

// 프로젝트 리스트
const getUserInfo = async () => {
  projectInfo.value = await ProjectService.getProject(
    route.params.workspaceId,
    route.params.projectId
  );

  console.log("projectInfo.valueprojectInfo.value", projectInfo.value);
  projectName.value = projectInfo.value.name;
  projectDescription.value = projectInfo.value.description;
};

const getProjectList = async () => {
  try {
    const { projects } = await ProjectService.getListProject(workspaceId);
    getListProject.value = projects;
  } catch (e) {
    console.log(e);
    return false;
  }
};

watch(
  () => route.params,
  async () => {
    // 해당 프로젝트 상세정보
    getUserInfo();
    getProjectList();
  },
  { immediate: true }
);

// 프로젝트 이름 중복 체크함수
function isDuplicateProjectName(name, projects) {
  return projects.find((p) => p.name === name) !== undefined;
}

// 프로젝트명 정규식체크
const inputRules = ref([
  (value) => {
    if (value.length < 1) {
      return "";
    }
    // 프로젝트 이름 중복확인
    const foundProject = isDuplicateProjectName(
      projectName.value.trim(),
      getListProject.value
    );

    // 사용 가능 문자열 확인
    return (
      (foundProject && projectName.value.trim() !== projectInfo.value.name
        ? "중복된 프로젝트 이름입니다."
        : /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]+$/.test(value))
      || "영어,한글,숫자만 입력 가능 합니다."
    );
  },
  (value) => (!!value.length && value.length >= 2 && value.length <= 30)
    || "최소 2글자 최대 30글자로 입력해주세요",
]);

// 프로젝트이름, 설명 정규식체크
watch(
  [projectName, projectDescription],
  ([projectNameValue, projectDescriptionValue]) => {
    const regex = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]+$/;
    // 프로젝트 이름 중복 확인
    const isDuplicate = isDuplicateProjectName(
      projectName.value.trim(),
      getListProject.value
    );
    const isValid = (!regex.test(projectName.value) && !isDuplicate)
      || projectNameValue <= 1
      || projectNameValue >= 30;
    isValidProjectDescription.value = isValid || isDuplicate;
    isValidProjectSave.value = isValid || isDuplicate || projectDescriptionValue.length <= 1;
  }
);

useMeta(() => ({
  title: projectInfo.value.name,
}));

const triggerSuccess = () => {
  $useCmFn.onNotify({
    message: "편집 내용이 저장되었습니다.",
    type: "positive",
  });
};
const triggerFail = () => {
  $useCmFn.onNotify({
    message: "저장에 실패하였습니다. 다시 시도해주세요.",
    type: "negative",
  });
};

// 프로젝트 수정
const updateProject = async () => {
  const params = {
    description: projectDescription.value,
    name: projectName.value,
  };

  try {
    await ProjectService.updateProject(workspaceId, projectId, params);
    setTimeout(() => {
      triggerSuccess();
    }, 100);
    getUserInfo();
  } catch (e) {
    triggerFail();
  }
};

const cancleProject = () => {
  projectName.value = projectInfo.value.name;
  projectDescription.value = projectInfo.value.description;
};

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
    text: "이름",
    value: "title",
    width: 200,
    sortable: true,
  },
  {
    text: "이메일",
    value: "email",
    width: 200,
    sortable: true,
  },
  {
    text: "프로젝트 권한",
    value: "authority",
    width: 200,
    sortable: true,
  },
  {
    text: "소개",
    value: "costumer",
    width: 200,
    sortable: false,
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
  { name: "권한변경", event: "authorityChange" },
  { name: "삭제", event: "delete" },
];

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
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
