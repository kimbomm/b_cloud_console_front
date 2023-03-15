<template>
  <easy-data-table
    :headers="headers"
    :items="imageList"
    :hide-footer="true"
    empty-message="생성한 내 이미지가 없습니다."
    @click-row="showRow"
  >
    <!-- name -->
    <template #item-name="item">
      <span class="txt">{{ item.name }}</span>
    </template>

    <!-- description -->
    <template #item-description="item">
      <a href="#">
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
    <!-- base-image -->
    <template #item-base_image_name="item">
      <a href="#">
        {{ item }}
        <span class="txt">{{ item.base_image_name }}</span>
      </a>
    </template>
    <!-- createdAt -->
    <template #item-created_at="item">
      <span class="txt">{{ item.created_at }}</span>
    </template>
    <!-- 버튼 그룹 -->
    <template #item-buttons="item">
      <div v-if="actionButtons" class="cell btngroup">
        <q-btn class="c_btn ibtn dot">
          <i class="ico dots" /><span class="txt">클릭</span>
          <q-popup-edit v-model="item.id" class="dots_menu" anchor="top right">
            <q-list style="min-width: 100px">
              <q-item v-for="button in actionButtons" :key="button.name">
                <q-btn class="item" @click="onActions(button.event, item)">
                  <span class="txt">{{ button.name }}</span>
                </q-btn>
              </q-item>
            </q-list>
          </q-popup-edit>
        </q-btn>
      </div>
    </template>
  </easy-data-table>
</template>

<script setup>
import { ref } from "vue";

import CBadgeState from "src/components/common/CBadgeState.vue";

defineProps({
  imageList: Array,
  actionButtons: Array,
  getRowSelectedImage: Object,
});

const emit = defineEmits(["onShare", "onDelete", "update:getRowSelectedImage"]);

const headers = [
  {
    text: "이름",
    value: "name",
    width: 150,
    sortable: true,
  },
  {
    text: "설명",
    value: "description",
    width: 230,
    widthAuto: true,
  },
  {
    text: "상태",
    value: "status",
  },
  {
    text: "기본 이미지",
    value: "base_image.name",
    sortable: true,
  },
  {
    text: "생성일시",
    value: "created_at",
    width: 190,
    widthAuto: true,
    sortable: true,
  },
  { text: "", value: "buttons", width: 80 },
];

const actionButtons = ref([]);

const fetchShareButtons = { name: "공유관리", event: "share" };
const fetchDeleteButtons = { name: "삭제", event: "delete" };

const onActions = (eventName, rowData) => {
  if (eventName === "share") {
    emit("onShare", rowData);
  } else if (eventName === "delete") {
    emit("onDelete", rowData);
  }
};

// 상태값에 따른 버튼 공유관리/삭제 버튼노출
const showRow = (item) => {
  if (item.status === "error" || item.status === "saving") {
    actionButtons.value = [fetchDeleteButtons];
  } else {
    actionButtons.value = [fetchShareButtons].concat(fetchDeleteButtons);
  }
  emit("update:getRowSelectedImage", item);
};
</script>

<style scoped>
.vue3-easy-data-table[data-v-5814f6fe] {
  border: none;
}
@import "src/css/table.scss";
@import "src/css/images.scss";
@import "src/css/page.scss";
</style>
