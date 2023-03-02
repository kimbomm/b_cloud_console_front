<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <div>
      <div>
        <img src="~/assets/images/common/404_img.gif" alt="" />
      </div>

      <div class="txt_404main">
        <p class="txt_h2">
          죄송합니다.<br />요청하신 페이지를 찾을 수 없습니다.
        </p>
        <span
          >주소가 잘못 입력되거나, 변경 혹은 삭제되어 페이지를 찾을 수
          없습니다.</span
        >
      </div>

      <q-btn
        class="q-mt-xl"
        color="blue"
        text-color="white"
        unelevated
        to="/"
        label="이전 화면으로"
        no-caps
      />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.fullscreen {
  background-color: $surface01;
}
.txt_404main {
  margin: 40px 0;
  .txt_h2 {
    margin-bottom: 16px;
    font-weight: $bold;
    font-size: $fs24;
    color: $gray800;
  }
  span {
    color: $gray500;
  }
}
.q-mt-xl {
  min-width: 133px;
  min-height: 48px;
}
</style>
