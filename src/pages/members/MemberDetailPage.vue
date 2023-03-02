<template>
  <q-page class="p-content p-member p-detail">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Member" to="/members/" />
        <q-breadcrumbs-el label="멤버 상세" to="/members/memberdetail" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
      <div class="deleteBtn">
        <c-button
          :size="'medium'"
          :outline="true"
          :btn-names="btnName"
        />
      </div>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <template v-if='visible === true'>
        <div class="m-info">
          <div class="u-info">
            <p class="u-info_name">{{ userName }}</p>
            <p class="u-info_email">{{ userEmail }}</p>
            <p class="u-info_intro">{{ userIntroduce }}</p>
          </div>
          <div class="u-info2">
            <div>
              <p class="g-txt">마지막 로그인</p>
              <p class="b-txt">{{ loginDate }}</p>
            </div>
            <div>
              <p class="g-txt">가입일자</p>
              <p class="b-txt">{{ joinDate }}</p>
              <!-- 회원가입 일자 정보가 없는 경우 '미가입' 표기 -->
              <!-- <p class="b-txt">미가입</p> -->
            </div>
            <div>
              <p class="g-txt">LDAP 계정</p>
              <p class="b-txt">{{ ldapAccount }}</p>
            </div>
          </div>
        </div>
      </template>
      <template v-if='visible !== true'>
        <div class="w-info">
          <div class="w-info_work line pb">
            <div class="t-flex">
              <p class="title">워크스페이스</p>
              <div class="btnWrap">
                <q-btn
                  label="편집"
                  class="primary medium"
                  @click="visible = true"
                />
              </div>
            </div>

            <div class="work-wrap">
              <div class="w-name">
                <p class="g-txt">워크스페이스 이름</p>
                <p class="b-txt">{{ spaceName }}</p>
              </div>
              <div class="w-char">
                <p class="g-txt">역할</p>
                <p class="b-txt">{{ spaceChar }}</p>
              </div>
            </div>
          </div>
          <div class="w-info_proj line pb">
            <p class="title mt40">프로젝트</p>
            <div class="work-wrap">
              <div class="w-name">
                <p class="g-txt">프로젝트 이름</p>
                <p class="p-txt">{{ proName1 }}</p>
                <p class="p-txt">{{ proName2 }}</p>
              </div>
              <div class="w-char">
                <p class="g-txt">프로젝트 권한</p>
                <p class="p-txt">{{ proAuthor1 }}</p>
                <p class="p-txt">{{ proAuthor2 }}</p>
              </div>
            </div>
          </div>
          <div class="w-info_stor line">
            <p class="title mt40">개인 스토리지</p>
            <p class="amount">
              <span class="amount_used">150GiB</span>
              <span class="amount_useable">200GiB</span>
            </p>
            <div class="cont_footer">
              <progress
                value="150"
                max="200"
                class="stor_progress"
                />
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="m-info">
          <div class="u-info">
            <p class="u-info_name">{{userNamef}}</p>
            <p class="u-info_email">{{userEmailf}}</p>
            <p class="u-info_intro">{{userIntroducef}}</p>
          </div>
          <div class="u-info2">
            <div>
              <p class="g-txt">마지막 로그인</p>
              <p class="b-txt">{{loginDatef}}</p>
            </div>
            <div>
              <p class="g-txt">가입일자</p>
              <p class="b-txt">{{joinDatef}}</p>
            </div>
            <div>
              <p class="g-txt">LDAP 계정</p>
              <p class="b-txt">{{ldapAccountf}}</p>
            </div>
          </div>
        </div>
        <div class="w-info">
          <div class="w-info_work line pb">
            <div class="t-flex">
              <p class="title">워크스페이스</p>
              <div class="btnWrap">
                <div>
                  <q-btn
                    label="취소"
                    class="line medium"
                    @click="visible = false"
                  />
                </div>
                <div>
                  <q-btn
                    label="저장"
                    class="primary medium"
                    @click="visible = false"
                  />
                </div>
              </div>
            </div>

            <div class="work-wrap">
              <div class="w-name">
                <p class="char-g">워크스페이스 이름</p>
                <p class="b-txt">{{spaceNamef}}</p>
              </div>
              <div class="w-char">
                <p class="char-g">역할</p>
                <div class="group">
                  <div class="c_selectgroup">
                    <CDropdown
                      v-model:selected="selectedBasic"
                      :label="label"
                      :options="options"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-info_proj line pb">
            <p class="title mt40">프로젝트</p>
            <div class="p-tWrap">
              <p class="p-name">프로젝트 이름</p>
              <p class="p-auth">{{spaceChar}}</p>
            </div>
            <div class="sel-box">
              <div class="sel-wrap">
                <div class="sel-title">{{proNamef1}}</div>
                <div class="c_selectgroup w250">
                  <CDropdown
                  v-model:selected="selectedBasic"
                  :label="label2"
                  :options="options"
                  />
                </div>
              </div>
              <div class="sel-wrap">
                <div class="sel-title">{{proNamef2}}</div>
                <div class="c_selectgroup w250">
                  <CDropdown
                  v-model:selected="selectedBasic"
                  :label="label2"
                  :options="options"
                  />
                </div>
              </div>
            </div>
            <!-- <p class="error-txt">관리자 1명 이상 지정 필요</p> -->
            </div>
            <div class="w-info_stor line">
              <p class="title mt40">개인 스토리지</p>
              <div class="unit_type">
                  <span class="tit">현재 사용량</span>
                  <span class="counter">
                    <em class="usage">190</em>
                    <i class="bar">/</i>
                    <strong class="quota">450</strong>
                  </span>
                </div>
              <div class="c_inpgroup flex-end">
                <q-input
                  outlined
                  v-model="quota1"
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
            </div>
        </div>
      </template>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CDropdown from "components/common/CDropdown.vue";

const visible = ref(false);
const title = ref("Member");

const label = ref("프로젝트 이름");
const label2 = ref("전체");

// true Data
const userName = ref("박카브");
const userEmail = ref("we.dot@kakaobrain.com");
const userIntroduce = ref("소개글 Text소개글 Text소개글 Text소개글 Text소개글 Text소개글 Text");
const loginDate = ref("2022.11.22 12:32:33");
const joinDate = ref("2022.11.22");
const ldapAccount = ref("-");
const spaceName = ref("카카오 모빌리티(public)");
const spaceChar = ref("워크스페이스 멤버");
const proName1 = ref("00프로젝트1");
const proName2 = ref("00프로젝트1");
const proAuthor1 = ref("프로젝트 관리자");
const proAuthor2 = ref("멤버");
// false Data
const userNamef = ref("박카브");
const userEmailf = ref("we.dot@kakaobrain.com");
const userIntroducef = ref("소개글 Text소개글 Text소개글 Text소개글 Text소개글 Text소개글 Text");
const loginDatef = ref("2022.11.22 12:32:33");
const joinDatef = ref("2022.11.22");
const ldapAccountf = ref("-");
const spaceNamef = ref("카카오 모빌리티(public)");
const proNamef1 = ref("00프로젝트1");
const proNamef2 = ref("00프로젝트1");

useMeta(() => ({
  title: title.value,
}));

const options = ref([
  { label: "전체", value: 0 },
  { label: "프로젝트 관리자", value: 1 },
  { label: "멤버", value: 2 },
]);

const ptitle = ref(title);
</script>

<style lang="scss" scoped>
@import 'src/css/members';
</style>
