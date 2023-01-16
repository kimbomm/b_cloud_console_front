<template>
  <div class="inner">
    <router-link to="/" class="logo">
      <img
        alt="B CLOUD logo"
        src="~assets/images/common/logo_bcloud.svg"
        style="width: 116px; height: 22px"
      >
    </router-link>
    <div class="c_selectgroup">
      <q-select
        filled
        v-model="menumodel"
        :options="menuopt"
        options-selected-class="is-active"
        popup-content-class="smtext topmenu_opt"
        label="Workspace 01"
        class="c_dropdown smtext"
      />
    </div>
    <q-btn to="/" class="c_btn c_icon top_guidemenu">
      <i class="ico" /><span class="txt">메뉴</span>
    </q-btn>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      menumodel: ref("Workspace 01"),
      menuopt: [
        "Workspace 01", "Workspace 02", "Workspace 03", "Workspace 04 - Workspace 04",
      ],
    };
  },
};
</script>
<script setup>

</script>
<style lang="scss" scoped></style>
