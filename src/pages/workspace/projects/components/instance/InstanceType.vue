<template>
  <div class="s_03 pb78">
    <p class="sub_title2">인스턴스 타입<i class="ess">*</i></p>
    <div class="s_03_main">
      <div class="s_03_tab">
        <q-tabs v-model="tab" align="left" class="c_tabs">
          <q-tab name="tabCpu" label="CPU"></q-tab>
          <q-tab name="tabV100" label="GPU V100"></q-tab>
          <q-tab name="tabA100_40G" label="GPU A100_40G"></q-tab>
          <q-tab name="tabA100_80G" label="GPU A100_80G"></q-tab>
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
        <div v-if="tab === 'tabCpu'">
          <easy-data-table
            :headers="instanceHeaders"
            :items="Cpu"
            :hide-footer="true"
            empty-message="생성된 타입이 없습니다."
            @click-row="showRowChecked"
            :id="tableId"
            :body-row-class-name="bodyRowClassNameFunctionCheck"
          >
            <!-- title -->
            <template #item-title="item">
              <span class="txt">{{ item.name }}</span>
            </template>
            <!-- cpu -->
            <template #item-cpu="item">
              <span class="txt">{{ item.cpu }}</span>
            </template>
            <!-- memory -->
            <template #item-memory="item">
              <span class="txt">{{ item.mem }}GB</span>
            </template>
            <!-- disk -->
            <template #item-disk="item">
              <!-- ??disk -->
              <span class="txt">{{ item.local_storage }}GB</span>
            </template>
          </easy-data-table>

          <div class="disflex_C mt32">
            <c-pagination />
          </div>
        </div>
        <div v-if="tab === 'tabV100'">
          <easy-data-table
            :headers="instanceHeaders"
            :items="V100"
            :hide-footer="true"
            empty-message="생성된 타입이 없습니다."
            @click-row="showRowChecked"
            :id="tableId"
            :body-row-class-name="bodyRowClassNameFunctionCheck"
          >
            <!-- title -->
            <template #item-title="item">
              <span class="txt">{{ item.name }}</span>
            </template>
            <!-- cpu -->
            <template #item-cpu="item">
              <span class="txt">{{ item.cpu }}</span>
            </template>
            <!-- memory -->
            <template #item-memory="item">
              <span class="txt">{{ item.mem }}GB</span>
            </template>
            <!-- disk -->
            <template #item-disk="item">
              <!-- ??disk -->
              <span class="txt">{{ item.local_storage }}GB</span>
            </template>
          </easy-data-table>

          <div class="disflex_C mt32">
            <c-pagination />
          </div>
        </div>

        <div v-if="tab === 'tabA100_40G'">
          <easy-data-table
            :headers="instanceHeaders"
            :items="V100G40"
            :hide-footer="true"
            empty-message="생성된 타입이 없습니다."
            @click-row="showRowChecked"
            :id="tableId"
            :body-row-class-name="bodyRowClassNameFunctionCheck"
          >
            <!-- title -->
            <template #item-title="item">
              <span class="txt">{{ item.name }}</span>
            </template>
            <!-- cpu -->
            <template #item-cpu="item">
              <span class="txt">{{ item.cpu }}</span>
            </template>
            <!-- memory -->
            <template #item-memory="item">
              <span class="txt">{{ item.mem }}GB</span>
            </template>
            <!-- disk -->
            <template #item-disk="item">
              <!-- ??disk -->
              <span class="txt">{{ item.local_storage }}GB</span>
            </template>
          </easy-data-table>

          <div class="disflex_C mt32">
            <c-pagination />
          </div>

        </div>

        <div v-if="tab === 'tabA100_80G'">
          <easy-data-table
            :headers="instanceHeaders"
            :items="V100G80"
            :hide-footer="true"
            empty-message="생성된 타입이 없습니다."
            @click-row="showRowChecked"
            :id="tableId"
            :body-row-class-name="bodyRowClassNameFunctionCheck"
          >
            <!-- title -->
            <template #item-title="item">
              <span class="txt">{{ item.name }}</span>
            </template>
            <!-- cpu -->
            <template #item-cpu="item">
              <span class="txt">{{ item.cpu }}</span>
            </template>
            <!-- memory -->
            <template #item-memory="item">
              <span class="txt">{{ item.mem }}GB</span>
            </template>
            <!-- disk -->
            <template #item-disk="item">
              <!-- ??disk -->
              <span class="txt">{{ item.local_storage }}GB</span>
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
import { InstanceService } from "src/services";

import CPagination from "components/common/CPagination.vue";

const emit = defineEmits(["instanceTypeName", "instanceTypeSelected"]);

const tab = ref("tabCpu");

const tabLabel = computed(() => {
  switch (tab.value) {
    case "tabCpu":
      return "CPU";
    case "tabV100":
      return "GPU V100";
    case "tabA100_40G":
      return "GPU A100_40G";
    case "tabA100_80G":
      return "GPU A100_80G";
    default:
      return "";
  }
});

const typeList = ref([]);
const instanceTypeSelected = ref({});
const selectedName = computed(() => {
  const name = instanceTypeSelected.value?.name || "";
  const cpu = instanceTypeSelected.value?.cpu || "";
  const mem = instanceTypeSelected.value?.mem || "";
  const localStorage = instanceTypeSelected.value?.local_storage || "";
  if (!name && !cpu && !mem && !localStorage) {
    return "인스턴스 타입을 선택해주세요.";
  }
  return `${name}  (CPU ${cpu} / MEM ${mem}GB / DISK  ${localStorage}GB)`;
});

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
const tableId = "InstanceType";
const showRowChecked = (item) => {
  instanceTypeSelected.value = item;
  const nNum = typeList.value.findIndex((n) => n.id === item.id);
  document
    .querySelectorAll(`#${tableId} table tr`)
    .forEach((tr, i) => tr.classList.toggle("row-isCheck", i === nNum + 1));

  console.log("tabLabel.value", instanceTypeSelected.value);

  emit("instanceTypeName", tabLabel.value);
  emit("instanceTypeSelected", instanceTypeSelected.value);
};

/* * 인스턴스타입 선택 default */
// const setItemsSelected = (firstType) => {
//   instanceTypeSelected.value = {
//     name: firstType.name,
//     cpu: firstType.cpu,
//     gpu: firstType.gpu,
//     mem: firstType.mem,
//   };
//   emit("instanceTypeSelected", instanceTypeSelected.value);
// };

const filterByGpuModel = (model) => computed(() => typeList.value.filter((item) => item.gpu_model === model));

const Cpu = filterByGpuModel("NONE");
const V100 = filterByGpuModel("V100");
const V100G40 = filterByGpuModel("V100_40G");
const V100G80 = filterByGpuModel("V100_80G");

onMounted(async () => {
  try {
    const result = await InstanceService.getIntanceType();
    typeList.value = result.instance_types;
  } catch (error) {
    console.log(error);
  }
});
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
