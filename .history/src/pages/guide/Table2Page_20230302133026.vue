<template>
  <div class="p-content p-guide p-table">
    <div class="p-head">
      <h1 class="p-title">{{ title }}</h1>
    </div>
    <div class="p-body">
      <section class="section">
        <h2 class="h6">Type1</h2>
        <div class="group">
          <EasyDataTable
            class="c_table"
            :headers="headers.filter((header) => header.value !== 'checkbox')"
            :items="items"
            :hide-footer="true"
            empty-message="데이터가 없습니다."
          >
            <!-- title -->
            <template #item-title="item">
              <a href="#">
                <span class="txt">{{ item.title }}</span>
              </a>
            </template>
            <!--
              상태값(status)
              1. running, 운영중, 실행중
              2. stopped, 정지 | 오류 | 취소 | 실패
              3. 생성중 | 삭제중 | 대기중 | 재시작중
            -->
            <template #item-status="item">
              <q-badge
                v-if="item.status === 'running'"
                class="c_badge green"
              >
                <span class="txt">운영중</span>
              </q-badge>
              <q-badge
                v-else-if="item.status === 'stopped'"
                class="c_badge orange"
              >
                <span class="txt">정지</span>
              </q-badge>
            </template>
            <!-- ssh -->
            <template #item-ssh="item">
              <q-badge
                class="copy square ssh icon"
                @click="onCopy(item)"
              >
                <span class="txt">{{ item.ssh }}</span>
              </q-badge>
            </template>
            <!-- jupyterLab -->
            <template #item-jupyterLab="item">
              <q-badge
                class="copy square lab icon"
                @click="onCopy(item)"
              >
                <span class="txt">{{ item.jupyterLab }}</span>
              </q-badge>
            </template>
            <!-- 인스턴스 타입 -->
            <template #item-instanceType="item">
              <q-badge
                class="text instance"
                @click="onCopy(item)"
              >
                <span class="txt">{{ item.instanceType }}<i class="ico details">
                  <q-tooltip
                    anchor="bottom middle"
                    class="c_tooltip insTypeTool"
                  >
                    <div class="inner">
                      {{ item.instanceType }}
                    </div>
                  </q-tooltip></i>
                </span>
              </q-badge>
            </template>
            <!-- 버튼 그룹 -->
            <template #item-buttons="item">
              <div v-if="actionButtons" class="cell btngroup">
                <q-btn class="c_btn ibtn dot">
                  <i class="ico dots" /><span class="txt">클릭</span>
                  <q-popup-edit
                    v-model="item.id"
                    class="dots_menu"
                    anchor="top right"
                  >
                    <q-list style="min-width: 100px">
                      <q-item
                        v-for="button in actionButtons"
                        :key="button.name"
                      >
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
        </div>
      </section>
      <section class="section">
        <h2 class="h6">Type2</h2>
        <div class="group">
          <EasyDataTable
            class="c_table"
            :headers="headers.filter((header) => header.value !== 'checkbox')"
            :items="items"
            :hide-footer="true"
            :body-row-class-name="bodyRowClassNameFunction"
            empty-message="데이터가 없습니다."
          >
            <!-- title -->
            <template #item-title="item">
              <q-checkbox
                v-model="itemsSelected2"
                :val="item.id"
                :label="item.title"
                :disable="item.disabled"
                @click="onCheck2(item)"
              />
              <!-- <span class="txt">{{ item.title }}</span> -->
            </template>
            <!--
              상태값(status)
              1. running, 운영중, 실행중
              2. stopped, 정지 | 오류 | 취소 | 실패
              3. 생성중 | 삭제중 | 대기중 | 재시작중
            -->
            <template #item-status="item">
              <q-badge
                v-if="item.status === 'running'"
                class="c_badge green"
              >
                <span class="txt">운영중</span>
              </q-badge>
              <q-badge
                v-else-if="item.status === 'stopped'"
                class="c_badge orange"
              >
                <span class="txt">정지</span>
              </q-badge>
            </template>
            <!-- ssh -->
            <template #item-ssh="item">
              <q-badge
                class="copy square ssh icon"
                @click="onCopy(item)"
              >
                <span class="txt">{{ item.ssh }}</span>
              </q-badge>
            </template>
            <!-- jupyterLab -->
            <template #item-jupyterLab="item">
              <q-badge
                class="copy square lab icon"
                @click="onCopy(item)"
              >
                <span class="txt">{{ item.jupyterLab }}</span>
              </q-badge>
            </template>
            <!-- 인스턴스 타입 -->
            <template #item-instanceType="item">
              <q-badge
                class="text instance"
                @click="onCopy(item)"
              >
                <span class="txt">{{ item.instanceType }}<i class="ico details">
                  <q-tooltip
                    anchor="bottom middle"
                    class="c_tooltip insTypeTool"
                  >
                    <div class="inner">
                      {{ item.instanceType }}
                    </div>
                  </q-tooltip></i>
                </span>
              </q-badge>
            </template>
            <!-- 버튼 그룹 -->
            <template #item-buttons="item">
              <div v-if="actionButtons || item.buttons" class="cell">
                <!-- 초대 요청 확인 -->
                <q-btn
                  v-if="item.buttons"
                  class="c_btn"
                >
                  <span class="txt">{{ item.buttons.name }}</span>
                </q-btn>

                <!-- row action menu -->
                <q-btn class="c_btn ibtn dot">
                  <i class="ico dots" /><span class="txt">클릭</span>
                  <q-popup-edit
                    v-model="item.id"
                    class="dots_menu"
                    anchor="top right"
                  >
                    <q-list style="min-width: 100px">
                      <q-item
                        v-for="button in actionButtons"
                        :key="button.name"
                      >
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
        </div>
      </section>
      <section class="section">
        <h2 class="h6">Type3</h2>
        <div class="group">
          <EasyDataTable
            class="c_table"
            :headers="headers"
            :items="items"
            :hide-footer="true"
            :body-row-class-name="bodyRowClassNameFunction"
            empty-message="데이터가 없습니다."
          >
            <template #item-checkbox="item">
              <q-checkbox
                v-model="itemsSelected"
                :val="item.id"
                :disable="item.disabled"
                @click="onCheck(item)"
              />
            </template>
            <!-- title -->
            <template #item-title="item">
              <a href="#">
                <span class="txt">{{ item.title }}</span>
                <q-tooltip
                  anchor="bottom middle"
                  class="c_tooltip"
                >
                  <div class="inner">
                    {{ item.title }}
                  </div>
                </q-tooltip>
              </a>
            </template>
            <!--
              상태값(status)
              1. running, 운영중, 실행중
              2. stopped, 정지 | 오류 | 취소 | 실패
              3. 생성중 | 삭제중 | 대기중 | 재시작중
            -->
            <template #item-status="item">
              <q-badge
                v-if="item.status === 'running'"
                class="c_badge green"
              >
                <span class="txt">운영중</span>
              </q-badge>
              <q-badge
                v-else-if="item.status === 'stopped'"
                class="c_badge orange"
              >
                <span class="txt">정지</span>
              </q-badge>
            </template>
            <!-- ssh -->
            <template #item-ssh="item">
              <q-badge
                class="copy square ssh icon"
                @click="onCopy(item)"
              >
                <span class="txt">{{ item.ssh }}</span>
              </q-badge>
            </template>
            <!-- jupyterLab -->
            <template #item-jupyterLab="item">
              <q-badge
                class="copy square lab icon"
                @click="onCopy(item)"
              >
                <span class="txt">{{ item.jupyterLab }}</span>
              </q-badge>
            </template>
            <!-- 인스턴스 타입 -->
            <template #item-instanceType="item">
              <q-badge
                class="text instance"
                @click="onCopy(item)"
              >
                <span class="txt">{{ item.instanceType }}<i class="ico details">
                  <q-tooltip
                    anchor="bottom middle"
                    class="c_tooltip insTypeTool"
                  >
                    <div class="inner">
                      {{ item.instanceType }}
                    </div>
                  </q-tooltip></i>
                </span>
              </q-badge>
            </template>
            <!-- 버튼 그룹 -->
            <template #item-buttons="item">
              <q-btn v-if="item.checkbox" class="text"><span class="txt">선택 취소하기</span></q-btn>
            </template>
          </EasyDataTable>
        </div>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";

