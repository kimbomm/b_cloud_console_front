<template>
  <div class="p-content p-guide p-table">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">class="c_table"</h2>
        <div class="group">
          <!-- <CTable /> -->
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useMeta } from "quasar";
// import CTable from "components/common/CTable.vue";

export default {
  name: "TablePage",
  components: {
    // CTable,
  },
  setup() {
    const title = ref("Table");
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
