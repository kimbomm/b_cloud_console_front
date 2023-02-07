<template>
  <q-page class="p-content p-member p-index">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Member" to="/members/" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <!-- /* 멤버 - 메인(워크스페이스 관리자) */ -->
      <template v-if="defaultData == true">
        <div class="flex-top table-set">
          <div class="set-l set">
            <div class="set-l_left">
              <q-input
                outlined
                v-model="suffix"
                placeholder="이름 이메일 검색"
                class="member-input"
              >
                <template v-slot:prepend>
                  <q-icon name="search" class="ico_search" />
                </template>
              </q-input>
            </div>
            <div class="set-l_right">
              <CDropdown
                v-model:selected="selectedBasic"
                :label="label"
                :options="options"
              />
            </div>
          </div>
          <div class="set-r set">
            <div class="set-btn">
              <CButton
                :size-types="2"
                :btn-types="5"
                :btn-names="'멤버추가'"
              />
            </div>
            <div class="set-btn remove_member_btn">
              <CButton
                :size-types="2"
                :btn-types="51"
                :btn-names="'멤버삭제'"
              />
            </div>
            <div class="set-btn select-d">
              <CDropdown
                v-model:selected="selectedBasic"
                :label="label3"
                :options="options2"
              />
            </div>
          </div>
        </div>
        <!-- Table -->
        <section class="section">
          <EasyDataTable
            v-model:items-selected="itemsSelected"
            :headers="headers"
            :items="items"
            :hide-footer="true"
            :body-row-class-name="bodyRowClassNameFunction"
            empty-message="정보가 없습니다."
          >
            <!-- 회원가입 미완료 -->
            <template #item-status="item">
              <q-badge
              v-if="item.status === 'incomplete'"
              class="c_badge"
              >
                <span class="txt">회원가입 미완료</span>
              </q-badge>
              <q-badge
              v-else
              class="disNone"
              >
                <span class="txt">회원가입 완료</span>
              </q-badge>
            </template>
            <!-- 버튼 그룹 -->
            <template #item-buttons="item">
              <div v-if="actionButtons || item.buttons" class="cell btngroup">
                <!-- 초대 요청 확인 -->
                <q-btn
                  v-if="item.buttons"
                  class="c_btn"
                >
                  <span class="txt">{{ item.buttons.name }}</span>
                </q-btn>
              </div>
            </template>
          </EasyDataTable>
        </section>
        <!-- //Table -->
        <div class="group">
          <CPagination />
        </div>
      </template>
      <!-- /* 멤버 - 메인(워크스페이스 멤버/정산관리자,게스트) */ -->
      <template v-else>
        <div class="flex-top table-set">
          <div class="set-l set">
            <div class="set-l_left">
              <q-input
                outlined
                v-model="suffix"
                placeholder="이름 상태 생성자 검색"
                class="member-input"
              >
                <template v-slot:prepend>
                  <q-icon name="search" class="ico_search" />
                </template>
              </q-input>
            </div>
            <div class="set-l_right">
              <CDropdown
                v-model:selected="selectedBasic"
                :label="label2"
                :options="options"
              />
            </div>
          </div>
          <div class="set-r set">
            <div class="set-btn">
              <CButton
                :size-types="2"
                :btn-types="5"
                :btn-names="'멤버 초대 요청'"
              />
            </div>
            <div class="set-btn select-d">
              <CDropdown
                v-model:selected="selectedBasic"
                :label="label3"
                :options="options2"
              />
            </div>
          </div>
        </div>
        <!-- Table -->
        <section class="section">
          <EasyDataTable
            :headers="headers"
            :items="items"
            :hide-footer="true"
            empty-message="정보가 없습니다."
            @click-row="showRow"
          >
            <!-- 버튼 그룹 -->
            <template #item-buttons="item">
              <div v-if="actionButtons || item.buttons" class="cell btngroup">
                <!-- 초대 요청 확인 -->
                <q-btn
                  v-if="item.buttons"
                  class="c_btn disNone"
                >
                  <span class="txt">{{ item.buttons.name }}</span>
                </q-btn>
              </div>
            </template>
          </EasyDataTable>
        </section>
        <!-- //Table -->
        <div class="group">
          <CPagination />
        </div>
      </template>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CDropdown from "components/common/CDropdown.vue";
import CButton from "components/common/CButton.vue";
import CPagination from "components/common/CPagination.vue";

const defaultData = ref(true);
const title = ref("워크스페이스 1 Member");
const label = ref("전체");
const label2 = ref("역할전체");
const label3 = ref("10");

useMeta(() => ({
  title: title.value,
}));

const options = ref([
  { label: "역할전체", value: 0 },
  { label: "워크스페이스 관리자", value: 1 },
  { label: "워크스페이스 멤버", value: 2 },
  { label: "정산 관리자", value: 3 },
]);
const options2 = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);

// Table1
const itemsSelected = ref([]);

const headers = [
  {
    text: "이름", value: "name", width: 270, sortable: true, checkbox: true
  },
  {
    text: "이메일", value: "email", width: 370, sortable: true
  },
  {
    text: "워크스페이스 역할", value: "workspaceChar", width: 280, sortable: false
  },
  {
    text: "소개", value: "introduce", sortable: false
  },
  { text: "", value: "buttons" },
];
const items = [
  {
    name: "billing",
    email: "billing@workspace1.com",
    workspaceChar: "정산 관리자",
    introduce: "안녕하세요",
    buttons: {
      name: "초대요청 확인"
    }
  },
  {
    name: "liv.olive",
    email: "billing@workspace1.com",
    workspaceChar: "정산 관리자",
    introduce: "00담당자 입니다.",
    // buttons: {
    //   name: "초대요청 확인"
    // }
  },
  {
    name: "Test",
    email: "test@gmail.com",
    workspaceChar: "워크스페이스 멤버",
    introduce: "-",
    // buttons: {
    //   name: "초대요청 확인"
    // }
  },
];

/**
 * 버튼 및 checkbox 에 대한 이벤트 존재할 시 class 삽입
 */
const bodyRowClassNameFunction = (item) => {
  const classList = [];
  if (item.buttons) classList.push("row-button");
  if (item.checkbox) classList.push("row-selected");
  return classList.join(" ");
};

/**
 * 설명: 복사하기 버튼 이벤트
 * @param { object } rowData get table row data
 */

/**
 * 설명: row Action 버튼 이벤트
 * @param { string } eventName action event name
 * @param { object } rowData get table row data
 */

// Table2

const ptitle = ref(title);
</script>

<style lang="scss" scoped>
@import 'src/css/table';
@import 'src/css/members';
</style>
