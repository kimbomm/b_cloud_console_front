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
            <q-input
              outlined
              v-model="quota1"
              type="number"
              placeholder="50GB 단위 입력"
              clearable
              class="inp_unit"
            >
              <template v-slot:append>
                <span class="unit">GB</span>
              </template>
            </q-input>
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
            <q-input
              outlined
              v-model="quota2"
              type="number"
              placeholder="50GB 단위 입력"
              clearable
              class="inp_unit"
            >
              <template v-slot:append>
                <span class="unit">GB</span>
              </template>
            </q-input>
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
            <q-input
              outlined
              v-model="quota3"
              type="number"
              placeholder="50GB 단위 입력"
              clearable
              class="inp_unit"
            >
              <template v-slot:append>
                <span class="unit">GB</span>
              </template>
            </q-input>
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
            <q-input
              outlined
              v-model="quota4"
              type="number"
              placeholder="50GB 단위 입력"
              clearable
              class="inp_unit"
            >
              <template v-slot:append>
                <span class="unit">GB</span>
              </template>
            </q-input>
            <span class="desc">최대 50,000</span>
          </div>
        </section>
      </div>
    </template>
    <template #footer>
      <c-button
        :outline="true"
        :btn-names="'취소'"
        @click="onClose"
      />
      <c-button
        :btn-names="'확인'"
        @click="onClose"
      />
    </template>
  </c-dialog>
</template>

<script setup>
// import { defineEmits } from "vue";
import CDialog from "src/components/common/CDialog.vue";
import CButton from "src/components/common/CButton.vue";

defineProps({
  quotaChangeModal: Boolean

});

const onClose = () => {
};

</script>

<style lang="scss" scoped></style>
