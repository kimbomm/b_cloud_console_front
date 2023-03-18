<template>
  <div class="s_03 pb78">
    <p class="sub_title2">이미지<i class="ess">*</i></p>
    <div class="s_03_main">
      <div class="s_03_tab">
        <q-tabs v-model="tab" align="left" class="c_tabs">
          <q-tab name="baseIamge" label="기본 이미지"></q-tab>
          <q-tab name="myImage" label="내이미지"></q-tab>
          <q-tab name="sharedImage" label="공유받은 이미지"></q-tab>
        </q-tabs>
      </div>
      <div class="now_selected_area">
        <div class="select_box">
          <q-item class="select_title">
            <p class="select_title_inner">선택된 타입</p>
          </q-item>
          <q-item class="select_value">
            <p class="select_value_inner">{{ selectedName }}</p>
          </q-item>
        </div>
      </div>
      <div class="s_03_table">
        <div v-if="tab === 'baseIamge'">
          <easy-data-table
            :headers="baseImageHeader"
            :items="baseImages"
            :hide-footer="true"
            empty-message="생성된 이미지가 없습니다."
            @click-row="handleBaseTableRowClick"
            :id="baseTableId"
            :body-row-class-name="bodyRowClassNameFunctionCheck"
          >
            <!-- name -->
            <template #item-title="item">
              <a href="javascript:void(0);">
                <span class="txt">{{ item.name }}</span>
              </a>
            </template>
            <!-- 최소버전 -->
            <template #item-disk="item">
              <a href="#">
                <span class="txt">{{ item.min_nvidia_driver_version }}</span>
              </a>
            </template>
          </easy-data-table>
          <div class="disflex_C mt32">
            <c-pagination />
          </div>
        </div>

        <div v-if="tab === 'myImage'">
          <easy-data-table
            :headers="myImageHeader"
            :items="myImages"
            :hide-footer="true"
            empty-message="생성된 이미지가 없습니다."
            @click-row="handleMyTableRowClick"
            :id="myTableId"
            :body-row-class-name="bodyRowClassNameFunctionCheck"
          >
            <!-- name -->
            <template #item-title="item">
              <a href="javascript:void(0);">
                <span class="txt">{{ item.name }}</span>
              </a>
            </template>
            <template #item-description="item">
              <a href="javascript:void(0);">
                <span class="txt">{{ item.description }}</span>
                <q-tooltip anchor="bottom middle" class="c_tooltip">
                  <div class="inner">
                    {{ item.description }}
                  </div>
                </q-tooltip>
              </a>
            </template>
            <template #item-status="item">
              <CBadgeState :item="item" />
            </template>
          </easy-data-table>
          <div class="disflex_C mt32">
            <c-pagination />
          </div>
        </div>

        <div v-if="tab === 'sharedImage'">
          <easy-data-table
            :headers="sharedImageHeader"
            :items="sharedImages"
            :hide-footer="true"
            empty-message="공유받은 이미지가 없습니다."
            @click-row="handleSharedTableRowClick"
            :id="sharedTableId"
            :body-row-class-name="bodyRowClassNameFunctionCheck"
          >
            <template #item-id="item">
              <span class="txt">{{ item.name }}</span>
            </template>
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
          </easy-data-table>
          <div class="disflex_C mt32">
            <c-pagination />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { imageService } from "src/services";
import { $utils } from "src/utils/utils";
import { useCommonStore } from "src/stores/useCommonStore";

import CPagination from "components/common/CPagination.vue";
import CBadgeState from "src/components/common/CBadgeState.vue";

const emit = defineEmits(["imageSelected"]);
const props = defineProps({
  workspaceId: {
    type: [Number, String],
  },
  userId: {
    type: Number,
  },
});

const tab = ref("baseIamge");
const baseTableId = "baseImageTable";
const myTableId = "myImageTable";
const sharedTableId = "sharedImageTable";

const imageSelected = ref({});

