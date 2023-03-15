<template>
  <c-dialog
    :size="'medium'"
    :message="'이미지 생성'"
    v-if="projectInstanceImgCreateModal"
  >
    <template #contents>
      <section class="section" aria-label="이미지 이름">
        <p class="sub_title">이미지 이름</p>
        <div class="c_inpgroup">
          <c-input-text
              v-model:value="projectName"
              placeholder="최소 2자 최대 100자 입력"
              :rules="inputRules"
              class="wsize_full"
              @update:value="(value) => (projectName = value)"
            />
        </div>
      </section>
      <section class="section" aria-label="이미지 설명">
        <p class="sub_title">이미지 설명</p>
        <div class="c_inpgroup">
          <c-input-text
              ref="userName"
              v-model:value="projectDescription"
              placeholder="이미지 설명 입력"
              type="textarea"
              class="wsize_full hsize244"
              :bottom-slots="true"
              :maxlength="500"
              :counter="true"
              :input-style="{ height: '100%' }"
              clearable
              outlined
              :disable="isValidProjectDescription"
              @update:value="(value) => (projectDescription = value)"
            />

        </div>
      </section>
    </template>
    <template #footer>
      <c-button :outline="true" btn-names="취소" @click="triggerImgWarning" />
      <c-button btn-names="확인" @click="triggerImgSuccess" :disable="isValidProjectSave"
       />
    </template>
  </c-dialog>
</template>

<script setup>

import { $useCmFn } from "src/composables/useCommonFunction.js";

import CDialog from "src/components/common/CDialog.vue";
import CButton from "src/components/common/CButton.vue";
import CInputText from "src/components/common/CInputText.vue";
import { ref, watch } from "vue";

const emit = defineEmits(["update:projectInstanceImgCreateModal"]);

defineProps({
  projectInstanceImgCreateModal: Boolean,
});

const projectName = ref("");
const projectDescription = ref("");

const isValidProjectDescription = ref(true);
const isValidProjectSave = ref(true);

// 프로젝트명 정규식체크
const inputRules = ref([
  (value) => {
    if (value.length < 1) {
      return "이름을 입력해주세요.";
    }
    // 사용 가능 문자열 확인
    return (/^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]+$/.test(value))
      || "영어,한글,숫자만 입력 가능합니다.";
  },
  (value) => (!!value.length && value.length >= 2 && value.length <= 100)
    || "최소 2글자 최대 100글자로 입력해주세요",
]);

watch(
  [projectName, projectDescription],
  ([newProjectName,]) => {
    const regex = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]*$/;
    const isValid = (!regex.test(newProjectName))
      || projectName.value.length <= 1
      || projectName.value.length >= 100;

    isValidProjectDescription.value = isValid;
    isValidProjectSave.value = isValid;
  }
);

const resetProject = () => {
  projectName.value = "";
  projectDescription.value = "";
};

const triggerImgWarning = () => {
  resetProject();

  $useCmFn.onNotify({
    message: "이미지 생성을 실패하였습니다. 다시 시도해주세요.",
    type: "negative",
  });
  emit("update:projectInstanceImgCreateModal", false);
};

const triggerImgSuccess = () => {
  $useCmFn.onNotify({
    message: "이미지가 생성되었습니다.",
    type: "positive",
  });
  emit("update:projectInstanceImgCreateModal", false);
};

</script>

<style lang="scss" scoped></style>
