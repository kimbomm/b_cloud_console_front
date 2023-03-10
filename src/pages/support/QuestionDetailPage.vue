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
        />
      </q-breadcrumbs>
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="view_contents">
        <div class="view_head">
          <p class="view_title">워크스페이스 스토리지 용량 변경 (관리자 전용)</p>
          <q-badge class="green">
            <span class="txt">답변완료</span>
          </q-badge>
          <!-- <q-badge>
            <span class="txt">확인중</span>
          </q-badge> -->
          <p class="info">
            <span class="date">2023.04.01 11:30:44</span>
            <template v-if="visible === 'C'">
              <span class="type">오류/버그 제보</span>
            </template>
            <template v-if="visible === 'D'">
              <span class="type">기타</span>
            </template>
          </p>
        </div>
        <div class="view_subject">
          워크스페이스 스토리지 중량 요청 드립니다.
          <!-- 오류/버그제보 내용 확인 -->
          <template v-if="visible === 'C'">
            <!-- 이미지 추가 영역 -->
            <div class="figure">
              <picture
                v-for="figureImg in imgData"
                :key="figureImg"
                class="picture"
              >
                <img :src="figureImg.path" :alt="figureImg.desc" />
              </picture>
            </div>
          </template>
          <!-- 기타문의 내용 확인 -->
          <template v-if="visible === 'D'">
            <!-- 이미지 추가 영역 -->
            <div class="figure">
              <picture
                v-for="figureImg in imgData"
                :key="figureImg"
                class="picture"
              >
                <img :src="figureImg.path" :alt="figureImg.desc" />
              </picture>
            </div>
          </template>
        </div>
        <div class="req-wrap">
          <!--  스토리지 할당량 변경 문의내용 확인  -->
          <template v-if="visible === 'A'">
            <div class="req-box">
              <p class="amount">
                현재 사용량
                <span>3,000</span>/<span>2,750</span>
              </p>
              <p class="amount">
                요청량
                <span class="req-amount">5,000</span>GiB
              </p>
            </div>
          </template>
          <!-- 리소스 할당량 변경 문의내용 확인 -->
          <template v-if="visible === 'B'">
            <div class="req-box">
              <p class="amount-title">CPU</p>
              <p class="amount">
                현재 할당량
                <span class="c-span">3,000</span>
              </p>
              <p class="amount">
                요청량
                <span>5,000</span>
              </p>
            </div>
            <div class="req-box">
              <p class="amount-title">Tesla A100</p>
              <p class="amount">
                현재 할당량
                <span class="c-span">3,000</span>
              </p>
              <p class="amount">
                요청량
                <span>5,000</span>
              </p>
            </div>
            <div class="req-box">
              <p class="amount-title">Tesla V100</p>
              <p class="amount">
                현재 할당량
                <span class="c-span">3,000</span>
              </p>
              <p class="amount">
                요청량
                <span>5,000</span>
              </p>
            </div>
            <div class="req-box">
              <p class="amount-title">Tesla P40</p>
              <p class="amount">
                현재 할당량
                <span class="c-span">3,000</span>
              </p>
              <p class="amount">
                요청량
                <span>5,000</span>
              </p>
            </div>
            <div class="req-box">
              <p class="amount-title">Tesla V100</p>
              <p class="amount">
                현재 할당량
                <span class="c-span">3,000</span>
              </p>
              <p class="amount">
                요청량
                <span>5,000</span>
              </p>
            </div>
            <div class="req-box">
              <p class="amount-title">Tesla P40</p>
              <p class="amount">
                현재 할당량
                <span class="c-span">3,000</span>
              </p>
              <p class="amount">
                요청량
                <span>5,000</span>
              </p>
            </div>
          </template>
        </div>
      </div>
      <div class="view_reply">
        <p class="reply_title">답변</p>
        <!-- 답변 내용이 있는경우 -->
        <div class="reply_answer">
          5,000 GiB 스토리지 증량 처리 완료 되었습니다.
        </div>

        <!-- 답변 내용이 없는 경우 -->
        <!--
          <div class="reply_answer checking">
            관리자가 확인 중 입니다.
          </div>
        -->
      </div>
      <div class="c_btngroup f_end">
        <c-button
          :size="'medium'"
          :btn-names="'목록'"
          class="list"
        />
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CButton from "components/common/CButton.vue";

const title = ref("Support");
useMeta(() => ({
  title: title.value,
}));
const ptitle = ref(title);

const visible = ref("A");
const imgData = [
  {
    path: "http://unsplash.it/600/600?image=180",
    desc: ""
  },
  {
    path: "http://unsplash.it/800/600?image=180",
    desc: ""
  },
  {
    path: "https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg",
    desc: ""
  },
  {
    path: "https://ichef.bbci.co.uk/news/640/cpsprodpb/E172/production/_126241775_getty_cats.png",
    desc: ""
  },
  {
    path: "https://image.yes24.com/goods/60896840/XL",
    desc: ""
  },
  {
    path: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJRVyLbmUUrp61vQ7_fkz35ViGCYwX8iSAZw&usqp=CAU",
    desc: ""
  },
  {
    path: "https://cdn.eyesmag.com/content/uploads/posts/2022/08/08/main-ad65ae47-5a50-456d-a41f-528b63071b7b.jpg",
    desc: ""
  },
  {
    path: "http://c.files.bbci.co.uk/4532/production/_126241771_gettyimages-1224404559-1.jpg",
    desc: ""
  },
];
</script>

<style lang="scss" scoped>
@import 'src/css/support';
</style>
