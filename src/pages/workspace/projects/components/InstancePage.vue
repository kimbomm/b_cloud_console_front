<template>
  <template v-if="isDefaultData">
    <div class="table_set">
      <div class="l_set_inner">
        <div class="c_inpgroup">
          <c-input-text
            v-model:value="searchData.query"
            placeholder="이름, 상태, 생성자 검색"
            hint=""
            class="wsize_full"
            :clearable="true"
          >
            <template v-slot:prepend>
              <q-icon name="search" class="ico_search" />
            </template>
          </c-input-text>
        </div>

        <div class="c_selectgroup">
          <!-- <CDropdown
            v-model:selected="selectedCheck"
            :label="label"
            :options="options"
            :multiple="true"
          /> -->
          <!-- 임시추가 -->
          <q-select
            v-model="searchData.status"
            multiple
            :options="statusOption"
            :label="label"
            style="width: 250px"

          />

        </div>
      </div>

      <div class="r_set_inner">
        <div class="instance_make_btn">
          <q-btn
            btnTypes="4"
            type="button"
            class="c_btn line medium"
            to="/projects/Instancedetail"
          >
            <span class="txt">인스턴스 생성하기</span>
          </q-btn>
        </div>

        <div class="view_cont_num">
          <CDropdown
            v-model:selected="dataparamStatus"
            :label="label2"
            :options="options2"
          />

        </div>
      </div>
    </div>
    <div class="change_table_area">
      <EasyDataTable
        :headers="headers"
        :items="items"
        :hide-footer="true"
        empty-message="정보가 없습니다."
        @click-row="showRow"
      >
        <!-- title -->
        <template #item-title="item">
          <a href="#">
            <span class="txt">{{ item.title }}</span>
            <q-tooltip anchor="bottom middle" class="c_tooltip">
              <div class="inner">
                {{ item.title }}
              </div>
            </q-tooltip>
          </a>
        </template>
        <!--
                  상태값(status)
                  1. running, 운영중
                  2. stopped, 정지
                  3. pending, 대기중
                  4. stopping, 정지중
                  5. deleting, 삭제중
                  6. starting, 시작중
                  //TBD
                  7. delete_cont, 삭제예정 D-n
                  8. delete_day, 삭제예정 D-Day
                -->
        <template #item-status="item">
          <q-badge v-if="item.status === 'running'" class="green">
            <span class="txt">운영중</span>
          </q-badge>
          <q-badge v-else-if="item.status === 'stopped'" class="orange">
            <span class="txt">정지</span>
          </q-badge>
          <q-badge v-else-if="item.status === 'pending'" class="c_badge">
            <span class="txt">대기중</span>
          </q-badge>
          <q-badge v-else-if="item.status === 'stopping'" class="c_badge">
            <span class="txt">정지중</span>
          </q-badge>
          <q-badge v-else-if="item.status === 'deleting'" class="c_badge">
            <span class="txt">삭제중</span>
          </q-badge>
          <q-badge v-else-if="item.status === 'starting'" class="c_badge">
            <span class="txt">시작중</span>
          </q-badge>
          <q-badge v-else-if="item.status === 'delete_cont'" class="orange">
            <span class="txt">삭제예정 D-{{ nDay }}</span>
          </q-badge>
          <q-badge v-else-if="item.status === 'delete_day'" class="orange">
            <span class="txt">삭제예정 D-Day</span>
          </q-badge>
        </template>
        <!-- ssh -->
        <template #item-ssh="item">
          <q-badge class="copy square ssh icon" @click="onCopy(item)">
            <span class="txt">{{ item.ssh }}</span>
          </q-badge>
        </template>
        <!-- jupyterLab -->
        <template #item-jupyterLab="item">
          <q-badge class="copy square lab icon" @click="onCopy(item)">
            <span class="txt">{{ item.jupyterLab }}</span>
          </q-badge>
        </template>
        <!-- 인스턴스 타입 -->
        <template #item-instanceType="item">
          <q-badge class="text instance" @click="onCopy(item)">
            <span class="txt"
              >{{ item.instanceType
              }}<i class="ico details">
                <q-tooltip anchor="bottom middle" class="c_tooltip insTypeTool">
                  <div class="inner">
                    {{ item.instanceType }}
                  </div>
                </q-tooltip></i
              >
            </span>
          </q-badge>
        </template>
        <!-- createdBy -->
        <template #item-createdBy="item">
          <span class="txt clip">{{ item.createdBy }}</span>
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
      </EasyDataTable>
    </div>
    <div class="table_pagenav disflex_C">
      <CPagination />
    </div>
  </template>
  <template v-else>
    <div class="com_nondata_area">
      <div class="nondata_box">
        <p class="nondata_txt">생성된 인스턴스가 없습니다.</p>
      </div>
    </div>
  </template>
</template>
<script setup>
import {
  ref, watch, computed, onMounted,
} from "vue";
import { InstanceService } from "src/services";
import { useRoute, useRouter } from "vue-router";
import { throttle } from "lodash";

import CPagination from "components/common/CPagination.vue";
import CDropdown from "components/common/CDropdown.vue";
import CInputText from "components/common/CInputText.vue";

const route = useRoute();
const router = useRouter();
const projectList = ref([]);
const isDefaultData = computed(() => !!projectList.value?.length);

const props = defineProps({
  tabModel: String,
});
const emit = defineEmits(["update:instanceTotal"]);

const dataParams = ref({});

const statusOption = ref([
  { label: "전체", value: 0, status: [] },
  { label: "대기중", value: 1, status: ["pending", "submitted"] },
  { label: "시작중", value: 2, status: ["starting"] },
  { label: "운영중", value: 3, status: ["running"] },
  { label: "정지중", value: 4, status: ["stopping"] },
  { label: "정지", value: 5, status: ["stopped"] },
  { label: "삭제중", value: 6, status: ["deleting"] },
  { label: "삭제예정(D-N)", value: 6, status: ["stopped ", "error"] },

]);
const options2 = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);

