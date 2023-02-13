<template>
  <q-layout view="hHh Lpr lff" class="l-wrap l-console" :class="drawer ? '' : 'sm-sidemenu'">
    <q-header class="l-header">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" class="c_icon menu" />
        <top-nav />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      class="l-sidebar"
      :width="316"
    >
      <side-bar />
    </q-drawer>

    <q-page-container class="l-container">
      <router-view />
    </q-page-container>
    <c-message-box />
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import TopNav from "components/layout/TopNav.vue";
import SideBar from "components/layout/SideBar.vue";
import CMessageBox from "components/common/CMessageBox.vue";

const metaData = {
  title: "Brain Cloud",
  titleTemplate: (title) => `${title} | Brain Cloud`,
};
useMeta(metaData);
const drawer = ref(false);
</script>
<style lang="scss" scoped>
</style>
