<template>
  <EasyDataTable
    :headers="headers"
    :items="imageList"
    :hide-footer="true"
    empty-message="생성한 내 이미지가 없습니다."
    @click-row="showRow"
  >
    <!-- id -->
    <template #item-id="item">
      <span class="txt">{{ item.name }}</span>
    </template>

    <!-- title -->
    <template #item-title="item">
      <a href="#">
        <span class="txt">111{{ item.description }}</span>
        <q-tooltip anchor="bottom middle" class="c_tooltip">
          <div class="inner">1222 {{ item.description }}</div>
        </q-tooltip>
      </a>
    </template>
    <!--
                상태값(status)
                1. save, 저장(개인)
                2. save_s, 저장(공유)
                3. error, 오류
                4. saving, 저장중
              -->
    <template #item-status="item">
    <CBadgeState :item="item" />
    </template>
    <!-- image -->
    <template #item-image="item">
      <a href="#">
        <span class="txt">{{ item.base_image_name }}</span>
      </a>
    </template>
    <!-- createdAt -->
    <template #item-createdAt="item">
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
                <q-btn
                  class="item"
                  @click="onActions(button.event, item)"
                >
                  <span class="txt">{{ button.name }}</span>
                </q-btn>
              </q-item>
            </q-list>
          </q-popup-edit>
        </q-btn>
      </div>
    </template>
  </EasyDataTable>

  <Popup  v-model="imageShareMngModal"

  @onShare="onShare"
                @onDelete="onDelete"
  />

</template>

<script setup>
import { ref } from "vue";

import CBadgeState from "src/components/common/CBadgeState.vue";
import Popup from "./UserSharedDetailPopup.vue";

defineProps({
  imageList: Array,
  actionButtons: Array,
});

// const emit = defineEmits();

const headers = [
  {
    text: "이름",
    value: "name",
    width: 120,
    sortable: true,
  },
  {
    text: "설명",
    value: "description",
    width: 350,
  },
  {
    text: "상태",
    value: "status",
    width: 110,
  },
  {
    text: "기본 이미지",
    value: "base_image_name",
    width: 350,
    sortable: true,
  },
  {
    text: "생성일시",
    value: "created_at",
    width: 120,
    sortable: true,
  },
  { text: "", value: "buttons", width: 80 },
];

const actionButtons = ref([]);
const imageShareMngModal = ref(false);

const fetchShareButtons = { name: "공유관리", event: "share" };
const fetchDeleteButtons = { name: "삭제", event: "delete" };

const onShare = (item) => {
  imageShareMngModal.value = true;
  console.log("onShare", item);
};

const onDelete = (item) => {
  console.log("onShare", item);
};

const onActions = (eventName, rowData) => {
  if (eventName === "share") {
    onShare(rowData);
  } else if (eventName === "delete") {
    onDelete(rowData);
  }
};

const showRow = (item) => {
  if (item.status === "error" || item.status === "saving") {
    actionButtons.value = [fetchDeleteButtons];
  } else {
    actionButtons.value = [fetchShareButtons].concat(fetchDeleteButtons);
  }
};
</script>

<style scoped>
.vue3-easy-data-table[data-v-5814f6fe]{border: none;}
</style>
