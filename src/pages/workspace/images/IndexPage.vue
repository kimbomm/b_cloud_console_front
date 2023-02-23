<template>
  <q-page class="p-content p-images p-index">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Projects" to="/" />
        <q-breadcrumbs-el label="images" to="/images/" />
        <q-breadcrumbs-el label="내 이미지" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="container">
        <div class="header">
          <q-tabs v-model="tab" align="left" class="c_tabs">
            <q-tab name="myTab" label="내이미지" />
            <q-tab name="baseTab" label="기본 이미지" />
            <q-tab name="sharedTab" label="공유받은 이미지" />
          </q-tabs>
        </div>
        <template v-if="defaultData == true">
          <div class="table_set">
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="suffix"
                placeholder="이름,설명,기본이미지 검색"
                clearable
                class="wsize_full"
              >
                <template v-slot:prepend>
                  <q-icon name="search" class="ico_search" />
                </template>
              </q-input>
            </div>
            <div class="select_drop">
              <CDropdown :label="optLabel" :options="optNumber" class="auto_size" />
            </div>
          </div>

          <section class="section">
            <div v-if="tab === 'myTab'">
              <!-- 내이미지 -->
              <MyPage :imageList="imageList" @onShare="onShare" @onDelete="onDelete"
              :getRowSelectedImage="getRowSelectedImage" @update:getRowSelectedImage="handleRowDataClick"

              />
            </div>
            <div v-if="tab === 'baseTab'">
              <!-- 기본 이미지  -->
              <BasicPage :imageList="imageList" />
            </div>
            <!-- 공유받은 이미지  -->
            <div v-if="tab === 'sharedTab'">
              <SharedPage :imageList="imageList" />
            </div>
          </section>
          <div class="table_pagenav disflex_C">
            <CPagination />
          </div>
        </template>
        <template v-else>
          <div class="com_nondata_area">
            <div class="nondata_box">
              <p class="nondata_txt">생성한 내 이미지가 없습니다.</p>
            </div>
          </div>
        </template>
      </div>
    </div>
  </q-page>

  <!-- Start : [내 이미지] 이미지 - 내이미지 - 공유관리 -->
  <q-dialog v-model="isImageShareManagePopup" class="c_dialog medium">
    <q-card>
      <q-card-section class="c_dialog_body">
        <p class="title">
          <strong>내 이미지 공유 관리</strong>
        </p>
        <q-item-section class="item_card medium bg">
          <q-item-label class="name">{{ userWorkspaceName }}</q-item-label>
          <q-item-label class="desc">{{ userProjecteName }}</q-item-label>
        </q-item-section>
        <section class="section">
          <p class="sub_title">공유 여부</p>
          <q-list class="p_list share">
            <template v-for="(project, index) in mySharedProjects" :key="index">
              <q-item class="item chkall">
                <i class="ico folder" />
                <q-item-section class="item_card">
                  <q-item-label class="name">{{ project.project_name }}</q-item-label>
                  <q-item-label class="desc">{{ project.workspace_name }}</q-item-label>
                </q-item-section>
                <q-checkbox v-model="isChkAll" class="c_checkbox check_all" @click="handleCheckGroupClick(index)" />
              </q-item>

              <template
                v-for="(innerProject, innerIndex) in project.projects"
                :key="innerIndex"
              >
                <q-item class="item subitem">
                  <i class="ico note" />
                  <q-item-section class="item_card">
                    <q-item-label class="name">{{ innerProject.name }}</q-item-label>
                    <q-item-label class="desc">{{
                      innerProject.description
                    }}</q-item-label>
                  </q-item-section>

                  <q-checkbox
                    class="c_checkbox"
                    v-model="innerProject.checked"
                    @click="handleSharedTargetClick(innerProject)"
                  />
                </q-item>
              </template>
            </template>
          </q-list>
        </section>
      </q-card-section>
      <q-card-actions class="c_dialog_foot">
        <q-btn label="취소" class="line" v-close-popup />
        <q-btn label="저장" class="primary" v-close-popup @click="imageShareManageSave"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- End : [내 이미지] 이미지 - 내이미지 - 공유관리 -->

<!-- 공유 리스트 삭제 버튼 클릭 시  -->
  <YesNoPopup
    title="이미지를 삭제하시겠습니까?"
    v-model="isDeleteAlert"
    state="delete"
    :info="deleteAlertTitle"
    @handleDeleteClick="handleDeleteClick"
  >
  </YesNoPopup>

<!-- 이미지 공유 실패시 -->
  <!-- <YesNoPopup
    title="이미지를 삭제하시겠습니까?"
    v-model="isDeleteAlert"
    state="delete"
    :info="deleteAlertTitle"
    @handleDeleteClick="handleDeleteClick"
  >
  </YesNoPopup> -->
