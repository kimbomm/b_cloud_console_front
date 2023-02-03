<template>
  <div class="p-content p-guide p-breadcrumb">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">class="c_breadcrumb"</h2>
        <div class="group">
          <q-breadcrumbs class="c_breadcrumb" gutter="none">
            <template v-slot:separator>
              <q-icon />
            </template>
            <q-breadcrumbs-el label="Breadcrumbs" />
          </q-breadcrumbs>
        </div>
        <div class="group">
          <q-breadcrumbs class="c_breadcrumb" gutter="none">
            <template v-slot:separator>
              <q-icon />
            </template>
            <q-breadcrumbs-el label="Home" to="/guide" />
            <q-breadcrumbs-el label="Breadcrumbs" />
          </q-breadcrumbs>
        </div>
        <div class="group">
          <CBreadcrumb />
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CBreadcrumb from "components/common/CBreadcrumb.vue";

const title = ref("Breadcrumbs");
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
