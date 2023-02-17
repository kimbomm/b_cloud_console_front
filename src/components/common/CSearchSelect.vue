<template>
  <q-select
    v-model="lazyValue"
    :clearable="clearable"
    :disable="disable"
    :outlined="outlined"
    :use-input="useInput"
    :use-chips="useChips"
    :hide-selected="!multiple"
    :fill-input="true"
    input-debounce="0"
    :options="lazyOptions"
    :loading="loading"
    :multiple="multiple"
    :class="'c_inpchip'"
    :placeholder="placeholder"
    @new-value="createValue"
    @filter="filterFn"
    @update:model-value="onUpdateSelect"
  >
    <template v-slot:prepend>
      <slot name="prepend " />
      <q-icon name="search" class="ico_search" />
    </template>
    <template v-slot:loading>
      <q-item class="inner_loading">
        <q-inner-loading
          :showing="isLoading"
          label="잠시만 기다려 주세요..."
          label-class="loading_text"
        />
      </q-item>
    </template>
    <template v-slot:no-option>
      <q-item class="no_data">
        <q-item-section>
          검색 결과 없습니다.
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<script setup>
import {
  ref, watch, onMounted, defineEmits
} from "vue";

const props = defineProps({
  value: {
    type: [String, Array],
    default: null
  },
  placeholder: {
    type: String,
    default: ""
  },
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
  options: {
    type: Array,
    default: () => []
  },
  useChips: {
    type: Boolean,
    default: false
  },
  useInput: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:value"]);

const lazyValue = ref(null);
watch(() => props.value, (changedValue) => {
  lazyValue.value = changedValue;
});
onMounted(() => {
  lazyValue.value = props.value;
});

const onUpdateSelect = () => {
  emit("update:value", lazyValue.value);
};

const lazyOptions = ref(props.options);
const isLoading = ref(false);
/**
 * multiple 시 값 수정
 */
const createValue = (val, done) => {
  if (val.length > 0) {
    if (!lazyOptions.value.includes(val)) {
      lazyOptions.value.push(val);
    }
    done(val, "toggle");
  }
};
/**
 * select filtering 함수
 */
const filterFn = (val, update) => {
  update(() => {
    if (val === "") {
      lazyOptions.value = props.options;
    } else {
      isLoading.value = true;
      setTimeout(() => {
        const needle = val.toLowerCase();
        lazyOptions.value = props.options.filter((v) => v.toLowerCase().indexOf(needle) > -1);
        isLoading.value = false;
      }, 500);
    }
  });
};
</script>