const baseImages = ref([]);
const myImages = ref([]);
const sharedImages = ref([]);

const commonStore = useCommonStore();

const selectedName = computed(() => {
  const name = imageSelected.value?.name || "";
  if (!name) {
    return "이미지를 선택해주세요.";
  }
  if (imageSelected.value.type === "base") {
    return `${name}`;
  }
  if (imageSelected.value.type === "custom") {
    return `${imageSelected.value.name} (${imageSelected.value.description} / ${commonStore.commonStatus(imageSelected.value.status).text} / ${imageSelected.value.created_at})`;
  }
  if (imageSelected.value.type === "shared") {
    return `${name} ( 내 이미지)`;
  }
  return `${name}`;
});

const baseImageHeader = [
  {
    text: "이름",
    value: "name",
    width: 580,
    widthAuto: true,
    sortable: false,
  },
  {
    text: "NVIDA 드라이버 최소버전",
    value: "base_image.min_nvidia_driver_version",
    width: 382,
    sortable: false,
  },
];

const myImageHeader = [
  {
    text: "이름",
    value: "name",
    width: 190,
    sortable: true,
  },
  {
    text: "설명",
    value: "description",
    width: 274,
  },
  {
    text: "상태",
    value: "status",
    width: 110,
  },
  {
    text: "기본 이미지",
    value: "base_image.name",
    width: 350,
    sortable: true,
  },
  {
    text: "생성일시",
    value: "created_at",
    width: 200,
    sortable: true,
  },
];

const sharedImageHeader = [
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
    text: "공유자",
    value: "sharedUserWithEmail",
    width: 250,
    sortable: true,
  },
];

const bodyRowClassNameFunctionCheck = (item) => {
  const classList = [];
  /*
   * disabled 처리
   * 예시) 리소스 할당량 초과
   * */
  if (item.id === 132) {
    classList.push("row-isdim");
  }
  return classList.join(" ");
};

/* row 클릭 시 해당 행 checked */
const showRowChecked = (item, tableId) => {
  imageSelected.value = item;
  const nNum = baseImages.value.findIndex((n) => n.id === item.id);
  baseImages.value.splice(0, 0, ...baseImages.value.splice(nNum, 1));

  const selected = document.querySelectorAll(`#${tableId} table tr`);
  selected.forEach((tr, index) => tr.classList.toggle("row-isCheck", index === 1));
  emit("imageSelected", imageSelected.value);
};

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

const handleBaseTableRowClick = (item) => {
  showRowChecked(item, baseTableId);
};

const handleMyTableRowClick = (item) => {
  showRowChecked(item, myTableId);
};
const handleSharedTableRowClick = (item) => {
  showRowChecked(item, sharedTableId);
};

const getBaseImage = async () => {
  try {
    const { images } = await imageService.getBaseImages();
    baseImages.value = images;
  } catch (error) {
    console.log(error);
  }
};

const getMyImage = async () => {
  try {
    const { images } = await imageService.getMyImages(props.workspaceId, props.userId);
    const updatedImages = $utils.sortType(
      transformDate({
        images,
        created_at: "created_at",
        dateType: "YYYY-MM-DD",
      }),
      "created_at",
      true,
      "datetime"
    );

    myImages.value = updatedImages;
    console.log("myImages.value", myImages.value);
  } catch (error) {
    console.log(error);
  }
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

const getSharedImage = async () => {
  try {
    const response = await imageService.getSharedImages(props.workspaceId, props.userId);
    const images = response.shared_images;
    const updatedImages = transformDate({
      images,
      created_at: "shared_at",
      dateType: "YYYY-MM-DD HH:mm:ss",
    });

    sharedImages.value = setImagesWithSharedUser(updatedImages);
  } catch (error) {
    console.log(error.response);
    return false;
  }
};

onMounted(async () => {
  await getBaseImage();
  await getMyImage();
  await getSharedImage();
});
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
