<template>
  <q-input
    outlined
    v-model="ph"
    placeholder="Placeholder Text"
    hint="Description"
    clearable
    class="c_inp"
  >
    <template v-slot:hint>
      Field hint
    </template>
  </q-input>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      text: ref(""),
      ph: ref(""),
    };
  }
};
</script>
