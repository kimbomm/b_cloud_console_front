<template>
  <q-header class="l-header">
    <q-toolbar>
      <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
      <div class="h_title">
        <router-link to="/">
          <img
            alt="B CLOUD logo"
            src="~assets/images/common/logo_bcloud.svg"
            style="width: 116px; height: 22px"
          >
        </router-link>
        <strong class="tit">Guide</strong>
      </div>
    </q-toolbar>
  </q-header>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      drawer: ref(false),
    };
  },
};
</script>
<style lang="scss"></style>
