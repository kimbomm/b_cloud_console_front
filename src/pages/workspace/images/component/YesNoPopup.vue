<template>
  <q-dialog class="c_dialog">
    <q-card>
      <q-card-section style="max-height: 290px" class="c_dialog_body">
        <p class="title">
          <strong>{{ title }}</strong>
        </p>
        <slot  v-if="state === 'delete'">
          <div class="info">
            <strong>{{ info }}</strong>
          </div>
        </slot>
        <slot  v-else>
          <p class="desc">{{ info }}</p>
          <div class="info negative">{{ errorMsg }}</div>
        </slot>
      </q-card-section>

      <template v-if="state === 'delete'">
        <q-card-actions class="c_dialog_foot ">
          <q-btn label="취소" class="line" v-close-popup @click="()=>$emit('handleDeleteClick',false)"/>

          <q-btn label="삭제" class="primary" v-close-popup  @click="()=>$emit('handleDeleteClick',true)" />
        </q-card-actions>
      </template>

      <template v-if="state === 'faild'">
        <q-card-actions class="c_dialog_foot">
          <q-btn label="확인" class="primary" v-close-popup />
        </q-card-actions>
      </template>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineProps({
  title: String,
  info: String,
  errorMsg: String,
  state: {
    type: String,
    validator: (value) => ["delete", "faild"].includes(value),
  },
});

defineEmits(["handleDeleteClick"]);
</script>

<style lang="scss" scoped></style>
