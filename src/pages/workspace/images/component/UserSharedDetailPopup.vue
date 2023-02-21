<template>
  <q-dialog  class="c_dialog medium">
    <q-card>
      <q-card-section class="c_dialog_body">
        <p class="title">
          <strong>내 이미지 공유 관리</strong>
        </p>
        <q-item-section class="item_card medium bg">
          <q-item-label class="name">{{ itemImageName }}</q-item-label>
          <q-item-label class="desc">{{ itemImageDesc }}</q-item-label>
        </q-item-section>
        <section class="section">
          <p class="sub_title">공유 여부</p>
          <q-list class="p_list share">
            <q-item class="item chkall">
              <i class="ico folder" />
              <q-item-section class="item_card">
                <q-item-label class="name">{{ itemName }}</q-item-label>
                <q-item-label class="desc">{{ itemDesc }}</q-item-label>
              </q-item-section>
              <q-checkbox v-model="chkAll" class="c_checkbox check_all" />
            </q-item>
            <q-item class="item subitem">
              <i class="ico note" />
              <q-item-section class="item_card">
                <q-item-label class="name">{{ itemName1 }}</q-item-label>
                <q-item-label class="desc">{{ itemDesc1 }}</q-item-label>
              </q-item-section>
              <q-checkbox v-model="chk1" disable class="c_checkbox" />
            </q-item>
            <q-item class="item subitem">
              <i class="ico note" />
              <q-item-section class="item_card">
                <q-item-label class="name">{{ itemName2 }}</q-item-label>
                <q-item-label class="desc">{{ itemDesc1 }}</q-item-label>
              </q-item-section>
              <q-checkbox v-model="chk2" disable class="c_checkbox" />
            </q-item>
            <q-item class="item subitem">
              <i class="ico note" />
              <q-item-section class="item_card">
                <q-item-label class="name">{{ itemName3 }}</q-item-label>
                <q-item-label class="desc">{{ itemDesc1 }}</q-item-label>
              </q-item-section>
              <q-checkbox v-model="chk3" disable class="c_checkbox" />
            </q-item>
          </q-list>
        </section>
      </q-card-section>
      <q-card-actions class="c_dialog_foot">
        <q-btn label="취소" class="line" v-close-popup />
        <q-btn label="저장" class="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";

/* 팝업 */
const itemImageName = ref("내이미지 01");
const itemImageDesc = ref("내 이미지 테스트 01 (tensorflow 2.9.0, Karlo 테스트용)");
const itemName = ref("카카오모빌리티 워크스페이스");
const itemName1 = ref("aaTEST");
const itemName2 = ref("MLTEST");
const itemName3 = ref("aa팀 프로젝트");
const itemDesc = ref("워크스페이스");
const itemDesc1 = ref("소속 프로젝트");

const props = defineProps({
});

console.log("props", props);
</script>

<style lang="scss" scoped></style>
