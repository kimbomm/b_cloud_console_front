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
              <MyPage
                :imageList="imageList"
                @onShare="onShare"
                @onDelete="onDelete"

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
    <q-dialog
      v-model="imageShareMngModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>내 이미지 공유 관리</strong>
          </p>
          <q-item-section class="item_card medium bg">
            <q-item-label class="name">{{ itemImageName }}</q-item-label>
            <q-item-label class="desc">{{ itemImageDesc }}</q-item-label>
          </q-item-section>
          <section class="section">
            <p class="sub_title">공유 여부</p>
            <q-list class="p_list share">
              <q-item class="item chkall">
                <i class="ico folder" />
                <q-item-section class="item_card">
                  <q-item-label class="name">{{ itemName }}</q-item-label>
                  <q-item-label class="desc">{{ itemDesc }}</q-item-label>
                </q-item-section>
                <q-checkbox
                  v-model="chkAll"
                  class="c_checkbox check_all"
                />
              </q-item>
              <q-item class="item subitem">
                <i class="ico note" />
                <q-item-section class="item_card">
                  <q-item-label class="name">{{ itemName1 }}</q-item-label>
                  <q-item-label class="desc">{{ itemDesc1 }}</q-item-label>
                </q-item-section>
                <q-checkbox
                  v-model="chk1"
                  disable
                  class="c_checkbox"
                />
              </q-item>
              <q-item class="item subitem">
                <i class="ico note" />
                <q-item-section class="item_card">
                  <q-item-label class="name">{{ itemName2 }}</q-item-label>
                  <q-item-label class="desc">{{ itemDesc1 }}</q-item-label>
                </q-item-section>
                <q-checkbox
                  v-model="chk2"
                  disable
                  class="c_checkbox"
                />
              </q-item>
              <q-item class="item subitem">
                <i class="ico note" />
                <q-item-section class="item_card">
                  <q-item-label class="name">{{ itemName3 }}</q-item-label>
                  <q-item-label class="desc">{{ itemDesc1 }}</q-item-label>
                </q-item-section>
                <q-checkbox
                  v-model="chk3"
                  disable
                  class="c_checkbox"
                />
              </q-item>
            </q-list>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="저장"
            class="primary"
            v-close-popup
          />
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
import { imageService, UserService } from "src/services";
import { useRoute } from "vue-router";
import { $utils } from "src/utils/utils";

import CDropdown from "components/common/CDropdown.vue";
import CPagination from "src/components/common/CPagination.vue";
import MyPage from "./component/MyPage.vue";
import BasicPage from "./component/BasicPage.vue";
import SharedPage from "./component/SharedPage.vue";

const route = useRoute();
const { params } = route;

const title = ref("Image");
useMeta(() => ({
  title: title.value,
}));

const userInfo = ref({
  user: {}
});

const ptitle = ref(title);
const optLabel = ref("10");
const defaultData = ref(true);
const imageList = ref([]);

const bbbb = [
  {
    id: 4,
    name: "common_image1111",
    description: "common image11111image11111image11111image1 1111image11111image1111 1 image11111image1111 1image11111image11111image11111image11111image11111image11111image11 111image11111",
    status: "error",
    base_image_name: "base_image_name1",
    tag: "b3ba43af",
    created_at: "2023-02-07T23:16:40Z"
  },
  {
    id: 3,
    name: "네임 안녕",
    description: "common image2222image2222image2222im age222image2222im age2222image2222image2222image 22222 image2222",
    status: "saved",
    base_image_name: "base_image_name222",
    tag: "b3ba43af",
    created_at: "2023-02-07T23:16:40Z"
  },
  {
    id: 3,
    name: "네임 안녕",
    description: "common image333",
    status: "saved",
    base_image_name: "base_image_name2223333",
    tag: "b3ba43af",
    created_at: "2023-02-07T23:16:40Z"
  },
  {
    id: 3,
    name: "네임 안녕",
    description: "common image44444",
    status: "saving",
    base_image_name: "44444",
    tag: "ㅁㅁ",
    created_at: "2023-02-07T23:16:40Z"
  },
  {
    id: 3,
    name: "네임 안녕",
    description: "common image5555",
    status: "error",
    base_image_name: "5555",
    tag: "ㅠㅠㅠㅠ",
    created_at: "2023-02-07T23:16:40Z"
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
    const { images } = await imageService.getMyImages(params.workspaceId);
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
    const response = await imageService.getSharedImages(params.workspaceId);
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

//  유저정보 가져오기
const fetchUserInfo = async () => {
  try {
    const user = await UserService.getMe();
    userInfo.value = {
      user
    };
  } catch (e) {
    console.log(e);
    return false;
  }
};
onBeforeMount(() => {
  fetchUserInfo();
});

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
const itemImageName = ref("내이미지 01");
const itemImageDesc = ref(
  "내 이미지 테스트 01 (tensorflow 2.9.0, Karlo 테스트용)"
);
const itemName = ref("카카오모빌리티 워크스페이스");
const itemName1 = ref("aaTEST");
const itemName2 = ref("MLTEST");
const itemName3 = ref("aa팀 프로젝트");
const itemDesc = ref("워크스페이스");
const itemDesc1 = ref("소속 프로젝트");
const chkAll = ref(true);
const chk1 = ref(true);
const chk2 = ref(true);
const chk3 = ref(true);

const popupState = reactive({
  currentSharedData: null,
});

const onShare = (item) => {
  imageShareMngModal.value = true;
  popupState.currentSharedData = item;
  console.log("onShare", item);
};

const onDelete = (item) => {
  console.log("onShare", item);
};

watch(imageShareMngModal, () => {
  itemImageName.value = popupState.currentSharedData.base_image_name;
  itemImageDesc.value = popupState.currentSharedData.description;
});

</script>

<style lang="scss" scoped>
@import "src/css/table.scss";
@import "src/css/images.scss";
</style>
