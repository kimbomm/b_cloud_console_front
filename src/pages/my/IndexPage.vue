<template>
  <q-page class="p-content p-my p-index">
    <div class="p-head">
      <q-breadcrumbs
        class="c_breadcrumb"
        gutter="none"
      >
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el
          label="Account"
          to="/"
        />
        <q-breadcrumbs-el label="내 정보" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.p-head -->
    <div class="p-body">
      <div class="group-tabs">
        <q-tabs
          v-model="tab"
          align="left"
          class="c_tabs"
        >
          <q-tab
            name="tabs1"
            label="내 정보"
          ></q-tab>
          <q-tab
            name="tabs2"
            label="내 알림"
          >
            <q-badge>19</q-badge>
          </q-tab>
          <q-tab
            name="tabs3"
            label="SSH key & API key"
          ></q-tab>
        </q-tabs>
      </div>
      <div class="my_info">
        <q-item-section
          v-model="editInfoModel"
          :class="editInfoModel ? '' : 'is-show'"
          class="item_card"
        >
          <q-item-label class="name">
            김카브
            <c-button
              class="ibtn edit"
              @click="editInfoModel = !editInfoModel"
            >
              <span class="hidden">편집</span>
            </c-button>
          </q-item-label>
          <q-item-label class="subject">
            안녕하세요 저는 김카브 입니다. 소개텍스트
          </q-item-label>
        </q-item-section>
        <q-item-section
          :class="editInfoModel ? 'is-show' : ''"
          class="edit_card"
        >
          <section class="section">
            <p class="sub_title">이름</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textChangeName"
                placeholder="최소 2자 최대 30자 입력 "
                clearable
                class="wsize608"
              />
            </div>
          </section>
          <section class="section">
            <p class="sub_title">소개</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textChangeDesc"
                bottom-slots
                type="textarea"
                placeholder="최대 100자 입력"
                clearable
                counter
                :count="10"
                maxlength="100"
                class="wsize_full hsize136"
                :input-style="{height: '100%'}"
              >
                <!-- <template v-slot:hint>
                    Description
                  </template> -->
              </q-input>
            </div>
          </section>
          <div class="c_btngroup f_end">
            <c-button
              :size="'medium'"
              :outline="true"
              :btn-names="'취소'"
            />
            <c-button
              :size="'medium'"
              :btn-names="'저장'"
              @click="editInfoModel = !editInfoModel"
            >
              <span class="txt">저장</span>
            </c-button>
          </div>
        </q-item-section>
      </div>
      <div class="my_account">
        <q-list class="account_list">
          <q-item class="item">
            <q-item-section class="item_card">
              <q-item-label class="title">이메일</q-item-label>
              <q-item-label class="info">root.choi@kakaobrain.com</q-item-label>
            </q-item-section>
            <q-item-section class="item_card">
              <q-item-label class="title">워크스페이스 역할</q-item-label>
              <q-item-label class="info">워크스페이스 관리자</q-item-label>
            </q-item-section>
            <q-item-section class="item_card">
              <q-item-label class="title">
                카카오 공동체 계정 (LDAP)
                <q-btn class="ibtn help">
                  <i class="ico help" /><span class="hidden">도움말</span>
                  <q-popup-edit
                    v-model="helpShow"
                    anchor="top middle"
                    class="c_popover bottom ldap"
                  >
                    <div class="inner">
                      카카오 크루 전용 기능으로 LDAP 계정 등록시,<br />
                      B^Cloud 알림을 카카오 알림톡으로 안내드립니다.
                    </div>
                  </q-popup-edit>
                </q-btn>
              </q-item-label>
              <q-item-label class="info">
                <!-- LDAP 등록전 -->
                <div class="entry">
                  <c-button
                    :btn-names="'등록하기'"
                    class="c_btn text"
                    @click="LDAPLoginModal = true"
                  >
                  </c-button>
                </div>
                <!-- LDAP 등록후 -->
                <!-- <div class="entry">
                  <span>root.choi</span>
                  <c-button
                    :btn-names="'등록해제'"
                    class="c_btn text"
                  />
                </div> -->
              </q-item-label>
            </q-item-section>
            <q-item-section class="item_card">
              <q-item-label class="title">개인 스토리지</q-item-label>
              <q-item-label class="info">
                <div class="stg_progress">
                  <div class="state">
                    <span class="start">150GiB</span>
                    <span class="end">200GiB</span>
                  </div>
                  <progress
                    value="75"
                    max="100"
                  />
                </div>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item class="item column">
            <q-item-section class="item_card">
              <q-item-label class="title">소속 프로젝트 및 권한</q-item-label>
              <q-item-label class="info">
                <q-chip class="c_chip">
                  <i class="ico note" />
                  <strong>00프로젝트1</strong>
                  <em>관리자</em>
                </q-chip>
                <q-chip class="c_chip">
                  <i class="ico note" />
                  <strong>00프로젝트1</strong>
                  <em>관리자</em>
                </q-chip>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="c_btngroup f_start">
        <q-btn
          to="/common/withdrawal"
          target="_blank"
          class="c_btn alink"
        >
          <span class="txt">회원탈퇴</span>
        </q-btn>
      </div>
    </div>
    <!-- Start : [내정보] LDAP 로그인(오픈 이후 개발) -->
    <q-dialog
      v-model="LDAPLoginModal"
      class="c_dialog medium"
    >
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>LDAP 로그인</strong>
          </p>
          <section class="section">
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="ldapID"
                placeholder="LDAP ID"
                clearable
                class="wsize_full"
              />
            </div>
          </section>
          <section class="section">
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="ldapPW"
                placeholder="PW"
                clearable
                class="wsize_full"
              />
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <c-button
            :outline="true"
            :btn-names="'취소'"
            v-close-popup
          />
          <c-button
            :btn-names="'로그인'"
            v-close-popup
            :disabled="true"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : [내정보] LDAP 로그인(오픈 이후 개발) -->
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CButton from "src/components/common/CButton.vue";

const title = ref("Account");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);

const tab = ref("tabs1");
const editInfoModel = ref(false);
const helpShow = ref(false);
const textChangeName = ref("김카브");
const textChangeDesc = ref("안녕하세요 저는 김카브 입니다. 소개텍스트");

const LDAPLoginModal = ref(false);
const ldapID = ref(null);
const ldapPW = ref(null);
</script>

<style lang="scss" scoped>
@import "src/css/my";
</style>
