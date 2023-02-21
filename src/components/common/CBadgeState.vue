<template>
  <div>
    <q-badge :class="state.class">
      <span class="txt">{{ state.text }}</span>
    </q-badge>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  item: {
    type: Object,
    require: true,
  },
});

let result = "";

/**
 상태 스키마 값
 *  1. save, 저장(개인)
 *  2. save_s, 저장(공유)
 *  3. error, 오류
 *  4. saving, 저장중
*/
const state = computed(() => {
  switch (props.item.status) {
    case "save":
      result = { text: "저장(개인)", class: "green" };
      break;
    case "save_s":
      result = { text: "저장(공유)", class: "green" };
      break;

    case "error":
      result = { text: "오류", class: "orange" };
      break;

    case "saving":
      result = { text: "저장중", class: "c_badge" };
      break;

    default:
  }

  return result;
});
</script>

<style lang="scss" scoped></style>
