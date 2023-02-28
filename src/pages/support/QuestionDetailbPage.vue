<template>
  <q-page class="p-content p-support p-detail">
    <div class="p-head">
      <q-breadcrumbs
        class="c_breadcrumb"
        gutter="none"
      >
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el
          label="Workspace Manager"
          to="/support"
        />
        <q-breadcrumbs-el
          label="Support"
          to="/support"
        />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <!--   고객지원-1:1문의-스토리지 할당량 변경 문의내용 확인   -->
      <template v-if="visible === 'A'">
        <div class="amount-check">
          <p class="check-title">워크스페이스 스토리지 용량 변경 (관리자 전용)</p>
          <div class="q-badge green">답변완료</div>
          <p class="check-date">2023.04.01&nbsp;11:30:44</p>
          <p class="check-contents">워크스페이스 스토리지 중량 요청 드립니다.</p>
          <div class="amount-check_req-box">
            <p class="current-amount">
              현재 사용량
              <span>3,000</span>&nbsp;/&nbsp;<span>2,750</span>
            </p>
            <p class="request-amount">
              요청량
              <span>5,000</span>&nbsp;GiB
            </p>
          </div>
        </div>
        <div class="check-reply">
          <p class="check-reply_title">답변</p>
          <p class="check-reply_answer">5,000 GiB 스토리지 증량 처리 완료 되었습니다.</p>
          <!-- <p class="amount-reply_answer checking">관리자가 확인 중 입니다.</p> -->
        </div>
        <div class="c_btngroup">
          <CButton
            :size-types="1"
            :btn-types="1"
            :btn-names="listBtn"
            class="list-btn"
            to="/support/"
          />
        </div>

      </template>
      <!-- 고객지원-1:1문의-리소스 할당량 변경 문의내용 확인 -->
      <template v-else-if="visible === 'B'">
        <div class="amount-check">
          <p class="check-title">워크스페이스 CPU, GPU 할당량 변경 (관리자 전용)</p>
          <div class="q-badge green">답변완료</div>
          <p class="check-date">2023.04.01&nbsp;11:30:44</p>
          <p class="check-contents">워크스페이스 스토리지 중량 요청 드립니다.</p>
          <div class="req-wrap">
            <div class="amount-check_req-box2">
              <p class="amount-title">CPU</p>
              <p class="current-amount">
                현재 할당량
                <span class="c-span">3,000</span>
              </p>
              <p class="request-amount">
                요청량
                <span>5,000</span>
              </p>
            </div>
            <div class="amount-check_req-box2">
              <p class="amount-title">Tesla A100</p>
              <p class="current-amount">
                현재 할당량
                <span class="c-span">3,000</span>
              </p>
              <p class="request-amount">
                요청량
                <span>5,000</span>
              </p>
            </div>
            <div class="amount-check_req-box2">
              <p class="amount-title">Tesla V100</p>
              <p class="current-amount">
                현재 할당량
                <span class="c-span">3,000</span>
              </p>
              <p class="request-amount">
                요청량
                <span>5,000</span>
              </p>
            </div>
            <div class="amount-check_req-box2">
              <p class="amount-title">Tesla P40</p>
              <p class="current-amount">
                현재 할당량
                <span class="c-span">3,000</span>
              </p>
              <p class="request-amount">
                요청량
                <span>5,000</span>
              </p>
            </div>
          </div>
        </div>
        <div class="check-reply">
          <p class="check-reply_title">답변</p>
          <p class="check-reply_answer">5,000 GiB 스토리지 증량 처리 완료 되었습니다.</p>
          <!-- <p class="amount-reply_answer checking">관리자가 확인 중 입니다.</p> -->
        </div>
        <div class="c_btngroup">
          <CButton
            :size-types="1"
            :btn-types="1"
            :btn-names="listBtn"
            class="list-btn"
            to="/support/"
          />
        </div>
      </template>
      <!-- 고객지원-1:1문의-오류/버그제보 내용 확인 -->
      <template v-else-if="visible === 'C'">
        <div class="amount-check">
          <p class="check-title">오류 버그 제보 드립니다.&nbsp;<span>제목입니다.</span></p>
          <div class="q-badge green">답변완료</div>
          <p class="check-date date-fx">
            2023.04.01&nbsp;11:30:44
            <span class="error-report">오류/버그 제보</span>
          </p>
          <p class="check-contents mb0">오류 버그 제보 드립니다.</p>
          <!-- 이미지 추가 -->
          <div class="check-img">
            <img
              src=""
              alt=""
              class="img img1"
            >
            <img
              src=""
              alt=""
              class="img img1"
            >
            <img
              src=""
              alt=""
              class="img img2"
            >
            <img
              src=""
              alt=""
              class="img img3"
            >
            <img
              src=""
              alt=""
              class="img img4"
            >
            <img
              src=""
              alt=""
              class="img img5"
            >
          </div>
        </div>
        <div class="check-reply">
          <p class="check-reply_title">답변</p>
          <p class="check-reply_answer">감사합니다. 수정하도록 하겠습니다.</p>
          <!-- <p class="amount-reply_answer checking">관리자가 확인 중 입니다.</p> -->
        </div>
        <div class="c_btngroup">
          <CButton
            :size-types="1"
            :btn-types="1"
            :btn-names="listBtn"
            class="list-btn flex-end"
            to="/support/"
          />
        </div>
      </template>
      <!-- 고객지원-1:1문의-기타문의 내용 확인 -->
      <template v-else-if="visible === 'D'">
        <div class="amount-check">
          <p class="check-title">서비스 이용 문의드립니다.&nbsp;<span>제목입니다.</span></p>
          <div class="q-badge green">답변완료</div>
          <p class="check-date date-fx">
            2023.04.01&nbsp;11:30:44
            <span class="error-report">기타</span>
          </p>
          <p class="check-contents mb0">오류 버그 제보 드립니다.</p>
          <!-- 이미지 추가 -->
          <div class="check-img">
            <img
              src=""
              alt=""
              class="img img1"
            >
            <img
              src=""
              alt=""
              class="img img1"
            >
            <img
              src=""
              alt=""
              class="img img2"
            >
            <img
              src=""
              alt=""
              class="img img3"
            >
            <img
              src=""
              alt=""
              class="img img4"
            >
            <img
              src=""
              alt=""
              class="img img5"
            >
          </div>
        </div>
        <div class="check-reply">
          <p class="check-reply_title">답변</p>
          <p class="check-reply_answer">답변드립니다.</p>
          <!-- <p class="amount-reply_answer checking">관리자가 확인 중 입니다.</p> -->
        </div>
        <div class="c_btngroup">
          <CButton
            :size-types="1"
            :btn-types="1"
            :btn-names="listBtn"
            class="list-btn"
            to="/support/"
          />
        </div>
      </template>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CButton from "components/common/CButton.vue";

const title = ref("Support");
const visible = ref("B");
useMeta(() => ({
  title: title.value,
  visible,
}));

const ptitle = ref(title);
const listBtn = ref("목록");
</script>

<style lang="scss" scoped>
@import 'src/css/support';
.c_btngroup {
  display: flex; justify-content: flex-end;
  margin-top: 24px;
}
</style>
