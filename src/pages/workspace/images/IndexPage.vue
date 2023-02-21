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
                :actionButtons="actionButtons"
                @showRow="showRow"
                @onActions="onActions"
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
</template>
<script setup>
import { ref, watch } from "vue";
import { useMeta } from "quasar";
import { imageService } from "src/services";
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

    imageList.value = updatedImages;
  } catch (e) {
    console.log(e.response);
  }
};

// 기본 이미지 가져오기
const getBaseImge = async () => {
  try {
    const response = await imageService.getBaseImages();
    imageList.value = response.base_images;
  } catch (e) {
    console.log(e.response);
  }
};

// 공유받은 이미지 공유자 정보 이름(이메일)
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

const actionButtons = [
  { name: "공유관리", event: "share" },
  { name: "삭제", event: "delete" },
];

/**
 * 설명: row Action 버튼 이벤트
 * @param { string } eventName action event name
 * @param { object } rowData get table row data
 */
const onActions = (eventName, rowData) => {
  console.log(eventName, rowData);
};

/**
 * 설명: 복사하기 버튼 이벤트
 * @param { object } rowData get table row data
 */
const showRow = (item) => {
  console.log("showRow", item);
};
</script>

<style lang="scss" scoped>
@import "src/css/table.scss";
@import "src/css/images.scss";
</style>
