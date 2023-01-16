<template>
  <q-page class="p-content p-manage p-instance">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="coming"><p>페이지 준비중입니다.</p></div>
    </div>
  </q-page>
</template>
<script>
import { ref } from "vue";
import { useMeta } from "quasar";

export default {
  name: "InstancePage",
  components: {

  },
  setup() {
    const title = ref("Instance & Task");
    useMeta(() => ({
      title: title.value,
    }));
    return {
      ptitle: ref(title),
    };
  },
};
</script>
<script setup>
</script>

<style lang="scss" scoped>
</style>
