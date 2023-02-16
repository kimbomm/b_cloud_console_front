<template>
  <q-page class="p-content p-sub p-login">
    <div class="login_group">
      <img
        alt="B CLOUD logo"
        src="~assets/images/common/logo_122x146.svg"
        style="width: 122px; height: 146px"
      >
      <p class="text">
        AI 연구와 머신러닝을 위한 최적의 환경을<br />제공합니다.
      </p>
      <q-btn class="google" @click="login">
        <img
          alt="Google logo"
          src="~assets/images/common/logo_googleg_48dp.svg"
          style="width: 18px; height: 18px"
        >
        <span class="txt">Google 계정으로 로그인</span>
      </q-btn>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import { googleTokenLogin } from "vue3-google-login";
import { AuthService } from "src/services";

const title = ref("로그인");
useMeta(() => ({
  title: title.value,
}));

const login = () => {
  /**
   * @param { object } response
   * @param { string } response.access_token
   * @param { string } response.token_type
   * @param { string } response.expires_in
   * @param { string } response.scope
   * @param { string } response.authuser
   * @param { string } response.prompt
   *
   * @link https://yobaji.github.io/vue3-google-login/#installation
   */
  googleTokenLogin().then(async (response) => {
    console.log("Handle the response", response);
    await AuthService.postGoogleLogin({
      id_token: response.access_token
    }).then((res) => {
      console.log(res);
    });
  });
};
</script>

<style lang="scss" scoped>
@import "src/css/login";
</style>
