<template>
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
        <CDropdown
          v-model:selected="searchData.status"
          :label="label"
          :options="statusOption"
          :multiple="true"
        />
      </div>
    </div>

    <div class="r_set_inner">
      <div class="instance_make_btn">
        <q-btn
          btnTypes="4"
          type="button"
          class="c_btn line medium"
         @click="createInstance"
        >
          <span class="txt">인스턴스 생성하기</span>
        </q-btn>
      </div>

      <div class="view_cont_num">
        <CDropdown
          v-model:selected="searchData.size"
          :label="label2"
          :options="options2"
        />
      </div>
    </div>
  </div>

  <template v-if="isDefaultData">
    <div class="change_table_area">
      <easy-data-table
        :headers="headers"
        :items="projectList"
        :hide-footer="true"
        empty-message="정보가 없습니다."
        @click-row="showRow"
        rowsPerPage="50"
        >
        <!-- id -->
        <template #item-id="item">
          <span class="txt">{{ item.id }}</span>
        </template>
        <!-- title -->
        <template #item-nickname="item">
          <a href="#">
            <span class="txt">{{ item.nickname }}</span>
            <q-tooltip anchor="bottom middle" class="c_tooltip">
              <div class="inner">
                {{ item.nickname }}
              </div>
            </q-tooltip>
          </a>
        </template>

        <template #item-status="item">
          <c-badgeState :item="item" />
        </template>
        <!-- ssh -->
        <template #item-ssh="item">
          <q-badge class="copy square ssh icon" @click="onCopy(item.jupyter_lab_token)">
            <span class="txt">ssh</span>
          </q-badge>
        </template>
        <!-- jupyterLab -->
        <template #item-jupyterLab="item">
          <q-badge class="copy square lab icon">
            {{ item.join }}
            <span class="txt">JupyterLab</span>
          </q-badge>
        </template>
        <!-- 인스턴스 타입 -->
        <template #item-instanceType="item">
          <q-badge class="text instance">
            <span class="txt">
              {{ item.instance_type.name }}
              <i class="ico details">
                <q-tooltip anchor="bottom middle" class="c_tooltip insTypeTool">
                  <div class="inner">
                    GPU
                    {{ item.instance_type.gpu }} / CPU {{ item.instance_type.cpu }} /MEM
                    {{ item.instance_type.mem }}GB
                  </div>
                </q-tooltip></i
              >
            </span>
          </q-badge>
        </template>
        <template #item-gpu="item">
          <span class="txt">
            {{
              $utils.getPercentData(
                item.instance_type.gpu,
                workspace.quota.total.cpu_milli
              )
            }}%
          </span>
        </template>
        <template #item-cpu="item">
          <span class="txt"
            >
            {{
              $utils.getPercentData(
                item.instance_type.cpu,
                workspace.quota.total.cpu_milli
              )
            }}%
          </span>
        </template>
        <!-- gpu -->

        <!-- createdBy -->
        <template #item-createdAt="item">
          <span class="txt clip">
            {{ $utils.paseseDate(item.created_at, "YY.MM.DD HH:MM:ss") }}</span
          >
        </template>
        <template #item-createdBy="item">
          <span class="txt clip">{{ item.owner.name }}</span>
        </template>

        <!-- 버튼 그룹 -->
        <template #item-buttons="item">
          <div v-if="actionButtons" class="cell btngroup">
            <q-btn
              class="c_btn ibtn dot"
              :disabled="
                item.status === 'starting' ||
                item.status === 'stopping' ||
                item.status === 'deleting' ||
                !item.status
              "
            >
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
    </div>

    <div class="table_pagenav disflex_C">
      <c-pagination @update:current="setPage"/>

    </div>
  </template>
  <template v-else>
    <div class="com_nondata_area">
      <div class="nondata_box">
        <p class="nondata_txt">생성된 인스턴스가 없습니다.</p>
      </div>
    </div>
  </template>

  <!-- Start : [관리 - 인스턴스] 인스턴스 삭제 확인 Alert 팝업 -->
  <c-dialog
    v-model:visible="alertInstanceDelConfirmModal"
    :message="'인스턴스를 삭제하시겠습니까?'"
    :description="'삭제된 인스턴스는 복구되지 않습니다.'"
  >
    <!-- :callback-negative="triggerInstanceSuccess" -->
    <template #negative>
      {{ currentSelected.nickname }}
    </template>
    <template #footer>
      <c-button :outline="true" btn-names="취소" @click="deleteInstnaceCancle" />
      <c-button btn-names="확인" @click="deleteInstnace" />
    </template>
  </c-dialog>
  <!-- End : [관리 - 인스턴스] 인스턴스 삭제 확인 Alert 팝업 -->

    <!-- Start : [프로젝트 - 인스턴스] 인스턴스 용량 초과로 인한 이미지 생성 불가 Alert 팝업 -->
    <c-dialog
      v-model:visible="alertInstanceOverImageModal"
      :message="'용량이 초과하여 이미지 생성이 불가능합니다.'"
      :description="'추가된 용량이 10GiB 이하만 이미지 생성가능'"
    >
      <template #negative>현재 추가된 용량 : {{ currentSelected.instance_type.local_storage }}GB</template>
      <template #footer>
        <c-button
          :outline="true"
          btn-names="취소"
          @click="alertInstanceOverImageModal = false"
        />
        <c-button
          btn-names="확인"
          @click="alertInstanceOverImageModal = false"
        />
      </template>
    </c-dialog>
    <!-- End : [프로젝트 - 인스턴스] 인스턴스 용량 초과로 인한 이미지 생성 불가 Alert 팝업 -->

  <!-- Start : [관리 - 인스턴스] 인스턴스 추가된 용량 (10GB 초과시 저장 되지 않음 안내) Alert 팝업 -->
  <c-dialog
    v-model:visible="alertInstanceAddVolumeInfoModal"
    :message="'인스턴스 용량이 초과되어 정지시 현재 상태가 저장되지 않습니다. 정지 하시겠습니까?'"
  >
    <template #positive>
      현재 용량 : {{ currentSelected.instance_type.local_storage }}GB (10BG 이하 저장
      가능)
    </template>
    <template #footer>
      <c-button :outline="true" btn-names="취소" @click="stopInstnaceCancle" />
      <c-button btn-names="확인" @click="stopInstnace" />
    </template>
  </c-dialog>
  <!-- End : [관리 - 인스턴스] 인스턴스 추가된 용량 (10GB 초과시 저장 되지 않음 안내) Alert 팝업 -->

  <!-- [프로젝트 - 인스턴스] 프로젝트 - 인스턴스 - 이미지 생성 팝업 -->
  <CreateImagePopup
    @update:projectInstanceImgCreateModal="(value)=>{projectInstanceImgCreateModal = value}"
    :projectInstanceImgCreateModal="projectInstanceImgCreateModal"
    v-model="projectInstanceImgCreateModal"
    :currentSelected="currentSelected"
    @getInstances="getInstances"
    @toggleActionButtons="toggleActionButtons"
  />
