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
          <div class="c_checkgroup">
            <q-checkbox v-model="chk1" label="One" class="c_checkbox" />
            <q-checkbox v-model="chk2" label="Two" class="c_checkbox" />
            <q-checkbox disable v-model="chk3" label="Three" class="c_checkbox" />
            <q-checkbox disable v-model="chk4" label="Four" class="c_checkbox" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useMeta } from "quasar";
// import CCheckbox from "components/common/CCheckbox.vue";

export default {
  name: "CheckboxPage",
  components: {
    // CCheckbox,
  },
  setup() {
    const title = ref("Checkbox");
    useMeta(() => ({
      title: title.value,
    }));
    return {
      ptitle: ref(title),
      chk1: ref(false),
      chk2: ref(true),
      chk3: ref(false),
      chk4: ref(true),
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
