<template>
  <div class="p-content p-guide p-segmented">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">Size, H:40px</h2>
        <div class="group">
          <CSegmented />
        </div>
      </section>

      <section class="section">
        <h2 class="h6">Size, H:48px class medium</h2>
        <div class="group">
          <q-btn-toggle
            v-model="segModel2"
            class="c_tabcontrol medium"
            toggle-color="primary"
            flat
            :options="[
              { label: '첫번째', value: 'one' },
              { label: '두번째', value: 'two' },
              { label: '세번째', value: 'third' },
              { label: '네번째', value: 'fourth' },
            ]"
          />
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CSegmented from "components/common/CSegmented.vue";

const title = ref("Segmented Control");
useMeta(() => ({
  title: title.value,
}));
const ptitle = ref(title);
const segModel2 = ref("one");
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
</style>
