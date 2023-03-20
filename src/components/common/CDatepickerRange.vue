<template>
  <div class="group">
    <div class="fakebg">
      <div class="from">
        <q-input
          outlined
          v-model="lazyDate.from"
          :placeholder="placeholder"
          readonly
          class="inp_calendar"
        />
      </div>
      <i class="bar" />
      <div class="to">
        <q-input
          outlined
          v-model="lazyDate.to"
          :placeholder="placeholder"
          readonly
          class="inp_calendar"
        >
        </q-input>
      </div>
    </div>
    <q-popup-proxy
      ref="datepickerPopup"
      :offset="[15, 18]"
      class="c_datepicker"
    >
      <q-date
        v-model="lazyDate"
        mask="YYYY.MM.DD"
        class="datepicker"
        range
        @update:model-value="onUpdatePicker"
      />
    </q-popup-proxy>
  </div>
</template>
<script setup>
import {
  ref, watch, onMounted, defineEmits
} from "vue";

const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  fromValue: {
    type: String,
    default: "",
  },
  toValue: {
    type: String,
    default: "",
  },
});
const emit = defineEmits(["update:fromValue", "update:toValue"]);
const lazyDate = ref({ from: null, to: null });
const datepickerPopup = ref(null);
watch(
  () => props.fromValue,
  () => {
    lazyDate.value.from = props.fromValue;
  }
);
watch(
  () => props.toValue,
  () => {
    lazyDate.value.to = props.toValue;
  }
);

onMounted(() => {
  lazyDate.value.from = props.fromValue;
  lazyDate.value.to = props.toValue;
});

/**
 * 데이트피커 업데이트
 */
const onUpdatePicker = () => {
  emit("update:fromValue", lazyDate.value.from);
  emit("update:toValue", lazyDate.value.to);
};
</script>
