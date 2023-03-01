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
    <div class="p-body" :class="{ 'key-body': tabModel === 'key'}">
      <div class="group-tabs">
        <c-tab
          v-model:value="tabModel"
          :tabs="tabs"
        />
      </div>
      <!-- 내 정보 컨텐츠 -->
      <template v-if="tabModel === 'my'">
        <div class="my_info">
          <q-item-section
            v-model="editInfoModel"
            :class="editInfoModel ? '' : 'is-show'"
            class="item_card"
          >
            <q-item-label class="name">
              {{ userInfo.name }}
              <q-btn
                class="ibtn edit"
                @click="onEditStart"
              >
                <span class="hidden">편집</span>
              </q-btn>
            </q-item-label>
            <q-item-label class="subject">
              {{ userInfo.description }}
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
                  ref="userName"
                  v-model:value="modifyInfo.name"
                  placeholder="이름을 입력해주세요"
                  class="wsize608"
                  :rules="nameRules"
                  clearable
                  outlined
                />
              </div>
            </section>
            <section class="section">
              <p class="sub_title">소개</p>
              <div class="c_inpgroup">
                <c-input-text
                  ref="userName"
                  v-model:value="modifyInfo.description"
                  placeholder="소개글을 입력해주세요"
                  type="textarea"
                  class="wsize_full hsize136"
                  :bottom-slots="true"
                  :maxlength="100"
                  :counter="true"
                  :input-style="{ height: '100%' }"
                  clearable
                  outlined
                />
              </div>
            </section>
            <div class="c_btngroup f_end">
              <q-btn
                class="c_btn line medium"
                @click="onEditSave(false)"
              >
                <span class="txt">취소</span>
              </q-btn>
              <q-btn
                class="c_btn medium"
                @click="onEditSave(true)"
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
                <q-item-label class="info">{{ userInfo.email }}</q-item-label>
              </q-item-section>
              <q-item-section class="item_card">
                <q-item-label class="title">워크스페이스 역할</q-item-label>
                <q-item-label class="info">
                  {{ $utils.getRoleName(userInfo.role, "workspace") }}
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
                      <!-- TODO: 스토리지 API 개발중 -->
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
                    :key="item.id"
                    class="c_chip"
                  >
                    <i class="ico note" />
                    <strong>{{ item.name }}</strong>
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
      </template>
      <!-- 내 정보 컨텐츠 끝-->
      <!-- SSH&API KEY 컨텐츠 -->
      <template v-else-if="tabModel === 'key'">
        <div class="flex-top mt30">
          <div class="notice-txt">
            <p class="name">SSH Key</p>
            <p
              v-if="sshKeys.length !== 0"
              class="disabled-txt"
            >최대 5개까지 등록 가능합니다</p>
          </div>
          <CButton
            :size="'medium'"
            :outline="true"
            :btn-names="'등록하기'"
          />
        </div>
        <section class="section">
          <EasyDataTable
            v-if="sshKeys.length !== 0"
            :headers="headers"
            :items="sshKeys"
            :hide-footer="true"
          >
            <!-- @click-row="showRow" -->
            <!-- name -->
            <template #item-name="item">
              <span class="txt">{{ item.name }}</span>
            </template>
            <!-- finger -->
            <template #item-finger="item">
              <span class="txt">{{ item.fingerprint }}</span>
            </template>
            <!-- registDate -->
            <template #item-registDate="item">
              <span class="txt">{{ $utils.paseseDate(item.created_at, 'YYYY-MM-DD hh:mm:ss') }}</span>
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
          <div v-else class="sign-up">
            <p class="mb30">SSH Key를 등록해주세요.</p>
            <CButton
              :size="'medium'"
              :btn-names="btnSign"
            />
          </div>
        </section>
        <div class="flex-top mt50">
          <p class="name">API Key</p>
          <div v-if="accessKey">
            <CButton
              :size="'medium'"
              :outline="true"
              :btn-names="'재생성'"
            />
            &nbsp;
            <CButton
              :size="'medium'"
              :outline="true"
              :btn-names="'삭제'"
            />
          </div>
        </div>
        <section class="section">
          <div v-if="accessKey" class="key-create">
          <!-- <div v-if="false" class="key-create"> -->
            <p>{{ accessKey }}</p>
            <p>
              생성일시
              <span>33333</span>
              <!-- <span>{{ createDate }}</span> -->
            </p>
          </div>
          <div v-else class="sign-up">
            <p>API Key를 생성해 주세요.</p>
            <p class="mb30">생성시 Secret key는 팝업에서 1회만 확인 가능합니다.</p>
            <CButton
              :size="'medium'"
              :btn-names="btnCreate"
            />
          </div>
        </section>
      </template>
      <!-- SSH&API KEY 컨텐츠 끝-->
      <div>

      </div>
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
import {
  ref,
  onBeforeMount,
  computed
} from "vue";
import { useMeta } from "quasar";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import { $utils } from "src/utils/utils";

