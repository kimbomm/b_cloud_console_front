<template>
  <template v-if="imageList.length > 0">
    <div class="table_set">
      <div class="c_inpgroup">
        <q-input
          outlined
          v-model="filters"
          placeholder="이름, 설명, 기본이미지 검색"
          clearable
          class="wsize_full"
        >
          <template v-slot:prepend>
            <q-icon name="search" class="ico_search" />
          </template>
        </q-input>
      </div>
      <div class="select_drop">
        <CDropdown :label="optLabel" :options="optNumber" class="auto_size" />
      </div>
    </div>
    <section class="section">
      <easy-data-table
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
        <!-- image -->
        <template #item-image="item">
          <a href="#">
            {{ item }}
            <span class="txt">{{ item }}</span>
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
              <q-popup-edit
                v-model="item.id"
                class="dots_menu"
                anchor="top right"
              >
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
    </section>
    <c-pagination />
  </template>
  <template v-else>
    <div class="com_nondata_area">
      <div class="nondata_box">
        <p class="nondata_txt">생성한 내 이미지가 없습니다.</p>
      </div>
    </div>
  </template>

  <!-- Start : [내 이미지] 이미지 - 내이미지 - 공유관리 -->
  <c-dialog
    v-model:visible="isImageShareManagePopup"
    :size="'medium'"
    :message="'내 이미지 공유 관리'"
    :button-positive="'확인'"
    :button-negative="'취소'"
    :callback-positive="imageShareManageSave"
  >
    <template #contents>
      <section class="section">
        <q-item-section class="item_card medium bg">
          <q-item-label class="name">{{ myImageName }}</q-item-label>
          <q-item-label class="desc">{{ myDescription }}</q-item-label>
        </q-item-section>
      </section>
      <section class="section">
        <p class="sub_title">공유 여부</p>
        <q-list class="p_list share">
          <q-item class="item chkall">
            <i class="ico folder" />
            <q-item-section class="item_card">
              <q-item-label class="name">{{ workspaceName }}</q-item-label>
              <q-item-label class="desc">워크스페이스</q-item-label>
            </q-item-section>
            <q-checkbox
              v-model="isChkAll"
              class="c_checkbox check_all"
              @click="handleCheckGroupClick()"
            />
          </q-item>

          <template
            v-for="(project, innerIndex) in projectSharedList"
            :key="innerIndex"
          >
            <q-item class="item subitem">
              <i class="ico note" />
              <q-item-section class="item_card">
                <q-item-label class="name">{{ project.name }}</q-item-label>
                <q-item-label class="desc">소속 프로젝트</q-item-label>
              </q-item-section>

              <q-checkbox class="c_checkbox" v-model="project.checked" />
            </q-item>
          </template>
        </q-list>
      </section>
    </template>

    <template #footer>
      <c-button
        :outline="true"
        btn-names="취소"
        @click="isImageShareManagePopup = false"
      />
      <c-button btn-names="저장" @click="imageShareManageSave" />
    </template>
  </c-dialog>
  <!-- End : [내 이미지] 이미지 - 내이미지 - 공유관리 -->

  <!-- Start : 삭제 확인 알럿 -->

  <c-dialog
    v-model:visible="alertImageDeleteModal"
    :message="'이미지를 삭제하시겠습니까?'"
  >
    <template #positive>{{ popupState.value.name }}</template>
    <template #footer>
      <c-button
        :outline="true"
        btn-names="취소"
        @click="alertImageDeleteModal = false"
      />
      <c-button btn-names="삭제" @click="deleteShareData()" />
    </template>
  </c-dialog>

  <!-- End : 삭제 확인 알럿 -->

  <c-dialog
    v-model:visible="alertTaskDeleteFailModal"
    :message="'이미지 공유 실패'"
  >
    <template #contents>
      <p class="desc">
        공유설정에 실패한 워크스페이스/프로젝트가 있습니다. 다시 시도해주세요
      </p>
      <div class="info negative">
        <span
          v-for="(failedRequest, index) in failedRequests"
          :key="failedRequest"
          >{{ failedRequest.name
          }}{{ index !== failedRequests.length - 1 ? ", " : "" }}</span
        >
      </div>
    </template>
    <template #footer>
      <c-button btn-names="확인" @click="triggerSharedImageFail()" />
    </template>
  </c-dialog>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { imageService, ProjectService } from "src/services";
