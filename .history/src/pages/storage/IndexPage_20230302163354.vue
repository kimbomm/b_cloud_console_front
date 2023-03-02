<template>
  <q-page class="p-content p-storage p-index">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Projects" to="/" />
        <q-breadcrumbs-el label="Storage" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="table_set">
        <div class="l_set_inner">
          <div class="search_area">
            <q-select
              outlined
              placeholder="이름 상태 생성자 검색"
              use-input
              clearable
              class="c_inpchip default_size"
            >
              <template v-slot:prepend>
                <q-icon name="search" class="ico_search" />
              </template>
            </q-select>
          </div>
          <div class="now_storage_view">
            <div class="storage_view_box">
              <div class="generate_num">
                <p class="gn_title">
                  생성 가능 개수
                  <q-btn class="ibtn help">
                    <i class="ico help"
                      ><span class="hidden">도움말</span>
                      <q-popup-edit
                        v-model="helpShow"
                        anchor="bottom middle"
                        self="bottom middle"
                        class="c_popover storage_pop"
                      >
                        <div class="inner">
                          <p>스토리지는 개인당 최대 5개 생성할 수 있습니다.</p>
                        </div>
                      </q-popup-edit>
                    </i>
                  </q-btn>
                </p>
                <p class="gn_data"><span class="now_num">2</span> / 5</p>
              </div>
              <div class="individual_dose">
                <p class="id_title">개인 용량</p>
                <p class="id_data"><span class="now_gib">350</span> / 500</p>
                <p class="id_txt">GiB</p>
              </div>
            </div>
          </div>
        </div>
        <div class="r_set_inner">
          <c-button
            :size="'medium'"
            :outline="true"
            :btn-names="'개인 용량 변경 요청'"
          />
          <c-button
            :size="'medium'"
            :outline="true"
            :btn-names="'스토리지 추가'"
          />

            <c-dropdown
              v-model:selected="selectedBasic"
              :label="optLabel"
              :options="optNumber"
              class="auto_size"
            />
          </div>
        </div>
      </div>
      <div class="table_main">
        <EasyDataTable
          :headers="headers"
          :items="items"
          :hide-footer="true"
          empty-message="정보가 없습니다."
          @click-row="showRow"
        >
          <!-- title -->
          <template #item-title="item">
            <span class="txt">{{ item.title }}</span>
          </template>
          <!-- description -->
          <template #item-description="item">
            <span class="txt">{{ item.description }}</span>
          </template>
          <!-- user -->
          <template #item-user="item">
            <span class="txt">{{ item.user }}</span>
          </template>
          <!--
            상태값(status)
            1. running, 운영중(개인)
            2. running_s, 운영중(공유)
            3. making, 생성중
            4. deleting, 삭제중
            5. restoring, 복원중
          -->
          <template #item-status="item">
            <q-badge v-if="item.status === 'running'" class="green">
              <span class="txt">운영중(개인)</span>
            </q-badge>
            <q-badge v-else-if="item.status === 'running_s'" class="green">
              <span class="txt">운영중(공유)</span>
            </q-badge>
            <q-badge v-else-if="item.status === 'making'" class="c_badge">
              <span class="txt">생성중</span>
            </q-badge>
            <q-badge v-else-if="item.status === 'deleting'" class="c_badge">
              <span class="txt">삭제중</span>
            </q-badge>
            <q-badge v-else-if="item.status === 'restoring'" class="c_badge">
              <span class="txt">복원중</span>
            </q-badge>
          </template>
          <!-- usingData -->
          <template #item-usingData="item">
            <span class="txt">{{ item.usingData }}</span>
          </template>
          <!-- createdAt -->
          <template #item-createdAt="item">
            <span class="txt">{{ item.createdAt }}</span>
          </template>
          <!-- authority -->
          <template #item-authority="item">
            <span class="txt">{{ item.authority }}</span>
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
                    <q-item v-for="button in actionButtons" :key="button.name">
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
    </div>
    <!-- Start : [스토리지] 개인스토리지 추가 -->
    <q-dialog v-model="storageAddModal" class="c_dialog large">
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>개인 스토리지 추가</strong>
          </p>
          <section class="section">
            <p class="sub_title">이름<i class="ess">*</i></p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textName"
                placeholder="최소 2자 최대 30자"
                clearable
                class="wsize_full"
              />
            </div>
          </section>
          <section class="section">
            <p class="sub_title">설명</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textDesc"
                bottom-slots
                type="textarea"
                placeholder="스토리지 설명"
                clearable
                counter
                :count="10"
                maxlength="500"
                class="wsize_full hsize244"
                :input-style="{ height: '100%' }"
              >
                <!-- <template v-slot:hint>
                    Description
                  </template> -->
              </q-input>
            </div>
          </section>
          <section class="section mt24">
            <p class="sub_title">스토리지 용량</p>
            <div class="c_inpgroup flex-end">
              <q-input
                outlined
                v-model="quota2"
                type="number"
                placeholder="50GiB 단위 입력"
                clearable
                class="inp_unit"
              >
                <template v-slot:append>
                  <span class="unit">GiB</span>
                </template>
              </q-input>
              <span class="desc">최대 50,000</span>
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn label="취소" class="line" v-close-popup />
          <q-btn label="확인" class="primary" v-close-popup disable />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [스토리지] 개인스토리지 추가 -->
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CDropdown from "components/common/CDropdown.vue";
import CPagination from "components/common/CPagination.vue";
import CButton from "components/common/CButton.vue";

