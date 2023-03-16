<!-- eslint-disable object-curly-newline -->
<template>
  <div class="table">
    <q-table
      ref="table"
      :class="tableClasses"
      :rows="data"
      :columns="columns"
      :row-key="name"
      :selection="selection"
      v-model:selected="selected"
      hide-bottom
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-if="rowClick"></q-th>
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
            :auto-width="false"
          >
            {{ col.label }}
          </q-th>
          <q-th v-if="!rowClick && inviteRequest"></q-th>
          <q-th v-if="!rowClick && actionButtons.length > 0"></q-th>
          <q-th v-if="rowClick"></q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" @click="onRowClick(props.row)">
          <q-td v-if="rowClick" class="text-center">
            <q-checkbox v-model="props.selected" class="c_checkbox" />
          </q-td>
          <q-td v-for="(col, i) in props.cols" :key="col.name" :props="props">
            <div class="cell">
              <q-checkbox
                v-if="selection && i === 0"
                v-model="props.selected"
                class="c_checkbox"
              />
              <!-- 테이블 링크타입 -->
              <template v-if="col.type === 'link'">
                <a :href="`/#/${props.row.id}`"
                  ><span class="txt">{{ col.value }}</span></a
                >
              </template>
              <!-- 테이블 뱃지타입 -->
              <template v-else-if="col.type === 'tag'">
                <!--
                  상태값(status)
                  1. running, 운영중, 실행중
                  2. stopped, 정지 | 오류 | 취소 | 실패
                  3. 생성중 | 삭제중 | 대기중 | 재시작중
                -->
                <q-badge v-if="col.value === 'running'" class="c_badge green">
                  <span class="txt">운영중</span>
                </q-badge>
                <q-badge
                  v-else-if="col.value === 'stopped'"
                  class="c_badge orange"
                >
                  <span class="txt">정지</span>
                </q-badge>
              </template>
              <!-- copy 버튼타입 -->
              <template v-else-if="col.type === 'copy'">
                <q-badge class="c_badge copy" @click="onCopy(props.row)">
                  <span class="txt">{{ col.value }}</span>
                </q-badge>
              </template>
              <!-- default -->
              <template v-else>
                <span class="ellipsis">{{ col.value }}</span>
              </template>
            </div>
          </q-td>
          <q-td v-if="rowClick" class="text-right">
            <div class="cell" style="width: auto">
              <q-btn class="c_btn" v-show="props.selected"
                ><span class="txt">선택취소하기</span></q-btn
              >
            </div>
          </q-td>
          <q-td v-if="!rowClick && inviteRequest" class="text-left">
            <div class="cell" style="width: auto">
              <q-btn class="c_btn"
                ><span class="txt">초대요청 확인</span></q-btn
              >
            </div>
          </q-td>
          <!-- row action button -->
          <q-td
            v-if="!rowClick && actionButtons.length > 0"
            class="text-center"
          >
            <div class="cell">
              <q-btn class="c_btn ibtn dot">
                <i class="ico dots" /><span class="txt">클릭</span>
                <q-popup-edit
                  v-model="props.cols"
                  class="dots_menu"
                  anchor="top right"
                >
                  <q-list style="min-width: 100px">
                    <q-item v-for="button in actionButtons" :key="button.name">
                      <q-btn
                        class="item"
                        @click="onEmit(button.event, props.row)"
                      >
                        <span class="txt">{{ button.name }}</span>
                      </q-btn>
                    </q-item>
                  </q-list>
                </q-popup-edit>
              </q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script setup>
import { ref, computed, defineEmits, toRef } from "vue";

const table = ref(null);
const selected = ref([]);

const props = defineProps({
  columns: {
    type: Array,
    default: () => [],
    required: true,
  },
  data: {
    type: Array,
    default: () => [],
    required: true,
  },
  selection: {
    type: String,
    default: "", // multiple or single
  },
  actionButtons: {
    type: Array,
    default: () => [],
  },
  rowClick: {
    type: Boolean,
    default: false,
  },
  inviteRequest: {
    type: Boolean,
    default: true,
  },
});

const rowClick = toRef(props, "rowClick");
const selection = toRef(props, "selection");
const inviteRequest = toRef(props, "inviteRequest");

const emit = defineEmits(["action", "row-click", "copy"]);

const tableClasses = computed(() => {
  const classList = ["c_table"];
  return classList.join(",");
});

/**
 * 설명: 복사하기 버튼 이벤트
 * @param { object } rowData get table row data
 */
const onCopy = (rowData) => {
  emit("copy", rowData);
};

/**
 * 설명: row Action 버튼 이벤트
 * @param { string } eventName action event name
 * @param { object } rowData get table row data
 */
const onEmit = (eventName, rowData) => {
  emit("action", { event: eventName, data: rowData });
};

/**
 * 설명: type3 row click 이벤트
 * @param { object } rowData get table row data
 */
const onRowClick = (rowData) => {
  if (rowClick.value) {
    emit("row-click", rowData);
  }
};
</script>
