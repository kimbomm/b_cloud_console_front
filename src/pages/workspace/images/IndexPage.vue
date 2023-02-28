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
        <div class="group-tabs">
          <div class="header">
            <c-tab v-model:value="tabModel" :tabs="tabs" />
          </div>
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
              <CDropdown
                :label="optLabel"
                :options="optNumber"
                class="auto_size"
              />
            </div>
          </div>

          <section class="section">
            <div v-if="tabModel === 'myTab'">
              <!-- 내이미지 -->
              <MyPage
                :imageList="imageList"
                @onShare="onShare"
                @onDelete="onDelete"
                :getRowSelectedImage="getRowSelectedImage"
                @update:getRowSelectedImage="handleRowDataClick"
              />
            </div>
            <div v-if="tabModel === 'baseTab'">
              <!-- 기본 이미지  -->
              <BasicPage :imageList="imageList" />
            </div>
            <!-- 공유받은 이미지  -->
            <div v-if="tabModel === 'sharedTab'">
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
                  <q-item-label class="name">{{
                    project.project_name
                  }}</q-item-label>
                  <q-item-label class="desc">{{
                    project.workspace_name
                  }}</q-item-label>
                </q-item-section>
                <q-checkbox
                  v-model="isChkAll"
                  class="c_checkbox check_all"
                  @click="handleCheckGroupClick(index)"
                />
              </q-item>

              <template
                v-for="(innerProject, innerIndex) in project.projects"
                :key="innerIndex"
              >
                <q-item class="item subitem">
                  <i class="ico note" />
                  <q-item-section class="item_card">
                    <q-item-label class="name">{{
                      innerProject.name
                    }}</q-item-label>
                    <q-item-label class="desc">{{
                      innerProject.description
                    }}</q-item-label>
                  </q-item-section>

                  <q-checkbox
                    class="c_checkbox"
                    v-model="innerProject.checked"
                  />
                </q-item>
              </template>
            </template>
          </q-list>
        </section>
      </q-card-section>
      <q-card-actions class="c_dialog_foot">
        <q-btn label="취소" class="line" v-close-popup />
        <q-btn
          label="저장"
          class="primary"
          v-close-popup
          @click="imageShareManageSave"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- End : [내 이미지] 이미지 - 내이미지 - 공유관리 -->

  <!-- Start : 삭제 확인 알럿 -->
  <q-dialog v-model="alertImageDeleteModal" class="c_dialog">
    <q-card>
      <q-card-section style="max-height: 290px" class="c_dialog_body">
        <p class="title">
          <strong>이미지를 삭제하시겠습니까?</strong>
        </p>
        <div class="info">
          <strong>{{ currentImageTitle }}</strong>
        </div>
      </q-card-section>
      <q-card-actions class="c_dialog_foot">
        <q-btn
          label="취소"
          class="line"
          v-close-popup
          @click="deleteShareData(false)"
        />
        <q-btn
          label="삭제"
          class="primary"
          v-close-popup
          @click="deleteShareData(true)"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- End : 삭제 확인 알럿 -->

  <!-- Start : 공유 실패 리스트 팝업 -->
  <q-dialog v-model="alertTaskDeleteFailModal" class="c_dialog">
    <q-card>
      <q-card-section style="max-height: 290px" class="c_dialog_body">
        <p class="title">
          <strong>이미지 공유 실패</strong>
        </p>
        <p class="desc">
          공유설정에 실패한 워크스페이스/프로젝트가 있습니다. 다시 시도해주세요
        </p>
        <div class="info negative">
          <span
            v-for="(failedRequest, index) in failedRequests"
            :key="failedRequest"
            >{{ failedRequest.name
            }}{{ index !== failedRequests.length - 1 ? ", " : "" }}</span
          >
        </div>
      </q-card-section>
      <q-card-actions class="c_dialog_foot">
        <q-btn
          label="확인"
          class="primary"
          v-close-popup
          @click="triggerSharedImageFail()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- End : 공유 실패 리스트 팝업 -->
