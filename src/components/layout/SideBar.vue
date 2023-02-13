<template>
  <q-scroll-area class="fit">
    <q-list class="menu-list">
      <template v-for="(menu, i) in menuData" :key="i">
        <q-item
          v-if="menu.type === 'dash'"
          clickable
          class="menu dashboard"
          :class="{ active: itemSelected === i }"
          @click="itemSelected = i"
        >
          <q-item-section class="menu_section">
            <router-link :to="`/${menu.path}`" class="item">
              <i :class="`ico ${menu.icon}`" />
              <span class="txt">{{ menu.label }}</span>
            </router-link>
          </q-item-section>
        </q-item>

        <q-item
          v-if="menu.type === 'pjt'"
          clickable
          class="menu projects"
          :class="{ active: itemSelected === i, open: pjtToggle }"
        >
          <q-item-section class="menu_section">
            <div class="item arrow" @click="pjtToggle = !pjtToggle">
              <i :class="`ico ${menu.icon}`" />
              <span>{{ menu.label }}</span>

              <q-btn class="add" @click.stop="projectCreateModal = true">
                <i class="ico plus" /><span class="txt">프로젝트 추가하기</span>
              </q-btn>

              <!-- Start : 접혔을 때 나오는 Projects 하위 메뉴 -->
              <q-btn
                class="toggle"
                :class="{ active: itemSelected === i, open: pjtToggle }"
                @click="itemSelected = i, pjtToggle = !pjtToggle"
              >
                <i :class="`ico ${menu.icon}`" />
                <span class="txt">프로젝트 메뉴</span>
                <q-menu :offset="[-40, -35]" class="submenu" :class="{ open: pjtToggle }">
                  <q-list style="min-width: 178px">
                    <q-item v-for="(pjt, index) in menu.children" :key="index.label">
                      <router-link
                        :to="`/${pjt.path}`"
                        class="menu-link"
                        @click="itemSelected = i"
                      >
                        <span class="txt">{{ pjt.label }}</span>
                      </router-link>
                    </q-item>
                    <q-separator />
                    <q-item>
                      <q-btn class="menu-link add" @click.stop="projectCreateModal = true">
                        <span class="txt">프로젝트 추가하기</span>
                      </q-btn>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <!-- End : 접혔을 때 나오는 Projects 하위 메뉴 -->
            </div>
          </q-item-section>
          <!-- Start : 펼쳤을 때 나오는 Projects 하위 메뉴 -->
          <q-slide-transition>
            <q-card class="submenu">
              <q-item
                class="subitem"
                v-for="(pjt, index) in menu.children"
                :key="index.label"
              >
                <router-link :to="`/${pjt.path}`" class="link" @click="itemSelected = i">
                  <span class="txt">{{ pjt.label }}</span>
                </router-link>
              </q-item>
            </q-card>
          </q-slide-transition>
          <!-- End : 펼쳤을 때 나오는 Projects 하위 메뉴 -->
        </q-item>

        <q-item
          v-if="menu.type === 'base'"
          clickable
          class="menu base"
          :class="{ active: itemSelected === i }"
          @click="itemSelected = i"
        >
          <q-item-section class="menu_section">
            <router-link :to="`/${menu.path}`" class="item">
              <i :class="`ico ${menu.icon}`" />
              <span class="txt">{{ menu.label }}</span>
            </router-link>
          </q-item-section>
        </q-item>

        <q-item
          v-if="menu.type === 'mng'"
          clickable
          class="menu workspace"
          :class="{ active: itemSelected === i, open: setToggle }"
        >
          <q-item-section class="menu_section">
            <div class="item arrow" @click="setToggle = !setToggle">
              <i :class="`ico ${menu.icon}`" />
              <span>{{ menu.label }}</span>
              <!-- Start : 접혔을 때 나오는 Workspace 하위 메뉴 -->
              <q-btn
                class="toggle"
                :class="{ active: itemSelected === i, current: setToggle }"
                @click="itemSelected = i, setToggle = !setToggle"
              >
                <i :class="`ico ${menu.icon}`" />
                <span class="txt">워크스페이스 메뉴</span>
                <q-menu :offset="[-40, -35]" class="submenu" :class="{ open: setToggle }">
                  <q-list style="min-width: 178px">
                    <q-item
                      class="subitem"
                      v-for="(mng, index) in menu.children"
                      :key="index.label"
                    >
                      <router-link :to="`/${mng.path}`" class="menu-link" @click="itemSelected = i">
                        <span class="txt">{{ mng.label }}</span>
                      </router-link>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <!-- End : 접혔을 때 나오는 Workspace 하위 메뉴 -->
            </div>
          </q-item-section>
          <!-- Start : 펼쳤을 때 나오는 Workspace 하위 메뉴 -->
          <q-slide-transition>
            <q-card class="submenu">
              <q-item
                class="subitem"
                v-for="(mng, index) in menu.children"
                :key="index.label"
              >
                <router-link :to="`/${mng.path}`" class="link" @click="itemSelected = i">
                  <span class="txt">{{ mng.label }}</span>
                </router-link>
              </q-item>
            </q-card>
          </q-slide-transition>
          <!-- End : 펼쳤을 때 나오는 Workspace 하위 메뉴 -->
        </q-item>

        <q-item
          v-if="menu.type === 'support'"
          clickable
          class="menu support"
          :class="{ active: itemSelected === i }"
          @click="itemSelected = i"
        >
          <i :class="`ico ${menu.icon}`" />
          <router-link :to="`/${menu.path}`" class="link link_close">
            <span class="txt">{{ menu.label }}</span>
          </router-link>
          <q-item-section class="menu_section">
            <p class="caption">{{ menu.caption }}</p>
            <router-link :to="`/${menu.path}`" class="link">
              <span class="txt">{{ menu.label }}</span>
            </router-link>
          </q-item-section>
        </q-item>

        <q-item
          v-if="menu.type === 'mymenu'"
          clickable
          class="menu my"
          :class="{ active: itemSelected === i }"
          @click="itemSelected = i"
        >
          <i :class="`ico ${menu.icon}`" />
          <q-item-section class="menu_section">
            <q-item-label class="name">{{ menu.name }}</q-item-label>
            <q-item-label class="mail">{{ menu.mail }}</q-item-label>
          </q-item-section>
          <!-- Start : 메뉴 클릭시 나오는 팝업 My Menu 하위 메뉴 -->
          <q-btn class="more" @click="moreToggle = !moreToggle">
            <i :class="`ico ico_more`" /><span class="txt">메뉴</span>
            <q-menu
              anchor="top right"
              self="bottom right"
              class="more_menu"
              :class="{ open: moreToggle }"
            >
              <q-list style="min-width: 100px">
                <q-item
                  class="subitem"
                  v-for="(my, index) in menu.children"
                  :key="index.label"
                >
                  <router-link :to="`/${my.path}`" class="menu-link">
                    <span class="txt">{{ my.label }}</span>
                  </router-link>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <!-- End : 메뉴 클릭시 나오는 팝업 My Menu 하위 메뉴 -->
        </q-item>
      </template>
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

