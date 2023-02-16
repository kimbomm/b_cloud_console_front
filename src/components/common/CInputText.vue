<template>
  <q-input
    ref="inputRef"
    v-model="lazeValue"
    :class="classList"
    :clearable="clearable"
    :disable="disable"
    :outlined="outlined"
    :placeholder="placeholder"
    :type="lazyType"
    :hint="hint"
    :rules="rules"
    @update:model-value="onUpdateInput"
  >
    <template v-if="type === 'password'" v-slot:append>
      <q-icon
        :name="isPasswordType ? 'visibility_off' : 'visibility'"
        :class="isPasswordType ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="onChangeVisible"
      />
    </template>
  </q-input>
</template>
<script setup>
import {
  ref, watch, defineEmits, onMounted, nextTick, computed,
} from "vue";
import { $utils } from "src/utils/utils";

const props = defineProps({
  clearable: {
    type: Boolean,
    default: false
  },
  disable: {
    type: Boolean,
    default: false
  },
  outlined: {
    type: Boolean,
    default: true
  },
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
  rules: {
    /**
     * 설명: input validation 조건
     */
    type: Array,
    default: () => []
  }
});

const inputRef = ref(null);
const lazyType = ref("text");
const emit = defineEmits(["update:value", "change"]);
const lazeValue = ref(props.value);
const classes = ref(["c_inp"]);
const classList = computed(() => classes.value.join(" "));
const isPasswordType = computed(() => lazyType.value === "password");

/**
 * input rules가 존재할 경우
 * validate 실행
 */
const onValidate = () => {
  // rules 존재시 validation trigger
  if (!$utils.isBlank(props.rules)) {
    inputRef.value.validate();
    if (!inputRef.value.hasError && !classes.value.includes("q-field--positive")) {
      classes.value.push("q-field--positive");
    } else {
      const classIdx = classes.value.findIndex((classNm) => classNm === "q-field--positive");
      if (classIdx !== -1) {
        classes.value.splice(classIdx, 1);
      }
    }
  }
};

watch(() => props.value, (changedValue) => {
  lazeValue.value = changedValue;
  onValidate();
});

onMounted(async () => {
  onValidate();
  if (props.type === "password") {
    classes.value.push("c_password");
    lazyType.value = "password";
  }
});
/**
 * input update event
 */
const onUpdateInput = async () => {
  emit("update:value", lazeValue.value);
  emit("update");
  await nextTick();
  await onValidate();
};

const onChangeVisible = () => {
  lazyType.value = isPasswordType.value ? "text" : "password";
};
</script>
