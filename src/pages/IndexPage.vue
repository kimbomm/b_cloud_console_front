<template>
  <q-page class="p-content p-console">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
      <p class="desc">
        <i class="ico time" />
        <span class="txt">업데이트 시간 <span class="time">2023.10.33 14:33</span></span>
      </p>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="coming"><p>페이지 준비중입니다.</p></div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";

const title = ref("Dashboard");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
</script>

<style lang="scss" scoped>
</style>
