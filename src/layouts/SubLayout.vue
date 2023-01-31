<template>
  <q-layout view="hHh Lpr lff" class="l-sub">
    <q-header class="l-header">
      <q-toolbar>
        <top-nav />
      </q-toolbar>
    </q-header>

    <q-page-container class="l-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
// import { ref } from "vue";
import { useMeta } from "quasar";
import TopNav from "components/layout/TopNav.vue";
// import SideBar from "components/layout/SideBar.vue";

const metaData = {
  title: "Brain Cloud",
  titleTemplate: (title) => `${title} | Brain Cloud`,
};
useMeta(metaData);
</script>
<style lang="scss" scoped>
</style>
