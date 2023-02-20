<template>
  {{ imageList }}
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
            <q-tab name="tabs1" label="내이미지" />
            <q-tab name="tabs2" label="기본 이미지" />
            <q-tab name="tabs3" label="공유받은 이미지" />
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
            <div v-if="tab === 'tabs1'">
              <!-- 내이미지 -->
              <MyPage
                :imageList="imageList"
                :actionButtons="actionButtons"
                @showRow="showRow"
                @onActions="onActions"
              />

              <!-- 기본 이미지  -->
              <!-- 공유받은 이미지  -->
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

const imageList = ref([]);

const route = useRoute();
// 내 이미지 가져오기
const getMyImge = async () => {
  const { params } = route;
  try {
    const { images } = await imageService.getMyImages(params.workspaceId);
    imageList.value = images;
  } catch (e) {
    console.log(e.response);
  }
};

// 기본 이미지 가져오기
const getBaseImge = async () => {
  console.log(1);

  try {
    const response = await imageService.getBaseImages();
    imageList.value = response.base_images;
  } catch (e) {
    console.log(e.response);
  }
};
/*
탭
*/
const tab = ref("tabs1");
const getTab = () => {
  console.log("gettab");
  if (tab.value === "tabs1") {
    getMyImge();
  }
  if (tab.value === "tabs2") {
    getBaseImge();
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
