<template>
  <div class="p-content p-guide p-popover">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">class="c_popover"</h2>
        <div class="group">
          <q-btn class="ibtn help">
            <i class="ico help" /><span class="hidden">도움말</span>
            <q-popup-edit
              v-model="helpShow"
              anchor="top middle" self="top middle"
              class="c_popover"
            >
              <div class="inner">
                게스트는 워크스페이스 멤버 조회 및 프로젝트 생성 기능이 제한됩니다.
              </div>
            </q-popup-edit>
          </q-btn>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
// import CPopover from "components/common/CPopover.vue";

const title = ref("Popover");
useMeta(() => ({
  title: title.value,
}));
const ptitle = ref(title);
const helpShow = ref(false);
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
