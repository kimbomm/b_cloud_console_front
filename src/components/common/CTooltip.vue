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
<script>
import { ref } from 'vue';

export default {
  setup() {
    return {
      showing: ref(false),
    };
  },
};
</script>
