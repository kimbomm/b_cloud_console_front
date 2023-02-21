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
              <CDropdown
                :label="optLabel"
                :options="optNumber"
                class="auto_size"
              />
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
              <SharedPage
                :imageList="imageList"
                :actionButtons="actionButtons"
                @showRow="showRow"
              />
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
import CDropdown from "components/common/CDropdown.vue";
import CPagination from "src/components/common/CPagination.vue";

import { imageService } from "src/services";
import { useRoute } from "vue-router";
import MyPage from "./MyPage.vue";
import BasicPage from "./BasicPage.vue";
import SharedPage from "./SharedPage.vue";

const route = useRoute();
const { params } = route;
const imageList = ref([]);

// const addr = [
//   {
//     base_image_name: "1111111",
//     created_at: "2021-02-07T23:16:40Z",
//     description: "common image",
//     id: 3,
//     name: "common_image",
//     status: "saved",
//     tag: "b3ba43af",
//   },
//   {
//     base_image_name: "222222",
//     created_at: "2023-02-07T23:16:40Z",
//     description: "common image",
//     id: 3,
//     name: "common_image",
//     status: "saved",
//     tag: "b3ba43af",
//   },
//   {
//     base_image_name: "33333",
//     created_at: "2023-02-07T23:16:40Z",
//     description: "common image",
//     id: 3,
//     name: "common_image",
//     status: "saved",
//     tag: "b3ba43af",
//   },
//   {
//     base_image_name: "44444",
//     created_at: "2023-02-07T23:16:40Z",
//     description: "common image",
//     id: 3,
//     name: "common_image",
//     status: "saved",
//     tag: "b3ba43af",
//   },

//   {
//     base_image_name: "555555",
//     created_at: "2021-02-07T23:16:40Z",
//     description: "common image",
//     id: 3,
//     name: "common_image",
//     status: "saved",
//     tag: "b3ba43af",
//   },
//   {
//     base_image_name: "66666",
//     created_at: "2023-02-07T23:16:40Z",
//     description: "common image",
//     id: 3,
//     name: "common_image",
//     status: "saved",
//     tag: "b3ba43af",
//   },
//   {
//     base_image_name: "777777",
//     created_at: "2023-02-07T23:16:40Z",
//     description: "common image",
//     id: 3,
//     name: "common_image",
//     status: "saved",
//     tag: "b3ba43af",
//   },
//   {
//     base_image_name: "88888",
//     created_at: "2023-02-07T23:16:40Z",
//     description: "common image",
//     id: 3,
//     name: "common_image",
//     status: "saved",
//     tag: "b3ba43af",
//   },
// ];

// 내 이미지 가져오기
const getMyImge = async () => {
  try {
    const { images } = await imageService.getMyImages(params.workspaceId);

    imageList.value = images;
  } catch (e) {
    console.log(e.response);
  }
};

// 기본 이미지 가져오기
const getBaseImge = async () => {
  try {
    const response = await imageService.getBaseImages();
    imageList.value = response.base_images;
    console.log("response", response.base_images);
  } catch (e) {
    console.log(e.response);
  }
};

// 공유받은 이미지 가져오기
const getSharedImge = async () => {
  try {
    const response = await imageService.getSharedImages(params.workspaceId);
    imageList.value = response.shared_images;
  } catch (e) {
    console.log(e.response);
  }
};

/*
탭
*/
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

/*
------------------------sample--------------------
*/

const title = ref("Image");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const optLabel = ref("10");
const defaultData = ref(true);

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
 * 설명: 복사하기 버튼 이벤트
 * @param { object } rowData get table row data
 */

/**
 * 설명: row Action 버튼 이벤트
 * @param { string } eventName action event name
 * @param { object } rowData get table row data
 */
const onActions = (eventName, rowData) => {
  console.log(eventName, rowData);
};

const showRow = (item) => {
  console.log(item);
};
</script>

<style lang="scss" scoped>
@import "src/css/table.scss";
@import "src/css/images.scss";
</style>
