<template>
  <q-tabs
    v-model="lazyModel"
    align="left"
    class="c_tabs"
    @update:model-value="onChange"

  >
    <q-tab
      v-for="tab in tabs"
      :key="tab.name"
      :name="tab.name"
      :label="tab.label"
    >
    <slot name="total">
      <q-badge>{{ tab.total !== undefined ? tab.total : '0' }}</q-badge>
    </slot>
  </q-tab>
</q-tabs>
</template>
<script setup>
import {
  ref,
  onMounted,
  defineEmits,
  watch
} from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const props = defineProps({
  value: {
    type: String,
    default: ""
  },
  tabs: {
    type: Array,
    default: () => []
  },
});
const emit = defineEmits(["update:value"]);
const lazyModel = ref();
watch(() => props.value, (changeValue) => {
  lazyModel.value = changeValue;
});
onMounted(() => {
  lazyModel.value = props.value;
});

/**
 * 설명: 탭 change event
 * 탭 변경시 route hash 추가하여 상태값 유지
 */
const onChange = () => {
  const hash = `#${lazyModel.value}`;
  router.push({
    query: route.query,
    hash,
  });
  emit("update:value", lazyModel.value);
};
</script>
