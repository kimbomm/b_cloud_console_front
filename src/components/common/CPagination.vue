<template>
  <q-pagination
    v-model="current"
    max="5"
    direction-links
    flat
    color="grey"
    active-color="primary"
    icon-prev="prev"
    icon-next="next"
    class="c_pagination"
  />
</template>
<script setup>
import { ref } from "vue";

const current = ref(1);
</script>
