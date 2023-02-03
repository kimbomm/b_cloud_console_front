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
        <CButton
          :size-types="2"
          :btn-types="4"
          :btn-names="btnName"
        />
      </div>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div v-if='visible === "A"'>
        <div class="m-info">
          <div class="u-info">
            <p class="u-info_name">박카브</p>
            <p class="u-info_email">we.dot@kakaobrain.com</p>
            <p class="u-info_intro">소개글 Text소개글 Text소개글 Text소개글 Text소개글 Text소개글 Text</p>
          </div>
          <div class="u-info2">
            <div>
              <p class="g-txt">마지막 로그인</p>
              <p class="b-txt">2022.11.22<span>12:32:33</span></p>
            </div>
            <div>
              <p class="g-txt">가입일자</p>
              <p class="b-txt">2022.11.22</p>
            </div>
            <div>
              <p class="g-txt">LDAP 계정</p>
              <p class="b-txt">-</p>
            </div>
          </div>
        </div>
        <div class="w-info">
          <div class="w-info_work line pb">
            <div class="t-flex">
              <p class="title">워크스페이스</p>
              <div>
                <CButton
                  :size-types="2"
                  :btn-types="1"
                  :btn-names="'편집'"
                />
              </div>
            </div>

            <div class="work-wrap">
              <div class="w-name">
                <p class="g-txt">워크스페이스 이름</p>
                <p class="b-txt">카카오 모빌리티(public)</p>
              </div>
              <div class="w-char">
                <p class="g-txt">역할</p>
                <p class="b-txt">워크스페이스 멤버</p>
              </div>
            </div>
          </div>
          <div class="w-info_proj line pb">
            <p class="title mt40">프로젝트</p>
            <div class="work-wrap">
              <div class="w-name">
                <p class="g-txt">프로젝트 이름</p>
                <p class="p-txt">00프로젝트1</p>
                <p class="p-txt">MLTEST 프로젝트 스토리지</p>
              </div>
              <div class="w-char">
                <p class="g-txt">프로젝트 권한</p>
                <p class="p-txt">프로젝트 관리자</p>
                <p class="p-txt">멤버</p>
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
              <div class="progress_bar_area"></div>
            </div>
          </div>
        </div>
      </div>
      <template v-else>
        <div class="m-info">
          <div class="u-info">
            <p class="u-info_name">박카브</p>
            <p class="u-info_email">we.dot@kakaobrain.com</p>
            <p class="u-info_intro">소개글 Text소개글 Text소개글 Text소개글 Text소개글 Text소개글 Text</p>
          </div>
          <div class="u-info2">
            <div>
              <p class="g-txt">마지막 로그인</p>
              <p class="b-txt">2022.11.22<span>12:32:33</span></p>
            </div>
            <div>
              <p class="g-txt">가입일자</p>
              <p class="b-txt">2022.11.22</p>
            </div>
            <div>
              <p class="g-txt">LDAP 계정</p>
              <p class="b-txt">-</p>
            </div>
          </div>
        </div>
        <div class="w-info">
          <div class="w-info_work line pb">
            <div class="t-flex">
              <p class="title">워크스페이스</p>
              <div class="btnWrap">
                <div>
                  <CButton
                    :size-types="2"
                    :btn-types="4"
                    :btn-names="btnCancle"
                  />
                </div>
                <div>
                  <CButton
                    :size-types="2"
                    :btn-types="1"
                    :btn-names="btnSave"
                  />
                </div>
              </div>
            </div>

            <div class="work-wrap">
              <div class="w-name">
                <p class="char-g">워크스페이스 이름</p>
                <p class="b-txt">카카오 모빌리티(public)</p>
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
              <p class="p-auth">프로젝트 권한</p>
            </div>
            <div class="sel-box">
              <div class="sel-wrap">
                <div class="c_selectgroup w216">
                  <CDropdown
                    v-model:selected="selectedBasic"
                    :label="label"
                    :options="options2"
                  />
                </div>
                <div class="c_selectgroup w250">
                    <CDropdown
                      v-model:selected="selectedBasic"
                      :label="label"
                      :options="options"
                    />
                  </div>
              </div>
              <div class="sel-wrap">
                <div class="c_selectgroup w216">
                  <CDropdown
                    v-model:selected="selectedBasic"
                    :label="label"
                    :options="options2"
                  />
                </div>
                <div class="c_selectgroup w250">
                  <CDropdown
                    v-model:selected="selectedBasic"
                    :label="label"
                    :options="options"
                  />
                </div>
              </div>
            </div>
            <div class="delete-btn">
              <q-btn type="button" class="c_btn c_icon medium line">
                <i class="ico plus" /><span class="txt">Hover</span>
              </q-btn>
            </div>
          </div>
          <div class="add-pro">
            <a href="#">
              <span>
                프로젝트 추가 아이콘
              </span>
              <p>프로젝트 추가</p>
            </a>
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
import CButton from "components/common/CButton.vue";
import CDropdown from "components/common/CDropdown.vue";

const visible = ref("A");
const title = ref("Member");
const btnName = ref("삭제");
const btnCancle = ref("취소");
const btnSave = ref("저장");

useMeta(() => ({
  title: title.value,
  visible,
}));

const options = ref([
  { label: "전체", value: 0 },
  { label: "프로젝트 관리자", value: 1 },
  { label: "멤버", value: 2 },
]);

const options2 = ref([
  { label: "프로젝트 이름", value: 0 },
  { label: "00 프로젝트1", value: 1 },
  { label: "00 프로젝트2", value: 2 },
]);

const ptitle = ref(title);
</script>

<style lang="scss" scoped>
@import 'src/css/members';
</style>
