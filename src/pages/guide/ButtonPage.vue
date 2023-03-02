<template>
  <div class="p-content p-guide p-button">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <div class="body_group">
        <section class="section">
          <h2 class="h6">Primary</h2>
          <div class="group">
            <h3 class="h6 regular">Size, Small :size-types="1"</h3>
            <div class="c_btngroup">
              <CButton :size-types="1" :btn-types="1" :btn-names="btnName" />
              <CButton :size-types="1" :btn-types="11" :btn-names="btnDis" />
              <CButton :size-types="1" :btn-types="12" :btn-names="btnHover" />
              <CButton :size-types="1" :btn-types="13" :btn-names="btnFocus" />
            </div>
            <div class="c_btngroup">
              <CButton :size-types="1" :btn-types="2" :btn-names="btnName" />
              <CButton :size-types="1" :btn-types="21" :btn-names="btnDis" />
              <CButton :size-types="1" :btn-types="22" :btn-names="btnHover" />
              <CButton :size-types="1" :btn-types="23" :btn-names="btnFocus" />
            </div>
            <div class="c_btngroup">
              <CButton :size-types="1" :btn-types="3" :btn-names="btnName" />
              <CButton :size-types="1" :btn-types="31" :btn-names="btnDis" />
              <CButton :size-types="1" :btn-types="32" :btn-names="btnHover" />
              <CButton :size-types="1" :btn-types="33" :btn-names="btnFocus" />
            </div>
          </div>
          <div class="group">
            <h3 class="h6 regular">Size, Medium :size-types="2"</h3>
            <div class="c_btngroup">
              <CButton :size-types="2" :btn-types="1" :btn-names="btnName" />
              <CButton :size-types="2" :btn-types="11" :btn-names="btnDis" />
              <CButton :size-types="2" :btn-types="12" :btn-names="btnHover" />
              <CButton :size-types="2" :btn-types="13" :btn-names="btnFocus" />
            </div>
            <div class="c_btngroup">
              <CButton :size-types="2" :btn-types="2" :btn-names="btnName" />
              <CButton :size-types="2" :btn-types="21" :btn-names="btnDis" />
              <CButton :size-types="2" :btn-types="22" :btn-names="btnHover" />
              <CButton :size-types="2" :btn-types="23" :btn-names="btnFocus" />
            </div>
            <div class="c_btngroup">
              <CButton :size-types="2" :btn-types="3" :btn-names="btnName" />
              <CButton :size-types="2" :btn-types="31" :btn-names="btnDis" />
              <CButton :size-types="2" :btn-types="32" :btn-names="btnHover" />
              <CButton :size-types="2" :btn-types="33" :btn-names="btnFocus" />
            </div>
          </div>
          <div class="group" aria-label="Size, Large">
            <h3 class="h6 regular">Size, Large :size-types="3"</h3>
            <div class="c_btngroup">
              <CButton :size-types="3" :btn-types="1" :btn-names="btnName" />
              <CButton :size-types="3" :btn-types="11" :btn-names="btnDis" />
              <CButton :size-types="3" :btn-types="12" :btn-names="btnHover" />
              <CButton :size-types="3" :btn-types="13" :btn-names="btnFocus" />
            </div>
            <div class="c_btngroup">
              <CButton :size-types="3" :btn-types="2" :btn-names="btnName" />
              <CButton :size-types="3" :btn-types="21" :btn-names="btnDis" />
              <CButton :size-types="3" :btn-types="22" :btn-names="btnHover" />
              <CButton :size-types="3" :btn-types="23" :btn-names="btnFocus" />
            </div>
            <div class="c_btngroup">
              <CButton :size-types="3" :btn-types="3" :btn-names="btnName" />
              <CButton :size-types="3" :btn-types="31" :btn-names="btnDis" />
              <CButton :size-types="3" :btn-types="32" :btn-names="btnHover" />
              <CButton :size-types="3" :btn-types="33" :btn-names="btnFocus" />
            </div>
          </div>
        </section>
        <section class="section">
          <h2 class="h6">Secondary</h2>
          <div class="group">
            <h3 class="h6 regular">Size, Small :size-types="1"</h3>
            <div class="c_btngroup">
              <CButton :size-types="1" :btn-types="4" :btn-names="btnName" />
              <CButton :size-types="1" :btn-types="41" :btn-names="btnDis" />
              <CButton :size-types="1" :btn-types="42" :btn-names="btnHover" />
              <CButton :size-types="1" :btn-types="43" :btn-names="btnFocus" />
            </div>
            <div class="c_btngroup">
              <CButton :size-types="1" :btn-types="5" :btn-names="btnName" />
              <CButton :size-types="1" :btn-types="51" :btn-names="btnDis" />
              <CButton :size-types="1" :btn-types="52" :btn-names="btnHover" />
              <CButton :size-types="1" :btn-types="53" :btn-names="btnFocus" />
            </div>
            <div class="c_btngroup">
              <CButton :size-types="1" :btn-types="6" :btn-names="btnName" />
              <CButton :size-types="1" :btn-types="61" :btn-names="btnDis" />
              <CButton :size-types="1" :btn-types="62" :btn-names="btnHover" />
              <CButton :size-types="1" :btn-types="63" :btn-names="btnFocus" />
            </div>
          </div>
          <div class="group">
            <h3 class="h6 regular">Size, Medium :size-types="2"</h3>
            <div class="c_btngroup">
              <CButton :size-types="2" :btn-types="4" :btn-names="btnName" />
              <CButton :size-types="2" :btn-types="41" :btn-names="btnDis" />
              <CButton :size-types="2" :btn-types="42" :btn-names="btnHover" />
              <CButton :size-types="2" :btn-types="43" :btn-names="btnFocus" />
            </div>
            <div class="c_btngroup">
              <CButton :size-types="2" :btn-types="5" :btn-names="btnName" />
              <CButton :size-types="2" :btn-types="51" :btn-names="btnDis" />
              <CButton :size-types="2" :btn-types="52" :btn-names="btnHover" />
              <CButton :size-types="2" :btn-types="53" :btn-names="btnFocus" />
            </div>
            <div class="c_btngroup">
              <CButton :size-types="2" :btn-types="6" :btn-names="btnName" />
              <CButton :size-types="2" :btn-types="61" :btn-names="btnDis" />
              <CButton :size-types="2" :btn-types="62" :btn-names="btnHover" />
              <CButton :size-types="2" :btn-types="63" :btn-names="btnFocus" />
            </div>
          </div>
          <div class="group">
            <h3 class="h6 regular">Size, Large :size-types="3"</h3>
            <div class="c_btngroup">
              <CButton :size-types="3" :btn-types="4" :btn-names="btnName" />
              <CButton :size-types="3" :btn-types="41" :btn-names="btnDis" />
              <CButton :size-types="3" :btn-types="42" :btn-names="btnHover" />
              <CButton :size-types="3" :btn-types="43" :btn-names="btnFocus" />
            </div>
            <div class="c_btngroup">
              <CButton :size-types="3" :btn-types="5" :btn-names="btnName" />
              <CButton :size-types="3" :btn-types="51" :btn-names="btnDis" />
              <CButton :size-types="3" :btn-types="52" :btn-names="btnHover" />
              <CButton :size-types="3" :btn-types="53" :btn-names="btnFocus" />
            </div>
            <div class="c_btngroup">
              <CButton :size-types="3" :btn-types="6" :btn-names="btnName" />
              <CButton :size-types="3" :btn-types="61" :btn-names="btnDis" />
              <CButton :size-types="3" :btn-types="62" :btn-names="btnHover" />
              <CButton :size-types="3" :btn-types="63" :btn-names="btnFocus" />
            </div>
          </div>
        </section>
      </div>
      <!-- //body_group -->

      <div class="body_group">
        <section class="section">
          <h2 class="h6">Icon Primary</h2>
          <div class="group">
            <h3 class="h6 regular">Size, Small class="c_btn c_icon"</h3>
            <div class="c_btngroup">
              <q-btn type="button" class="c_btn c_icon">
                <i class="ico plus" /><span class="txt">Button</span>
              </q-btn>
              <q-btn type="button" class="c_btn c_icon" disabled>
                <i class="ico plus" /><span class="txt">Disabled</span>
              </q-btn>
              <q-btn type="button" class="c_btn c_icon hover">
                <i class="ico plus" /><span class="txt">Hover</span>
              </q-btn>
              <q-btn type="button" class="c_btn c_icon focus">
                <i class="ico plus" /><span class="txt">Focus</span>
              </q-btn>
            </div>
          </div>
          <div class="group">
            <h3 class="h6 regular">Size, Medium class="c_btn c_icon medium"</h3>
            <div class="c_btngroup">
              <q-btn type="button" class="c_btn c_icon medium">
                <i class="ico plus" /><span class="txt">Button</span>
              </q-btn>
              <q-btn type="button" class="c_btn c_icon medium" disabled>
                <i class="ico plus" /><span class="txt">Disabled</span>
              </q-btn>
              <q-btn type="button" class="c_btn c_icon medium hover">
                <i class="ico plus" /><span class="txt">Hover</span>
              </q-btn>
              <q-btn type="button" class="c_btn c_icon medium focus">
                <i class="ico plus" /><span class="txt">Focus</span>
              </q-btn>
            </div>
          </div>
          <div class="group" aria-label="Size, Large">
            <h3 class="h6 regular">Size, Large class="c_btn c_icon large"</h3>
            <div class="c_btngroup">
              <q-btn type="button" class="c_btn c_icon large">
                <i class="ico plus" /><span class="txt">Button</span>
              </q-btn>
              <q-btn type="button" class="c_btn c_icon large" disabled>
                <i class="ico plus" /><span class="txt">Disabled</span>
              </q-btn>
              <q-btn type="button" class="c_btn c_icon large hover">
                <i class="ico plus" /><span class="txt">Hover</span>
              </q-btn>
              <q-btn type="button" class="c_btn c_icon large focus">
                <i class="ico plus" /><span class="txt">Focus</span>
              </q-btn>
            </div>
          </div>
        </section>
        <section class="section">
          <h2 class="h6">Icon Secondary</h2>
          <div class="group">
            <h3 class="h6 regular">Size, Small class="c_btn c_icon line"</h3>
            <div class="c_btngroup">
              <q-btn type="button" class="c_btn c_icon line">
                <i class="ico plus" /><span class="txt">Button</span>
              </q-btn>
              <q-btn type="button" class="c_btn c_icon line" disabled>
                <i class="ico plus" /><span class="txt">Disabled</span>
              </q-btn>
              <q-btn type="button" class="c_btn c_icon line hover">
                <i class="ico plus" /><span class="txt">Hover</span>
              </q-btn>
              <q-btn type="button" class="c_btn c_icon line focus">
                <i class="ico plus" /><span class="txt">Focus</span>
              </q-btn>
            </div>
          </div>
          <div class="group">
            <h3 class="h6 regular">
              Size, Medium class="c_btn c_icon medium line"
            </h3>
            <div class="c_btngroup">
              <q-btn type="button" class="c_btn c_icon medium line">
                <i class="ico plus" /><span class="txt">Button</span>
              </q-btn>
              <q-btn type="button" class="c_btn c_icon medium line" disabled>
                <i class="ico plus" /><span class="txt">Disabled</span>
              </q-btn>
              <q-btn type="button" class="c_btn c_icon medium line hover">
                <i class="ico plus" /><span class="txt">Hover</span>
              </q-btn>
              <q-btn type="button" class="c_btn c_icon medium line focus">
                <i class="ico plus" /><span class="txt">Focus</span>
              </q-btn>
            </div>
          </div>
          <div class="group" aria-label="Size, Large">
            <h3 class="h6 regular">
              Size, Large class="c_btn c_icon large line"
            </h3>
            <div class="c_btngroup">
              <q-btn type="button" class="c_btn c_icon medium large line">
                <i class="ico plus" /><span class="txt">Button</span>
              </q-btn>
              <q-btn
                type="button"
                class="c_btn c_icon medium large line"
                disabled
              >
                <i class="ico plus" /><span class="txt">Disabled</span>
              </q-btn>
              <q-btn type="button" class="c_btn c_icon medium large line hover">
                <i class="ico plus" /><span class="txt">Hover</span>
              </q-btn>
              <q-btn type="button" class="c_btn c_icon medium large line focus">
                <i class="ico plus" /><span class="txt">Focus</span>
              </q-btn>
            </div>
          </div>
        </section>
      </div>
      <!-- //.body_group -->

      <div class="body_group">
        <section class="section">
          <h2 class="h6">Toggle</h2>
          <div class="group">
            <h3 class="h6 regular">On</h3>
            <q-toggle v-model="on" />
          </div>
          <div class="group">
            <h3 class="h6 regular">Off</h3>
            <q-toggle v-model="off" />
          </div>
        </section>
      </div>
      <!-- //.body_group -->
    </div>
    <!-- //.p-body -->
  </div>
  <!-- //.p-content -->
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import CButton from "components/common/CButton.vue";

const title = ref("Button");
useMeta(() => ({
  title: title.value,
}));
const ptitle = ref(title);
const btnName = ref("Default");
const btnDis = ref("Disabled");
const btnHover = ref("Hover");
const btnFocus = ref("Pressed");
const on = ref(true);
const off = ref(false);
</script>
<style lang="scss" scoped>
.p-body {
  display: flex;
  flex-wrap: wrap;
}
.body_group {
  ~ .body_group {
    margin-top: 50px;
  }
}
.section {
  width: 50%;
  padding: 0 20px;
}
h2 {
  width: 100%;
  margin-bottom: 20px;
}
h3 {
  margin-bottom: 5px;
}
.group {
  ~ .group {
    margin-top: 40px;
  }
}
.c_btngroup {
  margin-top: 10px;
  .c_btn {
    margin-right: 10px;
  }
}
</style>
