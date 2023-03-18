<template>
  <div class="s_05 pb78">
    <p class="sub_title2">스토리지</p>
    <template v-if="defaultData == true">
      <div class="s_05_main">
        <div class="select_now_view">
          <p><span class="change_num">0</span> / 5</p>
          선택
        </div>
        <div class="s_05_table">
          <easy-data-table
            v-model:items-selected="itemsSelected"
            :headers="storageHeader"
            :items="storageItems"
            :hide-footer="true"
            :body-row-class-name="bodyRowClassNameFunction"
            empty-message="정보가 없습니다."
          >
            <!-- 이름 -->
            <template #item-title="item">
              <a href="#">
                <span class="txt">{{ item.title }}</span>
              </a>
            </template>
            <!-- description -->
            <template #item-description="item">
              <a href="#">
                <span class="txt">{{ item.description }}</span>
                <q-tooltip anchor="bottom middle" class="c_tooltip">
                  <div class="inner">
                    {{ item.description }}
                  </div>
                </q-tooltip>
              </a>
            </template>
            <!--
                      상태값(status)
                      1. running, 운영중
                      2. deleting, 삭제중
                      3. restoring, 복구중
                    -->
            <template #item-status="item">
              <q-badge v-if="item.status === 'running'" class="green">
                <span class="txt">운영중</span>
              </q-badge>
              <q-badge v-else-if="item.status === 'deleting'">
                <span class="txt">삭제중</span>
              </q-badge>
              <q-badge v-else-if="item.status === 'restoring'">
                <span class="txt">복구중</span>
              </q-badge>
            </template>
            <!-- 소유자 -->
            <template #item-user="item">
              <a href="#">
                <span class="txt">{{ item.user }}</span>
              </a>
            </template>
            <!-- 접근권한 -->
            <template #item-authority="item">
              <a href="#">
                <span class="txt">{{ item.authority }}</span>
              </a>
            </template>
            <!-- 버튼 그룹 -->
            <template #item-buttons="item">
              <q-btn v-if="item.checkbox" class="text">
                <span class="txt">선택 취소하기</span>
              </q-btn>
            </template>
          </easy-data-table>
        </div>
        <div class="disflex_C mt32">
          <c-pagination />
        </div>
      </div>
    </template>
    <template v-else>
      <div class="com_nondata_area">
        <div class="nondata_box">
          <p class="nondata_txt">이용가능한 스토리지가 없습니다.</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>

import CPagination from "components/common/CPagination.vue";
import { ref } from "vue";

const defaultData = ref(true);
const itemsSelected = ref([]);
/**
 * 버튼 및 checkbox 에 대한 이벤트 존재할 시 class 삽입
 */
const bodyRowClassNameFunction = (item) => {
  const classList = [];
  if (item.buttons) classList.push("row-button");
  if (item.checkbox) classList.push("row-selected");
  return classList.join(" ");
};

// 스토리지 테이블
const storageHeader = [
  {
    text: "이름", value: "title", width: 100, sortable: false
  },
  {
    text: "설명", value: "description", width: 200, widthAuto: true, sortable: false
  },
  {
    text: "상태", value: "status", width: 90, sortable: false
  },
  {
    text: "소유자", value: "user", width: 100, sortable: false
  },
  {
    text: "접근권한", value: "authority", width: 100, sortable: false
  },
];
const storageItems = [
  {
    title: "프로젝트",
    description: "aa개인 스토리지1",
    status: "running",
    user: "root.choi",
    authority: "읽기쓰기",
  },
  {
    title: "프로젝트",
    description: "aa개인 스토리지aa개인 스토리지aa개인 스토리지aa개인 스토리지",
    status: "deleting",
    user: "root.choi",
    authority: "읽기쓰기",
  },
  {
    title: "프로젝트2",
    description: "aa개인 스토리지",
    status: "restoring",
    user: "root.choi",
    authority: "읽기쓰기",
  },
];
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
