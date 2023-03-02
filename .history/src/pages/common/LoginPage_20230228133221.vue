<template>
  <q-page class="p-content p-sub p-login">
    <div class="p-body">
      <div class=""></div>
    </div>
  </q-page>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";

const title = ref("로그인");
useMeta(() => ({
  title: title.value,
}));
</script>

<style lang="scss" scoped>
@import "src/css/common";
</style>
