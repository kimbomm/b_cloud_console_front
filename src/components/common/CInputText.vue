<template>
  <q-input
    ref="inputRef"
    v-model="lazyValue"
    :class="classList"
    :clearable="clearable"
    :disable="disable"
    :outlined="outlined"
    :error="error"
    :bottom-slots="bottomSlots"
    :counter="counter"
    :maxlength="maxlength"
    :input-style="inputStyle"
    :placeholder="placeholder"
    :type="lazyType"
    :hint="hint"
    :rules="rules"
    :prefix="prefix"
    :suffix="suffix"
    @update:model-value="onUpdateInput"
  >
    <template v-if="$slots.error" v-slot:error>
      <slot name="error" />
    </template>
    <template v-if="$slots.prepend" v-slot:prepend>
      <slot name="prepend" />
    </template>
    <template v-if="type === 'password'" v-slot:append>
      <q-icon
        :name="isPasswordType ? 'visibility_off' : 'visibility'"
        :class="isPasswordType ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="onChangeVisible"
      />
      <slot v-if="$slots.append" name="append" />
    </template>
  </q-input>
</template>
<script setup>
import {
  ref,
  watch,
  defineEmits,
  onMounted,
  computed,
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
  bottomSlots: {
    type: Boolean,
    default: false
  },
  counter: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: Number,
    default: null
  },
  inputStyle: {
    type: [Object],
    default: null
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
  error: {
    type: Boolean,
    default: false
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
  },
  prefix: {
    type: String,
    default: ""
  },
  suffix: {
    type: String,
    default: ""
  },
});

const inputRef = ref(null);
const lazyType = ref("text");
const emit = defineEmits(["update:value", "change"]);
const lazyValue = ref(props.value);
const classes = ref(["c_inp"]);
const classList = computed(() => classes.value.join(" "));
const isPasswordType = computed(() => lazyType.value === "password");
const getHasError = computed(() => inputRef.value.hasError);

defineExpose({
  getHasError
});
/**
 * input rules가 존재할 경우
 * validate 실행
 */
const onValidate = () => {
  // rules 존재시 validation trigger
  if (!$utils.isBlank(props.rules)) {
    inputRef.value.validate();
    if (!getHasError.value && !classes.value.includes("q-field--positive")) {
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
  lazyValue.value = changedValue;
  onValidate();
});

onMounted(async () => {
  if (props.type === "password") {
    classes.value.push("c_password");
    lazyType.value = "password";
  } else {
    lazyType.value = props.type;
  }
});
/**
 * input update event
 */
const onUpdateInput = async () => {
  await onValidate();
  setTimeout(() => {
    emit("update:value", lazyValue.value);
    emit("update");
  }, 50);
};

const onChangeVisible = () => {
  lazyType.value = isPasswordType.value ? "text" : "password";
};
</script>
