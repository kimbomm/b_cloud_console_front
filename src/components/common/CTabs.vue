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
<script setup>
import { ref } from "vue";

const tab = ref("tabs1");
</script>
