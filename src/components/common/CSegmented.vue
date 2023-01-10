<template>
  <q-btn-toggle
    v-model="model"
    spread
    no-caps
    toggle-color="purple"
    color="white"
    text-color="black"
    :options="[
      {label: 'Option 1', value: 'one'},
      {label: 'Option 2', value: 'two'}
    ]"
  />
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      model: ref('one'),
    };
  },
};
</script>
