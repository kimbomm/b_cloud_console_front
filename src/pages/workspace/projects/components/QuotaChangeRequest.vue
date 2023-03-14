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
        <p class="sub_title">{{quota.subTitle}}</p>
        <div class="unit_type">
          <span class="tit">현재 사용량</span>
          <span class="counter">
            <em class="usage">{{projectQuota.used[quota.model]}}</em>
            <i class="bar">/</i>
            <strong class="quota">
              <span :class="inputData[quota.model] !== null && inputData[quota.model] !== '' ? 'quota-input' : 'quota-total'">
                {{ inputData[quota.model] !== null && inputData[quota.model] !== '' ? inputData[quota.model] : projectQuota.total[quota.model] }}
              </span>
            </strong>
          </span>
        </div>
        <div class="c_inpgroup flex-end">
          <c-input-text
          class="inp_unit"
          v-model:value="inputData[quota.model] "
          placeholder="50GB 단위 입력"
          suffix="GB"
          :rules="inputRules[quota.model]"
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
import CDialog from "src/components/common/CDialog.vue";
import CButton from "src/components/common/CButton.vue";
import CInputText from "components/common/CInputText.vue";

import { watch, ref } from "vue";

const props = defineProps({
  quotaChangeModal: {
    type: Boolean,
  },
  projectInfo: {
    type: Object,
  },
});
const emit = defineEmits(["update:quotaChangeModal"]);
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

const MaxQuota = 50000;
function checkQuota(value,) {
  const current = parseInt(MaxQuota, 10);
  const input = parseInt(value, 10);
  if (current && input >= current) {
    console.log("currentcurrentcurrentcurrent", current);
    console.log("inputinputinputinput", input);
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

const inputRules = {
  cpu_milli: createQuotaRules("cpu_milli"),
  v100: createQuotaRules("v100"),
  a100_40g: createQuotaRules("a100_40g"),
  a100_80g: createQuotaRules("a100_80g"),
};

watch(() => props.quotaChangeModal, (prop) => {
  if (prop) {
    const { total, used } = props.projectInfo.quota;
    projectQuota.value.total = total;
    projectQuota.value.used = used;
  }
});

const onClose = () => {
  console.log("취소");

  inputData.value = {
    cpu_milli: null,
    v100: null,
    a100_40g: null,
    a100_80g: null,
  };

  emit("update:quotaChangeModal", false);
};

const onSave = () => {
  console.log("확인");
  emit("update:quotaChangeModal", false);
};
</script>

<style  scoped>
.quota-input{color: blue;}
</style>