import { useRoute } from "vue-router";
import { $utils } from "src/utils/utils";
import { $useCmFn } from "src/composables/useCommonFunction.js";
import { useCommonStore } from "src/stores/useCommonStore";
import { useProjectStore } from "src/stores/useProjectStore";
import CDropdown from "components/common/CDropdown.vue";
import CPagination from "src/components/common/CPagination.vue";
import CBadgeState from "src/components/common/CBadgeState.vue";
import CDialog from "src/components/common/CDialog.vue";
import CButton from "src/components/common/CButton.vue";

const route = useRoute();
const commonStore = useCommonStore();
const projectStore = useProjectStore();
const { workspaceId } = route.params;
const workspaceName = ref("");
console.log("commonStore.myWorkspaces >>>", commonStore.myWorkspaces);
workspaceName.value = commonStore.myWorkspaces.find(
  (item) => item.id === parseInt(workspaceId, 10)
).name;

// 상태 state
const popupState = reactive({});
const filters = ref("");
const optLabel = ref("10");
// n개씩 보기
const optNumber = ref([
  { label: "10", value: 0 },
  { label: "25", value: 1 },
  { label: "50", value: 2 },
]);
const imageList = ref([]);
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
    value: "base_image.name",
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

const fetchShareButtons = { name: "공유관리", event: "share" };
const fetchDeleteButtons = { name: "삭제", event: "delete" };
const alertImageDeleteModal = ref(false);

/* 공유관리 팝업 */
const isImageShareManagePopup = ref(false);
const myImageName = ref("");
const myDescription = ref("");
const isChkAll = ref(true);
const alertTaskDeleteFailModal = ref(false);
const failedRequests = ref([]); // 공유 실패 리스트
const projectSharedList = ref([]);

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
    [value.created_at]: $utils.paseseDate(
      item[value.created_at],
      value.dateType
    ),
  }));

  return updateImage;
};

// 내 이미지 가져오기
const getMyImge = async () => {
  try {
    const { images } = await imageService.getMyImages(
      workspaceId,
      commonStore.me.id
    );
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

    imageList.value = updatedImages;
  } catch (e) {
    console.log(e.response);
    return false;
  }
};

getMyImge();

// 삭제버튼 alert
const onDelete = () => {
  alertImageDeleteModal.value = true;
};

// 공유관리 팝업클릭
const onShare = () => {
  isImageShareManagePopup.value = true;
};

const onActions = (eventName, rowData) => {
  console.log(rowData);
  if (eventName === "share") {
    onShare();
  } else if (eventName === "delete") {
    onDelete();
  }
};

const triggerDeletedSuccess = () => {
  $useCmFn.onNotify({
    message: "이미지가 삭제되었습니다.",
    type: "positive",
  });
};

const triggerDeletedFails = () => {
  $useCmFn.onNotify({
    message: "이미지 삭제를 실패하였습니다. 다시 시도해주세요.",
    type: "negative",
  });
};

const deleteShareData = async () => {
  try {
    await imageService.deleteImage(workspaceId, popupState.value.id);
    triggerDeletedSuccess();
    alertImageDeleteModal.value = false;
    getMyImge();
  } catch (e) {
    triggerDeletedFails();
    alertImageDeleteModal.value = false;
    return false;
  }
};

