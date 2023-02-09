<template>
  <q-scroll-area class="fit">
    <q-list class="menu-list">
      <div class="side_body">
        <!-- Base Menu -->
        <q-tree
          class="snb_base"
          :nodes="menuData"
          node-key="label"
          v-model:selected="selected"
        >
          <template v-slot:header-dash="menu">
            <router-link :to="`/${menu.node.path}`" class="link" exact-active-class="current">
              <i :class="`ico ${menu.node.icon}`" />
              <span>{{ menu.node.label }}</span>
            </router-link>
          </template>
          <template v-slot:header-pjt="menu">
            <i :class="`ico ${menu.node.icon}`" />
            <div class="label">
              <span>{{ menu.node.label }}</span>
            </div>
            <q-btn class="add"
              @click.stop="projectCreateModal = true"
            >
              <i class="ico plus" /><span class="txt">프로젝트 추가하기</span>
            </q-btn>

            <!-- Start : 접혔을 때 나오는 Projects 하위 메뉴 -->
            <q-btn class="toggle" @click="pjtToggle = !pjtToggle">
              <i :class="`ico ${menu.node.icon}`" />
              <span class="txt">프로젝트 메뉴</span>
              <q-menu :offset="[-40, -35]" class="submenu" :class="{ pjtshow: pjtToggle }">
                <q-list style="min-width: 178px">
                  <q-item>
                    <router-link to="/projects/task" class="menu-link">
                      <span class="txt">Test project</span>
                    </router-link>
                  </q-item>
                  <q-item>
                    <router-link to="/projects/instance" class="menu-link">
                      <span class="txt">Test project - Test012 Test012 Test012 Test012</span>
                    </router-link>
                  </q-item>
                  <q-separator />
                  <q-item>
                    <q-btn
                      class="menu-link add"
                      @click.stop="projectCreateModal = true"
                    >
                      <span class="txt">프로젝트 추가하기</span>
                    </q-btn>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <!-- End : 접혔을 때 나오는 Projects 하위 메뉴 -->
          </template>
          <template v-slot:header-pjtsub="submenu">
            <router-link :to="`/${submenu.node.path}`" class="link" exact-active-class="current">
              <span>{{ submenu.node.label }}</span>
            </router-link>
          </template>
          <template v-slot:header-pjtbtn="menu">
            <q-btn class="c_btn add"
              @click="projectCreateModal = true"
            >
              <i class="ico plus" /><span class="txt">{{ menu.node.label }}</span>
            </q-btn>
          </template>
          <template v-slot:header-base="menu">
            <router-link :to="`/${menu.node.path}`" class="link" exact-active-class="current">
              <i :class="`ico ${menu.node.icon}`" />
              <span>{{ menu.node.label }}</span>
            </router-link>
          </template>
        </q-tree>

        <!-- Workspace Manager Menu -->
        <q-tree
          class="snb_mng"
          :nodes="mngMenuData"
          node-key="label"
          v-model:selected="selected"
        >
          <template v-slot:header-mng="menu">
            <i :class="`ico ${menu.node.icon}`" />
            <div class="label">
              <span>{{ menu.node.label }}</span>
            </div>

            <!-- Start : 접혔을 때 나오는 Workspace 하위 메뉴 -->
            <q-btn class="toggle" @click="setToggle = !setToggle" :class="{ current: setToggle }">
              <i :class="`ico ${menu.node.icon}`" />
              <span class="txt">워크스페이스 메뉴</span>
              <q-menu :offset="[-50, -40]" class="submenu" :class="{ setshow: setToggle }">
                <q-list style="min-width: 178px">
                  <q-item>
                    <router-link to="/manage/project" class="menu-link">
                      <span class="txt">Projects</span>
                    </router-link>
                  </q-item>
                  <q-item>
                    <router-link to="/manage/instance" class="menu-link">
                      <span class="txt">Instance & Task</span>
                    </router-link>
                  </q-item>
                  <q-item>
                    <router-link to="/manage/storage" class="menu-link">
                      <span class="txt">Storage</span>
                    </router-link>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <!-- End : 접혔을 때 나오는 Workspace 하위 메뉴 -->
          </template>
          <template v-slot:header-mngsub="menu">
            <router-link :to="`/${menu.node.path}`" class="link" exact-active-class="current">
              <span>{{ menu.node.label }}</span>
            </router-link>
          </template>
        </q-tree>
      </div>

      <div class="side_foot">
        <div class="support_menu">
          <p class="caption">궁금하신 사항은 아래 문의하기를<br />이용해주세요.</p>
          <router-link
            to="/support"
            class="link"
            exact-active-class="current"
          >
            <i class="ico ico_support" />
            <span>문의하기</span>
          </router-link>
        </div>
        <q-item-section class="item_card member">
          <q-item-label class="name">김카브</q-item-label>
          <q-item-label class="mail">root.choi@kakaobrainkakaobrainkakaobrain.com</q-item-label>
          <q-btn class="more" @click="moreToggle = !moreToggle" :class="{ current: moreToggle }">
            <i class="ico ico_more" /><span class="txt">메뉴</span>
            <q-menu :offset="[-40, -35]" class="more_menu" :class="{ moreshow: moreToggle }">
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <router-link to="/my/" class="menu-link">
                    <span class="txt">내정보</span>
                  </router-link>
                </q-item>
                <q-item clickable v-close-popup>
                  <router-link to="/key" class="menu-link">
                    <span class="txt">SSH Key & API Key</span>
                  </router-link>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-btn class="menu-link"><span class="txt">로그아웃</span></q-btn>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-item-section>
      </div>
    </q-list>

    <!-- Start : 프로젝트 생성 팝업 -->
    <q-dialog v-model="projectCreateModal" class="c_dialog medium">
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>프로젝트 생성</strong>
          </p>
          <section class="section" aria-label="프로젝트 이름">
            <p class="sub_title">프로젝트 이름<i class="ess">*</i></p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textName"
                placeholder="최소 2자 최대 30자 입력"
                clearable
                class="wsize_full"
              />
            </div>
          </section>
          <section class="section" aria-label="프로젝트 설명">
            <p class="sub_title">프로젝트 설명</p>
            <div class="c_inpgroup">
                <q-input
                  outlined
                  v-model="textDesc"
                  bottom-slots
                  type="textarea"
                  placeholder="프로젝트 설명 입력"
                  clearable
                  counter
                  :count="10"
                  maxlength="500"
                  class="wsize_full hsize244"
                  :input-style="{height: '100%'}"
                >
                  <!-- <template v-slot:hint>
                    Description
                  </template> -->
                </q-input>
            </div>
          </section>
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn label="취소" class="line" v-close-popup />
          <q-btn
            label="확인"
            class="primary"
            @click="triggerSuccess('top-right')"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : 프로젝트 생성 팝업 -->
  </q-scroll-area>
