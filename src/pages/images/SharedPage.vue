<template>
  <q-page class="p-content p-images p-index">
    <div class="p-head">
      <q-breadcrumbs
        class="c_breadcrumb"
        gutter="none"
      >
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
                <q-tab name="tabs1" label="내이미지"/>
                <q-tab name="tabs2" label="기본 이미지"/>
                <q-tab name="tabs3" label="공유받은 이미지"/>
            </q-tabs>
        </div>
        <div class="table_set">
          <div class="c_inpgroup">
            <q-input
                outlined="outlined"
                v-model="suffix"
                placeholder="이름, 설명, 공유자 검색"
                clearable="clearable"
                class="wsize_full">
                <template v-slot:prepend>
                    <q-icon name="search" class="ico_search"/>
                </template>
            </q-input>
          </div>
          <div class="select_drop">
            <CDropdown :label="optLabel" :options="optNumber" class="auto_size"/>
          </div>
        </div>
        <section class="section">
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
                  <div class="inner">{{ item.title }}</div>
                </q-tooltip>
              </a>
            </template>
            <!-- image -->
            <template #item-image="item">
              <span class="txt">{{ item.image }}</span>
            </template>

            <!-- sharedBy -->
            <template #item-sharedBy="item">
              <span class="txt">{{ item.sharedBy }}</span>
            </template>
            <!-- sharedAt -->
            <template #item-sharedAt="item">
              <span class="txt clip">{{ item.sharedAt }}</span>
            </template>
          </EasyDataTable>
        </section>
        <div class="table_pagenav disflex_C">
          <CPagination />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup="setup">
import { ref } from "vue";
import { useMeta } from "quasar";
import CDropdown from "components/common/CDropdown.vue";
import CPagination from "src/components/common/CPagination.vue";

const title = ref("Image");
useMeta(() => ({ title: title.value }));

const ptitle = ref(title);
const tab = ref("tabs3");
const optLabel = ref("10");

const headers = [
  {
    text: "이름", value: "id", width: 140, sortable: true
  },
  {
    text: "설명", value: "title", width: 340
  },
  {
    text: "이미지", value: "image", width: 350, sortable: true
  },
  {
    text: "공유자", value: "sharedBy", width: 250, sortable: true
  },
  {
    text: "공유일시", value: "sharedAt", width: 150, sortable: true
  }
];
const items = [
  {
    id: "내이미지01",
    title: "테스트용 이미지 생성 테스트 테스트테스트용 테스트용 이미지 생성테스트용 이미지 생성테스트용 이미지 생성 ",
    image: "tensorflow 2.9.0(python3, cuda11.2, ubutun20.04) ",
    sharedBy: "김카브(root.choi@kakaobrain.com)",
    sharedAt: "2023.10.11 12:30:31"
  }, {
    id: "내이미지02",
    title: "테스트용 이미지 생성 테스트 테스트테스트용 이미지 생성 테스트 테스트테스트용 이미지테스트용 이미지 생성 테스트 테스트테스트용 이미지 생성",
    image: "tensorflow 2.9.0(python3, cuda11.2, ubutun20.04)",
    sharedBy: "ewa(ewa.e@gmail.com)",
    sharedAt: "2023.10.11 12:30:31"
  }, {
    id: "내이미지03",
    title: "테스트용 이미지 생성 테스트 테스트테스트용 테스트용 이미지 생성 ",
    image: "tensorflow 2.9.0(python3, cuda11.2, ubutun20.04)",
    sharedBy: "ewa(ewa.e@gmail.com)",
    sharedAt: "2023.10.11 12:30:31"
  }
];
const optNumber = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 }
]);

/**
 * 설명: 복사하기 버튼 이벤트
 * @param { object } rowData get table row data
 */
/**
 * 설명: row Action 버튼 이벤트
 * @param { string } eventName action event name
 * @param { object } rowData get table row data
 */

const showRow = (item) => {
  console.log(item);
};
</script>

<style lang="scss" scoped="scoped">
@import "src/css/images.scss";
@import "src/css/table.scss";
</style>
