<template>
  <q-dialog
    v-model="messageInfo.visible"
    class="c_dialog"
    persistent
  >
    <q-card>
      <q-card-section style="max-height:290px" class="c_dialog_body">
        <p class="title">
          <strong v-html="messageInfo.message" />
        </p>
        <p
          v-if="messageInfo.description"
          class="desc"
          v-html="messageInfo.description"
        />
      </q-card-section>
      <q-card-actions class="c_dialog_foot">
        <q-btn
          v-if="messageInfo.negative"
          :label="messageInfo.negative.value"
          class="line"
          @click="onNegative()"
        />
        <q-btn
          :label="messageInfo.positive.value"
          class="primary"
          @click="onPositive()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import { useCommonStore } from "stores/useCommonStore.js";
import { storeToRefs } from "pinia";

const messageInfo = ref({
  visible: false,
  message: "",
  description: "",
  positive: {
    value: "확인",
    callback: () => {}
  },
  negative: {
    value: "취소",
    callback: () => {}
  },
});

const store = storeToRefs(useCommonStore());
const { hideMessageInfo } = useCommonStore();

/**
 * store 메세지 정보에 따른 노출 여부 체크
 */
watch(() => store.messageInfo.value.visible, (cur) => {
  if (cur) {
    messageInfo.value = {
      ...store.messageInfo.value
    };
  } else {
    messageInfo.value.visible = false;
  }
});

/**
 * 취소 및 부정적인 버튼 클릭 이벤트
 */
const isNegativeCallback = computed(() => messageInfo.value.negative.callback);
const onNegative = async () => {
  if (isNegativeCallback.value) {
    messageInfo.value.negative.callback();
  }
  await hideMessageInfo();
};

/**
 * 확인 및 긍정 버튼 클릭 이벤트
 */
const isPositiveCallback = computed(() => messageInfo.value.positive.callback);
const onPositive = async () => {
  if (isPositiveCallback.value) {
    messageInfo.value.positive.callback();
  }
  await hideMessageInfo();
};
</script>
