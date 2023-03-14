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
        <section class="section">
          <p class="sub_title">CPU</p>
          <div class="unit_type">
            <span class="tit">현재 사용량</span>
            <span class="counter">
              <em class="usage">190</em>
              <i class="bar">/</i>
              <strong class="quota">450</strong>
            </span>
          </div>
          <div class="c_inpgroup flex-end">
            <c-input-text
              class="inp_unit"
              v-model:value="quota1"
              placeholder="50GB 단위 입력"
              suffix="GB"
            >
              <template v-slot:append>
                <span class="unit">GB</span>
              </template>
            </c-input-text>

            <span class="desc">최대 50,000</span>
          </div>
        </section>
        <section class="section">
          <p class="sub_title">Tesla V100</p>
          <div class="unit_type">
            <span class="tit">현재 사용량</span>
            <span class="counter">
              <em class="usage">190</em>
              <i class="bar">/</i>
              <strong class="quota">450</strong>
            </span>
          </div>
          <div class="c_inpgroup flex-end">
            <c-input-text
              class="inp_unit"
              v-model:value="quota2"
              placeholder="50GB 단위 입력"
              suffix="GB"
            >
              <template v-slot:append>
                <span class="unit">GB</span>
              </template>
            </c-input-text>
            <span class="desc">최대 50,000</span>
          </div>
        </section>
        <section class="section">
          <p class="sub_title">Tesla A100_40G</p>
          <div class="unit_type">
            <span class="tit">현재 사용량</span>
            <span class="counter">
              <em class="usage">190</em>
              <i class="bar">/</i>
              <strong class="quota">450</strong>
            </span>
          </div>
          <div class="c_inpgroup flex-end">

            <c-input-text
              class="inp_unit"
              v-model:value="quota3"
              placeholder="50GB 단위 입력"
              suffix="GB"
            >
              <template v-slot:append>
                <span class="unit">GB</span>
              </template>
            </c-input-text>

            <span class="desc">최대 50,000</span>
          </div>
        </section>
        <section class="section">
          <p class="sub_title">Tesla V100_80G</p>
          <div class="unit_type">
            <span class="tit">현재 사용량</span>
            <span class="counter">
              <em class="usage">190</em>
              <i class="bar">/</i>
              <strong class="quota">450</strong>
            </span>
          </div>
          <div class="c_inpgroup flex-end">
            <c-input-text
              class="inp_unit"
              v-model:value="quota4"
              placeholder="50GB 단위 입력"
              suffix="GB"
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
      <c-button :btn-names="'확인'" @click="onSave" />
    </template>
  </c-dialog>
</template>

<script setup>
import CDialog from "src/components/common/CDialog.vue";
import CButton from "src/components/common/CButton.vue";
import CInputText from "components/common/CInputText.vue";

import { watch } from "vue";

const props = defineProps({
  quotaChangeModal: {
    type: Boolean,
  },
  projectInfo: {
    type: Object,
  },
});

const emit = defineEmits(["update:quotaChangeModal"]);

watch(props.quotaChangeModal, (newValue) => {
  if (newValue) {
    console.log("newValue", newValue);
  }
});

console.log("props", props);

const onClose = () => {
  console.log("취소");
  emit("update:quotaChangeModal", false);
};

const onSave = () => {
  console.log("확인");
  emit("update:quotaChangeModal", false);
};
</script>

<style lang="scss" scoped></style>
