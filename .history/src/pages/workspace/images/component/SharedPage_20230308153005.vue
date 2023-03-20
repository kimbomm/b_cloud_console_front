<template>
  <EasyDataTable
    :headers="headers"
    :items="imageList"
    :hide-footer="true"
    empty-message="정보가 없습니다."
  >
    <!-- id -->
    <template #item-id="item">
      <span class="txt">{{ item.name }}</span>
    </template>
    <!-- title -->
    <template #item-title="item">
      <a href="#">
        <span class="txt">{{ item.description }}</span>
        <q-tooltip anchor="bottom middle" class="c_tooltip">
          <div class="inner">{{ item.description }}</div>
        </q-tooltip>
      </a>
    </template>
    <!-- image -->
    <template #item-image="item">
      <span class="txt">{{ item.base_image_name }}</span>
    </template>

    <!-- sharedBy -->
    <template #item-sharedUserWithEmail="item">
      <span class="txt">{{ item.sharedUserWithEmail }}</span>
    </template>
    <!-- sharedAt -->
    <template #item-sharedAt="item">
      <span class="txt clip">{{ item.shared_at }}</span>
    </template>
  </EasyDataTable>
</template>
<script setup="setup">
import { ref } from "vue";
import { useMeta } from "quasar";

const title = ref("Image");
useMeta(() => ({ title: title.value }));

const headers = [
  {
    text: "이름",
    value: "name",
    width: 180,
    sortable: true,
  },
  {
    text: "설명",
    value: "description",
    width: 350,
  },
  {
    text: "이미지",
    value: "base_image_name",
    width: 350,
    sortable: true,
  },
  {
    text: "공유자",
    value: "sharedUserWithEmail",
    width: 280,
    sortable: true,
  },
  {
    text: "공유일시",
    value: "shared_at",
    width: 150,
    sortable: true,
  },
];

defineProps({
  imageList: Array,
});
</script>

<style lang="scss" scoped="scoped">
@import "src/css/images.scss";
@import "src/css/table.scss";
</style>
