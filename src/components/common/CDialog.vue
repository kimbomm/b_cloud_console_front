<template>
  <q-dialog
    :model-value="visible"
    :persistent="persistent"
    :class="`c_dialog ${size}`"
  >
    <q-card>
      <q-card-section style="max-height:290px" class="c_dialog_body">
        <p class="title">
          <strong>{{ message }}</strong>
        </p>
        <p
          v-if="description"
          class="desc"
        >{{ description }}</p>
        <div v-if="$slots.positive || $slots.negative" :class="slotClassList">
          <slot name="positive"></slot>
          <slot name="negative"></slot>
        </div>
      </q-card-section>
      <q-card-actions class="c_dialog_foot">
        <q-btn
          v-if="buttonNegative"
          :label="buttonNegative"
          class="line"
          @click="onNegative()"
        />
        <q-btn
          :label="buttonPositive"
          class="primary"
          @click="onPositive()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { computed, useSlots, defineEmits } from "vue";
import { $utils } from "src/utils/utils";

const slots = useSlots();
const isSlotNegative = computed(() => !!slots.negative);
const slotClassList = computed(() => {
  const classList = ["info"];
  if (isSlotNegative.value) {
    classList.push("negative");
  }
  return classList.join(" ");
});
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  persistent: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: "" // medium, large
  },
  message: {
    type: String,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  buttonPositive: {
    type: String,
    default: ""
  },
  buttonNegative: {
    type: String,
    default: ""
  },
  callbackPositive: {
    type: Function,
    default: null
  },
  callbackNegative: {
    type: Function,
    default: null
  },
});

const emit = defineEmits(["update:visible"]);
/**
 * 확인 버튼 클릭시 이벤트
 * callback-positive 미할당시 팝업 종료
 */
const onPositive = () => {
  if (!$utils.isBlank(props.callbackPositive)) {
    props.callbackPositive();
  } else {
    emit("update:visible", false);
  }
};
/**
 * 취소 버튼 클릭시 이벤트
 * callback-negative 미할당시 팝업 종료
 */
const onNegative = () => {
  if (!$utils.isBlank(props.callbackNegative)) {
    props.callbackNegative();
  } else {
    emit("update:visible", false);
  }
};
</script>
