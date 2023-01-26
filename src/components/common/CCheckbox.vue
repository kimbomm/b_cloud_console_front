<template>
  <div class="c_group">
    <q-checkbox v-model="chk1" label="One" />
    <q-checkbox v-model="chk2" label="Two" />
    <q-checkbox disable v-model="chk3" label="Three" />
    <q-checkbox disable v-model="chk4" label="Four" />
    <q-option-group
      v-model="group"
      :options="options"
      type="checkbox"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";

const chk1 = ref(false);
const chk2 = ref(true);
const chk3 = ref(false);
const chk4 = ref(true);
const group = ref(["op1"]);

const options = ref([
  {
    label: "Option 1",
    value: "op1",
  },
  {
    label: "Option 2",
    value: "op2",
  },
  {
    label: "Option 3",
    value: "op3",
  },
]);
</script>
