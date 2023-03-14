<template>
  <q-pagination
    v-model="lazyCurrent"
    :max="total"
    :max-pages="maxPage"
    direction-links
    flat
    color="grey"
    active-color="primary"
    icon-prev="prev"
    icon-next="next"
    class="c_pagination"
    :key="key"
    @update:model-value="onChange"
  />
</template>
<script setup>
import {
  ref, defineEmits, onMounted, watch
} from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";

const route = useRoute();
const router = useRouter();

const props = defineProps({
  total: {
    type: Number,
    default: 2
  },
  maxPage: {
    type: Number,
    default: 5
  },
  current: {
    type: Number,
    default: 1
  }
});
const key = ref(0);
const lazyCurrent = ref(1);
const emit = defineEmits(["update:current", "change"]);
watch(() => props.current, () => {
  lazyCurrent.value = props.current;
});

const setLazeCurrent = (value) => {
  lazyCurrent.value = Number(value);
};

const onEmit = () => {
  emit("update:current", lazyCurrent.value);
  emit("change");
};

onBeforeRouteUpdate((to) => {
  if (Object.keys(to.query).includes("cur")) {
    setLazeCurrent(to.query.cur);
    onEmit();
  }
});

const onChange = () => {
  const { query, hash } = route;
  router.push({
    query: {
      ...query,
      cur: lazyCurrent.value,
    },
    hash,
  });
  onEmit();
};

onMounted(() => {
  lazyCurrent.value = props.current;
});
</script>
