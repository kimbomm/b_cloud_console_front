<template>
  <!-- Start : [프로젝트] 할당량 변경 요청 팝업 (TBD) 팝업 -->
  <c-dialog
    :visible="quotaChangeModal"
    :size="'medium'"
    :message="'할당량 변경 요청'"
    :button-positive="'확인'"
    :button-negative="'취소'"
  >
    <template #contents>
      <div class="c_form">
        <section class="section" v-for="quota in quotaList" :key="quota">
          <p class="sub_title">{{ quota.subTitle }}</p>
          <div
            v-html="
              quota.model === 'cpu_milli'
                ? `<p>권장수치 ${cpuRecommendedFigure}</p>`
                : ''
            "
          ></div>

          <div class="unit_type">
            <span class="tit">현재 사용량</span>
            <span class="counter">
              <em class="usage">{{ projectQuota.used[quota.model] }}</em>
              <i class="bar">/</i>
              <strong class="quota">
                <span
                  :class="
                    inputData[quota.model] !== null &&
                    inputData[quota.model] !== ''
                      ? 'quota-input'
                      : 'quota-total'
                  "
                >
                  {{
                    inputData[quota.model] !== null &&
                    inputData[quota.model] !== ""
                      ? inputData[quota.model]
                      : projectQuota.total[quota.model]
                  }}
                </span>
              </strong>
            </span>
          </div>
          <div class="c_inpgroup flex-end">
            <c-input-text
              class="inp_unit"
              v-model:value="inputData[quota.model]"
              placeholder="50GB 단위 입력"
              suffix="GB"
              :rules="inputRules[quota.model]"
              type="Number"
            >
              <template v-slot:append>
                <span class="unit">GB</span>
              </template>
            </c-input-text>
            <span class="desc">최대 50,000</span>
          </div>
        </section>
      </div>
    </template>
    <template #footer>
      <c-button :outline="true" :btn-names="'취소'" @click="onClose" />
      <c-button :btn-names="'확인'" @click="onSave" :disabled="isValid" />
    </template>
  </c-dialog>
</template>

<script setup>
import { ProjectService } from "src/services";

import CDialog from "src/components/common/CDialog.vue";
import CButton from "src/components/common/CButton.vue";
import CInputText from "components/common/CInputText.vue";
import { useRoute } from "vue-router";
import { watch, ref, computed } from "vue";

const route = useRoute();
const { projectId } = route.params;

const props = defineProps({
  quotaChangeModal: {
    type: Boolean,
  },
  projectInfo: {
    type: Object,
  },
});
const emit = defineEmits(["update:quotaChangeModal", "updateProject"]);
const isValid = ref(false);
const projectQuota = ref({});
const inputData = ref({
  cpu_milli: null,
  v100: null,
  a100_40g: null,
  a100_80g: null,
});

const quotaList = ref([
  { subTitle: "CPU", model: "cpu_milli" },
  { subTitle: "Tesla V100", model: "v100" },
  { subTitle: "Tesla A100_40G", model: "a100_40g" },
  { subTitle: "Tesla V100_80G", model: "a100_80g" },
]);
const cpuRecommendedFigure = computed(() => {
  const sum = ((Number(inputData.value.v100) || 0) + (Number(inputData.value.a100_40g) || 0) + (Number(inputData.value.a100_80g) || 0)) * 20;
  return sum;
});

const MaxQuota = 50000;
function checkQuota(value) {
  const current = parseInt(MaxQuota, 10);
  const input = parseInt(value, 10);
  if (current && input >= current) {
    return "워크스페이스 할당량 초과 불가";
  }
  return true;
}

function createQuotaRules() {
  return [
    (value) => {
      if (!value || value < 1) {
        return "할당량을 입력해주세요.";
      }
      return true;
    },
    (value) => checkQuota(value),
  ];
}

const inputRules = ["cpu_milli", "v100", "a100_40g", "a100_80g"].reduce((acc, key) => {
  acc[key] = createQuotaRules();
  return acc;
}, {});

/* * 입력 값 하나라도 빈 값일 경우 유효성 체크  */
watch(
  inputData,
  (newData) => {
    const allInputsFilled = Object.values(newData).every(
      (value) => value !== "" && value !== null
    );
    isValid.value = !allInputsFilled;
  },
  { deep: true, immediate: true }
);

watch(
  () => props.quotaChangeModal,
  (prop) => {
    if (prop) {
      const { total, used } = props.projectInfo.quota;
      projectQuota.value.total = total;
      projectQuota.value.used = used;
    }
  }
);

const initProjectInput = () => {
  inputData.value = {
    cpu_milli: null,
    v100: null,
    a100_40g: null,
    a100_80g: null,
  };
};

const onClose = async () => {
  emit("update:quotaChangeModal", false);
  await initProjectInput();
  isValid.value = true;
};

/*
 * 설명 : 입력값 type Number로 변경
 * 요청 시 값이 숫자여야함
 */
const onSave = async () => {
  const params = Object.entries(inputData.value).reduce((obj, [key, val]) => {
    obj[key] = parseInt(val, 10);
    return obj;
  }, {});
  try {
    await ProjectService.putProjectQuota(projectId, params);
    emit("update:quotaChangeModal", false);
    emit("updateProject");
    await initProjectInput();
  } catch (e) {
    console.log(e);
  }
};
</script>

<style scoped>
.quota-input {
  color: blue;
}
</style>
