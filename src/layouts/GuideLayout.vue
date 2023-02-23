<template>
  <q-layout
    view="hHh Lpr lff"
    class="l-wrap l-guide"
  >
    <q-header class="l-header">
      <q-toolbar>
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
      class="l-sidebar"
      show-if-above
      :width="316"
      :mini-width="80"
    >
      <q-scroll-area class="fit">
        <q-list
          padding
          class="menu-list"
        >
          <q-item>
            <router-link
              to="/guide"
              class="menu-link"
            >Index</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/color"
              class="menu-link"
            >Color</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/typo"
              class="menu-link"
            >Typo</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/icon"
              class="menu-link"
            >Icon</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/button"
              class="menu-link"
            >Button</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/input"
              class="menu-link"
            >Input</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/checkbox"
              class="menu-link"
            >CheckBox</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/radio"
              class="menu-link"
            >Radio</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/pagination"
              class="menu-link"
            >Pagination</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/segmented"
              class="menu-link"
            >SegmentedControl</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/table"
              class="menu-link"
            >Table</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/dropdown"
              class="menu-link"
            >DropDwon</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/tabs"
              class="menu-link"
            >Tabs</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/breadcrumb"
              class="menu-link"
            >Breadcrumb</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/popover"
              class="menu-link"
            >Popover</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/popup"
              class="menu-link"
            >Popup</router-link>
          </q-item>
          <!-- <q-item>
            <router-link to="/guide/toast" class="menu-link">Toast</router-link>
          </q-item> -->
          <q-item>
            <router-link
              to="/guide/tooltip"
              class="menu-link"
            >Tooltip</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/uploader"
              class="menu-link"
            >Uploader</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/notify"
              class="menu-link"
            >Notify(Toast)</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/carousel"
              class="menu-link"
            >Carousel</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/collapse"
              class="menu-link"
            >Collapse</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/banner"
              class="menu-link"
            >Banner</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/template"
              class="menu-link"
            >Template</router-link>
          </q-item>
          <q-item>
            <router-link
              to="/guide/chart"
              class="menu-link"
            >Chart</router-link>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="l-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
// import { ref } from "vue";
import { useMeta } from "quasar";

const metaData = {
  title: "Brain Cloud",
  titleTemplate: (title) => `${title} | Brain Cloud`,
};
useMeta(metaData);
// const drawer = ref(true);
</script>
<style lang="scss" scoped>
::v-deep{
  .q-page-container {
    padding-left: 316px !important;
  }
}
.l-guide{
  .h_title {
    display: flex;
    align-items: center;
    font-size: $fs16;
    line-height: 1.3;
    letter-spacing: 0;
    img {
      vertical-align: middle;
    }
    .tit {
      margin-left: 20px;
    }
  }

  .menu-list{
    max-width:100%;
  }
  .menu-link{
    width:100%;
  }
}
</style>