</template>
<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const projectCreateModal = ref(false);
const textName = ref(null);
const textDesc = ref(null);
const selected = ref(null);
const setToggle = ref(false);
const pjtToggle = ref(false);
const moreToggle = ref(false);
const menuData = [
  {
    header: "dash",
    label: "Dashboard",
    icon: "ico_dashboard",
    path: "",
  },
  {
    header: "pjt",
    label: "Projects",
    icon: "ico_projects",
    children: [
      {
        header: "pjtsub",
        label: "Test project",
        path: "projects/task",
      },
      {
        header: "pjtsub",
        label: "Test project - Test012 Test012 Test012 Test012",
        path: "projects/instance",
      },
      {
        header: "pjtbtn",
        label: "프로젝트 추가하기",
      }
    ]
  },
  {
    header: "base",
    label: "Srorage",
    path: "storage",
    icon: "ico_storage",
  },
  {
    header: "base",
    label: "Image",
    path: "images",
    icon: "ico_image",
  },
  {
    header: "base",
    label: "Member",
    path: "members",
    icon: "ico_member",
  },
  {
    header: "base",
    label: "Billing",
    path: "billing",
    icon: "ico_billing",
  },
];
const mngMenuData = [
  {
    header: "mng",
    label: "Workspace Manager",
    icon: "ico_set",
    children: [
      {
        header: "mngsub",
        label: "Projects",
        path: "manage/project",
      },
      {
        header: "mngsub",
        label: "Instance & Task",
        path: "manage/instance",
      },
      {
        header: "mngsub",
        label: "Storage",
        path: "manage/storage",
      }
    ]
  }
];
/* const myMenuData = [
  {
    header: "mymenu",
    label: "내정보",
    path: "my",
  },
  {
    header: "mymenu",
    label: "SSH Key & API Key",
    path: "key",
  },
  {
    header: "mymenu",
    label: "로그아웃",
    path: "",
  },
]; */
const triggerSuccess = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: "신규 프로젝트가 생성되었습니다.",
      icon: "positive",
      position,
      actions: [
        { label: "닫기", class: "xclose", handler: () => { /* console.log('') */ } }
      ],
      timeout: 500
    });
  }, 100);
};

</script>
<style lang="scss" scoped></style>
