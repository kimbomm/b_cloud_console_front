<template>
  <div>
    <q-badge :class="state.className">
      <span class="txt">{{ state.text }}</span>
    </q-badge>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCommonStore } from "src/stores/useCommonStore";

const commonStore = useCommonStore();

const props = defineProps({
  item: {
    type: Object,
    require: true,
  },
});

const state = computed(() => {
  const { text, className } = commonStore.commonStatus(props.item.status);
  return { text, className };
});
</script>

<style lang="scss" scoped></style>
