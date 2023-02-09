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
<style lang="scss" scoped>
::-v-deep{
.q-layout{
  &.sm-sidemenu{
    // sidemenu
    .l-sidebar{
      .textmenu,
      .txt,
      .sub_menu,
      .c_btn{
        display:none;
      }
      .iconmenu{
        display:flex;
      }
      .menu-link,
      .menu-item{
        width:48px;height:48px;
        &.router-link-exact-active{
          background-color:$surface03;
        }
      }
      .menu-link .ico,
      .menu-item .ico{
        margin-right:0;
      }

      .support_menu{
        .menu-link{
          .txt,
          .desc{
            display:none;
          }
          &.router-link-exact-active{
            background:$surface03;
            .ico{
              &.support{
                background-image:url($iconUrl + '32/ico_support_pressed.svg');
              }
            }
          }
        }
      }
      .mybox{
        background:$color;
      }
      .myinfo{
        justify-content: flex-start;
        height:100%;
        margin-right: 0;
        padding-left: 0;
        &:before{
          margin-top:11px;
        }
      }
      .name,.mail{
        display:none;
      }
    }
  }
}
.l-sidebar{
  .iconmenu{
    display:none;
    flex:1;
    height:100%;
  }
  .ibtn{
    width:48px;height:48px;
    padding:0;
    border:0;
    border-radius:8px;
    background:$color;
    .ico{
      width:32px;height:32px;
      &.projects{
        background-image:url($iconUrl + '32/ico_projects_normal.svg');
      }
      &.workspace{
        background-image:url($iconUrl + '32/ico_manager_normal.svg');
      }
    }
    @at-root .q-layout.sm-sidemenu .l-sidebar .ibtn{
      &:focus,
      &:active{
        background:$surface03!important;
        .ico{
          &.projects{
            background-image:url($iconUrl + '32/ico_projects_pressed.svg');
          }
          &.workspace{
            background-image:url($iconUrl + '32/ico_manager_pressed.svg');
          }
        }
      }
    }
  }
  .q-item{
    align-items: center;
    position:relative;
    min-height: 48px;
    padding: 0 16px;
  }
  .menu-link,
  .menu-item{
    display:flex;
    align-items: center;
    width:100%;height:48px;
    padding:0 8px;
    border-radius: 8px;
    background-repeat:no-repeat;
    background-position:50% 50%;
    color:$surface12;font-size:$fs14;
    .q-focus-helper{
      display:none;
    }
    .ico{
      width:32px;height:32px;
      margin-right:8px;
      background-repeat:no-repeat;
      background-position:50% 50%;
    }
    &.router-link-exact-active{
      background-color:#E8ECF1;
      color:$primary;
    }
    &.toggle{
      width:100%;height:48px;
      padding:0 8px;
      border-radius: 8px;
      background:none;
      color:$surface12;font-size:$fs14;
      &[modelvalue="true"]{
        background-color:$surface03;
        color:$primary;
      }
      &.router-link-exact-active{
        background:none;
        // color:$primary;
        &[modelvalue="true"]{
          color:$primary;
        }
      }
    }
  }
  .q-btn--actionable.q-btn--standard:active:before,
  .q-btn--actionable.q-btn--standard.q-btn--active:before{
    box-shadow: none;
  }
  .q-btn{
    &:before{
      box-shadow:none;
    }
    .ico + .txt{
      margin-left:0;
    }
    &.add{
      flex:none;
      position:absolute;top:12px;right:8px;
      width:24px;
      min-height:24px;
      height:24px;
      padding:0;
      border-radius:4px;
      box-shadow:none;
      .ico{
        width:16px;height:16px;
        background-image:url($iconUrl + '16/ico_plus_white.svg');
      }
      .txt{
        display:none;
      }
    }
    &.menu-item{
      align-items: flex-start;
      width:100%;height:48px;
      padding:0 8px;
      border-radius: 8px;
      background:none;
      color:$surface12;font-size:$fs14;
      &[modelvalue="true"]{
        color:$primary;
      }
      .txt{
        position:relative;
        padding-right:16px;
        &:after{
          content:"";
          display:inline-block;
          position:absolute;top:-1px;right:0;
          transition: .3s;
          width:16px;height:16px;
          background:url($iconUrl + '16/ico_arrow_down_gray.svg') no-repeat 50% 50%;
          @at-root .l-sidebar .q-btn.menu-item[modelvalue="true"] .txt:after{
            transform:rotate(180deg) translateY(-2px);
            background-image:url($iconUrl + '16/ico_arrow_down_blue.svg');
          }
        }
      }
    }
  }
  .sub_menu{
    padding: 0 16px;
    .menu-link{
      padding:0 8px;
      background-color:$color;
      color:$gray800;
      &:before{
        content:"";
        flex:none;
        display:inline-block;
        width:32px;height:32px;
        margin-right:8px;
        background:url($iconUrl + '32/ico_menuopen_gray.svg') no-repeat 0 50%;
      }
      >span{
        display:inline-block;
        max-width:100%;
        @include ellipsis;
      }
      &.router-link-exact-active{
        color:$primary;
      }
    }
  }
  .workspace_area{
    margin-top:16px;
    padding:16px;
    border-top:1px solid $surface03;
    .sub_menu{
      padding:0;
    }
    >.menu-link{
      .ico{
        background-image:url($iconUrl + '32/ico_manager_normal.svg');
      }
      &.router-link-exact-active{
        .ico{
          background-image:url($iconUrl + '32/ico_manager_pressed.svg');
        }
      }
      &[modelvalue="false"]{
        .ico{
          background-image:url($iconUrl + '32/ico_manager_normal.svg');
        }
      }
      &[modelvalue="true"]{
        .ico{
          background-image:url($iconUrl + '32/ico_manager_pressed.svg');
        }
      }
    }
    .q-btn{
      &.menu-item{
        .ico{
          background-image:url($iconUrl + '32/ico_manager_normal.svg');
        }
        &[modelvalue="true"]{
          .ico{
            background-image:url($iconUrl + '32/ico_manager_pressed.svg');
          }
        }
      }
    }
  }
  .dashboard{
    .menu-link{
      .ico{
        background-image:url($iconUrl + '32/ico_dashboard_normal.svg');
      }
      &.router-link-exact-active{
        .ico{
          background-image:url($iconUrl + '32/ico_dashboard_pressed.svg');
        }
      }
    }
  }
  .projects{
    .iconmenu{
      padding:0 16px;
    }
    .menu-link{
      .ico{
        background-image:url($iconUrl + '32/ico_projects_normal.svg');
      }
      &.router-link-exact-active{
        .ico{
          background-image:url($iconUrl + '32/ico_projects_pressed.svg');
        }
      }
      &.toggle{
        &[modelvalue="true"],
        &[modelvalue="true"].router-link-exact-active{
          .ico{
            // background-image:url($iconUrl + '32/ico_projects_pressed.svg');
          }
        }
      }
    }
    .q-btn{
      &.c_icon{
        margin-right:12px;
      }
      &.menu-item{
        .ico{
          background-image:url($iconUrl + '32/ico_projects_normal.svg');
        }
        &[modelvalue="true"]{
          .ico{
            background-image:url($iconUrl + '32/ico_projects_pressed.svg');
          }
        }
      }
    }
  }
  .storage{
    .menu-link{
      .ico{
        background-image:url($iconUrl + '32/ico_storage_normal.svg');
      }
      &.router-link-exact-active{
        .ico{
          background-image:url($iconUrl + '32/ico_storage_pressed.svg');
        }
      }
    }
  }
  .images{
    .menu-link{
      .ico{
        background-image:url($iconUrl + '32/ico_image_normal.svg');
      }
      &.router-link-exact-active{
        .ico{
          background-image:url($iconUrl + '32/ico_image_pressed.svg');
        }
      }
    }
  }
  .members{
    .menu-link{
      .ico{
        background-image:url($iconUrl + '32/ico_member_normal.svg');
      }
      &.router-link-exact-active{
        .ico{
          background-image:url($iconUrl + '32/ico_member_pressed.svg');
        }
      }
    }
  }
  .billing{
    .menu-link{
      .ico{
        background-image:url($iconUrl + '32/ico_brlling_normal.svg');
      }
      &.router-link-exact-active{
        .ico{
          background-image:url($iconUrl + '32/ico_brlling_pressed.svg');
        }
      }
    }
  }

  .support_menu{
    display:flex;
    align-items: flex-start;
    height:66.8px;
    .q-item{
      flex-direction: column;
      align-items: flex-start;
      min-height:auto;
      padding:0;
    }
    .menu-link{
      flex-direction: row;
      position:relative;
      margin:0;padding:0;
      .ico{
        &.support{
          flex:none;
          display:inline-block;
          width:48px;height:48px;
          background:url($iconUrl + '32/ico_support_normal.svg') no-repeat 50% 50%;
        }
      }
      .txt{
        position:absolute;bottom:-16px;left:56px;
        height:auto;
        padding:0;
        border-radius:0;
        background:none;
        color:$gray600;font-size:$fs12;
        text-decoration: underline;
      }
      .desc{
        display:inline-flex;
        flex:1 auto;
        margin-top:8px;
        color:$gray300;font-size:$fs12;
      }
      &.router-link-exact-active{
        background:$color;
      }
    }
  }
  .mybox{
    display:flex;
    align-items: center;
    height:56px;
    margin-top:28px;
    padding:0 8px;
    border-radius:8px;
    background:$white;
    @at-root .q-layout.sm-sidemenu .l-sidebar .side_foot .mybox{
      padding:0;
    }
  }
  .myinfo{
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    flex:1 auto;
    position:relative;
    max-width:calc(100% - 44px);
    margin-right:8px;
    padding-left:40px;
    &:before{
      content:"";
      display:inline-block;
      position:absolute;top:0;left:0;
      width:32px;height:32px;
      background:url($iconUrl + '32/ico_profile_normal.svg') no-repeat 50% 50%;
      @at-root .q-layout.sm-sidemenu .l-sidebar .side_foot .myinfo:before{
        display:none;
      }
    }
  }
  .name{
    color:$gray800;font-size:$fs14;font-weight:700;
  }
  .mail{
    max-width:100%;
    color:$gray500;font-size:$fs12;font-weight:400;
    @include ellipsis;
  }
  .q-btn{
    &.more{
      flex:none;
      width:36px;height:36px;
      min-height:36px;
      padding:0 8px;
      border-radius: 4px;
      background:$surface02;
      &:hover{
        background:$surface04;
      }
      .ico{
        width:20px;height:20px;
        background-image:url($iconUrl + '20/ico_more_normal.svg');
      }
      .txt{
        display:none;
      }
      @at-root .q-layout.sm-sidemenu .l-sidebar .side_foot .q-btn.more{
        width:48px;height:48px;
        background:$color;
        .ico{
          width:32px;height:32px;
          background-image:url($iconUrl + '32/ico_profile_normal.svg');
        }
        &:focus,
        &:active{
          background:$surface03;
          .ico{
            background-image:url($iconUrl + '32/ico_profile_pressed.svg');
          }
        }
      }
    }
  }
}
}
</style>