</template>
<script setup>
import {
  ref, watch, computed, onMounted
} from "vue";
import { InstanceService, WorkspaceService } from "src/services";
import { useRoute, useRouter } from "vue-router";
import { throttle } from "lodash";
import { copyToClipboard } from "quasar";
import { $useCmFn } from "src/composables/useCommonFunction.js";
import { $utils } from "src/utils/utils";

import CPagination from "components/common/CPagination.vue";
import CDropdown from "components/common/CDropdown.vue";
import CInputText from "components/common/CInputText.vue";
import CBadgeState from "src/components/common/CBadgeState.vue";
import CDialog from "src/components/common/CDialog.vue";
import CButton from "src/components/common/CButton.vue";
import CreateImagePopup from "../CreateImagePopup.vue";

const headers = [
  {
    text: "ID",
    value: "id",
    width: 75,
    checkbox: true,
  },
  {
    text: "이름",
    value: "nickname",
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
    value: "instance_type.name",
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

// const serverOptions = ref({
//   rowsPerPage: 50,
// });

const route = useRoute();
const router = useRouter();

// workspace info
const { workspaceId } = route.params;
const workspace = ref(null);
WorkspaceService.getWorkspace(workspaceId).then((data) => {
  workspace.value = data;
});

const projectList = ref([]);
const currentSelected = ref({});
const isDefaultData = computed(() => !!projectList.value?.length);

const props = defineProps({
  tabModel: {
    Object: String
  },
  projectInfo: {
    type: Object
  }
});
const isCurrentTab = props.tabModel === "instances";

const emit = defineEmits(["update:instanceTotal"]);

const searchData = ref({
  query: "",
  status: [],
  size: 10,
});
const dataParams = ref({
  query: computed(() => searchData.value.query),
  page: computed(() => searchData.value.page),
  size: computed(() => searchData.value.size.size),
  status: computed(() => {
    const result = searchData.value.status.flatMap((item) => (Object.keys(item).includes("status") ? item.status : []));
    if (searchData.value.status.some((item) => item.value === 0)) result.length = 0;
    return result.length > 0 ? result.join(",") : result;
  }),

});

const actionButtons = ref([]);
const statusOption = ref([
  { label: "전체", value: 0, status: [] },
  { label: "대기중", value: 1, status: ["pending", "submitted"] },
  { label: "시작중", value: 2, status: ["starting"] },
  { label: "운영중", value: 3, status: ["running"] },
  { label: "정지중", value: 4, status: ["stopping"] },
  { label: "정지", value: 5, status: ["stopped"] },
  { label: "삭제중", value: 6, status: ["deleting"] },
  { label: "삭제예정(D-N)", value: 7, status: ["stopped ", "error"] },
]);
const options2 = ref([
  { label: "10", value: 0, size: 10 },
  { label: "25", value: 1, size: 25 },
  { label: "50", value: 2, size: 50 },
]);

const alertInstanceDelConfirmModal = ref(false);
const alertInstanceAddVolumeInfoModal = ref(false);
const projectInstanceImgCreateModal = ref(false);
const alertInstanceOverImageModal = ref(false);

const projectQuotaUsed = ref({});

/* * 인스턴스 목록 호출 */
const getInstances = async () => {
  try {
    const result = await InstanceService.getProjectIntances(
      route.params.projectId,
      dataParams.value
    );
    projectList.value = result.instances;
    console.log("projectList.value", projectList.value);
    emit("update:instanceTotal", result.total);
  } catch (error) {
    console.log(error);
  }
};

/* * 초기화 */
const initRouterData = () => {
  searchData.value = {
    query: "",
    size: 10,
    status: [],
    page: 1,
  };
};

/* * 인스턴스 생성 */
const createInstance = () => {
  router.push({
    name: "createInstance",
    params: { workspaceId, projectId: route.params.projectId },
  });
};

// const pageReset = () => {
//   // searchData.value.page = 1;
// };

/*
 * 설명 :  인스턴스 검색,필터
 * 변경 시 0.8초간 대기 후 실행
 */
watch(
  () => searchData.value,
  throttle(async (newValue) => {
    if (newValue.size) {
      searchData.value.page = 1;
    }
    getInstances();
  }, 800),
  { deep: true }
);
onMounted(async () => {
  if (isCurrentTab) {
    await getInstances();
  }
});

const setPage = (num) => {
  console.log("sdf", num);
  searchData.value.page = num;
};

/* * 라우트 파라미터 변경 시 값 초기화 */
watch(
  () => route.params.projectId,
  async () => {
    if (route.name === "ProjectList") {
      initRouterData();
    }
  }
);

const label = ref("전체");
const label2 = ref("10");
// const selectedCheck = ref(null);
// const nDay = ref(7);

const showRow = (item) => {
  currentSelected.value = item;
  const { status } = item;
  switch (status) {
    case "running":
      actionButtons.value = [
        { name: "정지", event: "stop" },
        { name: "이미지 생성", event: "makingImg" },
      ];
      break;
    case "stopped":
    case "error":
      actionButtons.value = [
        { name: "시작", event: "start" },
        { name: "삭제", event: "delete" },
      ];
      break;
    case "pending":
      actionButtons.value = [{ name: "삭제", event: "delete" }];
      break;
    case "starting":
    case "stopping":
    case "deleting":
      actionButtons.value = [];
      break;
    default:
      actionButtons.value = [];
      break;
  }
};

/* *  성공 메세지 */
const triggerSuccess = (message) => {
  setTimeout(() => {
    $useCmFn.onNotify({
      message: `${message}`,
      type: "positive",
    });
  }, 100);
};

/* *  실패 메세지 */
const triggerFail = (message) => {
  $useCmFn.onNotify({
    message: `${message}`,
    type: "negative",
  });
};

/**
 * 설명: 복사하기 버튼 이벤트
 * @param { object } rowData get table row data
 */
const onCopy = (message) => {
  copyToClipboard(message).then(() => {
    triggerSuccess("SSH 접속 명령어가 복사되었습니다.");
  });
};

/* *  액션버튼 토글 */
const toggleActionButtons = () => {
  actionButtons.value = false;
  setTimeout(() => {
    actionButtons.value = true;
  }, 50);
};

/* *  인스턴스 삭제 취소 */
const deleteInstnaceCancle = () => {
  alertInstanceDelConfirmModal.value = false;
  toggleActionButtons();
};

/* *  인스턴스 삭제 */
const deleteInstnace = async () => {
  try {
    await InstanceService.deleteIntance(route.params.projectId, currentSelected.value.id);
    triggerSuccess("인스턴스 삭제가 완료되었습니다.");
    alertInstanceDelConfirmModal.value = false;
    toggleActionButtons();

    await getInstances();
  } catch (error) {
    triggerFail("인스턴스 삭제를 실패하였습니다. 다시 시도해주세요.");
    console.log(error);
  }
};

/** 삭제확인 팝업 */
const handleDeleteModal = () => {
  alertInstanceDelConfirmModal.value = true;
};

/*
* 인스턴스 정지 취소
*/
const stopInstnaceCancle = () => {
  alertInstanceAddVolumeInfoModal.value = false;
};

/* * 인스턴스 정지 */
const stopInstnace = async () => {
  try {
    await InstanceService.stopIntance(route.params.projectId, currentSelected.value.id);
    toggleActionButtons();
    getInstances();
    setTimeout(() => {
      getInstances();
    }, 4000);
  } catch (error) {
    console.log(error);
  }
};

/* * 인스턴스 시작 */
const startInstnace = async () => {
  try {
    await InstanceService.startIntance(route.params.projectId, currentSelected.value.id);
    toggleActionButtons();
    getInstances();
    setTimeout(() => {
      getInstances();
    }, 4000);
  } catch (error) {
    console.log(error);
  }
};

/**
 * 설명: row Action 버튼 이벤트
 * @param { string } eventName action event name
 * @param { object } rowData get table row data
 */

const onActions = (eventName, rowData) => {
  console.log("실행");
  projectQuotaUsed.value = props.projectInfo.quota.used;
  console.log("props.projectInfo", props.projectInfo);
  switch (eventName) {
    case "delete":
      handleDeleteModal();
      break;

    case "stop":
      if (rowData.instance_type.local_storage > 10) {
        alertInstanceAddVolumeInfoModal.value = true;
      } else {
        stopInstnace();
      }
      break;

    case "start":
      if (rowData.instance_type.mem > 1000) {
        $useCmFn.onMessage({
          message: `${rowData.nickname} 리소스 할당량이 부족하여<br />인스턴스를 실행 할 수 없습니다.`,
        });
      } else {
        startInstnace();
      }
      break;

    case "makingImg":
      if (rowData.instance_type.local_storage > 10) {
        alertInstanceOverImageModal.value = true;
      } else {
        projectInstanceImgCreateModal.value = true;
      }
      break;

    default:
      break;
  }
};

</script>

<style lang="scss" scoped>
@import "./src/css/projects";
@import "./src/css/table";
</style>