const title = ref("Storage");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const optLabel = ref("10");
const helpShow = ref(false);

const optNumber = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);

const headers = [
  {
    text: "이름",
    value: "title",
    width: 180,
    sortable: true,
  },
  {
    text: "설명",
    value: "description",
    width: 180,
    sortable: false,
  },
  {
    text: "소유자",
    value: "user",
    width: 150,
    sortable: true,
  },
  {
    text: "상태",
    value: "status",
    width: 120,
    sortable: false,
  },
  {
    text: "사용량",
    value: "usingData",
    width: 150,
    sortable: true,
  },
  {
    text: "생성일시",
    value: "createdAt",
    width: 170,
    sortable: false,
  },
  {
    text: "접근권한",
    value: "authority",
    width: 120,
    sortable: false,
  },
  { text: "", value: "buttons", width: 80 },
];
const items = [
  {
    title: "개인작업용",
    description: "개인이용",
    user: "root.choi",
    status: "running_s",
    usingData: "45 / 100 GiB",
    createdAt: "2023.10.22 12:33:40",
    authority: "읽기전용",
  },
  {
    title: "개인작업용",
    description: "개인이용",
    user: "root.choi",
    status: "running",
    usingData: "45 / 100 GiB",
    createdAt: "2023.10.22 12:33:40",
    authority: "읽기전용",
  },
  {
    title: "개인작업용",
    description: "개인이용",
    user: "root.choi",
    status: "making",
    usingData: "45 / 100 GiB",
    createdAt: "2023.10.22 12:33:40",
    authority: "읽기전용",
  },
  {
    title: "개인작업용",
    description: "개인이용",
    user: "root.choi",
    status: "deleting",
    usingData: "45 / 100 GiB",
    createdAt: "2023.10.22 12:33:40",
    authority: "읽기전용",
  },
  {
    title: "개인작업용",
    description: "개인이용",
    user: "root.choi",
    status: "restoring",
    usingData: "45 / 100 GiB",
    createdAt: "2023.10.22 12:33:40",
    authority: "읽기전용",
  },
];

const actionButtons = [
  { name: "이용현황", event: "state" },
  { name: "공유관리", event: "share" },
  { name: "용량 변경", event: "doseModifying" },
  { name: "삭제", event: "delete" },
];

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

const storageAddModal = ref(false);
const textName = ref(null);
const textDesc = ref(null);
const quota2 = ref(null);
</script>

<style lang="scss" scoped>
@import "./src/css/storage";
@import "./src/css/table";
</style>
