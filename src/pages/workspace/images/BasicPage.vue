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
      <span class="txt">{{ item.name }}</span>
    </template>
    <!-- title -->
    <template #item-version="item">
      <span class="txt">{{ item.min_nvidia_driver_version }}</span>
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
    value: "name",
    width: 1160,
    sortable: true,
  },
  {
    text: "NVIDA 드라이버 최소버전",
    value: "min_nvidia_driver_version",
    width: 332,
  },
];
// const items = [
//   {
//     id: "tensorflow 2.9.0  (python3, cuda11.2, ubuntu20.04)",
//     version: "450.000.008",
//   },
//   {
//     id: "tensorflow 2.9.0  (python3, cuda11.2, ubuntu20.04)",
//     version: "450.000.008",
//   },
//   {
//     id: "tensorflow 2.9.0  (python3, cuda11.2, ubuntu20.04)",
//     version: "450.000.008",
//   },
// ];

const props = defineProps({
  imageList: Array,
});
console.log("imageList", props.imageList);

defineEmits(["showRow"]);
</script>

<style lang="scss" scoped="scoped">
@import "src/css/images.scss";
@import "src/css/table.scss";
</style>
