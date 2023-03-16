<template>
  <div class="s_03 pb78">
    <p class="sub_title2">인스턴스 타입<i class="ess">*</i></p>
    <div class="s_03_main">
      <div class="s_03_tab">
        <q-tabs v-model="tab" align="left" class="c_tabs">
          <q-tab name="tabs1" label="CPU"></q-tab>
          <q-tab name="tabs2" label="GPU Tesla V100"></q-tab>
          <q-tab name="tabs3" label="GPU Tesla A100_40G"></q-tab>
        </q-tabs>
      </div>
      <div class="now_selected_area">
        <div class="select_box">
          <q-item class="select_title">
            <p class="select_title_inner">선택된 타입</p>
          </q-item>
          <q-item class="select_value">
            <p class="select_value_inner">cg.nano (CPU 2 / MEM 122GB / DISK 80GiB)</p>
          </q-item>
        </div>
      </div>
      <div class="s_03_table">
        <easy-data-table
          v-model:items-selected="itemsSelected"
          :headers="instanceHeaders"
          :items="instanceItems"
          :hide-footer="true"
          :body-row-class-name="bodyRowClassNameFunction"
          empty-message="정보가 없습니다."
        >
          <!-- title -->
          <template #item-title="item">
            <a href="#">
              <span class="txt">{{ item.title }}</span>
            </a>
          </template>
          <!-- cpu -->
          <template #item-cpu="item">
            <a href="#">
              <span class="txt">{{ item.cpu }}</span>
            </a>
          </template>
          <!-- memory -->
          <template #item-memory="item">
            <a href="#">
              <span class="txt">{{ item.memory }}</span>
            </a>
          </template>
          <!-- disk -->
          <template #item-disk="item">
            <a href="#">
              <span class="txt">{{ item.disk }}</span>
            </a>
          </template>
          <!-- 버튼 그룹 -->
          <template #item-buttons="item">
            <q-btn v-if="item.checkbox" class="text">
              <span class="txt">선택 취소하기</span>
            </q-btn>
          </template>
        </easy-data-table>
      </div>
      <div class="disflex_C mt32">
        <c-pagination />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const itemsSelected = ref([]);

const tab = ref("tabs1");

/**
 * 버튼 및 checkbox 에 대한 이벤트 존재할 시 class 삽입
 */
const bodyRowClassNameFunction = (item) => {
  const classList = [];
  if (item.buttons) classList.push("row-button");
  if (item.checkbox) classList.push("row-selected");
  return classList.join(" ");
};

// 인스턴스 타입 테이블
const instanceHeaders = [
  {
    text: "이름",
    value: "title",
    width: 150,
    widthAuto: true,
    sortable: false,
  },
  {
    text: "CPU",
    value: "cpu",
    width: 145,
    sortable: false,
  },
  {
    text: "Memory",
    value: "memory",
    width: 145,
    sortable: false,
  },
  {
    text: "Disk",
    value: "disk",
    width: 145,
    sortable: false,
  },
];
const instanceItems = [
  {
    title: "CG.nano",
    cpu: "8",
    memory: "18GiB",
    disk: "80GiB",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    title: "CG.nano",
    cpu: "7",
    memory: "18GiB",
    disk: "80GiB",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    title: "CG.nano",
    cpu: "9",
    memory: "18GiB",
    disk: "80GiB",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
];

</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
