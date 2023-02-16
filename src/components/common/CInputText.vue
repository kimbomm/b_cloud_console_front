<template>
  <q-input
    ref="inputRef"
    v-model="lazeValue"
    :outlined="outlined"
    :disable="disable"
    :placeholder="placeholder"
    :hint="hint"
    :clearable="clearable"
    :rules="rules"
    class="c_inp"
    @update:model-value="onUpdateInput"
  >
    <!-- <slot name="hint"></slot>
    <slot name="error"></slot>
    <template #error>
      {{ errorMessage }}
    </template> -->
  </q-input>
</template>
<script setup>
import {
  ref, watch, defineEmits, onMounted, nextTick,
} from "vue";
import { $utils } from "src/utils/utils";

const props = defineProps({
  value: {
    type: [String, Number],
    default: null
  },
  placeholder: {
    type: String,
    default: ""
  },
  hint: {
    type: String,
    default: ""
  },
  type: {
    /**
     * 설명: input Type 정의
     * default: text
     * password
     */
    type: String,
    default: "text"
  },
  clearable: {
    type: Boolean,
    default: false
  },
  disable: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ""
  },
  outlined: {
    type: Boolean,
    default: true
  },
  rules: {
    type: Array,
    default: () => []
  }
});

const inputRef = ref(null);
const emit = defineEmits(["update:value", "change"]);
const lazeValue = ref(props.value);
watch(() => props.value, (changedValue) => {
  lazeValue.value = changedValue;
});

/**
 * input update event
 */
const onUpdateInput = async () => {
  emit("update:value", lazeValue.value);
  emit("update");
  await nextTick();
  // console.log(inputRef.value.hasError);
};

/**
 * input rules가 존재할 경우
 * validate 실행
 */
const onValidate = () => {
  inputRef.value.validate();
};

onMounted(() => {
  // rules 존재시 validation trigger
  if (!$utils.isBlank(props.rules)) {
    onValidate();
  }
});
</script>
