<template>
  <div class="p-content p-guide p-banner">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">class="c_banner"</h2>
        <q-banner class="c_banner">
          <template v-slot:avatar>
            <q-icon class="noti" />
          </template>
          <div class="bn_head">
            <em class="state">서비스</em>
            <strong class="title">스토리지 안내드립니다.</strong>
          </div>
          <div class="bn_body">
            스토리지 사용 안내 드립니다. 스토리지 사용 안내 드립니다. 스토리지
            사용 안내 드립니다. 스토리지 사용 안내 드립니다. 스토리지 사용 안내
            드립니다. 스토리지 사용 안내 드립니다. 스토리지 사용 안내 드립니다.
          </div>
          <template v-slot:action>
            <q-btn class="xclose" />
          </template>
        </q-banner>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";

const title = ref("Banner");
useMeta(() => ({
  title: title.value,
}));
const ptitle = ref(title);
</script>

<style lang="scss" scoped>
.section {
  h2 {
    margin-bottom: 10px;
  }
  ~ .section {
    margin-top: 50px;
  }
}
.group {
  margin-top: 20px;
}
</style>
