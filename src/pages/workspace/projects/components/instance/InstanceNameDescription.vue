<template>
  <div class="s_01">
    <p class="sub_title">인스턴스 이름<i class="ess">*</i></p>
    <div class="c_inpgroup">
      <c-input-text
        v-model:value="textName"
        placeholder="최소 2자 최대 30자"
        clearable
        class="wsize608"
        :rules="inputRules"
        @update:value="updateTextName"
      />
    </div>
  </div>
  <div class="s_02">
    <p class="sub_title">인스턴스 설명</p>
    <div class="c_inpgroup">
      <c-input-text
        v-model="textDescription"
        bottom-slots
        type="textarea"
        placeholder="인스턴스 설명 입력"
        clearable
        counter
        :maxlength="500"
        :count="10"
        class="wsize_full hsize244"
        :input-style="{ height: '100%' }"
        @update:value="updateTextDescription"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import CInputText from "src/components/common/CInputText.vue";

const textName = ref(null);
const textDescription = ref(null);

const emit = defineEmits(["instanceName", "instanceDescription"]);

// 이름 정규식체크
const inputRules = ref([
  (value) => {
    if (!value || value.length < 1) {
      return "이름을 입력해주세요.";
    }
  },
  (value) => (!!value.length && value.length >= 2 && value.length <= 30)
    || "최소 2글자 최대 30글자로 입력해주세요",
]);

const updateTextName = (value) => {
  setTimeout(() => {
    textName.value = value;
    emit("instanceName", textName.value);
  }, 50);
};

const updateTextDescription = () => {
  setTimeout(() => {
    emit("instanceDescription", textDescription.value);
  }, 50);
};

</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
