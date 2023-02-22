<template>
  <div>
    <q-badge :class="state.className">
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
/**
 상태 스키마 값
 *  1. save, 저장(개인)
 *  2. save_s, 저장(공유)
 *  3. error, 오류
 *  4. saving, 저장중
 * 임시추가 - saved -저장(개인)
*/
const state = computed(() => {
  let text = "";
  let className = "";

  switch (props.item.status) {
    case "save":
      text = "저장(개인)";
      className = "green";
      break;
      /* 임시 추가 */
    case "saved":
      text = "저장(개인)";
      className = "green";
      break;
    case "save_s":
      text = "저장(공유)";
      className = "green";
      break;
    case "error":
      text = "오류";
      className = "orange";
      break;
    case "saving":
      text = "저장중";
      className = "c_badge";
      break;

    default:
      break;
  }

  return { text, className };
});
</script>

<style lang="scss" scoped></style>