/* 인스턴스 리스트 */
const getInstances = async () => {
  try {
    const result = await InstanceService.getProjectIntances(
      route.params.projectId,
      dataParams.value
    );

    projectList.value = result.instances;

    emit("update:instanceTotal", result.total);
  } catch (error) {
    console.log(error);
  }
};

const searchData = ref({
  query: "",
  status: []
});
const initRouterData = () => {
  dataParams.value = {
    page: 1,
  };

  searchData.value = {
    query: "",
    status: []
  };
};

const setRouterData = () => {
  const { tab, ...query } = route.query;

  searchData.value = query;
  dataParams.value = {
    ...query,
    // query: "test5" //필터링 테스트
  };
};

const routerPush = () => {
  const query = {
    tab: props.tabModel,
    ...dataParams.value
  };

  router.replace({
    path: `/workspace/${route.params.workspaceId}/projects/${route.params.projectId}`,
    query,
  });
};

watch(
  () => searchData.value,
  (newValue) => {
    // 검색어 0.8초 간격으로 함수 호출
    if (newValue.query) {
      throttle(() => {
        dataParams.value.query = newValue.query;
      }, 800)();
    }
    if (newValue.status) {
      const isStatus = newValue.status.some((item) => Object.keys(item).includes("status"));
      if (isStatus) {
        const result = newValue.status.map((item) => item.status).flat();
        console.log("result", result);
        dataParams.value.status = result;
      } else {
        const statusOption2 = statusOption.value.filter((option) => newValue.status.some((status) => option.status.includes(status)));
        searchData.value.status = statusOption2;
        console.log("statusOption2", statusOption2);
      }
    }
  },
  { deep: true }
);

const isCurrentTab = props.tabModel === "instances";

watch(
  () => dataParams.value,
  () => {
    routerPush();
    getInstances();
  },
  { deep: true }
);

onMounted(() => {
  if (isCurrentTab) {
    setRouterData();
  }
});

const updateInstances = () => {
  initRouterData();
  routerPush();
};

watch(
  () => props.tabModel,
  async () => {
    if (isCurrentTab) {
      updateInstances();
    }
  }
);

watch(
  () => route.params.projectId,
  async () => {
    if (route.name === "ProjectList" && isCurrentTab) {
      updateInstances();
    }
  }
);

const label = ref("전체");
const label2 = ref("10");
// const selectedCheck = ref(null);
const nDay = ref(7);

const headers = [
  {
    text: "ID",
    value: "id",
    width: 75,
    sortable: false,
    checkbox: true,
  },
  {
    text: "이름",
    value: "title",
    width: 133,
    widthAuto: true,
    sortable: true,
  },
  {
    text: "상태",
    value: "status",
    width: 140,
    sortable: true,
  },
  {
    text: "ssh",
    value: "ssh",
    width: 80,
    sortable: false,
  },
  {
    text: "JupyterLab",
    value: "jupyterLab",
    width: 135,
    sortable: false,
  },
  {
    text: "인스턴스 타입",
    value: "instanceType",
    width: 138,
    sortable: true,
  },
  {
    text: "GPU",
    value: "gpu",
    width: 60,
    sortable: false,
  },
  {
    text: "CPU",
    value: "cpu",
    width: 60,
    sortable: false,
  },
  {
    text: "생성일시",
    value: "createdAt",
    width: 165,
    sortable: true,
  },
  {
    text: "생성자",
    value: "createdBy",
    width: 85,
    sortable: true,
  },
  { text: "", value: "buttons", width: 80 },
];
const items = [
  {
    id: 132,
    title: "A인스턴스A인스턴스A인스턴스A인스턴스A인스턴스A인 30자",
    status: "running",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
    buttons: {
      name: "초대요청 확인",
    },
  },
  {
    id: 34,
    title: "A인스턴스A인스턴스10자",
    status: "stopped",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    id: 34,
    title: "A인스턴스A인스턴스10자",
    status: "deleting",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    id: 99999,
    title: "A인스턴스A인스턴스A인스턴스A인A인스턴스A인스턴스A인스턴스A인 20자",
    status: "stopping",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    id: 99999,
    title: "A인스턴스A인스턴스A인스턴스A인 20자",
    status: "starting",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    id: 132,
    title: "A인스턴스A인스턴스A인스턴스A인스턴스A인스턴스A인 30자",
    status: "pending",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
    buttons: {
      name: "초대요청 확인",
    },
  },
  {
    id: 99999,
    title:
      "A인스턴스A인스턴스A인스턴스A인A인스턴스A인스턴스A인스턴스A인A인스턴스A인스턴스A인스턴스A인A인스턴스A인스턴스A인스턴스A인 20자",
    status: "delete_cont",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
  {
    id: 99999,
    title: "A인스턴스A인스턴스A인스턴스A인 20자",
    status: "delete_day",
    ssh: "ssh",
    jupyterLab: "JupyterLab",
    instanceType: "V1.XLARGE",
    gpu: "49.5%",
    cpu: "100%",
    createdAt: "2023.01.12 10:33:21",
    createdBy: "root.choi",
    resource: {
      cpus: 28,
      gpu_device_model: "TESLA_V100",
      gpus: 2,
      mem: 249856,
      zone: "public:normal",
    },
  },
];
const actionButtons = [
  { name: "정지", event: "stop" },
  { name: "시작", event: "start" },
  { name: "이미지 생성", event: "makingImg" },
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

const showRow = (item) => {
  console.log(item);
};
</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