import {
  UserService,
  WorkspaceService,
  ProjectService,
} from "src/services";
import CInputText from "components/common/CInputText.vue";
import CTab from "components/common/CTab.vue";
import CButton from "components/common/CButton.vue";

const title = ref("Account");
useMeta(() => ({
  title: title.value,
}));
const ptitle = ref(title);
const route = useRoute();
const { workspaceId } = route.params;

const userName = ref(null);
const tabModel = ref("my");
const editInfoModel = ref(false);
// const helpShow = ref(false);
// const LDAPLoginModal = ref(false);
// const ldapID = ref(null);
// const ldapPW = ref(null);

/**
 * route hash값 존재시
 * tabModel 셋팅: 탭 이동
 */
const tabs = [
  { name: "my", label: "내 정보" },
  { name: "key", label: "SSH key & API key" },
  // { name: "alarm", label: "알람" }, TODO: TBD 개발
];
const getTabsName = computed(() => tabs.map((tab) => tab.name));
const { hash } = route;
function setTabModel(hs) {
  const nHash = $utils.getHash(hs || hash);
  if (nHash && getTabsName.value.includes(nHash)) {
    tabModel.value = nHash;
  } else {
    const [firstValue] = getTabsName.value;
    tabModel.value = firstValue;
  }
}
setTabModel();
onBeforeRouteUpdate((to) => {
  setTabModel(to.hash);
});
// route hash값 존재시 탭이동 끝

const userId = ref(0);
const modifyInfo = ref({
  name: "",
  description: ""
});
const userInfo = ref({});
const userProjects = ref([]);
const nameRules = [
  (value) => (!!value) || "이름을 입력해주세요",
  (value) => (value.length <= 30 && value.length >= 2) || "2자 최대 30자로 입력해주세요",
];

const headers = [
  {
    text: "이름", value: "name", width: 100, sortable: false
  },
  {
    text: "Fingerprint", value: "finger", width: 200, sortable: false
  },
  {
    text: "등록일시", value: "registDate", width: 120, sortable: false
  },
  { text: "", value: "buttons", width: 100 },
];
const sshKeys = ref([]);
const accessKey = ref("");
const actionButtons = [
  { name: "삭제", event: "delete" },
];

const onActions = (eventName, rowData) => {
  console.log(eventName, rowData);
};

const getMe = async () => {
  try {
    const myInfo = await WorkspaceService.getMemberInfo(workspaceId, userId.value);
    userInfo.value = myInfo;
    modifyInfo.value.description = {
      name: myInfo.name,
      description: myInfo.description,
    };
    return myInfo;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const init = async () => {
  try {
    const { id } = await UserService.getMe();
    userId.value = id;

    const [myInfo, projects, keys, apis] = await Promise.all([
      WorkspaceService.getMemberInfo(workspaceId, userId.value),
      ProjectService.getUserProjects(workspaceId, userId.value),
      UserService.getSSHKeys(userId.value),
      UserService.getApiKeys(userId.value),
    ]);
    userInfo.value = myInfo;
    userProjects.value = projects.projects;
    sshKeys.value = keys.ssh_keys;
    accessKey.value = apis.access_key;
  } catch (e) {
    console.log(e);
    return false;
  }
};
const onEditStart = () => {
  modifyInfo.value = {
    name: userInfo.value.name,
    description: userInfo.value.description,
  };
  editInfoModel.value = true;
};
const onEditSave = async (isSave) => {
  if (!isSave) {
    editInfoModel.value = false;
  } else if (isSave) {
    if (userName.value.getHasError) {
      return false;
    }
    const params = {
      id: userInfo.value.id,
      body: modifyInfo.value
    };
    await UserService.updateMe(params);
    await getMe().then(() => {
      editInfoModel.value = false;
    });
  }
};

onBeforeMount(() => {
  init();
});

</script>

<style lang="scss" scoped>
@import "src/css/my";
@import "src/css/table";
@import 'src/css/key';
</style>
