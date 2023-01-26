<template>
  <div class="p-content p-guide p-tabs">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">Tabs-Basic class="c_tabs"</h2>
        <div class="group">
          <CTabs />
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CTabs from "components/common/CTabs.vue";

const title = ref("Tabs");
useMeta(() => ({
  title: title.value,
}));
const ptitle = ref(title);
</script>

<style lang="scss" scoped>
.section{
  h2{
    margin-bottom:10px;
  }
  ~ .section{
    margin-top:50px;
  }
}
.group{
  margin-top:20px;
}
</style>
