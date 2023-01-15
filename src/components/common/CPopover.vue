<template>
  {{ label }}
  <q-popup-edit
    v-model="label"
    anchor="top left" self="top left"
    class="c_popover"
  >
    <div class="inner">
      {{ desc }}
    </div>
  </q-popup-edit>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      label: ref("click"),
      desc: ref("Two values setting the starting position or anchor point of the menu relative to its target"),
    };
  },
};
</script>
