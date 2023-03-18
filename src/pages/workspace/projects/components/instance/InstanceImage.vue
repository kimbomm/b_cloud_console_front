<template>
  <div class="s_04 pb78">
    <p class="sub_title2">이미지<i class="ess">*</i></p>
    <div class="s_04_main">
      <div class="s_04_tab">
        <q-tabs v-model="tab2" align="left" class="c_tabs">
          <q-tab name="tabs1" label="기본 이미지"></q-tab>
          <q-tab name="tabs2" label="내이미지"></q-tab>
          <q-tab name="tabs3" label="공유받은 이미지"></q-tab>
        </q-tabs>
      </div>
      <div class="now_selected_area">
        <div class="select_box">
          <q-item class="select_title">
            <p class="select_title_inner">선택된 타입</p>
          </q-item>
          <q-item class="select_value">
            <p class="select_value_inner">
              tensorflow 2.9.0 (python3, cuda11.2, ubuntu20.04)
            </p>
          </q-item>
        </div>
      </div>
      <template v-if="tab2 === 'tabs1'">
        <template v-if="defaultData == true">
          <div class="s_04_table">
            <easy-data-table
              v-model:items-selected="itemsSelected"
              :headers="imgHeader1"
              :items="imgItems1"
              :hide-footer="true"
              :body-row-class-name="bodyRowClassNameFunction"
              empty-message="정보가 없습니다."
            >
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
              <!-- nvida -->
              <template #item-nvida="item">
                <a href="#">
                  <span class="txt">{{ item.nvida }}</span>
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
        </template>
        <template v-else>
          <div class="com_nondata_area">
            <div class="nondata_box">
              <p class="nondata_txt">생성된 이미지가 없습니다.</p>
            </div>
          </div>
        </template>
      </template>
      <template v-if="tab2 === 'tabs2'">
        <template v-if="defaultData == true">
          <div class="s_04_table">
            <easy-data-table
              v-model:items-selected="itemsSelected"
              :headers="imgHeader2"
              :items="imgItems2"
              :hide-footer="true"
              :body-row-class-name="bodyRowClassNameFunction"
              empty-message="정보가 없습니다."
            >
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
                          1. sharing, 저장(공유)
                          2. error, 오류
                          3. inStorage, 저장중
                        -->
              <template #item-status="item">
                <q-badge v-if="item.status === 'sharing'" class="green">
                  <span class="txt">저장(공유)</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'error'" class="orange">
                  <span class="txt">오류</span>
                </q-badge>
                <q-badge v-else-if="item.status === 'inStorage'">
                  <span class="txt">저장중</span>
                </q-badge>
                <q-item v-else-if="item.status === 'group'" class="badge_group">
                  <div class="badge">
                    <q-badge class="green">
                      <span class="txt">7</span>
                    </q-badge>
                    <q-badge class="orange">
                      <span class="txt">20</span>
                    </q-badge>
                    <q-badge class="c_badge">
                      <span class="txt">27</span>
                    </q-badge>
                  </div>

                  <q-popup-edit
                    v-model="badgeGroup"
                    self="bottom middle"
                    class="badge_menu"
                  >
                    <div class="inner">
                      <q-list>
                        <q-item>
                          <q-item-section>
                            <div class="badge_item">
                              <q-badge class="green">
                                <span class="txt">실행중</span>
                              </q-badge>
                              <span class="count">2</span>
                            </div>
                          </q-item-section>
                          <q-item-section>
                            <div class="badge_item">
                              <q-badge>
                                <span class="txt">생성중</span>
                              </q-badge>
                              <span class="count">2</span>
                            </div>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section>
                            <div class="badge_item">
                              <q-badge class="green">
                                <span class="txt">완료</span>
                              </q-badge>
                              <span class="count">5</span>
                            </div>
                          </q-item-section>
                          <q-item-section>
                            <div class="badge_item">
                              <q-badge>
                                <span class="txt">재시작중</span>
                              </q-badge>
                              <span class="count">5</span>
                            </div>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section>
                            <div class="badge_item">
                              <q-badge class="orange">
                                <span class="txt">취소</span>
                              </q-badge>
                              <span class="count">10</span>
                            </div>
                          </q-item-section>
                          <q-item-section>
                            <div class="badge_item">
                              <q-badge>
                                <span class="txt">취소중</span>
                              </q-badge>
                              <span class="count">10</span>
                            </div>
                          </q-item-section>
                        </q-item>
                        <q-item>
                          <q-item-section>
                            <div class="badge_item">
                              <q-badge class="orange">
                                <span class="txt">실패</span>
                              </q-badge>
                              <span class="count">10</span>
                            </div>
                          </q-item-section>
                          <q-item-section>
                            <div class="badge_item">
                              <q-badge>
                                <span class="txt">삭제중</span>
                              </q-badge>
                              <span class="count">10</span>
                            </div>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </div>
                  </q-popup-edit>
                </q-item>
                <q-badge v-else class="c_badge">
                  <span class="txt">생성중</span>
                </q-badge>
              </template>
              <!-- createdAt -->
              <template #item-createdAt="item">
                <a href="#">
                  <span class="txt">{{ item.createdAt }}</span>
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
        </template>
        <template v-else>
          <div class="com_nondata_area">
            <div class="nondata_box">
              <p class="nondata_txt">생성된 이미지가 없습니다.</p>
            </div>
          </div>
        </template>
      </template>
      <template v-if="tab2 === 'tabs3'">
        <template v-if="defaultData == true">
          <div class="s_04_table">
            <easy-data-table
              v-model:items-selected="itemsSelected"
              :headers="imgHeader3"
              :items="imgItems3"
              :hide-footer="true"
              :body-row-class-name="bodyRowClassNameFunction"
              empty-message="정보가 없습니다."
            >
              <!-- title -->
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
              <!-- owner -->
              <template #item-owner="item">
                <a href="#">
                  <span class="txt">{{ item.owner }}</span>
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
        </template>
        <template v-else>
          <div class="com_nondata_area">
            <div class="nondata_box">
              <p class="nondata_txt">공유받은 이미지가 없습니다.</p>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CPagination from "components/common/CPagination.vue";

