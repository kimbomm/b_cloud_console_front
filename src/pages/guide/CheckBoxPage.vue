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
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
// import CCheckbox from "components/common/CCheckbox.vue";

const title = ref("Checkbox");
useMeta(() => ({
  title: title.value,
}));
const ptitle = ref(title);
const chk1 = ref(false);
const chk2 = ref(true);
const chk3 = ref(false);
const chk4 = ref(true);
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
.q-checkbox{
  &:not(:last-child){
    margin-right:20px;
  }
}
</style>
