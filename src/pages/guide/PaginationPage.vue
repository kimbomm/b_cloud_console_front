<template>
  <div class="p-content p-guide p-pagination">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">Default - class="c_pagination"</h2>
        <div class="group">
          <CPagination />
        </div>
      </section>
      <section class="section">
        <h2 class="h6">Default - 페이지가 5개 이상일 경우 class="c_pagination"</h2>
        <div class="group">
          <q-pagination
            v-model="type2"
            :max="10"
            :max-pages="6"
            direction-links
            boundary-numbers
            flat
            color="grey"
            active-color="primary"
            icon-prev="prev"
            icon-next="next"
            class="c_pagination"
          />
        </div>
      </section>
      <section class="section">
        <h2 class="h6">Default - 페이지가 5개 이상일 경우 - 5 클릭했을때 class="c_pagination"</h2>
        <div class="group">
          <q-pagination
            v-model="type3"
            :max="10"
            :max-pages="6"
            direction-links
            boundary-numbers
            flat
            color="grey"
            active-color="primary"
            icon-prev="prev"
            icon-next="next"
            class="c_pagination"
          />
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CPagination from "components/common/CPagination.vue";

const title = ref("Pagination");
useMeta(() => ({
  title: title.value,
}));
const ptitle = ref(title);
const type2 = ref(1);
const type3 = ref(5);
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