const itemsSelected = ref([]);
const defaultData = ref(true);

const tab2 = ref("tabs1");

// 이미지 테이블_기본이미지
const imgHeader1 = [
  {
    text: "이름", value: "title", width: 320, widthAuto: true, sortable: false
  },
  {
    text: "NVIDA 드라이브 최소버전", value: "nvida", width: 270, sortable: false
  },
];
const imgItems1 = [
  {
    title: "tensorflow 2.9.0  (python3, cuda11.2, ubuntu20.04)",
    nvida: "400.0008",
  },
  {
    title: "tensorflow 2.9.0  (python3, cuda11.2, ubuntu20.04)",
    nvida: "450.0008",
  },
];
// 이미지 테이블_내이미지
const imgHeader2 = [
  {
    text: "이름", value: "title", width: 140, sortable: false
  },
  {
    text: "설명", value: "description", width: 130, widthAuto: true, sortable: false
  },
  {
    text: "상태", value: "status", width: 110, sortable: false
  },
  {
    text: "생성일시", value: "createdAt", width: 200, sortable: false
  },
];
const imgItems2 = [
  {
    title: "내 이미지 1",
    description: "내 이미지 1",
    status: "sharing",
    createdAt: "2023.09.02 07:30:44",
  },
  {
    title: "내 이미지 1",
    description: "내 이미지 1",
    status: "inStorage",
    createdAt: "2023.09.02 07:30:44",
  },
  {
    title: "내 이미지 1",
    description: "내 이미지 1",
    status: "error",
    createdAt: "2023.09.02 07:30:44",
  },
];
// 이미지 테이블_공유받은 이미지
const imgHeader3 = [
  {
    text: "이름", value: "title", width: 110, sortable: false
  },
  {
    text: "설명", value: "description", width: 200, widthAuto: true, sortable: false
  },
  {
    text: "공유자", value: "owner", width: 280, sortable: false
  },
];
const imgItems3 = [
  {
    title: "내 이미지1",
    description: "내 이미지 1",
    owner: "Kayle(kayle.k@kakaobrain.com)",
  },
  {
    title: "내 이미지1",
    description: "택스트용 내 이미지 생성 테스트 텍스트",
    owner: "Kayle(kayle.k@kakaobrain.com)",
  },
  {
    title: "내 이미지1",
    description: "내 이미지 3",
    owner: "Kayle(kayle.k@kakaobrain.com)",
  },
];

</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
