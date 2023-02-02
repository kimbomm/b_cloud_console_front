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
      <template v-if="visible === 'A'">
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
                v-model:selected="selectedCheck"
                :label="label"
                :options="options"
                :multiple="true"
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
          <!--
            상태값(status)
            1. running, 운영중, 실행중
            2. stopped, 정지 | 오류 | 취소 | 실패
            3. 생성중 | 삭제중 | 대기중 | 재시작중
          -->
          <template #item-status="item">
            <q-badge
              v-if="item.status === 'running'"
              class="green"
            >
              <span class="txt">운영중</span>
            </q-badge>
            <q-badge
              v-else-if="item.status === 'stopped'"
              class="orange"
            >
              <span class="txt">정지</span>
            </q-badge>
            <q-badge
              v-else
              class="c_badge"
            >
              <span class="txt">생성중</span>
            </q-badge>
          </template>
          <!-- 이메일 타입 -->
          <template #item-emailType="item">
            <q-badge
              class="text instance"
              @click="onCopy(item)"
            >
              <span class="txt">{{ item.emailType }}</span>
            </q-badge>
          </template>
          <!-- createdBy -->
          <template #item-createdBy="item">
            <span class="txt clip">{{ item.createdBy }}</span>
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

              <!-- row action menu -->
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
                v-model:selected="selectedCheck"
                :label="label2"
                :options="options"
                :multiple="true"
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
        <CTable
          :title="title"
          :columns="columns"
          :data="data"
          :action-buttons="actionButtons"
          @action="respAction"
          row-click
          @rowClick="onRowClick"
        />
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
import CTable from "src/components/common/CTable.vue";
import CPagination from "components/common/CPagination.vue";

const visible = ref("A");
const title = ref("워크스페이스 1 Member");
const label = ref("전체");
const label2 = ref("역할전체");
const label3 = ref("10");

useMeta(() => ({
  title: title.value,
  visible,
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

// Table
const itemsSelected = ref([]);
const headers = [
  {
    text: "이름", value: "name", width: 80, sortable: true, checkbox: true
  },
  {
    text: "이메일", value: "emailype", width: 160, sortable: true
  },
  {
    text: "GPU", value: "gpu", width: 80, sortable: false
  },
  {
    text: "CPU", value: "cpu", width: 80, sortable: false
  },
  {
    text: "생성일시", value: "createdAt", width: 180, sortable: true
  },
  {
    text: "생성자", value: "createdBy", width: 100, sortable: true
  },
  { text: "", value: "buttons", width: 150 },
];
const items = [
  {
    name: 132,
    emailType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi (root.choi@kakaobrain.com)",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
    buttons: {
      name: "초대요청 확인"
    }
  },
  {
    name: 34,
    emailType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi (root.choi@kakaobrain.com)",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    }
  },
  {
    name: 99999,
    emailType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi (root.choi@kakaobrain.com)",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    }
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

const actionButtons = [
  { name: "이용현황", event: "state" },
  { name: "공유관리", event: "share" },
  { name: "스냅샷 관리", event: "mngSnap" },
  { name: "스냅샷 생성", event: "crtSnap" },
  { name: "삭제", event: "delete" },
];

/**
 * 설명: 복사하기 버튼 이벤트
 * @param { object } rowData get table row data
 */
const onCopy = (rowData) => {
  console.log(rowData);
};

/**
 * 설명: row Action 버튼 이벤트
 * @param { string } eventName action event name
 * @param { object } rowData get table row data
 */

//
const ptitle = ref(title);
</script>

<style lang="scss" scoped>
@import 'src/css/table';
@import 'src/css/members';
</style>
