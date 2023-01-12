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
              {label: '첫번째', value: 'one'},
              {label: '두번째', value: 'two'},
              {label: '세번째', value: 'third'},
              {label: '네번째', value: 'fourth'}
            ]"
          />
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';
import CSegmented from 'components/common/CSegmented.vue';

export default {
  name: 'SegmentedPage',
  components: {
    CSegmented,
  },
  setup() {
    return {
      ptitle: ref('Segmented control'),
      model: ref('one'),
      segModel2: ref('one'),
    };
  },
};
</script>
<script setup>
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
</style>
