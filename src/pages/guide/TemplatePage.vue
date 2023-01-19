<template>
  <div class="p-content p-guide p-template">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">Dots Menu</h2>
        <div class="group">
          do
        </div>
      </section>
      <section class="section">
        <h2 class="h6">Table 상단 search</h2>
        <div class="group">
          do
        </div>
      </section>
      <section class="section">
        <h2 class="h6">Console 팝업</h2>
        <div class="group">
          <q-btn class="c_btn line" @click="projectCreateModal = true">
            <span class="txt">프로젝트 생성</span>
          </q-btn>
          <q-btn class="c_btn line" @click="projectChangeModal = true">
            <span class="txt">프로젝트 이름/설명 변경</span>
          </q-btn>
          <q-btn class="c_btn line" @click="quotaChangeModal = true">
            <span class="txt">할당량 변경 요청</span>
          </q-btn>
          <q-btn class="c_btn line" @click="memberInviteModal = true">
            <span class="txt">멤버 초대 요청</span>
          </q-btn>
        </div>
      </section>
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

    <!-- Start : 프로젝트 이름/설명 변경 팝업 -->
    <q-dialog v-model="projectChangeModal" class="c_dialog medium">
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>프로젝트 이름/설명 변경</strong>
          </p>
          <section class="section" aria-label="프로젝트 이름">
            <p class="sub_title">프로젝트 이름</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textChangeName"
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
                  v-model="textChangeDesc"
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
            label="저장"
            class="primary"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : 프로젝트 이름/설명 변경 팝업 -->

    <!-- Start : 할당량 변경 요청 팝업 -->
    <q-dialog v-model="quotaChangeModal" class="c_dialog medium">
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>할당량 변경 요청</strong>
          </p>
          <div class="c_form">
            <section class="section" aria-label="CPU">
              <p class="sub_title">CPU</p>
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
            </section>
            <section class="section" aria-label="Tesla V100">
              <p class="sub_title">Tesla V100</p>
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
                  v-model="quota2"
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
            </section>
            <section class="section" aria-label="Tesla A100_40G">
              <p class="sub_title">Tesla A100_40G</p>
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
                  v-model="quota3"
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
            </section>
            <section class="section" aria-label="Tesla V100_80G">
              <p class="sub_title">Tesla V100_80G</p>
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
                  v-model="quota4"
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
            </section>
          </div>
          <!-- //.c_form -->
        </q-card-section>
        <q-card-actions class="c_dialog_foot">
          <q-btn label="취소" class="line" v-close-popup />
          <q-btn label="확인" class="primary" disable v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : 할당량 변경 요청 팝업 -->

    <!-- Start : 멤버 초대 요청 팝업 -->
    <q-dialog v-model="memberInviteModal" class="c_dialog medium">
      <q-card>
        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>멤버 초대 요청</strong>
          </p>
          <section class="section" aria-label="이메일">
            <p class="sub_title">이메일</p>
            <div class="c_inpgroup">
              <q-input
                outlined
                v-model="textInviteName"
                placeholder="이름 또는 이메일 입력"
                clearable
                class="wsize_full"
              >
                <template v-slot:prepend>
                  <q-icon name="search" class="ico_search" />
                </template>
              </q-input>
            </div>
          </section>
          <section class="section" aria-label="워크스페이스 역할">
            <p class="sub_title">워크스페이스 역할</p>
            <div class="c_radiogroup mt20">
              <q-radio v-model="radCheck" val="rad1" label="워크스페이스 멤버" class="c_radio" />
              <q-radio v-model="radCheck" val="rad2" label="정산 관리자" class="c_radio" />
              <q-radio v-model="radCheck" val="rad3" label="게스트" class="c_radio mr0" />
              <q-btn class="ibtn help">
                <i class="ico help" /><span class="hidden">도움말</span>
                <q-popup-edit
                  v-model="helpShow"
                  anchor="top middle" self="top middle"
                  class="c_popover"
                >
                  <div class="inner">
                    게스트는 워크스페이스 멤버 조회 및 프로젝트 생성 기능이 제한됩니다.
                  </div>
                </q-popup-edit>
              </q-btn>
            </div>
          </section>
          <section class="section" aria-label="프로젝트">
            <p class="sub_title">프로젝트</p>
            <div class="c_selectgroup">
              <CDropdown
                v-model:selected="selectedCheck"
                :label="label"
                :options="options"
                :multiple="true"
                class="full_size"
              />
            </div>
          </section>
          <section class="section" aria-label="초대사유">
            <p class="sub_title">초대사유</p>
            <div class="c_inpgroup">
                <q-input
                  outlined
                  v-model="textInviteDesc"
                  bottom-slots
                  type="textarea"
                  placeholder="초대사유 입력"
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
            @click="triggerSuccess1('top-right')"
            v-close-popup
            disable
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- End : 멤버 초대 요청 팝업 -->
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { useMeta, useQuasar } from "quasar";
import CDropdown from "components/common/CDropdown.vue";

const $q = useQuasar();

const title = ref("Template");

useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const label = ref("프로젝트 선택");
const selectedCheck = ref(null);
const options = ref([
  { label: "프로젝트1", value: 0 },
  { label: "프로젝트2", value: 1 },
  { label: "프로젝트3", value: 2 },
  { label: "프로젝트4", value: 3 },
  { label: "프로젝트5", value: 4 },
]);

const projectCreateModal = ref(false);
const projectChangeModal = ref(false);
const quotaChangeModal = ref(false);
const memberInviteModal = ref(true);
const textName = ref(null);
const textChangeName = ref("aa인스턴스");
const textInviteName = ref(null);
const textDesc = ref(null);
const textChangeDesc = ref("프로젝트 설명 텍스트");
const textInviteDesc = ref(null);
const quota1 = ref(null);
const quota2 = ref(null);
const quota3 = ref(null);
const quota4 = ref(null);
const radCheck = ref("rad1");
const helpShow = ref(false);
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
const triggerSuccess1 = (position) => {
  setTimeout(() => {
    $q.notify({
      type: "positive",
      message: "워크스페이스 멤버가 추가 요청이 완료되었습니다.",
      icon: "positive",
      position,
      actions: [
        { label: "닫기", class: "xclose", handler: () => { /* console.log('') */ } }
      ],
      timeout: 3000
    });
  }, 100);
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
h2:not(:first-child){
  margin-top:40px;
}
.p-body{
  .section{
    h2{
      margin-bottom:10px;
    }
    &:not(:first-child){
      margin-top:40px;
    }
  }
  .group{
    margin-top:20px;
    .c_btn{
      &:not(:first-child){
        margin-left:10px;
      }
    }
  }
}
</style>
