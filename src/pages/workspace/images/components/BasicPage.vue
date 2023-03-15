<template>
  <EasyDataTable
    :headers="headers"
    :items="imageList"
    :hide-footer="true"
    empty-message="정보가 없습니다."
    @click-row="$emit('showRow', $event)"
  >
    <!-- id -->
    <template #item-id="item">
      <span class="txt">{{ item }}</span>
    </template>
    <!-- title -->
    <template #item-version="item">
      <span class="txt">{{ item }}</span>
    </template>
  </EasyDataTable>
</template>
<script setup="setup">
import { ref } from "vue";
import { useMeta } from "quasar";

const title = ref("image");
useMeta(() => ({ title: title.value }));

const headers = [
  {
    text: "이름",
    value: "base_image.name",
    width: 800,
    sortable: true,
  },
  {
    text: "NVIDA 드라이버 최소버전",
    value: "base_image.min_nvidia_driver_version",
    width: 332,
  },
];

const props = defineProps({
  imageList: Array,
});
console.log("imageListimageListimageListimageList", props.imageList);

defineEmits(["showRow"]);
</script>

<style lang="scss" scoped="scoped">
@import "src/css/images.scss";
@import "src/css/table.scss";
@import "src/css/page.scss";
</style>