</template>
<script setup>
import {
  ref, watch, reactive, computed
} from "vue";
import { useMeta } from "quasar";
import { imageService, WorkspaceService, ProjectService } from "src/services";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { $utils } from "src/utils/utils";
import { $useCmFn } from "src/composables/useCommonFunction.js";

import CDropdown from "components/common/CDropdown.vue";
import CPagination from "src/components/common/CPagination.vue";
import CTab from "src/components/common/CTab.vue";
import MyPage from "./component/MyPage.vue";
import BasicPage from "./component/BasicPage.vue";
import SharedPage from "./component/SharedPage.vue";

const userId = 1; // 임시추가
const route = useRoute();
const { workspaceId } = route.params;

// 상태 state
const popupState = reactive({
  currentSharedData: null, // 공유관리 팝업 열 때 이미지 정보
});

const title = ref("Image");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const optLabel = ref("10");
const defaultData = ref(true);
const imageList = ref([]);

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
    [value.created_at]: $utils.paseseDate(
      item[value.created_at],
      value.dateType
    ),
  }));

  return updateImage;
};

// 내 이미지 가져오기
const getMyImge = async () => {
  try {
    const { images } = await imageService.getMyImages(workspaceId, userId);
    const updatedImages = $utils.sortType(
      transformDate({
        images,
        created_at: "created_at",
        dateType: "YYYY-MM-DD",
      }),
      "created_at",
      true,
      "datetime"
    );

    imageList.value = updatedImages;
  } catch (e) {
    console.log(e.response);
    return false;
  }
};