const itemSelected = ref(false);
const projectCreateModal = ref(false);
const textName = ref(null);
const textDesc = ref(null);
const pjtToggle = ref(false);
const setToggle = ref(false);
const moreToggle = ref(false);
const menuData = [
  {
    type: "dash",
    label: "Dashboard",
    icon: "ico_dashboard",
    path: "",
  },
  {
    type: "pjt",
    label: "Projects",
    icon: "ico_projects",
    children: [
      {
        type: "pjtsub",
        label: "Test project",
        path: "projects/task",
      },
      {
        type: "pjtsub",
        label: "Test project - Test012 Test012 Test012 Test012",
        path: "projects/instance",
      },
    ]
  },
  {
    type: "base",
    label: "Srorage",
    icon: "ico_storage",
    path: "storage",
  },
  {
    type: "base",
    label: "Image",
    icon: "ico_image",
    path: "images",
  },
  {
    type: "base",
    label: "Member",
    icon: "ico_member",
    path: "members",
  },
  {
    type: "base",
    label: "Billing",
    path: "billing",
    icon: "ico_billing",
  },
  {
    type: "mng",
    label: "Workspace Manager",
    icon: "ico_set",
    children: [
      {
        type: "mngsub",
        label: "Projects",
        path: "manage/project",
      },
      {
        type: "mngsub",
        label: "Instance & Task",
        path: "manage/instance",
      },
      {
        type: "mngsub",
        label: "Storage",
        path: "manage/storage",
      }
    ]
  },
  {
    type: "support",
    label: "문의하기",
    icon: "ico_support",
    caption: "궁금하신 사항은 아래 문의하기를 이용해주세요.",
    path: "support",
  },
  {
    type: "mymenu",
    label: "",
    name: "김카브",
    mail: "root.choi@kakaobrainsddddf.sss",
    icon: "ico_my",
    children: [
      {
        type: "mysub",
        label: "내정보",
        path: "my",
      },
      {
        type: "mysub",
        label: "SSH Key & API Key",
        path: "key",
      },
      {
        type: "mysub",
        label: "로그아웃",
        path: "login",
      },
    ]
  },
];
const triggerSuccess = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: "신규 프로젝트가 생성되었습니다.",
      icon: "positive",
      position,
      actions: [
        { label: "닫기", class: "xclose", handler: () => { console.log(""); } }
      ],
      timeout: 500
    });
  }, 100);
};

</script>
<style lang="scss" scoped>

</style>
