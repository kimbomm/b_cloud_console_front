<template>
  <q-page class="p-content p-my p-index">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Account" to="key" />
        <q-breadcrumbs-el label="SSH Key & API Key" to="key" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body key-body">
      <div class="group-tabs">
        <q-tabs
          v-model="tab"
          align="left"
          class="c_tabs"
        >
          <q-tab name="tabs1" label="내 정보"></q-tab>
          <q-tab name="tabs2" label="내 알림"></q-tab>
          <q-tab name="tabs3" label="SSH key & API key"></q-tab>
        </q-tabs>
      </div>
      <template v-if="visible === 'A'">
        <div class="key-box">
          <p class="key-box_title mt40">SSH Key</p>
          <div class="sign-up">
            <p class="mb30">SSH Key를 등록해주세요.</p>
              <CButton
                :size-types="2"
                :btn-types="1"
                :btn-names="btnSign"
              />
            </div>
          </div>
          <div class="key-box">
            <p class="key-box_title mt60">API Key</p>
            <div class="sign-up">
              <p>API Key를 생성해 주세요.</p>
              <p class="mb30">생성시 Secret key는 팝업에서 1회만 확인 가능합니다.</p>
              <CButton
                :size-types="2"
                :btn-types="1"
                :btn-names="btnCreate"
              />
            </div>
          </div>
      </template>
      <template v-else>
        <div class="flex-top mt40">
          <div class="notice-txt">
            <p class="name">SSH Key</p>
            <!-- 비활성화시 문구 -->
            <!-- <p class="disabled-txt">최대 5개까지 등록 가능합니다</p> -->
          </div>
          <CButton
            :size-types="2"
            :btn-types="4"
            :btn-names="btnSign"
          />
        </div>
        <template v-if="defaultData == true">
          <section class="section">
            <EasyDataTable
              :headers="headers"
              :items="items"
              :hide-footer="true"
              empty-message="정보가 없습니다."
              @click-row="showRow"
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
              <!-- ssh -->
              <template #item-ssh="item">
                <q-badge
                  class="copy square ssh icon"
                  @click="onCopy(item)"
                >
                  <span class="txt">{{ item.ssh }}</span>
                </q-badge>
              </template>
              <!-- jupyterLab -->
              <template #item-jupyterLab="item">
                <q-badge
                  class="copy square lab icon"
                  @click="onCopy(item)"
                >
                  <span class="txt">{{ item.jupyterLab }}</span>
                </q-badge>
              </template>
              <!-- 인스턴스 타입 -->
              <template #item-instanceType="item">
                <q-badge
                  class="text instance icon"
                  @click="onCopy(item)"
                >
                  <span class="txt">{{ item.instanceType }}</span>

                  <q-tooltip
                    anchor="bottom middle"
                    class="c_tooltip"
                  >
                    <div class="inner">
                      {{ item.instanceType }}
                    </div>
                  </q-tooltip>
                </q-badge>
              </template>
              <!-- createdBy -->
              <template #item-createdBy="item">
                <span class="txt clip">{{ item.createdBy }}</span>
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
        </section>
        <div class="flex-top mt60">
          <p class="name">API Key</p>
          <div>
            <CButton
              :size-types="2"
              :btn-types="4"
              :btn-names="btnReCreate"
            />
            &nbsp;
            <CButton
              :size-types="2"
              :btn-types="4"
              :btn-names="btnDelete"
            />
          </div>
        </div>
        <div class="key-create">
          <p>689fd66a-b2c1-44bd-88d8-f0753fcb234b</p>
          <p>
            생성일시
            <span>2023.11.21 04:33pm</span>
          </p>
        </div>
        </template>
      </template>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CButton from "components/common/CButton.vue";

const visible = ref("B");
const defaultData = ref(true);

const tab = ref("tabs3");
const title = ref("Account");
useMeta(() => ({
  title: title.value,
  visible,
}));
// Table
const headers = [
  {
    text: "이름", value: "name", width: 234, sortable: false
  },
  {
    text: "Fingerprint", value: "finger", width: "587", sortable: false
  },
  {
    text: "등록일시", value: "registDate", sortable: false
  },
  { text: "", value: "buttons", width: 150 },
];
const items = [
  {
    name: "개인용",
    finger: "61:a2:62:d0:7e:3d:c9:0a:4e:fe:83:6c:14:bc:fa:0f",
    registDate: "2023.11.21 04:33:34",
  },
  {
    name: "개인용",
    finger: "61:a2:62:d0:7e:3d:c9:0a:4e:fe:83:6c:14:bc:fa:0f",
    registDate: "2023.11.21 04:33:34",
  },
  {
    name: "개인용",
    finger: "61:a2:62:d0:7e:3d:c9:0a:4e:fe:83:6c:14:bc:fa:0f",
    registDate: "2023.11.21 04:33:34",
  },
];

/**
 * 버튼 및 checkbox 에 대한 이벤트 존재할 시 class 삽입
 */
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
const onActions = (eventName, rowData) => {
  console.log(eventName, rowData);
};

const showRow = (item) => {
  console.log(item);
};

/* Btn Group */
const ptitle = ref(title);
const btnSign = ref("등록하기");
const btnCreate = ref("생성하기");
const btnReCreate = ref("재생성");
const btnDelete = ref("삭제");
</script>

<style lang="scss" scoped>
@import "./src/css/table";
@import 'src/css/key';
</style>
