<template>
  <q-pagination
    v-model="current"
    max="5"
    direction-links
    flat
    color="grey"
    active-color="primary"
  />
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      current: ref(1),
    };
  },
};
</script>