</template>
<script setup>
import {
  ref, watch, reactive
} from "vue";
import { useMeta } from "quasar";
import { imageService, ProjectService, WorkspaceService } from "src/services";
import { useRoute } from "vue-router";
import { $utils } from "src/utils/utils";
import { $useCmFn } from "src/composables/useCommonFunction.js";

import CDropdown from "components/common/CDropdown.vue";
import CPagination from "src/components/common/CPagination.vue";
import MyPage from "./component/MyPage.vue";
import BasicPage from "./component/BasicPage.vue";
import SharedPage from "./component/SharedPage.vue";
import YesNoPopup from "./component/YesNoPopup.vue";

const route = useRoute();
const { workspaceId } = route.params;

const title = ref("Image");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const optLabel = ref("10");
const defaultData = ref(true);
const imageList = ref([]);

const bbbb = [
  {
    id: 4,
    name: "common_image1111",
    description:
      "common image11111image11111image11111image1 1111image11111image1111 1 image11111image1111 1image11111image11111image11111image11111image11111image11111image11 111image11111",
    status: "error",
    base_image_name: "base_image_name1",
    tag: "b3ba43af",
    created_at: "2023-02-07T23:16:40Z",
  },
  {
    id: 3,
    name: "네임 안녕",
    description:
      "common image2222image2222image2222im age222image2222im age2222image2222image2222image 22222 image2222",
    status: "saved",
    base_image_name: "base_image_name222",
    tag: "b3ba43af",
    created_at: "2023-02-07T23:16:40Z",
  },
  {
    id: 3,
    name: "네임 안녕",
    description: "common image333",
    status: "saved",
    base_image_name: "base_image_name2223333",
    tag: "b3ba43af",
    created_at: "2023-02-07T23:16:40Z",
  },
  {
    id: 3,
    name: "네임 안녕",
    description: "common image44444",
    status: "saving",
    base_image_name: "44444",
    tag: "ㅁㅁ",
    created_at: "2023-02-07T23:16:40Z",
  },
  {
    id: 3,
    name: "네임 안녕",
    description: "common image5555",
    status: "error",
    base_image_name: "5555",
    tag: "ㅠㅠㅠㅠ",
    created_at: "2023-02-07T23:16:40Z",
  },
];

/**
 * 설명 : object 안에 데이터 속성 명을 입력하면
 * YYYY-MM-DD로 변경 후 새로운 object 생성
 * @param { Object } value
 * @param { Object } created_at
 */
const transformDate = (value) => {
  const { images } = value;
  const updateImage = images.map((item) => ({
    ...item,
    [value.created_at]: $utils.paseseDate(item[value.created_at], value.dateType),
  }));

  return updateImage;
};

// 내 이미지 가져오기
const getMyImge = async () => {
  try {
    const { images } = await imageService.getMyImages(workspaceId);
    const updatedImages = transformDate({
      images,
      created_at: "created_at",
      dateType: "YYYY-MM-DD",
    });
    // * 임시 테스트 데이터 추가
    imageList.value = Object.assign(bbbb, updatedImages);
  } catch (e) {
    console.log(e.response);
    return false;
  }
};

// 기본 이미지 가져오기
const getBaseImge = async () => {
  try {
    const response = await imageService.getBaseImages();
    imageList.value = response.base_images;
  } catch (e) {
    console.log(e.response);
    return false;
  }
};

// 공유자 정보 이름(이메일) 형식으로 변경
const setImagesWithSharedUser = (updatedImages) => {
  const extractSharedUser = (item) => {
    const { email, name } = item.shared_user;
    return { sharedUserWithEmail: `${name}(${email})` };
  };
  const updateSahredUser = updatedImages.map((item) => ({
    ...item,
    ...extractSharedUser(item),
  }));

  return updateSahredUser;
};

// 공유받은 이미지 가져오기
const getSharedImge = async () => {
  try {
    const response = await imageService.getSharedImages(workspaceId);
    const images = response.shared_images;
    const updatedImages = transformDate({
      images,
      created_at: "shared_at",
      dateType: "YYYY-MM-DD HH:mm:ss",
    });

    imageList.value = setImagesWithSharedUser(updatedImages);
  } catch (e) {
    console.log(e.response);
    return false;
  }
};

// 이미지 탭
const tab = ref("myTab");
const getTab = () => {
  if (tab.value === "myTab") {
    getMyImge();
  }
  if (tab.value === "baseTab") {
    getBaseImge();
  }
  if (tab.value === "sharedTab") {
    getSharedImge();
  }
};

