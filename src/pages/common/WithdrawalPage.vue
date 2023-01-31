<template>
  <q-page class="p-content p-withdrawal">
    <div class="drawal_group">
      <h1 class="p-title">{{ ptitle }}</h1>
      <q-banner class="c_banner caution small">
        <template v-slot:avatar>
          <q-icon class="noti" />
        </template>
        <div class="bn_body">
          회원탈퇴를 신청하기 전에 아래 내용을 꼭 확인해 주세요.
        </div>
      </q-banner>
      <div class="c_group">
        <section class="section">
          <p class="sub_title">확인사항</p>
          <p class="sub_desc">회원님은 아래의 사항이 모두 확인 완료되어야 회원 탈퇴 진행이 가능합니다.</p>
          <q-card class="check_list">
            <!--
              [확인전 chk_item]

              [확인후(반납해야할 리소스가 있는 경우)]
              - item_body에 class is-show 추가

              [확인후(반납해야할 리소스가 없는 경우)]
              - chk_item에 class checked 추가
              - item_body에 class is-show 제거
            -->
            <q-item-section class="chk_item">
              <q-item-label class="item_header">
                <span class="text">이용중인 리소스는 모두 반납해야 합니다.</span>
                <!-- 확인전 -->
                <!-- <q-btn class="c_btn">
                  <span class="txt">확인하기</span>
                </q-btn> -->
                <!-- 확인후(반납해야할 리소스가 있는 경우) -->
                <q-btn class="c_btn">
                  <span class="txt">다시 확인하기</span>
                </q-btn>
                <!-- 확인후(반납해야할 리소스가 없는 경우) -->
                <!-- <q-btn class="c_btn">
                  <span class="txt">확인완료</span>
                </q-btn> -->
              </q-item-label>
              <q-item-label class="item_body is-show">
                <p class="text warning">반납되지 않은 리소스가 있습니다.</p>
                <div class="list">
                  <p class="text">
                    <span>테스트용-리소스 이름</span>
                  </p>
                  <div class="path">
                    <strong>인스턴스</strong>
                    <span>워크스페이스</span>
                    <span>aa프로젝트</span>
                  </div>
                </div>
                <div class="list">
                  <p class="text">
                    <span>테스트용-리소스 이름</span>
                  </p>
                  <div class="path">
                    <strong>인스턴스</strong>
                    <span>워크스페이스</span>
                  </div>
                </div>
              </q-item-label>
            </q-item-section>

            <q-item-section class="chk_item">
              <q-item-label class="item_header">
                <span class="text">관리자 역할/권한인 경우 소속 워크스페이스 또는 프로젝트에 다른 관리자 사용자가 있어야 합니다.</span>
                <!-- 확인전 -->
                <!-- <q-btn class="c_btn">
                  <span class="txt">확인하기</span>
                </q-btn> -->
                <!-- 확인후(반납해야할 리소스가 있는 경우) -->
                <q-btn class="c_btn">
                  <span class="txt">다시 확인하기</span>
                </q-btn>
                <!-- 확인후(반납해야할 리소스가 없는 경우) -->
                <!-- <q-btn class="c_btn">
                  <span class="txt">확인완료</span>
                </q-btn> -->
              </q-item-label>
              <q-item-label class="item_body is-show">
                <p class="text warning">관리자 추가 지정이 필요한 그룹이 있습니다.</p>
                <div class="list">
                  <p class="text">
                    <span>워크스페이스 1</span>
                  </p>
                  <p class="path">
                    <strong>인스턴스</strong>
                    <span>워크스페이스</span>
                    <span>aa프로젝트</span>
                  </p>
                </div>
                <div class="list">
                  <p class="text">
                    <span>워크스페이스 1</span>
                    <span>aa프로젝트</span>
                  </p>
                  <p class="path">
                    <strong>인스턴스</strong>
                    <span>워크스페이스</span>
                    <span>aa프로젝트</span>
                  </p>
                </div>
              </q-item-label>
            </q-item-section>

            <q-item-section class="chk_item checked">
              <q-item-label class="item_header">
                <span class="text">회원탈퇴시 개인이 생성한 스토리지의 데이터는 모두 삭제되며, 복원 불가능합니다.</span>
                <!-- 확인전 -->
                <!-- <q-btn class="c_btn">
                  <span class="txt">확인하기</span>
                </q-btn> -->
                <!-- 확인후(반납해야할 리소스가 있는 경우) -->
                <!-- <q-btn class="c_btn">
                  <span class="txt">다시 확인하기</span>
                </q-btn> -->
                <!-- 확인후(반납해야할 리소스가 없는 경우) -->
                <q-btn class="c_btn">
                  <span class="txt">확인완료</span>
                </q-btn>
              </q-item-label>
            </q-item-section>
          </q-card>
        </section>
        <section class="section">
          <p class="sub_title">안내사항</p>
          <p class="sub_desc">
            회원 탈퇴 시, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 아래와 같이 관계법령에서 정한 일정 기간동안 법류에 명시된 정보를 보관하며,
            그 이외의 정보에 대해서는 파기합니다.
          </p>
          <table class="ui_table">
            <colgroup>
              <col style="width:280px">
              <col style="width:226px">
              <col style="width:226px">
            </colgroup>
            <thead>
              <tr>
                <th>보관하는 정보</th>
                <th>보존 이유</th>
                <th>보존 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>소비자의 불만 또는 분쟁 처리에 관한 기록</td>
                <td>소보자 보호에 관란 법률</td>
                <td>3년</td>
              </tr>
              <tr>
                <td>로그인 기록</td>
                <td>통신비밀보호법</td>
                <td>3개월</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
      <div class="c_btngroup f_end">
        <q-btn
          class="c_btn medium"
          disable
        >
          <span class="txt">회원탈퇴</span>
        </q-btn>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";

const title = ref("회원탈퇴");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
</script>

<style lang="scss" scoped>
@import "src/css/common";
</style>
