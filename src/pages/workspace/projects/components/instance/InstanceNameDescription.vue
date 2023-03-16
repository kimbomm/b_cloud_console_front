<template>
  <div class="s_01">
    <p class="sub_title">인스턴스 이름<i class="ess">*</i></p>
    <div class="c_inpgroup">
      <q-input
        outlined
        v-model="textName"
        placeholder="최소 2자 최대 30자"
        clearable
        class="wsize608"
      />
    </div>
  </div>
  <div class="s_02">
    <p class="sub_title">인스턴스 설명</p>
    <div class="c_inpgroup">
      <q-input
        outlined
        v-model="textDescription"
        bottom-slots
        type="textarea"
        placeholder="인스턴스 설명 입력"
        clearable
        counter
        :count="10"
        maxlength="500"
        class="wsize_full hsize244"
        :input-style="{ height: '100%' }"
      >
      </q-input>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const textName = ref(null);
const textDescription = ref(null);
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
