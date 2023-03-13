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
          <span class="txt">{{ item }}</span>
        </template>

        <!-- sharedBy -->
        <template #item-sharedBy="item">
          <span class="txt">{{ item.sharedUserWithEmail }}</span>
        </template>
        <!-- sharedAt -->
        <template #item-sharedAt="item">
          <span class="txt clip">{{ item.shared_at }}</span>
        </template>
      </EasyDataTable>
    </section>
    <CPagination />
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
import { useRoute } from "vue-router";
import { $utils } from "src/utils/utils";
import { useCommonStore } from "src/stores/useCommonStore";
import CDropdown from "components/common/CDropdown.vue";
import CPagination from "src/components/common/CPagination.vue";

const route = useRoute();
const { workspaceId } = route.params;
const commonStore = useCommonStore();
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
    value: "name",
    width: 140,
    sortable: true,
  },
  {
    text: "설명",
    value: "description",
    width: 340,
  },
  {
    text: "이미지",
    value: "base_image.name",
    width: 350,
    sortable: true,
  },
  {
    text: "공유자",
    value: "sharedUserWithEmail",
    width: 250,
    sortable: true,
  },
  {
    text: "공유일시",
    value: "shared_at",
    width: 150,
    sortable: true,
  },
];

/**
 * 설명 : object 안에 데이터 속성 명을 입력하면
 * YYYY-MM-DD로 변경 후 새로운 object 생성
 * @param { Object } value
 * @param { Object } created_at
 */
const transformDate = (value) => {
  const { images } = value;
  const updateImage = images.map((item) => ({
    ...item,
    [value.created_at]: $utils.paseseDate(item[value.created_at], value.dateType),
  }));

  return updateImage;
};

// 공유자 정보 이름(이메일) 형식으로 변경
const setImagesWithSharedUser = (updatedImages) => {
  const extractSharedUser = (item) => {
    const { email, name } = item.shared_user;
    return { sharedUserWithEmail: `${name}(${email})` };
  };
  const updateSahredUser = updatedImages.map((item) => ({
    ...item,
    ...extractSharedUser(item),
  }));

  return updateSahredUser;
};

// 공유받은 이미지 가져오기
// 임시 추가
const getSharedImge = async () => {
  try {
    const response = await imageService.getSharedImages(workspaceId, commonStore.me.id);
    const images = response.shared_images;
    const updatedImages = transformDate({
      images,
      created_at: "shared_at",
      dateType: "YYYY-MM-DD HH:mm:ss",
    });

    imageList.value = setImagesWithSharedUser(updatedImages);
  } catch (e) {
    console.log(e.response);
    return false;
  }
};
getSharedImge();
</script>

<style lang="scss" scoped="scoped">
@import "src/css/images.scss";
@import "src/css/table.scss";
</style>
