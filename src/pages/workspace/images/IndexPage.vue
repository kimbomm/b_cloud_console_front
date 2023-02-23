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
              <MyPage :imageList="imageList" @onShare="onShare" @onDelete="onDelete" />
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
  <q-dialog v-model="imageShareMngModal" class="c_dialog medium">
    <q-card>
      <q-card-section class="c_dialog_body">
        <p class="title">
          <strong>내 이미지 공유 관리</strong>
        </p>
        <q-item-section class="item_card medium bg">
          <q-item-label class="name">{{ myWorkspaceName }}</q-item-label>
          <q-item-label class="desc">{{ myProjecteName }}</q-item-label>
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
                <q-checkbox v-model="chkAll" class="c_checkbox check_all" />
              </q-item>

              <template
                v-for="(innerProject, innerIndex) in project.projects"
                :key="innerIndex"
              >
                <q-item class="item subitem">
                  <i class="ico note" />
                  <q-item-section class="item_card">
                    <q-item-label class="name">{{ innerProject.name }}</q-item-label>
                    <q-item-label class="desc">{{ innerProject.description }}</q-item-label>
                  </q-item-section>
                  <q-checkbox class="c_checkbox" v-model="innerProject.checked" @click="getSharedTargets(innerProject)" />
                </q-item>
              </template>
            </template>
          </q-list>
        </section>
      </q-card-section>
      <q-card-actions class="c_dialog_foot">
        <q-btn label="취소" class="line" v-close-popup />
        <q-btn label="저장" class="primary" v-close-popup  />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- End : [내 이미지] 이미지 - 내이미지 - 공유관리 -->
</template>
<script setup>
import {
  ref, watch, onBeforeMount, reactive
} from "vue";
import { useMeta } from "quasar";
import {
  imageService, ProjectService, WorkspaceService
} from "src/services";
import { useRoute } from "vue-router";
import { $utils } from "src/utils/utils";

import CDropdown from "components/common/CDropdown.vue";
import CPagination from "src/components/common/CPagination.vue";
import MyPage from "./component/MyPage.vue";
import BasicPage from "./component/BasicPage.vue";
import SharedPage from "./component/SharedPage.vue";

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

// 탭
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

/* 팝업 */
const imageShareMngModal = ref(false);
const myWorkspaceName = ref("");
const myProjecteName = ref("");
const chkAll = ref(true);

const popupState = reactive({
  currentSharedData: null,
});

const fetchCurrentSharedData = (item) => {
  popupState.currentSharedData = item;
};

watch(imageShareMngModal, () => {
  myWorkspaceName.value = popupState.currentSharedData.base_image_name;
  myProjecteName.value = popupState.currentSharedData.description;
});

const onShare = (item) => {
  imageShareMngModal.value = true;
  fetchCurrentSharedData(item);
  console.log("onShare", item);
};

const onDelete = async (item) => {
  const response = await imageService.getSharedImages(workspaceId);
  console.log(response);

  console.log("onShare", item);
};

const mySharedProjects = ref({});
// 내 워크스페이스의 소속 프로젝트 리스트와 결합
const makeMyProjectList = async (projects) => {
  const promises = await projects?.map((project) => ProjectService.getListProject(project.project_id)) ?? [];
  const responses = await Promise.all(promises);
  const projectArrays = projects.map((project, index) => ({
    ...responses[index],
    ...project,
  }));
  console.log("projectArraysprojectArrays", projectArrays);
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

// 공유, 공유해제 함수
const shareOrUnshareWorkspaceImage = async (imgId, share) => {
  const data = {
    workspace_id: workspaceId,
    image_id: imgId
  };
  try {
    if (share) {
      console.log("share");
      await WorkspaceService.postShareWorkspaceImage(workspaceId, imgId, data);
    } else {
      console.log("unshare");

      await WorkspaceService.postUnShareWorkspaceImage(workspaceId, imgId, data);
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};
// 공유 이미지 리스트 클릭시
const getSharedTargets = (e) => {
  const imgId = e.id;

  if (e.checked) {
    console.log("checked true");
    shareOrUnshareWorkspaceImage(imgId, true);
  } else {
    console.log("checked fase");
    shareOrUnshareWorkspaceImage(imgId, false);
  }
};

onBeforeMount(() => {
  getMyproject();
});
</script>

<style lang="scss" scoped>
@import "src/css/table.scss";
@import "src/css/images.scss";
</style>
