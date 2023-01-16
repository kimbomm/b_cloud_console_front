<template>
  <div class="p-content p-guide p-popup">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
      </section>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useMeta } from "quasar";

export default {
  name: "PopupPage",
  components: {

  },
  setup() {
    const title = ref("Popup");
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
