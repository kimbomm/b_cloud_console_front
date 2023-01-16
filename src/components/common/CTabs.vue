<template>
  <q-tabs
    v-model="tab"
    align="left"
    class="c_tabs"
  >
    <q-tab name="tabs1" label="인스턴스">
      <q-badge>2</q-badge>
    </q-tab>
    <q-tab name="tabs2" label="태스크" />
    <q-tab name="tabs3" label="Hyperopt" />
  </q-tabs>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      tab: ref("tabs1"),
      tab1: ref("mails"),
    };
  },
};
</script>
