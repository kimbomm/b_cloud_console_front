<template>
  <q-input
    outlined
    v-model="lazyDate"
    :placeholder="placeholder"
    class="inp_calendar"
  >
    <template v-slot:prepend>
      <q-icon class="ico_calendar">
        <q-popup-proxy :offset="[15, 18]" class="c_datepicker">
          <q-date
            v-model="lazyDate"
            mask="YYYY.MM.DD"
            class="datepicker"
            @update:model-value="onUpdatePicker"
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>
<script setup>
import {
  ref, watch, onMounted, defineEmits
} from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: ""
  },
  value: {
    type: String,
    default: ""
  }
});
const emit = defineEmits(["update:value"]);
const lazyDate = ref(null);
watch(() => props.value, () => {
  lazyDate.value = props.value;
});

onMounted(() => {
  lazyDate.value = props.value;
});

/**
 * 데이트피커 업데이트
 */
const onUpdatePicker = () => {
  emit("update:value", lazyDate.value);
};
</script>
