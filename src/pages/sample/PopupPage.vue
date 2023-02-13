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
          <q-btn label="Small 유형7-부정" color="primary" @click="alert7 = true" />
          <q-btn label="Small 유형8-콘텐츠" color="primary" @click="alert8 = true" />
        </div>
        <div class="c_btngroup">
          <q-btn label="Medium 유형1 - w:608" color="primary" @click="alertMedium1 = true" />
          <q-btn label="Medium 유형2 - w:608" color="primary" @click="alertMedium2 = true" />
        </div>
        <div class="c_btngroup">
          <q-btn label="Large 유형1 - w:766" color="primary" @click="alertLarge1 = true" />
          <q-btn label="Large 유형2 - w:766" color="primary" @click="alertLarge2 = true" />
        </div>
      </section>
      <q-dialog v-model="alert7" class="c_dialog">
        <q-card>
          <q-card-section style="max-height:290px" class="c_dialog_body">
            <p class="title">
              <strong>부정적인 정보 팝업</strong>
            </p>
            <p class="desc">
              사용자가 해당 프로젝트에서 작업중인 인스턴스/태스크가 없어야만 삭제 가능합니다.
            </p>
            <div class="info negative">
              aa프로젝트 1
            </div>
            <!-- <div class="info">
              aa프로젝트 1
            </div> -->
          </q-card-section>
          <q-card-actions class="c_dialog_foot">
            <q-btn label="취소" class="line" v-close-popup />
            <q-btn label="확인" class="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="alert8" class="c_dialog">
        <q-card>
          <q-card-section style="max-height:290px" class="c_dialog_body">
            <p class="title">
              <strong>컨턴츠가 들어간 팝업</strong>
            </p>
            <p class="desc">
              사용자가 해당 프로젝트에서 작업중인 인스턴스/태스크가 없어야만 삭제 가능합니다.
            </p>
            <!-- <div class="info negative">
              aa프로젝트 1
            </div> -->
            <div class="info">
              aa프로젝트 1
            </div>
          </q-card-section>
          <q-card-actions class="c_dialog_foot">
            <q-btn label="취소" class="line" v-close-popup />
            <q-btn label="확인" class="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Medium -->
      <q-dialog v-model="alertMedium1" class="c_dialog medium">
        <q-card>
          <q-card-section style="max-height:290px" class="c_dialog_body">
            <p class="title">
              <strong>타이틀</strong>
            </p>
            <section class="section">
              <p class="sub_title">
                서브타이틀
              </p>
              <p class="desc">
                텍스트
              </p>
              <div class="info">
                컨텐츠
              </div>
            </section>
          </q-card-section>
          <q-card-actions class="c_dialog_foot">
            <q-btn label="취소" class="line" v-close-popup />
            <q-btn label="확인" class="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="alertMedium2" class="c_dialog medium">
        <q-card>
          <q-card-section style="max-height:290px" class="c_dialog_body">
            <p class="title">
              <strong>Medium사이즈에 스크롤</strong>
            </p>
            <section class="section">
              <p class="sub_title">
                서브타이틀
              </p>
              <p class="desc">
                텍스트
              </p>
              <div class="info">
                컨텐츠<br />
                컨텐츠<br />
                컨텐츠<br />
                컨텐츠<br />
                컨텐츠<br />
                컨텐츠<br />
                컨텐츠
              </div>
            </section>
          </q-card-section>
          <q-card-actions class="c_dialog_foot bdr">
            <q-btn label="취소" class="line" v-close-popup />
            <q-btn label="확인" class="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Large -->
      <q-dialog v-model="alertLarge1" class="c_dialog large">
        <q-card>
          <q-card-section style="max-height:290px" class="c_dialog_body">
            <p class="title">
              <strong>타이틀</strong>
            </p>
            <section class="section">
              <p class="sub_title">
                서브타이틀
              </p>
              <p class="desc">
                텍스트
              </p>
              <div class="info">
                컨텐츠
              </div>
            </section>
          </q-card-section>
          <q-card-actions class="c_dialog_foot">
            <q-btn label="취소" class="line" v-close-popup />
            <q-btn label="확인" class="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="alertLarge2" class="c_dialog large">
        <q-card>
          <q-card-section style="max-height:290px" class="c_dialog_body">
            <p class="title">
              <strong>Large사이즈에 스크롤</strong>
            </p>
            <section class="section">
              <p class="sub_title">
                서브타이틀
              </p>
              <p class="desc">
                텍스트
              </p>
              <div class="info">
                컨텐츠<br />
                컨텐츠<br />
                컨텐츠<br />
                컨텐츠<br />
                컨텐츠<br />
                컨텐츠<br />
                컨텐츠
              </div>
            </section>
          </q-card-section>
          <q-card-actions class="c_dialog_foot bdr">
            <q-btn label="취소" class="line" v-close-popup />
            <q-btn label="확인" class="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import { $useCmFn } from "src/composables/useCommonFunction.js";

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
const alert7 = ref(false);
const alert8 = ref(false);
const alertMedium1 = ref(false);
const alertMedium2 = ref(false);
const alertLarge1 = ref(false);
const alertLarge2 = ref(false);
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
