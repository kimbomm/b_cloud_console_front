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
        <div class="table_set">
          <div class="l_set_inner">
            <q-input
              outlined
              v-model="suffix"
              placeholder="이름 이메일 검색"
              class="w292"
              >
                <template v-slot:prepend>
                  <q-icon name="search" class="ico_search" />
                </template>
              </q-input>
              <c-dropdown
                v-model:selected="selectedBasic"
                :label="label"
                :options="options"
                class="w220"
              />
          </div>
          <div class="r_set_inner">
            <c-button
              :outline="true"
              :size="'medium'"
              :btn-names="'멤버추가'"
              class="btn"
              >
              <template #prepend>
                <i class="ico plus"></i>
              </template>
            </c-button>
            <c-button
              :size="'medium'"
              :outline="true"
              disabled
              :btn-names="'멤버삭제'"
              class="btn"
              >
              <template #prepend>
                <i class="ico plus" />
              </template>
            </c-button>
            <c-dropdown
              v-model:selected="selectedBasic"
              :label="label3"
              :options="options2"
              class="auto_size"
              />
          </div>
        </div>
        <!-- Table -->
        <div class="table_inner">
          <easy-data-table
            class="c_table"
            :headers="headers"
            :items="items"
            :hide-footer="true"
            :body-row-class-name="bodyRowClassNameFunction"
            empty-message="정보가 없습니다."
          >
            <template #item-checkbox="item">
              <q-checkbox
                v-model="itemsSelected"
                :val="item.id"
                :disable="item.disabled"
                @click="onCheck(item)"
              />
            </template>
            <!-- name -->
            <template #item-name="item">
              <template v-if="item.name.join == true">
                <div class="j-badge">
                  <span class="txt">{{ item.name.title }}</span>
                </div>
              </template>
              <template v-else>
                <div class="j-badge">
                  <span class="txt noJoin">{{ item.name.title }}</span>
                  <span class="n_join_badge">회원가입 미완료</span>
                </div>
              </template>
            </template>
            <!-- email -->
            <template #item-email="item">
              <template v-if="item.name.join == true">
                <span class="txt">{{ item.email }}</span>
              </template>
              <template v-else>
                <span class="txt noJoin">{{ item.email }}</span>
              </template>
            </template>
            <!-- workspaceChar -->
            <template #item-workspaceChar="item">
              <template v-if="item.name.join == true">
                <span class="txt">{{ item.workspaceChar }}</span>
              </template>
              <template v-else>
                <span class="txt noJoin">{{ item.workspaceChar }}</span>
              </template>
            </template>
            <!-- introduce -->
            <template #item-introduce="item">
              <template v-if="item.name.join == true">
                <span class="txt">{{ item.introduce }}</span>
              </template>
              <template v-else>
                <span class="txt noJoin">{{ item.introduce }}</span>
              </template>
            </template>
            <!-- 버튼 그룹 -->
            <template #item-buttons="item">
              <div v-if="actionButtons || item.buttons" class="cell btngroup">
                <!-- 초대 요청 확인 -->
                <c-button
                  v-if="item.buttons"
                  class="c_btn"
                  :btn-names="'초대요청 확인'"
                >
                  <span class="txt">{{ item.buttons.name }}</span>
                </c-button>
              </div>
            </template>
          </easy-data-table>
          <c-pagination />
        </div>
        <!-- //Table -->
      </template>
      <!-- /* 멤버 - 메인(워크스페이스 멤버/정산관리자,게스트) */ -->
      <template v-else>
        <div class="table_set">
          <div class="l_set_inner">
            <q-input
              outlined
              v-model="suffix"
              placeholder="이름 이메일 검색"
              class="w292"
              >
              <template v-slot:prepend>
                <q-icon name="search" class="ico_search" />
              </template>
            </q-input>
            <c-dropdown
              v-model:selected="selectedBasic"
              :label="label2"
              :options="options"
              class="w220"
            />
          </div>
          <div class="r_set_inner">
            <c-button
              :outline="true"
              :size="'medium'"
              :btn-names="'멤버 초대 요청'"
              class="btn"
            >
              <template #prepend>
                <i class="ico plus"></i>
              </template>
            </c-button>
            <c-dropdown
              v-model:selected="selectedBasic"
              :label="label3"
              :options="options2"
              class="auto_size"
            />
          </div>
        </div>
        <!-- Table -->
        <easy-data-table
          :headers="headers2"
          :items="items2"
          :hide-footer="true"
          empty-message="정보가 없습니다."
          @click-row="showRow"
        >
        <!-- name -->
        <template #item-name="item">
          <span class="txt">{{ item.name.title }}</span>
        </template>
        <!-- email -->
        <template #item-email="item">
          <span class="txt">{{ item.email }}</span>
        </template>
        <!-- workspaceChar -->
        <template #item-workspaceChar="item">
          <span class="txt">{{ item.workspaceChar }}</span>
        </template>
        <!-- introduce -->
        <template #item-introduce="item">
          <span class="txt">{{ item.introduce }}</span>
        </template>
      </easy-data-table>
      <c-pagination />
        <!-- //Table -->
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

const defaultData = ref(false);
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
    text: "", value: "checkbox", width: 80
  },
  {
    text: "이름", value: "name", width: 220, sortable: true, checkbox: true
  },
  {
    text: "이메일", value: "email", width: 272, sortable: true
  },
  {
    text: "워크스페이스 역할", value: "workspaceChar", width: 200, sortable: false
  },
  {
    text: "소개", value: "introduce", sortable: false
  },
  { text: "", value: "buttons" },
];
const items = [
  {
    name: {
      title: "billing",
      join: false
    },
    email: "billing@workspace1.com",
    workspaceChar: "정산 관리자",
    introduce: "안녕하세요",
    buttons: {
      name: "초대요청 확인"
    },
  },
  {
    name: {
      title: "liv.olive",
      join: true
    },
    email: "billing@workspace1.com",
    workspaceChar: "정산 관리자",
    introduce: "00담당자 입니다.",
  },
  {
    name: {
      title: "Test",
      join: true
    },
    email: "test@workspace1.com",
    workspaceChar: "워크스페이스 멤버",
    introduce: "-",
  },
];

/**
 * 버튼 및 checkbox 에 대한 이벤트 존재할 시 class 삽입
 */
const bodyRowClassNameFunction = (item) => {
  const classList = [];
  if (item.buttons) classList.push("row-button");
  if (item.checkbox) classList.push("row-selected");
  if (item.disabled) classList.push("row-disabled");
  return classList.join(" ");
};

const onCheck = (item) => {
  const data = items.filter((row) => row.id === item.id)[0];
  data.checkbox = itemsSelected.value.includes(item.id);
};
// Table2
const headers2 = [
  {
    text: "이름", value: "name", width: 266, sortable: true, checkbox: true
  },
  {
    text: "이메일", value: "email", width: 293, sortable: true
  },
  {
    text: "워크스페이스 역할", value: "workspaceChar", width: 242, sortable: false
  },
  {
    text: "소개", value: "introduce", sortable: false
  },
];
const items2 = [
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

const ptitle = ref(title);
</script>

<style lang="scss" scoped>
@import 'src/css/members';
</style>
