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
      <div class="tab_area">
        <c-tab v-model:value="tabModel" :tabs="tabs" />
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
            <c-dropdown
              :label="optLabel"
              :options="optNumber"
              class="auto_size"
            />
          </div>
        </div>
        <q-tab-panels v-model="tabModel">
          <q-tab-panel name="myTab">
            <!-- 내이미지 -->
            <MyPage />
          </q-tab-panel>
          <q-tab-panel name="baseTab">
            <!-- 기본 이미지 -->
            <BasicPage />
          </q-tab-panel>
          <q-tab-panel name="sharedTab">
            <!-- 공유받은 이미지 -->
            <SharedPage />
          </q-tab-panel>
        </q-tab-panels>
      </template>
    </div>
  </q-page>
</template>
<script setup>
import { ref, computed } from "vue";
import { useMeta } from "quasar";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { $utils } from "src/utils/utils";

import CTab from "src/components/common/CTab.vue";

import MyPage from "./components/MyPage.vue";
import BasicPage from "./components/BasicPage.vue";
import SharedPage from "./components/SharedPage.vue";

const route = useRoute();

const title = ref("Image");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);

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
</script>

<style lang="scss" scoped>
@import "src/css/table.scss";
@import "src/css/images.scss";
</style>
