<template>
  <div class="cgroup">
    <q-radio v-model="shape" val="line" label="Line" />
    <q-radio v-model="shape" val="rectangle" label="Rectangle" />
    <q-radio disable v-model="shape1" val="ellipse" label="Ellipse" />
    <q-radio disable v-model="shape1" val="polygon" label="Polygon" />
    <q-option-group
      v-model="group"
      :options="options"
      color="primary"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";

const shape = ref("line");
const shape1 = ref("ellipse");
const group = ref("op1");
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
