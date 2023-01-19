<template>
  <q-tooltip
    v-model="showing"
    anchor="bottom middle" self="top middle"
    class="c_tooltip"
  >
    <div class="inner">
      Tooltip text Tooltip text Tooltip text Tooltip text
    </div>
  </q-tooltip>
</template>
<script setup>
import { ref } from "vue";

const showing = ref(false);
</script>