// 공유받은 이미지 정보 가져오기 !!오류 임시데이터
const getSahredImage = async (imgId) => {
  console.log("임시 ,imgId", imgId);
  // try {
  //   await imageService.getSahredInfoImage(workspaceId, 0);
  // } catch (e) {
  //   console.log(e);
  // }

  const result = {
    image: {
      base_image: {
        hidden: true,
        id: 0,
        min_nvidia_driver_version: "string",
        name: "string",
        repository: "string",
      },
      created_at: "2023-03-02T03:30:56.245Z",
      description: "string",
      id: 0,
      name: "string",
      owner: {
        created_at: "2023-03-02T03:30:56.245Z",
        description: "string",
        email: "string",
        id: 0,
        login_at: "2023-03-02T03:30:56.245Z",
        name: "string",
      },
      status: "string",
      tag: "string",
      type: "string",
    },
    shared_projects: [
      {
        description: "string",
        id: 1,
        name: "string",
      },
    ],
    shared_workspace: {
      description: "string",
      id: 0,
      name: "string",
    },
  };

  return result.shared_projects;
};

const makeSharedImage = async (value) => {
  const imgList = await getSahredImage(value.id);
  const result = projectStore.useProjects.map((project) => ({
    ...project,
    checked: !!imgList.find((image) => image.id === project.id),
  }));
  projectSharedList.value = result;
};

const handleRowDataClick = (value) => {
  popupState.value = value;
  makeSharedImage(value);
};

// 상태값에 따른 버튼 공유관리/삭제 버튼노출
const showRow = (item) => {
  if (item.status === "error" || item.status === "saving") {
    actionButtons.value = [fetchDeleteButtons];
  } else {
    actionButtons.value = [fetchShareButtons].concat(fetchDeleteButtons);
  }
  handleRowDataClick(item);
};

// 선택한 이미지 이름 ,설명
watch(isImageShareManagePopup, () => {
  myImageName.value = popupState.value.name;
  myDescription.value = popupState.value.description;
});

// 그룹 전체 선택 시
const handleCheckGroupClick = () => {
  const checkedValue = isChkAll.value;
  const updatedList = projectSharedList.value.map((item) => ({
    ...item,
    checked: checkedValue,
  }));
  projectSharedList.value = updatedList;
};

const triggerSharedSuccess = () => {
  isImageShareManagePopup.value = false;

  $useCmFn.onNotify({
    message: "내 이미지 공유 설정이 저장되었습니다.",
    type: "positive",
  });
};
const triggerSharedImageFail = () => {
  isImageShareManagePopup.value = false;
  alertTaskDeleteFailModal.value = false;

  $useCmFn.onNotify({
    message: "이미지 공유 설정에 실패하였습니다. 다시 시도해주세요.",
    type: "negative",
  });
};

// 공유 대상 저장, 공유해제 대상 axios 요청
const handleShareImageRequests = async ({ falseChecked, trueChecked }) => {
  failedRequests.value = []; // 실패리스트

  try {
    await Promise.all(
      trueChecked.map(async (item) => {
        try {
          await ProjectService.postShareWorkspaceImage(
            item.id,
            popupState.value.id
          );
          triggerSharedSuccess();
        } catch (error) {
          failedRequests.value.push({ id: item.id, name: item.name });
          alertTaskDeleteFailModal.value = true;
          console.log(error);
        }
      })
    );
  } catch (error) {
    console.error(error);
  }

  await Promise.all(
    falseChecked.map(async (item) => {
      try {
        await ProjectService.postUnShareWorkspaceImage(
          item.id,
          popupState.value.id
        );
        triggerSharedSuccess();
      } catch (error) {
        failedRequests.value.push({ id: item.id, name: item.name });
        alertTaskDeleteFailModal.value = true;
        console.log(error);
      }
    })
  );
};

// 저장 시 checked true,false 각 배열 분리
const separateByChecked = () => {
  const checked = projectSharedList.value.reduce(
    (acc, item) => {
      const obj = { id: item.id, name: item.name };
      if (item.checked) {
        acc.trueChecked.push(obj);
      } else {
        acc.falseChecked.push(obj);
      }
      return acc;
    },
    { falseChecked: [], trueChecked: [] }
  );

  handleShareImageRequests(checked);
};

const imageShareManageSave = () => {
  separateByChecked();
};
</script>

<style scoped>
.vue3-easy-data-table[data-v-5814f6fe] {
  border: none;
}
</style>
