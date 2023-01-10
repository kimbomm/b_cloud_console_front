<template>
  <div class="table">
    <q-table
      ref="table"
      :class="tableClasses"
      :title="title"
      :rows="data"
      :columns="columns"
      :row-key="name"
      :selection="selection"
      v-model:selected="selected"
      hide-bottom
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
          <q-th v-if="actionButtons.length > 0"></q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" @click="onRowClick(props.row)">
          <q-td
            v-for="(col, i) in props.cols"
            :key="col.name"
            :props="props"
          >
            <q-checkbox v-if="selection && i === 0" v-model="props.selected" />
            <!-- 테이블 링크타입 -->
            <template v-if="col.type === 'link'">
              <a :href="`/#/${props.row.id}`">{{ col.value }}</a>
            </template>
            <!-- 테이블 뱃지타입 -->
            <template v-else-if="col.type === 'tag'">
              <!--
                상태값(status)
                1. running, 운영중
                2. stopped, 정지 | 오류
                3. 생성중 | 삭제중 | 대기중 | 재시작중
              -->
              <q-badge v-if="col.value === 'running'" color="green">
                운영중
              </q-badge>
              <q-badge v-else-if="col.value === 'stopped'" color="red">
                정지
              </q-badge>
            </template>
            <!-- copy 버튼타입 -->
            <template v-else-if="col.type === 'copy'">
              <button @click="onCopy(props.row)">{{ col.value }}</button>
            </template>
            <!-- default -->
            <template v-else>
              {{ col.value }}
            </template>
          </q-td>
          <!-- row action button -->
          <q-td v-if="actionButtons.length > 0">
            <button>클릭</button>
            <q-popup-edit v-model="props.cols">
              <div class="text-italic text-primary">
                <ul>
                  <li v-for="button in actionButtons" :key="button.name">
                    <button @click="onEmit(button.event, props.row)">{{ button.name }}</button>
                  </li>
                </ul>
              </div>
            </q-popup-edit>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script setup>
import {
  ref, computed, defineEmits, toRef
} from "vue";

const table = ref(null);
const selected = ref([]);

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  columns: {
    type: Array,
    default: () => [],
  },
  data: {
    type: Array,
    default: () => [],
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
    default: false
  }
});
const rowClick = toRef(props, "rowClick");

const emit = defineEmits(["action", "row-click", "copy"]);

const tableClasses = computed(() => {
  const classList = ["table"];
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