// 기본 이미지 가져오기
const getBaseImge = async () => {
  try {
    const { images } = await imageService.getBaseImages();
    imageList.value = images;
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
// 임시 추가
const getSharedImge = async () => {
  try {
    const response = await imageService.getSharedImages(workspaceId, userId);
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
/**
 * route hash값 존재시
 * tabModel 셋팅: 탭 이동
 */
const tabModel = ref("myTab");

const tabs = [
  { name: "myTab", label: "내이미지" },
  { name: "baseTab", label: "기본 이미지" },
  { name: "sharedTab", label: "공유받은 이미지" },
];
const getTabsName = computed(() => tabs.map((tab) => tab.name));
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
// route hash값 존재시 탭이동 끝

const getTab = () => {
  if (tabModel.value === "myTab") {
    getMyImge();
  }
  if (tabModel.value === "baseTab") {
    getBaseImge();
  }
  if (tabModel.value === "sharedTab") {
    getSharedImge();
  }
};

watch(tabModel, getTab);
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
const alertTaskDeleteFailModal = ref(false);

// 워크스페이스 이름, 워크스페이스 설명
watch(isImageShareManagePopup, () => {
  userWorkspaceName.value = popupState.currentSharedData.base_image.name;
  userProjecteName.value = popupState.currentSharedData.description;
});

const mySharedProjects = ref({}); // 내 워크스페이스 프로젝트 리스트
const alertImageDeleteModal = ref(false);
const currentImageTitle = ref("");

const triggerDeletedSuccess = () => {
  $useCmFn.onNotify({
    message: "이미지가 삭제되었습니다.",
    type: "positive",
  });
};

const triggerDeletedFails = () => {
  $useCmFn.onNotify({
    message: "이미지 삭제를 실패하였습니다. 다시 시도해주세요.",
    type: "negative",
  });
};
// 삭제버튼 alert
const onDelete = async () => {
  alertImageDeleteModal.value = true;
  currentImageTitle.value = popupState.currentSharedData.name;
};

const deleteShareData = async (value) => {
  const imgId = popupState.currentSharedData.id;

  if (value) {
    try {
      const data = {
        workspace_id: workspaceId,
        image_id: imgId,
      };
      await imageService.deleteImage(workspaceId, imgId, data);

      triggerDeletedSuccess();
      getMyImge();
    } catch (e) {
      triggerDeletedFails();
      return false;
    }
  }
};

// 내 워크스페이스의 소속 프로젝트 리스트와 결합 수정중!!
// const makeMyProjectList = async () => {
//   const promises = (await projects?.map(() => ProjectService.getListProject(workspaceId)))
//     ?? [];
//   const responses = await Promise.all(promises);

//   // projects 안에 checked 함수 추가
//   const updatedResponses = responses.map((item) => ({
//     ...item,
//     projects: item.projects.map((project) => ({
//       ...project,
//       checked: true,
//     })),
//   }));

//   // responses와 projects 병합
//   const projectArrays = updatedResponses.map((response, index) => ({
//     ...response,
//     ...projects[index],
//   }));

//   mySharedProjects.value = projectArrays;
//   return projectArrays;
// };

// 공유받은 이미지 정보 가져오기 !!오류
const getSahredImage = async (imgId) => {
  console.log("imgId", imgId);
  try {
    const aa = await imageService.getSahredInfoImage(workspaceId, 0);
    console.log("sdfsdf", aa);
  } catch (e) {
    console.log(e);
  }
};

//  내 프로젝트 가져오기
const getMyproject = async () => {
  try {
    const aa = await ProjectService.getUserProjects(workspaceId, userId);
    console.log("sdfsdfsdf", aa);
  } catch (e) {
    console.log(e);
    return null; // 에러 발생 시 null 반환
  }
};

const makeSharedImage = async (value) => {
  await getMyproject();
  await getSahredImage(value.id);
};

const handleRowDataClick = (value) => {
  popupState.currentSharedData = value;

  console.log("value", value);
  makeSharedImage(value);
};

// 공유관리 팝업클릭
const onShare = () => {
  isImageShareManagePopup.value = true;
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
    mySharedProjects.value = updateChecked(
      mySharedProjects.value,
      index,
      false
    );
  }
};

const failedRequests = ref([]); // 공유 실패 리스트

const triggerSharedSuccess = () => {
  $useCmFn.onNotify({
    message: "내 이미지 공유 설정이 저장되었습니다.",
    type: "positive",
  });
};
const triggerSharedImageFail = () => {
  $useCmFn.onNotify({
    message: "이미지 공유 설정에 실패하였습니다. 다시 시도해주세요.",
    type: "negative",
  });
  failedRequests.value = [];
};

// 공유 대상 저장, 공유해제 대상 axios 요청
// 질문 :: 실패 리스트를 공유,공유해제 둘다 리스트에 추가 해야하는지?
const handleShareImageRequests = async (trueList, falseList) => {
  try {
    await Promise.all(
      trueList.map(async (item) => {
        try {
          await WorkspaceService.postShareWorkspaceImage(workspaceId, item.id, {
            workspace_id: workspaceId,
            image_id: item.id,
          });
          triggerSharedSuccess();
        } catch (error) {
          failedRequests.value.push({ id: item.id, name: item.name });
          alertTaskDeleteFailModal.value = true;
          console.log(error);
        }
      })
    );
  } catch (error) {
    console.error(error);
  }

  await Promise.all(
    falseList.map(async (item) => {
      try {
        triggerSharedSuccess();
        await WorkspaceService.postUnShareWorkspaceImage(workspaceId, item.id, {
          workspace_id: workspaceId,
          image_id: item.id,
        });
      } catch (error) {
        failedRequests.value.push({ id: item.id, name: item.name });
        alertTaskDeleteFailModal.value = true;
        console.log(error);
      }
    })
  );
};

// 저장 시 checked true,false 각 배열 분리
const separateByChecked = () => {
  const result = mySharedProjects.value.reduce(
    (acc, curr) => {
      console.log("accacc", acc);

      const trueList = [];
      const falseList = [];
      curr.projects.forEach((project) => {
        console.log("projectprojectprojectproject", project);
        if (project.checked) {
          trueList.push({ id: project.id, name: project.name });
        } else {
          falseList.push({ id: project.id, name: project.name });
        }
      });
      acc.trueList.push(...trueList);
      acc.falseList.push(...falseList);

      return acc;
    },
    { trueList: [], falseList: [] }
  );
  handleShareImageRequests(result.trueList, result.falseList);
};

const imageShareManageSave = () => {
  separateByChecked();
};
</script>

<style lang="scss" scoped>
@import "src/css/table.scss";
@import "src/css/images.scss";
</style>
