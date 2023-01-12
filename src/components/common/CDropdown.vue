<template>
  <q-select
    outlined
    v-model="model"
    :options="options"
    options-selected-class="is-active"
    label="전체"
    class="c_dropdown"
  />
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      model: ref("전체"),
      options: [
        "운영중", "정지중", "삭제중", "삭제",
      ],
    };
  },
};
</script>
