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
<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      model: ref('one'),
      segModel1: ref('one'),
    };
  },
};
</script>
