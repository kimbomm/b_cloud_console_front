<template>
  <q-btn-toggle
    v-model="segModel1"
    class="c_tabcontrol"
    toggle-color="primary"
    flat
    :options="[
      {label: '첫번째', value: 'one'},
      {label: '두번째', value: 'two'},
      {label: '세번째', value: 'third'},
      {label: '네번째', value: 'fourth'}
    ]"
  />
</template>
<script setup>
import { ref } from "vue";

const segModel1 = ref("one");
</script>