const title = ref("Table");
useMeta(() => ({
  title: title.value,
}));

const itemsSelected = ref([]);
const itemsSelected2 = ref([]);
const headers = [
  {
    text: "", value: "checkbox", width: 80
  },
  {
    text: "ID", value: "id", width: 100, sortable: true
  },
  {
    text: "인스턴스 이름", value: "title", width: 150, widthAuto: true, sortable: true
  },
  {
    text: "상태", value: "status", width: 100, sortable: true
  },
  {
    text: "ssh", value: "ssh", width: 100, sortable: true
  },
  {
    text: "JupyterLab", value: "jupyterLab", width: 150, sortable: true
  },
  {
    text: "인스턴스 타입", value: "instanceType", width: 160, sortable: true
  },
  {
    text: "GPU", value: "gpu", sortable: true, width: 100
  },
  {
    text: "CPU", value: "cpu", sortable: true, width: 100
  },
  {
    text: "생성일시", value: "createdAt", width: 180, sortable: true
  },
  {
    text: "생성자", value: "createdBy", width: 100, sortable: true
  },
  { text: "", value: "buttons", width: 80 },
];

const items = [
  {
    id: 1,
    title: "인스턴스 이름 인스턴스 이름 인스턴스 이름",
    status: "running",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "Root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
    buttons: {
      name: "초대요청 확인"
    },
    checkbox: false,
    disabled: true
  },
  {
    id: 2,
    title: "인스턴스 이름 인스턴스 이름 인스턴스 이름",
    status: "running",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "50.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "Root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
    checkbox: false,
    disabled: false
  },
];

