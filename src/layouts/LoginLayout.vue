<template>
  <q-layout
    view="hHh Lpr lff"
    class="l-sub"
  >
    <q-page-container class="l-container">
      <router-view />
    </q-page-container>
  </q-layout>
  <c-message-box />
</template>

<script setup>
import { useMeta } from "quasar";
import CMessageBox from "components/common/CMessageBox.vue";

const metaData = {
  title: "Brain Cloud",
  titleTemplate: (title) => `${title} | Brain Cloud`,
  script: {
    googleScript: {
      src: "https://accounts.google.com/gsi/client",
      defer: true
    }
  }
};
useMeta(metaData);
</script>
<style lang="scss" scoped>
.l-container{
  padding-left:0!important;
}
</style>
