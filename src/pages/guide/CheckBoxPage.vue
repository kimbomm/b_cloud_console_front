<template>
  <div class="p-content p-guide p-checkbox">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">class="c_checkbox"</h2>
        <div class="group">
          <CCheckbox />
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useMeta } from "quasar";
import CCheckbox from "components/common/CCheckbox.vue";

export default {
  name: "CheckboxPage",
  components: {
    CCheckbox,
  },
  setup() {
    const title = ref("Checkbox");
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
