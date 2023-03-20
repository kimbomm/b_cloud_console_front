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
        <div class="tab_area">
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
              <c-dropdown
                :label="optLabel"
                :options="optNumber"
                class="auto_size"
              />
            </div>
          </div>
          <div class="table_inner">
            <EasyDataTable
              :headers="headers"
              :items="items"
              :hide-footer="true"
              empty-message="정보가 없습니다."
              @click-row="showRow"
            >
              <!-- id -->
              <template #item-id="item">
                <span class="txt">{{ item.id }}</span>
              </template>
              <!-- title -->
              <template #item-title="item">
                <a href="#">
                  <span class="txt">{{ item.title }}</span>
                  <q-tooltip anchor="bottom middle" class="c_tooltip">
                    <div class="inner">
                      {{ item.title }}
                    </div>
                  </q-tooltip>
                </a>
              </template>
              <!--
                상태값(status)
                1. save, 저장(개인)
                2. save_s, 저장(공유)
                3. error, 오류
                4. saving, 저장중
              -->
              <template #item-status="item">
                <q-badge v-if="item.status === 'save'" class="green">
                  <span class="txt">저장(개인)</span>
                </q-badge>
                <q-badge v-if="item.status === 'save_s'" class="green">
                  <span class="txt">저장(공유)</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'error'" class="orange">
                  <span class="txt">오류</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'saving'" class="c_badge">
                  <span class="txt">저장중</span>
                </q-badge>
              </template>
              <!-- image -->
              <template #item-image="item">
                <a href="#">
                  <span class="txt">{{ item.image }}</span>
                </a>
              </template>
              <!-- createdAt -->
              <template #item-createdAt="item">
                <span class="txt">{{ item.createdAt }}</span>
              </template>
              <!-- 버튼 그룹 -->
              <template #item-buttons="item">
                <div v-if="actionButtons" class="cell btngroup">
                  <q-btn class="c_btn ibtn dot">
                    <i class="ico dots" /><span class="txt">클릭</span>
                    <q-popup-edit
                      v-model="item.id"
                      class="dots_menu"
                      anchor="top right"
                    >
                      <q-list style="min-width: 100px">
                        <q-item
                          v-for="button in actionButtons"
                          :key="button.name"
                        >
                          <q-btn
                            class="item"
                            @click="onActions(button.event, item)"
                          >
                            <span class="txt">{{ button.name }}</span>
                          </q-btn>
                        </q-item>
                      </q-list>
                    </q-popup-edit>
                  </q-btn>
                </div>
              </template>
            </EasyDataTable>
            <c-pagination />
          </div>
        </template>
        <template v-else>
          <div class="nondata_box">
            <p class="nondata_txt">생성한 내 이미지가 없습니다.</p>
          </div>
        </template>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CDropdown from "components/common/CDropdown.vue";
import CPagination from "src/components/common/CPagination.vue";

const title = ref("Image");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const tab = ref("tabs1");
const optLabel = ref("10");
const defaultData = ref(true);

const headers = [
  {
    text: "이름",
    value: "id",
    width: 150,
    sortable: true,
  },
  {
    text: "설명",
    value: "title",
    width: 230,
    widthAuto: true,
  },
  {
    text: "상태",
    value: "status",
  },
  {
    text: "이미지",
    value: "image",
    sortable: true,
  },
  {
    text: "생성일시",
    value: "createdAt",
    width: 190,
    widthAuto: true,
    sortable: true,
  },
  { text: "", value: "buttons" },
];
const items = [
  {
    id: "내이미지01",
    title:
      "테스트용 이미지 생성 테스트 테스트테스트용 이미지 생성 테스트 테스트테스트용 이미지 생성 테스트 테스트테스트용 이미지 생성 테스트 테스트테스트용",
    status: "saving",
    image:
      "tensorflow 2.9.0(python3, cuda11.2, ubutun20.04)tensorflow 2.9.0(python3, cuda11.2, ubutun20.04) ",
    createdAt: "2023.01.12 10:33:21",
  },
  {
    id: "내이미지01",
    title:
      "테스트용 이미지 생성 테스트 테스트테스트용 이미지 생성 테스트 테스트테스트용 이미지 생성 테스트 테스트테스트용 이미지 생성 테스트 테스트테스트용",
    status: "save",
    image:
      "tensorflow 2.9.0(python3, cuda11.2, ubutun20.04)tensorflow 2.9.0(python3, cuda11.2, ubutun20.04) ",
    createdAt: "2023.01.12 10:33:21",
  },
  {
    id: "내이미지02",
    title: "테스트용 이미지 생성 테스트 테스트테스트용 테스트용 이미지 생성 ",
    status: "save_s",
    image:
      "tensorflow 2.9.0(python3, cuda11.2, ubutun20.04)tensorflow 2.9.0(python3, cuda11.2, ubutun20.04)",
    createdAt: "2023.01.12 10:33:21",
  },
  {
    id: "내이미지03",
    title: "테스트용 이미지 생성  ",
    status: "error",
    image: "tensorflow 2.9.0(python3, cuda11.2, ubutun20.04)",
    createdAt: "2023.01.12 10:33:21",
  },
];

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
//@import "src/css/images.scss";
@import "src/css/page.scss";
</style>
