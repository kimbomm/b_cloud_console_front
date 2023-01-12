<template>
  <q-layout view="hHh Lpr lff" class="l-wrap" :class="drawer ? '' : 'sm-sidemenu'">
    <q-header class="l-header">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" class="c_icon menu" />
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

    <q-drawer
      v-model="drawer"
      show-if-above
      class="l-sidebar"
      :width="316"
    >
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item>
            <router-link to="/guide" class="menu-link">Index</router-link>
          </q-item>
          <q-item>
            <router-link to="/guide/color" class="menu-link">Color</router-link>
          </q-item>
          <q-item>
            <router-link to="/guide/typo" class="menu-link">Typo</router-link>
          </q-item>
          <q-item>
            <router-link to="/guide/icon" class="menu-link">Icon</router-link>
          </q-item>
          <q-item>
            <router-link to="/guide/button" class="menu-link">Button</router-link>
          </q-item>
          <q-item>
            <router-link to="/guide/input" class="menu-link">Input</router-link>
          </q-item>
          <q-item>
            <router-link to="/guide/checkbox" class="menu-link">CheckBox</router-link>
          </q-item>
          <q-item>
            <router-link to="/guide/radio" class="menu-link">Radio</router-link>
          </q-item>
          <q-item>
            <router-link to="/guide/pagination" class="menu-link">Pagination</router-link>
          </q-item>
          <q-item>
            <router-link to="/guide/segmented" class="menu-link">SegmentedControl</router-link>
          </q-item>
          <q-item>
            <router-link to="/guide/table" class="menu-link">Table</router-link>
          </q-item>
          <q-item>
            <router-link to="/guide/dropdown" class="menu-link">DropDwon</router-link>
          </q-item>
          <q-item>
            <router-link to="/guide/tabs" class="menu-link">Tabs</router-link>
          </q-item>
          <q-item>
            <router-link to="/guide/breadcrumb" class="menu-link">Breadcrumb</router-link>
          </q-item>
          <q-item>
            <router-link to="/guide/popover" class="menu-link">Popover</router-link>
          </q-item>
          <q-item>
            <router-link to="/guide/popup" class="menu-link">Popup</router-link>
          </q-item>
          <q-item>
            <router-link to="/guide/toast" class="menu-link">Toast</router-link>
          </q-item>
          <q-item>
            <router-link to="/guide/tooltip" class="menu-link">Tooltip</router-link>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="l-container">
      <router-view />
    </q-page-container>
  </q-layout>
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

<style lang="scss" scoped>
</style>
