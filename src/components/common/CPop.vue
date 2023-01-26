<template>
  <q-dialog class="c_dialog alert">
    <q-card>
      <q-scroll-area>
        <q-card-section class="c_dialog_head">
          <div class="h5">타이틀</div>
        </q-card-section>

        <q-card-section class="c_dialog_body">
          <p class="title">
            <strong>텍스트가 두줄일 경우텍스트가 두줄일 경우텍스트가 두줄일 경우</strong>
          </p>
          <p class="desc">
            설명 텍스트가 두줄일 경우설명 텍스트가 두줄일 경우설명 텍스트가 두줄일 경우
          </p>
          <p class="info negative">
            aa프로젝트 1
          </p>
          <p class="info">
            aa프로젝트 1
          </p>
        </q-card-section>
      </q-scroll-area>

      <q-card-actions class="c_dialog_foot">
        <q-btn label="취소" class="line" v-close-popup />
        <q-btn label="확인" class="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>

</script>
