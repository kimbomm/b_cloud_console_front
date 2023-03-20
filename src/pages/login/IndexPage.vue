<template>
  <q-page class="p-content p-sub p-login">
    <div class="login_group">
      <img
        alt="B CLOUD logo"
        src="~assets/images/common/logo_122x146.svg"
        style="width: 122px; height: 146px"
      />
      <p class="text">
        AI 연구와 머신러닝을 위한 최적의 환경을<br />제공합니다.
      </p>
      <!-- <q-btn class="google" @click="login">
        <img
          alt="Google logo"
          src="~assets/images/common/logo_googleg_48dp.svg"
          style="width: 18px; height: 18px"
        />
        <span class="txt">Google 계정으로 로그인</span>
      </q-btn> -->
      <GoogleLogin style="margin-top: 40px" :callback="callback" />
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import { useRouter } from "vue-router";
import { $useCmFn } from "src/composables/useCommonFunction";
import { AuthService } from "src/services";

const title = ref("로그인");
useMeta(() => ({
  title: title.value,
}));

const router = useRouter();

const callback = async (response) => {
  /**
   * @param { object } response
   * @param { string } response.clientId
   * @param { string } response.client_id
   * @param { string } response.credential
   * @param { string } response.select_by
   *
   * @link https://yobaji.github.io/vue3-google-login/#installation
   */
  console.log("Handle the response", response);
  await AuthService.postGoogleLogin({
    id_token: response.credential,
  })
    .then((res) => {
      const { id } = res;
      console.log(id);
      router.replace("/workspace");
    })
    .catch(() => {
      $useCmFn.onMessage({
        message: "테스트 로그인 실패",
        description: "'확인'을 누르시면 메인페이지로 이동합니다.",
        positive: {
          callback: () => {
            router.replace("/workspace");
          },
        },
      });
    });
};
</script>

<style lang="scss" scoped>
@import "src/css/login";
</style>