/**
 * 버튼 및 checkbox 에 대한 이벤트 존재할 시 class 삽입
 */
const bodyRowClassNameFunction = (item) => {
  const classList = [];
  if (item.buttons) classList.push("row-button");
  if (item.checkbox) classList.push("row-selected");
  if (item.disabled) classList.push("row-disabled");
  return classList.join(" ");
};

const actionButtons = [
  { name: "이용현황", event: "state" },
  { name: "공유관리", event: "share" },
  { name: "스냅샷 관리", event: "mngSnap" },
  { name: "스냅샷 생성", event: "crtSnap" },
  { name: "삭제", event: "delete" },
];

/**
 * 설명: 복사하기 버튼 이벤트
 * @param { object } rowData get table row data
 */
const onCopy = (rowData) => {
  console.log(rowData);
};

/**
 * 설명: row Action 버튼 이벤트
 * @param { string } eventName action event name
 * @param { object } rowData get table row data
 */
const onActions = (eventName, rowData) => {
  console.log(eventName, rowData);
};

const onCheck = (item) => {
  const data = items.filter((row) => row.id === item.id)[0];
  data.checkbox = itemsSelected.value.includes(item.id);
};

const onCheck2 = (item) => {
  const data = items.filter((row) => row.id === item.id)[0];
  data.checkbox = itemsSelected2.value.includes(item.id);
};
</script>

<style lang="scss" scoped>
@import "./src/css/table";
.section {
  h2 {
    margin-bottom: 10px;
  }
  ~ .section {
    margin-top: 50px;
  }
}
.group {
  margin-top: 20px;
}
::v-deep {
  .row-button td {
    background-color: rgba(54, 60, 229, 0.04);
  }
  .row-selected td {
    background-color: #FAFBFC;
  }
}
</style>
