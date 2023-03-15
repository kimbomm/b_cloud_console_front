<template>
  <template v-if="imageList.length > 0">
    <div class="table_set">
      <div class="c_inpgroup">
        <q-input
          outlined
          v-model="filters"
          placeholder="이름, 설명, 기본이미지 검색"
          clearable
          class="wsize_full"
        >
          <template v-slot:prepend>
            <q-icon name="search" class="ico_search" />
          </template>
        </q-input>
      </div>
      <div class="select_drop">
        <CDropdown :label="optLabel" :options="optNumber" class="auto_size" />
      </div>
    </div>
    <section class="section">
      <easy-data-table
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
      </easy-data-table>
    </section>
    <c-pagination />
  </template>
  <template v-else>
    <div class="com_nondata_area">
      <div class="nondata_box">
        <p class="nondata_txt">생성한 내 이미지가 없습니다.</p>
      </div>
    </div>
  </template>
</template>
<script setup="setup">
import { ref } from "vue";
import { imageService } from "src/services";
import CDropdown from "components/common/CDropdown.vue";
import CPagination from "src/components/common/CPagination.vue";

const filters = ref("");
const optLabel = ref("10");
// n개씩 보기
const optNumber = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);
const imageList = ref([]);
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

// 기본 이미지 가져오기
const getBaseImge = async () => {
  try {
    const { images } = await imageService.getBaseImages();
    imageList.value = images;
  } catch (e) {
    console.log(e.response);
    return false;
  }
};
getBaseImge();
</script>

<style lang="scss" scoped="scoped">
@import "src/css/images.scss";
@import "src/css/table.scss";
@import "src/css/page.scss";
</style>
