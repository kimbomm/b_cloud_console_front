<template>
  <q-dialog v-if="projectCreateModal" class="c_dialog medium">
    <q-card>
      <q-card-section class="c_dialog_body">
        <p class="title">
          <strong>프로젝트 이름/설명 변경</strong>
        </p>
        <section class="section" aria-label="프로젝트 이름">
          <p class="sub_title">프로젝트 이름<i class="ess">*</i></p>
          <div class="c_inpgroup">
            <c-input-text
              v-model:value="projectName"
              placeholder="최소 2자 최대 30자 입력"
              :rules="inputRules"
              class="wsize_full"
              @update:value="(value) => (projectName = value)"
            />
          </div>
        </section>
        <section class="section" aria-label="프로젝트 설명">
          <p class="sub_title">프로젝트 설명</p>
          <div class="c_inpgroup">
            <c-input-text
              ref="userName"
              v-model:value="projectDescription"
              placeholder="소개글을 입력해주세요"
              type="textarea"
              class="wsize_full hsize244"
              :bottom-slots="true"
              :maxlength="100"
              :counter="true"
              :input-style="{ height: '100%' }"
              clearable
              outlined
              :disable="isValidProjectDescription"
              @update:value="(value) => (projectDescription = value)"
            />
          </div>
        </section>
      </q-card-section>
      <q-card-actions class="c_dialog_foot">
        <q-btn
          label="취소"
          class="line"
          v-close-popup
          @click="resetProject()"
        />
        <q-btn
          label="확인"
          class="primary"
          @click="updateProject()"
          v-close-popup
          :disable="isValidProjectSave"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import {
  ref, toRefs, watch, watchEffect
} from "vue";
import { ProjectService } from "src/services";
import { useRoute } from "vue-router";
import { $useCmFn } from "src/composables/useCommonFunction.js";

import CInputText from "src/components/common/CInputText.vue";
import { useProjectStore } from "src/stores/useProjectStore";

const projectsStore = useProjectStore();

const props = defineProps({
  projectCreateModal: Boolean,
  projectInfo: Object,
  getListProject: Array,
  newProjectDescription: String
});

const emit = defineEmits(["userInfoUpdate"]);
const { RefDscription } = toRefs(props);

const route = useRoute();
const { workspaceId, projectId } = route.params;

const projectName = ref("");
const projectDescription = ref("");

const isValidProjectDescription = ref(true);
const isValidProjectSave = ref(true);

// 프로젝트 이름 중복 체크함수
function isDuplicateProjectName(name, projects) {
  return (
    projects.find((p) => p.name.toString() === name.toString()) !== undefined
  );
}

// 프로젝트명 정규식체크
const inputRules = ref([
  (value) => {
    if (value.length < 1) {
      return "";
    }
    // 프로젝트 이름 중복확인
    const foundProject = isDuplicateProjectName(
      projectName.value.trim(),
      props.getListProject
    );

    // 사용 가능 문자열 확인
    return (
      (foundProject && projectName.value.trim() !== props.projectInfo.name
        ? "중복된 프로젝트 이름입니다."
        : /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]+$/.test(value))
      || "영어,한글,숫자만 입력 가능 합니다."
    );
  },
  (value) => (!!value.length && value.length >= 2 && value.length <= 30)
    || "최소 2글자 최대 30글자로 입력해주세요",
]);

// 프로젝트이름, 설명 정규식체크
watch(
  [projectName, projectDescription],
  ([newPprojectName,]) => {
    const regex = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s]*$/;
    // 프로젝트 이름 중복 확인
    const isDuplicate = isDuplicateProjectName(
      newPprojectName.trim(),
      props.getListProject
    );

    const isValid = (!regex.test(newPprojectName) && !isDuplicate)
      || projectName.value.length <= 1
      || projectName.value.length >= 30;

    const isValidProjectDescriptionValue = props.projectInfo?.description?.length <= 1 || false;

    isValidProjectDescription.value = isValid || (isDuplicate && props.projectInfo?.name !== newPprojectName);
    isValidProjectSave.value = isValid || (isDuplicate && props.projectInfo?.name !== newPprojectName) || isValidProjectDescriptionValue;
  }
);

// 비동기 처리
const useGetUserInfo = async () => {
  await projectsStore.getUserInfo();
};

const triggerSuccess = () => {
  $useCmFn.onNotify({
    message: "편집 내용이 저장되었습니다.",
    type: "positive",
  });
  useGetUserInfo();
};
const triggerFail = () => {
  $useCmFn.onNotify({
    message: "저장에 실패하였습니다. 다시 시도해주세요.",
    type: "negative",
  });
};

const resetProject = () => {
  projectName.value = props.projectInfo.name;
  projectDescription.value = props.newProjectDescription;
};

// 프로젝트 수정
const updateProject = async () => {
  const params = {
    description: projectDescription.value,
    name: projectName.value,
  };
  try {
    await ProjectService.updateProject(workspaceId, projectId, params);
    setTimeout(() => {
      triggerSuccess();
      emit("updateProject");
    }, 100);
  } catch (e) {
    triggerFail();
    resetProject();
  }
};

watch(RefDscription, () => {
  projectDescription.value = RefDscription;
});

watchEffect(() => {
  if (props.projectCreateModal) {
    resetProject();
  }
});

</script>