watch(tab, getTab);
getTab();

// n개씩 보기
const optNumber = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);

/* 공유관리 팝업 */
const isImageShareManagePopup = ref(false);
const userWorkspaceName = ref("");
const userProjecteName = ref("");
const isChkAll = ref(true);
const getRowSelectedImage = ref({});

// 상태 state
const popupState = reactive({
  currentSharedImageData: null, // 공유관리 팝업 열 때 이미지 정보
});

// 워크스페이스 이름, 워크스페이스 설명
watch(isImageShareManagePopup, () => {
  userWorkspaceName.value = popupState.currentSharedImageData.base_image_name;
  userProjecteName.value = popupState.currentSharedImageData.description;
});

const isDeleteAlert = ref(false);
const deleteAlertTitle = ref("");

// 삭제버튼 alert
const onDelete = async () => {
  isDeleteAlert.value = true;
  deleteAlertTitle.value = popupState.currentSharedImageData.name;
};

const triggerSuccess = () => {
  $useCmFn.onNotify({
    message: "이미지가 삭제되었습니다.",
    type: "positive",
  });
};

const triggerWarning = () => {
  $useCmFn.onNotify({
    message: "이미지 삭제를 실패하였습니다. 다시 시도해주세요.",
    type: "negative",
  });
};
const handleDeleteClick = (value) => {
  if (value) {
    triggerSuccess();
    getMyImge();
  } else {
    triggerWarning();
  }
};

const mySharedProjects = ref({}); // 내 워크스페이스 프로젝트 리스트

// 내 워크스페이스의 소속 프로젝트 리스트와 결합
const makeMyProjectList = async (projects) => {
  const promises = (await projects?.map(() => ProjectService.getListProject(workspaceId))) ?? [];
  const responses = await Promise.all(promises);

  // projects 안에 checked 함수 추가
  const updatedResponses = responses.map((item) => ({
    ...item,
    projects: item.projects.map((project) => ({
      ...project,
      checked: true
    }))
  }));

  // responses와 projects 병합
  const projectArrays = updatedResponses.map((response) => ({
    ...response,
    ...projects[0]
  }));

  mySharedProjects.value = projectArrays;
  return projectArrays;
};

//  내 프로젝트 가져오기
const getMyproject = async () => {
  try {
    const { projects } = await ProjectService.getProjects();
    makeMyProjectList(projects);
  } catch (e) {
    console.log(e);
    return false;
  }
};

const handleRowDataClick = (value) => {
  popupState.currentSharedImageData = value;
};
// 공유관리 팝업
const onShare = () => {
  isImageShareManagePopup.value = true;
  getMyproject();
};

// index 번째에 따라 그룹 전체 선택
function updateChecked(data, index, checked) {
  const updatedData = data.map((item, i) => ({
    ...item,
    projects: item.projects.map((project) => ({
      ...project,
      checked: i === index ? checked : project.checked,
    })),
  }));
  return updatedData;
}

// 그룹 전체 선택 시
const handleCheckGroupClick = (index) => {
  if (isChkAll.value) {
    mySharedProjects.value = updateChecked(mySharedProjects.value, index, true);
  } else {
    mySharedProjects.value = updateChecked(mySharedProjects.value, index, false);
  }
};

// 공유 대상 저장, 공유해제 대상 저장

const ApiShareImage = async (trueIds, falseIds) => {
  const result1 = await Promise.all(
    trueIds.map(async (item) => WorkspaceService.postShareWorkspaceImage(workspaceId, item))
  );
  const result2 = await Promise.all(
    falseIds.map(async (item) => WorkspaceService.postUnShareWorkspaceImage(workspaceId, item))
  );
  console.log("result1", result1);
  console.log("result2", result2);
};

// 저장 시 checked true,false 각 배열 분리
const imageShareManageSave = () => {
  const result = mySharedProjects.value.reduce((acc, curr) => {
    const trueIds = [];
    const falseIds = [];

    curr.projects.forEach((project) => {
      if (project.checked) {
        trueIds.push(project.id);
      } else {
        falseIds.push(project.id);
      }
    });

    acc.trueIds.push(...trueIds);
    acc.falseIds.push(...falseIds);

    return acc;
  }, { trueIds: [], falseIds: [] });

  console.log("true선택", result.trueIds); // true일 경우 배열
  console.log("false선택", result.falseIds); // faslse일 경우 배열
  ApiShareImage(result.trueIds, result.falseIds);
};

</script>

<style lang="scss" scoped>
@import "src/css/table.scss";
@import "src/css/images.scss";
</style>
