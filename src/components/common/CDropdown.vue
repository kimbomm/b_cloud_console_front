<template>
  <q-select
    v-model="lazyValue"
    :class="DropdownClasses"
    :label="label"
    :disable="disabled"
    :options="options"
    :options-selected-class="'is-active'"
    :popup-content-class="popupContentClass"
    :outlined="outlined"
    :filled="filled"
    :multiple="multiple"
    @update:model-value="onUpdate"
  >
    <!-- multi-select 일 경우 slot활용한 custom view -->
    <template
      v-if="multiple && lazyValue && lazyValue.length > 0"
      v-slot:selected
    >
      <div>
        {{ lazyValue[0].label }}
        <template v-if="lazyValue.length > 1">
          외 {{ lazyValue.length }}개
        </template>
      </div>
    </template>
    <!-- multi-select 일 경우 slot활용한 custom view 끝 -->
  </q-select>
</template>
<script setup>
import {
  onMounted, ref, computed, defineEmits, useAttrs, watch
} from "vue";

const emit = defineEmits(["update:selected"]);
const attrs = useAttrs();

const lazyValue = ref(null);
const props = defineProps({
  /**
   * 설명: placeholder 역할, 미선택시 나타날 텍스트
   */
  label: {
    type: String,
    default: "전체"
  },
  /**
   * 설명: disabled 여부
   */
  disabled: {
    type: Boolean,
    default: false
  },
  /**
   * 설명: outlined 여부
   */
  outlined: {
    type: Boolean,
    default: false
  },
  /**
   * 설명: filled 여부
   */
  filled: {
    type: Boolean,
    default: false
  },
  /**
   * 설명: multi-select 여부
   */
  multiple: {
    type: Boolean,
    default: false
  },
  /**
   * 설명: selectbox option list
   */
  options: {
    type: Array,
    default: () => []
  },
  /**
   * 설명: selectbox 형태
   * default: ""
   * type: "text" => 텍스트 형태 selectbox
   */
  type: {
    type: String,
    default: ""
  },
  popupContentClass: {
    type: String,
    default: ""
  },
  class: {
    type: String,
    default: ""
  }
});

/**
 * 설명: dropdown ClassName 추가
 */
const DropdownClasses = computed(() => {
  const classList = ["c_dropdown"];
  if (props.type === "text") {
    classList.push("smtext");
  }
  return `${classList.join(" ")} ${props.class}`;
});

const onUpdate = (value) => {
  emit("update:selected", value);
  emit("selected", value);
};

/**
 * 설명: 최초 페이지 dropdown value값 초기화시 셋팅
 */
watch(() => attrs.selected, (cur) => {
  lazyValue.value = cur;
});

onMounted(() => {
  lazyValue.value = attrs.selected;
});
</script>
