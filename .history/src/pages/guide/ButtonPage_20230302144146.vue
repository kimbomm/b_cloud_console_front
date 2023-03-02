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
            <h3 class="h6 regular">Size, Small</h3>
            <div class="c_btngroup">
              <c-button :btn-names="취소" />
              <c-button disabled1 :btn-names="btnDis" />
            </div>
            <div class="c_btngroup">
              <c-button :btn-names="btnName">
                <template #prepend>
                  <i class="ico plus" />
                </template>
              </c-button>
              <c-button disabled :btn-names="btnDis">
                <template #prepend>
                  <i class="ico plus" />
                </template>
              </c-button>
            </div>
            <div class="c_btngroup">
              <c-button :btn-types="3" :btn-names="btnName" />
              <c-button :btn-types="31" :btn-names="btnDis" />
            </div>
          </div>
          <div class="group">
            <h3 class="h6 regular">Size, Medium :size="'medium'"</h3>
            <div class="c_btngroup">
              <c-button :size="'medium'" :btn-names="btnName" />
              <c-button :size="'medium'" disabled :btn-names="btnDis" />
            </div>
            <div class="c_btngroup">
              <c-button :size="'medium'" :btn-names="btnName">
                <template #prepend>
                  <i class="ico plus" />
                </template>
              </c-button>
              <c-button :size="'medium'" disabled :btn-names="btnDis">
                <template #prepend>
                  <i class="ico plus" />
                </template>
              </c-button>
            </div>
            <div class="c_btngroup">
              <c-button :size="'medium'" :btn-types="3" :btn-names="btnName" />
              <c-button :size="'medium'" :btn-types="31" :btn-names="btnDis" />
            </div>
          </div>
          <div class="group" aria-label="Size, Large">
            <h3 class="h6 regular">Size, Large :size="'large'"</h3>
            <div class="c_btngroup">
              <c-button :size="'large'" :btn-names="btnName" />
              <c-button :size="'large'" disabled :btn-names="btnDis" />
            </div>
            <div class="c_btngroup">
              <c-button :size="'large'" :btn-names="btnName">
                <template #prepend>
                  <i class="ico plus" />
                </template>
              </c-button>
              <c-button :size="'large'" disabled :btn-names="btnDis">
                <template #prepend>
                  <i class="ico plus" />
                </template>
              </c-button>
            </div>
            <div class="c_btngroup">
              <c-button :size="'large'" :btn-names="btnName">
                <template #append>
                  <i class="ico plus" />
                </template>
              </c-button>
              <c-button :size="'large'" disabled :btn-names="btnDis">
                <template #append>
                  <i class="ico plus" />
                </template>
              </c-button>
            </div>
          </div>
        </section>
        <section class="section">
          <h2 class="h6">Secondary</h2>
          <div class="group">
            <h3 class="h6 regular">Size, Small</h3>
            <div class="c_btngroup">
              <c-button :outline="true" :btn-names="btnName" />
              <c-button :outline="true" disabled :btn-names="btnDis" />
            </div>
            <div class="c_btngroup">
              <c-button :outline="true" :btn-names="btnName">
                <template #prepend>
                  <i class="ico plus" />
                </template>
              </c-button>
              <c-button :outline="true" disabled :btn-names="btnDis">
                <template #prepend>
                  <i class="ico plus" />
                </template>
              </c-button>
            </div>
            <div class="c_btngroup">
              <c-button :outline="true" disabled :btn-names="btnName">
                <template #append>
                  <i class="ico plus" />
                </template>
              </c-button>
              <c-button :outline="true" disabled :btn-names="btnDis">
                <template #append>
                  <i class="ico plus" />
                </template>
              </c-button>
            </div>
          </div>
          <div class="group">
            <h3 class="h6 regular">Size, Medium :size="'medium'"</h3>
            <div class="c_btngroup">
              <c-button :size="'medium'" :outline="true" :btn-names="btnName" />
              <c-button
                :size="'medium'"
                :outline="true"
                disabled
                :btn-names="btnDis"
              />
            </div>
            <div class="c_btngroup">
              <c-button :size="'medium'" :outline="true" :btn-names="btnName">
                <template #prepend>
                  <i class="ico plus" />
                </template>
              </c-button>
              <c-button
                :size="'medium'"
                :outline="true"
                disabled
                :btn-names="btnDis"
              >
                <template #prepend>
                  <i class="ico plus" />
                </template>
              </c-button>
            </div>
            <div class="c_btngroup">
              <c-button :size="'medium'" :outline="true" :btn-names="btnName">
                <template #append>
                  <i class="ico plus" />
                </template>
              </c-button>
              <c-button
                :size="'medium'"
                :outline="true"
                disabled
                :btn-names="btnDis"
              >
                <template #append>
                  <i class="ico plus" />
                </template>
              </c-button>
            </div>
          </div>
          <div class="group">
            <h3 class="h6 regular">Size, Large :size="'large'"</h3>
            <div class="c_btngroup">
              <c-button :size="'large'" :outline="true" :btn-names="btnName" />
              <c-button
                :size="'large'"
                :outline="true"
                disabled
                :btn-names="btnDis"
              />
            </div>
            <div class="c_btngroup">
              <c-button :size="'large'" :outline="true" :btn-names="btnName">
                <template #prepend>
                  <i class="ico plus" />
                </template>
              </c-button>
              <c-button
                :size="'large'"
                :outline="true"
                disabled
                :btn-names="btnDis"
              >
                <template #prepend>
                  <i class="ico plus" />
                </template>
              </c-button>
            </div>
            <div class="c_btngroup">
              <c-button :size="'large'" :outline="true" :btn-names="btnName">
                <template #append>
                  <i class="ico plus" />
                </template>
              </c-button>
              <c-button
                :size="'large'"
                :outline="true"
                disabled
                :btn-names="btnDis"
              >
                <template #append>
                  <i class="ico plus" />
                </template>
              </c-button>
            </div>
          </div>
        </section>
      </div>
      <!-- //body_group -->

      <div class="body_group">
        <section class="section">
          <h2 class="h6">Icon Primary</h2>
          <div class="group">
            <h3 class="h6 regular">Size, Small</h3>
            <div class="c_btngroup">
              <c-button :only-icon="true">
                <i class="ico plus" />
              </c-button>
              <c-button :only-icon="true" :disabled="true">
                <i class="ico plus" />
              </c-button>
            </div>
          </div>
          <div class="group">
            <h3 class="h6 regular">Size, Medium</h3>
            <div class="c_btngroup">
              <c-button :size="'medium'" :only-icon="true">
                <i class="ico plus" />
              </c-button>
              <c-button :size="'medium'" :only-icon="true" :disabled="true">
                <i class="ico plus" />
              </c-button>
            </div>
          </div>
          <div class="group" aria-label="Size, Large">
            <h3 class="h6 regular">Size, Large</h3>
            <div class="c_btngroup">
              <c-button :size="'large'" :only-icon="true">
                <i class="ico plus" />
              </c-button>
              <c-button :size="'large'" :only-icon="true" :disabled="true">
                <i class="ico plus" />
              </c-button>
            </div>
          </div>
        </section>
        <section class="section">
          <h2 class="h6">Icon Secondary</h2>
          <div class="group">
            <h3 class="h6 regular">Size, Small</h3>
            <div class="c_btngroup">
              <c-button :outline="true" :only-icon="true">
                <i class="ico plus" />
              </c-button>
              <c-button :outline="true" :only-icon="true" :disabled="true">
                <i class="ico plus" />
              </c-button>
            </div>
          </div>
          <div class="group">
            <h3 class="h6 regular">Size, Medium</h3>
            <div class="c_btngroup">
              <c-button :size="'medium'" :outline="true" :only-icon="true">
                <i class="ico plus" />
              </c-button>
              <c-button
                :size="'medium'"
                :outline="true"
                :only-icon="true"
                :disabled="true"
              >
                <i class="ico plus" />
              </c-button>
            </div>
          </div>
          <div class="group" aria-label="Size, Large">
            <h3 class="h6 regular">Size, Large</h3>
            <div class="c_btngroup">
              <c-button :size="'large'" :outline="true" :only-icon="true">
                <i class="ico plus" />
              </c-button>
              <c-button
                :size="'large'"
                :outline="true"
                :only-icon="true"
                :disabled="true"
              >
                <i class="ico plus" />
              </c-button>
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
// const btnName = ref("Default");
const btnDis = ref("Disabled");
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
