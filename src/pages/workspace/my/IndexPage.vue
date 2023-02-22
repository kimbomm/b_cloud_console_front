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
          v-model="tabModel"
          align="left"
          class="c_tabs"
        >
          <q-tab
            name="my"
            label="내 정보"
          ></q-tab>
          <q-tab
            name="key"
            label="SSH key & API key"
          ></q-tab>
          <!-- TODO: TBD 개발 -->
          <!-- <q-tab
            name="alarm"
            label="내 알림"
          >
            <q-badge>19</q-badge>
          </q-tab> -->
        </q-tabs>
      </div>
      <!-- <template v-show="tabModel === 'my'"> -->
      <div class="my_info">
        <q-item-section
          v-model="editInfoModel"
          :class="editInfoModel ? '' : 'is-show'"
          class="item_card"
        >
          <q-item-label class="name">
            {{ userInfo.user.name }}
            <q-btn
              class="ibtn edit"
              @click="editInfoModel = !editInfoModel"
            >
              <span class="hidden">편집</span>
            </q-btn>
          </q-item-label>
          <q-item-label class="subject">
            {{ userInfo.user.description }}
          </q-item-label>
        </q-item-section>
        <q-item-section
          :class="editInfoModel ? 'is-show' : ''"
          class="edit_card"
        >
          <section class="section">
            <p class="sub_title">이름</p>
            <div class="c_inpgroup">
              <c-input-text
                v-model:value="modifyInfo.name"
                placeholder="최소 2자 최대 30자 입력 "
                class="wsize608"
                clearable
                outlined
              />
            </div>
          </section>
          <section class="section">
            <p class="sub_title">소개</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="modifyInfo.description"
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
            <q-btn class="c_btn line medium">
              <span class="txt">취소</span>
            </q-btn>
            <q-btn
              class="c_btn medium"
              @click="editInfoModel = !editInfoModel"
            >
              <span class="txt">저장</span>
            </q-btn>
          </div>
        </q-item-section>
      </div>
      <div class="my_account">
        <q-list class="account_list">
          <q-item class="item">
            <q-item-section class="item_card">
              <q-item-label class="title">이메일</q-item-label>
              <q-item-label class="info">{{ userInfo.user.email }}</q-item-label>
            </q-item-section>
            <q-item-section class="item_card">
              <q-item-label class="title">워크스페이스 역할</q-item-label>
              <q-item-label class="info">
                {{ $utils.getRoleName(userInfo.workspace_info.role, "workspace") }}
              </q-item-label>
            </q-item-section>
            <!-- TODO: TBD 개발 -->
            <!-- <q-item-section class="item_card">
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
                <div class="entry">
                  <q-btn
                    class="c_btn text"
                    @click="LDAPLoginModal = true"
                  >
                    <span class="txt">등록하기</span>
                  </q-btn>
                </div>
                <div class="entry">
                  <span>root.choi</span>
                  <q-btn class="c_btn text">
                    <span class="txt">등록해제</span>
                  </q-btn>
                </div>
              </q-item-label>
            </q-item-section> -->
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
                <q-chip
                  v-for="item in userProjects"
                  :key="item.project.id"
                  class="c_chip"
                >
                  <i class="ico note" />
                  <strong>{{ item.project.name }}</strong>
                  <em>{{ $utils.getRoleName(item.role, "project") }}</em>
                </q-chip>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <!-- TODO: TBD 개발 -->
      <!-- <div class="c_btngroup f_start">
        <q-btn
          to="/common/withdrawal"
          target="_blank"
          class="c_btn alink"
        >
          <span class="txt">회원탈퇴</span>
        </q-btn>
      </div> -->
      <!-- </template> -->
    </div>
    <!-- TODO: TBD 개발 -->
    <!-- Start : [내정보] LDAP 로그인(오픈 이후 개발) -->
    <!-- <q-dialog
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
          <q-btn
            label="취소"
            class="line"
            v-close-popup
          />
          <q-btn
            label="로그인"
            class="primary"
            v-close-popup
            disable
          />
        </q-card-actions>
      </q-card>
    </q-dialog> -->
    <!-- End : [내정보] LDAP 로그인(오픈 이후 개발) -->
  </q-page>
</template>
<script setup>
import { ref, onBeforeMount } from "vue";
import { useMeta } from "quasar";
import { useRoute } from "vue-router";
import { $utils } from "src/utils/utils";
import {
  UserService,
  WorkspaceService,
  ProjectService,
} from "src/services";
import CInputText from "components/common/CInputText.vue";

const title = ref("Account");
useMeta(() => ({
  title: title.value,
}));
const ptitle = ref(title);
const route = useRoute();
const { workspaceId } = route.params;

const tabModel = ref("my");
const editInfoModel = ref(false);
// const helpShow = ref(false);

// const LDAPLoginModal = ref(false);
// const ldapID = ref(null);
// const ldapPW = ref(null);
const modifyInfo = ref({
  name: "",
  description: ""
});
const userInfo = ref({
  user: {
    description: "",
    emain: "",
    id: 0,
    name: ""
  },
  workspace_info: {
    is_registered: true,
    role: "",
    user: {
      description: "",
      email: "",
      id: 0,
      name: ""
    },
    workspace: {
      id: 0,
      name: ""
    }
  }
});
const userProjects = ref([]);

const getUserInfo = async () => {
  try {
    const { id } = await UserService.getMe();
    const [myInfo, projects] = await Promise.all([
      WorkspaceService.getMemberInfo(workspaceId, id),
      ProjectService.getUserProjects(workspaceId, id),
    ]);
    userInfo.value = {
      user: myInfo.user,
      workspace_info: myInfo.workspace_info,
    };
    modifyInfo.value = {
      name: myInfo.workspace_info.user.name,
      description: myInfo.workspace_info.user.description,
    };
    userProjects.value = projects.projects;
  } catch (e) {
    console.log(e);
    return false;
  }
};

onBeforeMount(() => {
  getUserInfo();
});

</script>

<style lang="scss" scoped>
@import "src/css/my";
</style>
