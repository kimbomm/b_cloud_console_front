<template>
  <q-scroll-area class="fit">
    <q-list padding class="menu-list">
      <div class="side_menulist">
        <ul class="base_menu">
          <li class="dashboard">
            <q-item>
              <router-link to="/" class="menu-link">
                <i class="ico" /><span class="txt">{{ dashboard }}</span>
              </router-link>
            </q-item>
          </li>
          <li class="projects">
            <q-item>
              <router-link to="/projects/"
                v-model="projectVisible"
                @click="projectVisible = !projectVisible"
                class="menu-link toggle"
              >
                <i class="ico" /><span class="txt">{{ projects }}</span>
              </router-link>
              <q-btn type="button" class="c_btn c_icon">
                <i class="ico plus" /><span class="txt">추가</span>
              </q-btn>
            </q-item>
            <q-slide-transition>
              <ul v-show="projectVisible" class="sub_menu">
                <li>
                  <router-link to="/projects/task" class="menu-link">
                    <span class="txt">Test project</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/projects/instance" class="menu-link">
                    <span class="txt">
                      Test project - Test012Test project - Test012Test project - Test012
                    </span>
                  </router-link>
                </li>
              </ul>
            </q-slide-transition>
          </li>
          <li class="storage">
            <q-item>
              <router-link to="/storage/" class="menu-link">
                <i class="ico" /><span class="txt">{{ storage }}</span>
              </router-link>
            </q-item>
          </li>
          <li class="images">
            <q-item>
              <router-link to="/images/" class="menu-link">
                <i class="ico" /><span class="txt">{{ image }}</span>
              </router-link>
            </q-item>
          </li>
          <li class="members">
            <q-item>
              <router-link to="/members/" class="menu-link">
                <i class="ico" /><span class="txt">{{ member }}</span>
              </router-link>
            </q-item>
          </li>
          <li class="billing">
            <q-item>
              <router-link to="/billing/" class="menu-link">
                <i class="ico" /><span class="txt">{{ billing }}</span>
              </router-link>
            </q-item>
          </li>
        </ul>
        <div class="workspace_area">
          <router-link
            to="/manage/project"
            v-model="mngVisible"
            @click="mngVisible = !mngVisible"
            class="menu-link toggle"
          >
            <i class="ico" /><span class="txt">{{ workspace }}</span>
          </router-link>
          <q-slide-transition>
            <ul v-show="mngVisible" class="sub_menu">
              <li>
                <router-link to="/manage/project" class="menu-link">
                  <span class="txt">{{ mngProject }}</span>
                </router-link>
              </li>
              <li>
                <router-link to="/manage/instance" class="menu-link">
                  <span class="txt">{{ mngInstance }}</span>
                </router-link>
              </li>
              <li>
                <router-link to="/manage/storage" class="menu-link">
                  <span class="txt">{{ mngStorage }}</span>
                </router-link>
              </li>
            </ul>
          </q-slide-transition>
        </div>
      </div>
      <div class="side_foot">
        <div class="support_menu">
          <q-item>
            <router-link to="/support/" class="menu-link">
              <i class="ico support" />
              <p class="desc">궁금하신 사항은 아래 문의하기를 이용해주세요.</p>
              <span class="txt">문의하기</span>
            </router-link>
          </q-item>
        </div>
        <div class="mybox">
          <div class="myinfo">
            <strong class="name">{{ name }}</strong>
            <p class="mail">{{ mail }}</p>
          </div>
          <q-btn class="more-menu">
            <i class="ico more" /><span class="txt">메뉴</span>
            <q-menu class="side more_menu">
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <router-link to="#" class="menu-link"><span class="txt">내정보</span></router-link>
                </q-item>
                <q-item clickable v-close-popup>
                  <router-link to="#" class="menu-link">
                    <span class="txt">SSH Key & API Key</span>
                  </router-link>
                </q-item>
                <q-item clickable v-close-popup>
                  <router-link to="#" class="menu-link"><span class="txt">로그아웃</span></router-link>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-list>
  </q-scroll-area>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      projectVisible: ref(true),
      mngVisible: ref(true),
      dashboard: ref("Dashboard"),
      projects: ref("Projects"),
      storage: ref("Storage"),
      image: ref("Image"),
      member: ref("Member"),
      billing: ref("Billing"),
      workspace: ref("Workspace Manager"),
      mngProject: ref("Projects"),
      mngInstance: ref("Instance & Task"),
      mngStorage: ref("Storage"),
      support: ref("Support"),
      myinfo: ref("Myinfo"),
      name: ref("김카브"),
      mail: ref("root.choi@kakaobrainsddddfdslfkjalkdlfkad"),
    };
  }
};
</script>
<script setup>

</script>
<style lang="scss" scoped></style>
