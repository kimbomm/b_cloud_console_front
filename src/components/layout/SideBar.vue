<template>
  <q-scroll-area class="fit">
    <q-list class="menu-list">
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
            <div class="textmenu">
              <q-item>
                <q-btn
                  v-model="projectVisible"
                  @click="projectVisible = !projectVisible"
                  class="menu-item toggle"
                >
                  <i class="ico" /><span class="txt">{{ projects }}</span>
                </q-btn>
                <q-btn type="button" class="c_btn add" @click="projectCreateModal = true">
                  <i class="ico plus" /><span class="txt">프로젝트 추가하기</span>
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
            </div>

            <!-- sidebar 접혔을 때 나오는 메뉴 구조 -->
            <div class="iconmenu">
              <q-btn class="ibtn">
                <i class="ico projects" />
                <q-menu :offset="[-50, -40]" class="submenu">
                  <q-list style="min-width: 178px">
                    <q-item>
                      <router-link to="/projects/task" class="menu-link">
                        <span class="txt">Test project</span>
                      </router-link>
                    </q-item>
                    <q-item>
                      <router-link to="/projects/instance" class="menu-link">
                        <span class="txt">Test project-Test012 project-Test012</span>
                      </router-link>
                    </q-item>
                    <q-separator />
                    <q-item>
                      <q-btn
                        class="menu-link add"
                        @click="projectCreateModal = true"
                      >
                        <span class="txt">프로젝트 추가하기</span>
                      </q-btn>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
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
          <div class="textmenu">
            <q-btn
              v-model="mngVisible"
              @click="mngVisible = !mngVisible"
              class="menu-item toggle"
            >
              <i class="ico" /><span class="txt">{{ workspace }}</span>
            </q-btn>
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

          <!-- sidebar 접혔을 때 나오는 메뉴 구조 -->
          <div class="iconmenu">
            <q-btn class="ibtn">
              <i class="ico workspace" />
              <q-menu :offset="[-50, -40]" class="submenu">
                <q-list style="min-width: 178px">
                  <q-item>
                    <router-link to="/manage/project" class="menu-link">
                      <span class="txt">{{ mngProject }}</span>
                    </router-link>
                  </q-item>
                  <q-item>
                    <router-link to="/manage/instance" class="menu-link">
                      <span class="txt">{{ mngInstance }}</span>
                    </router-link>
                  </q-item>
                  <q-item>
                    <router-link to="/manage/storage" class="menu-link">
                      <span class="txt">{{ mngStorage }}</span>
                    </router-link>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
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
          <q-btn class="more">
            <i class="ico more" /><span class="txt">메뉴</span>
            <q-menu :offset="[-40, -35]" class="more_menu">
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
        </div>
      </div>

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
    </q-list>
  </q-scroll-area>
</template>
<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const projectCreateModal = ref(false);
const projectVisible = ref(false);
const mngVisible = ref(false);
const dashboard = ref("Dashboard");
const projects = ref("Projects");
const storage = ref("Storage");
const image = ref("Image");
const member = ref("Member");
const billing = ref("Billing");
const workspace = ref("Workspace Manager");
const mngProject = ref("Projects");
const mngInstance = ref("Instance & Task");
const mngStorage = ref("Storage");
const name = ref("김카브");
const mail = ref("root.choi@kakaobrainsddddfdslfkjalkdlfkad");
const textName = ref(null);
const textDesc = ref(null);
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
      timeout: 3000
    });
  }, 100);
};
</script>
<style lang="scss" scoped></style>
