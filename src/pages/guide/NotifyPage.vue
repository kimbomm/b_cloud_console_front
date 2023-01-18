<template>
  <div class="p-content p-guide p-notify">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <div class="c_btngroup">
          <q-btn @click="triggerInfo('top-right', true)">
            <span class="txt">기본</span>
          </q-btn>
          <q-btn @click="triggerSuccess('top-right', true)">
            <span class="txt">긍정 (기본에서 아이콘만 변경)</span>
          </q-btn>
          <q-btn @click="triggerWarning('top-right', true)">
            <span class="txt">부정 (기본에서 아이콘만 변경)</span>
          </q-btn>
          <q-btn @click="triggerButton('top-right', true)">
            <span class="txt">텍스트 두 줄 - 버튼</span>
          </q-btn>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useMeta, useQuasar } from "quasar";

export default {
  name: "NotifyPage",
  components: {
  },
  setup() {
    const title = ref("Notify");
    const $q = useQuasar();
    useMeta(() => ({
      title: title.value,
    }));
    return {
      ptitle: ref(title),
      triggerInfo(position, actions) {
        $q.notify({
          type: "info",
          message: "안내 메시지 입니다.",
          icon: "info",
          position,
          actions: (actions ? [{ label: "닫기", class: "xclose", handler: () => { /* console.log('wooow') */ } }] : null),
          timeout: 5000
        });
      },
      triggerSuccess(position, actions) {
        $q.notify({
          type: "positive",
          message: "인스턴스 생성이 완료 되었습니다.",
          icon: "positive",
          position,
          actions: (actions ? [{ label: "닫기", class: "xclose", handler: () => { /* console.log('wooow') */ } }] : null),
          timeout: 5000
        });
      },
      triggerWarning(position, actions) {
        $q.notify({
          type: "negative",
          message: "인스턴스 생성에 실패했습니다.",
          icon: "negative",
          position,
          actions: (actions ? [{ label: "닫기", class: "xclose", handler: () => { /* console.log('wooow') */ } }] : null),
          timeout: 5000
        });
      },
      triggerButton(position, actions) {
        $q.notify({
          type: "info",
          message: "안내 메시지 입니다.안내 메시지 입니다.안내 메시지 입니다.안내 메시지 입니다.",
          caption: "<a href='#' class='alink'><span>바로보기</span></a>",
          icon: "info",
          position,
          actions: (actions ? [{ label: "닫기", class: "xclose", handler: () => { /* console.log('wooow') */ } }] : null),
          timeout: 5000,
          html: true,
        });
      },
    };
  },
};
</script>
<script setup>
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
.c_btngroup{
  &:not(:first-child){
    margin-top:20px;
  }
  .q-btn{
    &:not(:last-child){
      margin-right:10px;
    }
  }
}
</style>
