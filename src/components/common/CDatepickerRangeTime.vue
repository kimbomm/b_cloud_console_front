<template>
  <div class="group">
    <div class="fakebg">
      <div class="from">
        <q-input
          outlined
          v-model="lazyDateFrom"
          :placeholder="placeholder"
          readonly
          class="inp_calendar"
        />
        <q-popup-proxy ref="datepickerPopupFrom" :offset="[15, 18]" class="c_datepicker">
          <q-date
            v-model="lazyDateFrom"
            mask="YYYY.MM.DD HH:mm"
            class="datepicker"
            @update:model-value="onUpdatePicker"
          />
          <q-time
            v-model="lazyDateFrom"
            mask="YYYY.MM.DD HH:mm"
            @update:model-value="onUpdatePicker"
          >
            <q-btn v-close-popup label="확인" color="primary" flat />
          </q-time>
        </q-popup-proxy>
      </div>
      <i class="bar" />
      <div class="to">
        <q-input
          outlined
          v-model="lazyDateTo"
          :placeholder="placeholder"
          readonly
          class="inp_calendar"
        >
        </q-input>
        <q-popup-proxy ref="datepickerPopupTo" :offset="[15, 18]" class="c_datepicker">
          <q-date
            v-model="lazyDateTo"
            mask="YYYY.MM.DD HH:mm"
            class="datepicker"
            @update:model-value="onUpdatePicker"
          />
          <q-time
            v-model="lazyDateTo"
            mask="YYYY.MM.DD HH:mm"
            @update:model-value="onUpdatePicker"
          >
            <q-btn v-close-popup label="확인" color="primary" flat />
          </q-time>
        </q-popup-proxy>
      </div>
    </div>
  </div>
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
  fromValue: {
    type: String,
    default: ""
  },
  toValue: {
    type: String,
    default: ""
  },
});
const emit = defineEmits(["update:fromValue", "update:toValue"]);
const lazyDateFrom = ref(null);
const lazyDateTo = ref(null);
const datepickerPopupFrom = ref(null);
const datepickerPopupTo = ref(null);
watch(() => props.fromValue, () => {
  lazyDateFrom.value = props.fromValue;
});
watch(() => props.toValue, () => {
  lazyDateTo.value = props.toValue;
});

onMounted(() => {
  lazyDateFrom.value = props.fromValue;
  lazyDateTo.value = props.toValue;
});

/**
 * 데이트피커 업데이트
 */
const onUpdatePicker = () => {
  emit("update:fromValue", lazyDateFrom.value);
  emit("update:toValue", lazyDateTo.value);
};
</script>
