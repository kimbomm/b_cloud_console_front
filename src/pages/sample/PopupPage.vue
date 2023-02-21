<template>
  <div class="p-content p-guide p-popup">
    <div class="p-head">
      <h1 class="p-title">{{ ptitle }}</h1>
    </div>
    <!-- //.chead -->
    <div class="p-body">
      <section class="section">
        <div class="c_btngroup">
          <q-btn label="Alert 유형1" color="primary" @click="onlyTitleAlert()" />
          <q-btn label="Alert 유형2" color="primary" @click="titleDespAlert()" />
          <q-btn label="Confirm 유형1" color="primary" @click="onlyTitleConfirm()" />
          <q-btn label="Confirm 유형2" color="primary" @click="titleDespConfirm()" />
        </div>
        <div class="c_btngroup">
          <q-btn label="기본 컨텐츠 팝업 유형" color="primary" @click="defaultCntVisible = true" />
          <q-btn label="부정적 컨텐츠 팝업 유형" color="primary" @click="negativeCntVisible = true" />
        </div>
        <div class="c_btngroup">
          <q-btn label="Medium Size 팝업 - w:608" color="primary" @click="mediumSizeVisible = true" />
          <q-btn label="Large Size 팝업 - w:766" color="primary" @click="largeSizeVisible = true" />
        </div>
      </section>
    </div>

    <!-- 기본 컨텐츠 팝업 -->
    <c-dialog
      v-model:visible="defaultCntVisible"
      :message="'기본 컨텐츠 팝업'"
      :description="'사용자가 해당 프로젝트에서 작업중인 인스턴스/태스크가 없어야만 삭제 가능합니다.'"
      :button-positive="'확인'"
      :button-negative="'취소'"
    >
      <template #positive>
        default contents dialog
      </template>
    </c-dialog>
    <!-- 기본 컨텐츠 팝업 끝 -->

    <!-- 부정적 컨텐츠 팝업 -->
    <c-dialog
      v-model:visible="negativeCntVisible"
      :message="'부정적인 컨텐츠 팝업'"
      :description="'사용자가 해당 프로젝트에서 작업중인 인스턴스/태스크가 없어야만 삭제 가능합니다.'"
      :button-positive="'확인'"
      :button-negative="'취소'"
      :callback-positive="onPositive"
      :callback-negative="onNegative"
    >
      <template #negative>
        negative contents dialog
      </template>
    </c-dialog>
    <!-- 부정적 컨텐츠 팝업 끝-->

    <!--
      medium size 컨텐츠 팝업
      size props 추가
    -->
    <c-dialog
      v-model:visible="mediumSizeVisible"
      :size="'medium'"
      :message="'기본 컨텐츠 팝업'"
      :description="'사용자가 해당 프로젝트에서 작업중인 인스턴스/태스크가 없어야만 삭제 가능합니다.'"
      :button-positive="'확인'"
    >
      <template #positive>
        default contents dialog
      </template>
    </c-dialog>
    <!-- medium size 컨텐츠 팝업 끝 -->

    <!--
      large size 컨텐츠 팝업
      size props 추가
    -->
    <c-dialog
      v-model:visible="largeSizeVisible"
      :size="'large'"
      :message="'기본 컨텐츠 팝업'"
      :description="'사용자가 해당 프로젝트에서 작업중인 인스턴스/태스크가 없어야만 삭제 가능합니다.'"
      :button-positive="'확인'"
      :button-negative="'취소'"
    >
      <template #negative>
        negative contents dialog
      </template>
    </c-dialog>
    <!-- large size 컨텐츠 팝업 끝 -->
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import { $useCmFn } from "src/composables/useCommonFunction.js";
import CDialog from "src/components/common/CDialog.vue";

const title = ref("Popup");
useMeta(() => ({
  title: title.value,
}));

const ptitle = ref(title);
const onlyTitleAlert = () => {
  $useCmFn.onMessage({
    message: "타이틀 O, 설명문구 X, only 확인버튼",
    positive: {
      value: "확인",
      callback: () => {
        console.log("확인버튼");
      }
    },
  });
};

const onlyTitleConfirm = () => {
  $useCmFn.onMessage({
    message: "타이틀 O, 설명문구 X, 확인 및 취소버튼",
    positive: {
      callback: () => {
        console.log("확인버튼");
      }
    },
    negative: {
      value: "취소",
      callback: () => {
        console.log("취소버튼");
      }
    }
  });
};

const titleDespAlert = () => {
  $useCmFn.onMessage({
    message: "타이틀 O, 설명문구 O, 확인버튼",
    description: "설명문구 O",
    positive: {
      callback: () => {
        console.log("확인버튼");
      }
    },
  });
};
const titleDespConfirm = () => {
  $useCmFn.onMessage({
    message: "타이틀 O, 설명문구 O, 확인 및 취소버튼",
    description: "설명문구 O",
    positive: {
      value: "확인",
      callback: () => {
        console.log("확인버튼");
      }
    },
    negative: {
      value: "취소",
      callback: () => {
        console.log("취소버튼");
      }
    }
  });
};

const defaultCntVisible = ref(false);
const negativeCntVisible = ref(false);
const mediumSizeVisible = ref(false);
const largeSizeVisible = ref(false);

const onNegative = () => {
  console.log("취소버튼");
  negativeCntVisible.value = false;
};
const onPositive = () => {
  console.log("확인버튼");
  negativeCntVisible.value = false;
};
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
