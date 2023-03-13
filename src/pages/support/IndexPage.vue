<template>
  <q-page class="p-content p-support p-index">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Workspace Manager" to="/support" />
        <q-breadcrumbs-el label="Support" to="/support" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <p class="sub-text">문의내역</p>
      <c-button
        :size="'medium'"
        :outline="true"
        :btn-names="'문의하기'"
        class="top_btn"
      />
      <div class="table_inner">
        <easy-data-table
          :headers="headers"
          :items="items"
          :hide-footer="true"
          empty-message="정보가 없습니다."
          @click-row="showRow"
        >
          <!-- type -->
          <template #item-type="item">
            <span class="txt">{{ item.type }}</span>
          </template>
          <!-- title -->
          <template #item-title="item">
          <a href="#">
            <span class="txt">{{ item.title }}</span>
            <q-tooltip
              anchor="bottom middle"
              class="c_tooltip"
            >
              <div class="inner">
                {{ item.title }}
              </div>
            </q-tooltip>
          </a>
          </template>
          <!-- inquiry -->
          <template #item-inquiry="item">
            <span class="txt">{{ item.inquiry }}</span>
          </template>
          <!--
          상태값(replyStatus)
          1. running, 답변완료
          2. 확인중
          -->
          <template #item-replyStatus="item">
          <q-badge
            v-if="item.replyStatus === 'running'"
            class="green"
          >
            <span class="txt">답변완료</span>
          </q-badge>
          <q-badge
            v-else
            class="c_badge"
          >
            <span class="txt">확인중</span>
          </q-badge>
          </template>
        </easy-data-table>
        <c-pagination />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CButton from "components/common/CButton.vue";
import CPagination from "components/common/CPagination.vue";

const title = ref("Support");
const ptitle = ref(title);

const pageNation = ref("Pagination");

useMeta(() => ({
  title: title.value,
  pageNation,
}));

const headers = [
  {
    text: "유형", value: "type", width: 152, sortable: true
  },
  {
    text: "제목", value: "title", sortable: true
  },
  {
    text: "문의일시", value: "inquiry", width: 200, sortable: true
  },
  {
    text: "답변상태", value: "replyStatus", width: 120, sortable: true
  },
];
const items = [
  {
    type: "스토리지 변경",
    title: "테스트용 이미지 생성 테스트 테스트테스트용 이미지 생성 테스트 테스트테스트용 이미지테스트용 이미지 생성 테스트 테스트테스트용 이미지 생성 테스트 테스트테스트용 이미지",
    inquiry: "2023.10.11 12:30:31",
    replyStatus: "running",
  },
  {
    type: "CPU/GPU 변경",
    title: "테스트용 이미지 생성 테스트 테스트테스트용 이미지 생성 테스트",
    inquiry: "2023.10.11 12:30:31",
    replyStatus: "stopped",
  },
  {
    type: "오류/버그",
    title: "테스트용 이미지 생성 테스트 테스트",
    inquiry: "2023.10.11 12:30:31",
    replyStatus: "group",
  },
];

/**
 * 설명: row Action 버튼 이벤트
 * @param { string } eventName action event name
 * @param { object } rowData get table row data
 */

const showRow = (item) => {
  console.log(item);
};
</script>

<style lang="scss" scoped>
@import 'src/css/support';
</style>
