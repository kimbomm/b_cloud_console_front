<template>
  <q-page class="p-content p-my p-index">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body key-body">
      <CTabs />
      <div class="key-box">
        <p class="key-box_title">SSH Key</p>
        <div class="sign-up">
          <p>SSH Key를 등록해주세요.</p>
          <CButton
            :size-types="2"
            :btn-types="1"
            :btn-names="btnName"
          />
        </div>
      </div>
      <div class="key-box">
        <p class="key-box_title">API Key</p>
        <div class="sign-up">
          <p>API Key를 생성해 주세요.</p>
          <p>생성시 Secret key는 팝업에서 1회만 확인 가능합니다.</p>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CTabs from "components/common/CTabs.vue";
import CButton from "components/common/CButton.vue";

const title = ref("Account");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
</script>

<style lang="scss" scoped>
</style>
