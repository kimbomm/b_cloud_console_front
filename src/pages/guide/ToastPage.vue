<template>
  <div class="p-content p-guide p-toast">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <h2 class="h6">기본 class="c_toast"</h2>
        <div class="group">
          <CToast :toastMsg="toastMsg1" />
        </div>
        <h2 class="h6">긍정 (기본에서 아이콘만 변경) :toastTypes="1" class="c_toast positive"</h2>
        <div class="group">
          <CToast :toastTypes="1" :toastMsg="toastMsg2" class="positive" />
        </div>
        <h2 class="h6">부정 (기본에서 아이콘만 변경) :toastTypes="2" class="c_toast negative"</h2>
        <div class="group">
          <CToast :toastTypes="2" :toastMsg="toastMsg3" class="negative" />
        </div>
        <h2 class="h6">기본 - 텍스트 두줄 class="c_toast"</h2>
        <div class="group">
          <CToast :toastMsg="toastMsg4" />
        </div>
        <h2 class="h6">기본 - 텍스트 두줄 - 버튼 :toastTypes="3" class="c_toast"</h2>
        <div class="group">
          <CToast :toastTypes="3" :toastMsg="toastMsg4" :linkName="linkName" />
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useMeta } from "quasar";
import CToast from "components/common/CToast.vue";

export default {
  name: "ToastPage",
  components: {
    CToast,
  },
  setup() {
    const title = ref("Toast");
    useMeta(() => ({
      title: title.value,
    }));

    function setAnotherTitle() {
      title.value = "Toast";
    }
    return {
      ptitle: ref(title),
      toastMsg1: ref("안내 메시지 입니다."),
      toastMsg2: ref("인스턴스 생성이 완료 되었습니다."),
      toastMsg3: ref("인스턴스 생성에 실패했습니다."),
      toastMsg4: ref("안내 메시지 입니다.안내 메시지 입니다.안내 메시지 입니다.안내 메시지 입니다."),
      link: ref("#"),
      linkName: ref("바로보기"),
      setAnotherTitle,
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
  .h6{
    &:not(:first-child){
      margin-top:50px;
    }
  }
}
.group{
  margin-top:20px;
}
.c_toast{
  &:not(:first-child){
    margin-top:10px;
  }
}
</style>
