<template>
  <q-page class="p-content p-member p-index">
    <div class="p-head">
      <q-breadcrumbs class="c_breadcrumb" gutter="none">
        <template v-slot:separator>
          <q-icon />
        </template>
        <q-breadcrumbs-el label="Member" to="/members/" />
      </q-breadcrumbs>
      <h1 class="p-title">{{ title }}</h1>
    </div>
    <div v-if="onLoad" class="p-body">
      <div class="table_set">
        <div class="l_set_inner">
          <c-input-text
            outlined
            v-model:value="searchModel"
            placeholder="이름 이메일 검색"
            class="w292"
            @update="onSearch"
            >
              <template #prepend>
                <q-icon name="search" class="ico_search" />
              </template>
            </c-input-text>
            <c-dropdown
              v-model:selected="roleFilter"
              :label="roleFilter"
              :options="roleOptions"
              :outlined="true"
              class="w220"
              @selected="onFilterSelected"
            />
        </div>
        <div class="r_set_inner">
          <template v-if="myRole === 'manager'">
            <c-button
              :outline="true"
              :size="'medium'"
              :btn-names="'멤버추가'"
              class="btn"
              @click="addMemberModal = true"
              >
              <template #prepend>
                <i class="ico plus"></i>
              </template>
            </c-button>
            <c-button
              :size="'medium'"
              :outline="true"
              :disabled="chkGrp.length === 0"
              :btn-names="'멤버삭제'"
              class="btn"
              @click="onRemoveMembers"
              >
              <template #prepend>
                <i class="ico plus" />
              </template>
            </c-button>
          </template>
          <template v-else>
            <!-- TODO: TBD
            <c-button
              :outline="true"
              :size="'medium'"
              :btn-names="'멤버 초대 요청'"
              class="btn"
            >
              <template #prepend>
                <i class="ico plus"></i>
              </template>
            </c-button>
            -->
          </template>
          <c-dropdown
            v-model:selected="rowPerPaging"
            :label="rowPerPaging"
            :options="rowPerPagingOptions"
            :outlined="true"
            class="auto_size"
            />
        </div>
      </div>
      <!-- Table -->
      <div class="table_inner">
        <easy-data-table
          v-if="myRole === 'manager'"
          class="c_table"
          :headers="managerHeader"
          :items="members"
          :hide-footer="true"
          :body-row-class-name="bodyRowClassNameFunction"
          :rows-per-page="rowsPerPage"
          @click-row="onMemberClick"
          empty-message="정보가 없습니다."
        >
          <template #header-checked>
            <q-checkbox
              v-model="checkedAll"
              @click="onChangeAll(checkedAll)"
            />
          </template>
          <template #item-checked="item">
            <q-checkbox
              v-model="chkGrp"
              :val="item.id"
              :disable="item.disabled"
              @click="onChange(item, 'id')"
            />
          </template>
          <template #item-name="item">
            <div class="j-badge">
              <span class="txt" :class="{ noJoin: !item.joined || chkGrp.includes(item.id) }">{{ item.name }}</span>
              <!-- TODO: TBD
              <span v-if="!item.joined || chkGrp.includes(item.id)" class="n_join_badge">회원가입 미완료</span>
              -->
            </div>
          </template>
          <template #item-email="item">
            <span class="txt" :class="{ noJoin: !item.joined || chkGrp.includes(item.id) }">{{ item.email }}</span>
          </template>
          <template #item-role="item">
            <span class="txt" :class="{ noJoin: !item.joined || chkGrp.includes(item.id) }">{{ $utils.getRoleName(item.role) }}</span>
          </template>
          <template #item-description="item">
            <span class="txt" :class="{ noJoin: !item.joined || chkGrp.includes(item.id) }">{{ item.description }}</span>
          </template>
          <!-- TODO: TBD
          <template #item-buttons="item">
            <div v-if="actionButtons || item.buttons" class="cell btngroup">
              <c-button
                v-if="item.buttons"
                :btn-names="'초대요청 확인'"
              >
                <span class="txt">{{ item.buttons.name }}</span>
              </c-button>
            </div>
          </template>
          -->
        </easy-data-table>
        <easy-data-table
          v-else
          :headers="memberHeader"
          :items="members"
          :hide-footer="true"
          :rows-per-page="rowsPerPage"
          empty-message="정보가 없습니다."
          @click-row="showRow"
        >
          <template #item-name="item">
            <span class="txt">{{ item.name.title }}</span>
          </template>
          <template #item-email="item">
            <span class="txt">{{ item.email }}</span>
          </template>
          <template #item-role="item">
            <span class="txt">{{ item.role }}</span>
          </template>
          <template #item-description="item">
            <span class="txt">{{ item.description }}</span>
          </template>
        </easy-data-table>
        <c-pagination @change="onPaging"/>
      </div>
      <!-- //Table -->
    </div>
  </q-page>

  <!-- Start : [프로젝트 - 멤버관리] 멤버 - 추가 -->
  <c-dialog
    v-model:visible="addMemberModal"
    :size="'medium'"
    :message="'워크스페이스 멤버 추가'"
  >
    <template #contents>
      <div class="c_form">
        <section class="section">
          <p class="sub_title">이메일<i class="ess">*</i></p>
          <div class="c_inpgroup">
            <c-input-text
              ref="refFormEmail"
              v-model:value="formAddMember.email"
              :rules="formRules.email"
              placeholder="이름 또는 이메일 입력"
              class="wsize_full"
              outlined
              clearable
            />
          </div>
        </section>
        <section class="section">
          <p class="sub_title">워크스페이스 역할<i class="ess">*</i></p>
          <div class="c_radiogroup f_wrap wsize-50">
            <template v-for="role in roleCodes" :key="role.code">
              <q-radio
                v-if="role.code !== 'guest'"
                v-model="formAddMember.role"
                :val="role.code"
                :label="role.label"
                class="c_radio"
              />
              <template v-else>
                <q-radio
                  v-model="formAddMember.role"
                  :val="role.code"
                  :label="role.label"
                  class="c_radio mr0"
                />
                <q-btn class="ibtn help">
                  <i class="ico help" /><span class="hidden">도움말</span>
                  <q-popup-edit
                    v-model="helpShow"
                    anchor="top middle"
                    self="top middle"
                    class="c_popover"
                  >
                    <div class="inner">
                      게스트는 워크스페이스 멤버 조회 및 프로젝트 생성 기능이 제한됩니다.
                    </div>
                  </q-popup-edit>
                </q-btn>
              </template>
            </template>
          </div>
        </section>
        <section class="section">
          <p class="sub_title">개인 스토리지 용량<i class="ess">*</i></p>
          <div class="c_inpgroup flex-end">
            <c-input-text
              ref="refFormStorage"
              outlined
              v-model:value="formAddMember.storage"
              :rules="formRules.storage"
              type="number"
              placeholder="50GiB 단위 입력"
              clearable
              class="inp_unit"
            >
              <template #append>
                <span class="unit">GiB</span>
              </template>
            </c-input-text>
            <span class="desc">최대 50,000</span>
          </div>
        </section>
      </div>
    </template>
    <template #footer>
      <c-button
        :btn-names="'취소'"
        class="line"
        @click="onResetAddModal"
      />
      <c-button
        :btn-names="'확인'"
        class="primary"
        :disabled="disabledAdd"
        @click="onAddMember"
      />
    </template>
  </c-dialog>
  <!-- End : [프로젝트 - 멤버관리] 멤버 - 추가 -->
</template>
<script setup>
import { ref, computed } from "vue";
import { useMeta } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { $useCmFn } from "src/composables/useCommonFunction";
import { useCommonStore } from "stores/useCommonStore.js";
import { WorkspaceService } from "src/services";
import { $utils } from "src/utils/utils";
import CDropdown from "components/common/CDropdown.vue";
import CInputText from "components/common/CInputText.vue";
import CButton from "components/common/CButton.vue";
import CDialog from "components/common/CDialog.vue";
import CPagination from "components/common/CPagination.vue";

const route = useRoute();
const router = useRouter();
const { workspaceId } = route.params;
const { me, myWorkspaces, getCodes } = useCommonStore();
const myWorkspace = myWorkspaces.filter((item) => item.id === Number(workspaceId))[0];
const title = myWorkspace.name;
const rowsPerPage = ref(10);
const myRole = ref("");
const searchModel = ref("");
const members = ref([]);
const originMembers = ref([]);
const chkGrp = ref([]);
const checkedAll = ref(false);
const onLoad = ref(false);

useMeta(() => ({
  title,
}));

const getOriginData = async () => {
  const { users } = await WorkspaceService.getWorkspaceMembers(workspaceId);
  originMembers.value = users;
  return originMembers.value;
};
const setMembers = (users) => {
  members.value = users.map((user) => ({
    ...user,
    checked: false,
    disabled: me.id === user.id,
    joined: true // TODO: TBD 미회원가입시!
  }));
};
const init = async () => {
  await getOriginData();
  const { role } = await WorkspaceService.getMemberInfo(workspaceId, me.id);
  setMembers(originMembers.value);

  myRole.value = role;
  onLoad.value = true;
};
init();

const roleCodes = getCodes("role").workspace;
const roleOptions = [
  { label: "역할 전체", value: "ALL" },
  { label: "워크스페이스 관리자", value: "manager" },
  { label: "워크스페이스 멤버", value: "member" },
  { label: "정산 관리자", value: "billing_manager" },
];
const roleFilter = ref(roleOptions[0]);

/**
 * 검색 및 필터 이벤트
 * members API 페이징 및 검색 조건 X
 * 동시 처리
 */
const onSearch = async () => {
  const users = await getOriginData();
  // 필터조건
  const filteredUsers = originMembers.value.filter((user) => (roleFilter.value.value !== "ALL"
    ? user.role === roleFilter.value.value
    : users));
  // 검색조건
  const returnUsers = $utils.searchList(filteredUsers, ["name", "email"], searchModel.value);
  setMembers(returnUsers);
};

/**
 * 역할 필터 변경 이벤트
 * @param { object } selectedVal
 * @param { string } selectedVal.label roleOptions.label
 * @param { string } selectedVal.value roleOptions.value
 */
const onFilterSelected = (selectedVal) => {
  console.log("selectedVal >>>", selectedVal);
  onSearch();
};

const rowPerPaging = ref("10");
const rowPerPagingOptions = ref([
  { label: "10", value: 10 },
  { label: "25", value: 25 },
  { label: "50", value: 50 },
]);

const managerHeader = [
  {
    text: "", value: "checked", width: 80
  },
  {
    text: "이름", value: "name", width: 220, sortable: true, checkbox: true
  },
  {
    text: "이메일", value: "email", width: 272, sortable: true
  },
  {
    text: "워크스페이스 역할", value: "role", width: 200, sortable: false
  },
  {
    text: "소개", value: "description", sortable: false
  },
  { text: "", value: "buttons" },
];

const memberHeader = [
  {
    text: "이름", value: "name", width: 266, sortable: true, checkbox: true
  },
  {
    text: "이메일", value: "email", width: 293, sortable: true
  },
  {
    text: "워크스페이스 역할", value: "role", width: 242, sortable: false
  },
  {
    text: "소개", value: "description", sortable: false
  },
];

/**
 * 전체 체크박스 이벤트
 */
const onChangeAll = (isAll) => {
  members.value.forEach((member) => {
    if (!member.disabled) member.checked = isAll;
    if (isAll) {
      if (!member.disabled) chkGrp.value.push(member.id);
    } else {
      chkGrp.value = [];
    }
  });
};
/**
 * 개별 체크박스 이벤트
 */
const onChange = (item, key) => {
  const data = members.value.filter((row) => row.id === item[key])[0];
  data.checked = chkGrp.value.includes(item.id);
};

/**
 * 버튼 및 checkbox 에 대한 이벤트 존재할 시 class 삽입
 */
const bodyRowClassNameFunction = (item) => {
  const classList = [];
  if (item.buttons) classList.push("row-button");
  if (item.checked) classList.push("row-selected");
  if (item.disabled) classList.push("row-disabled");
  return classList.join(" ");
};

const onPaging = () => {
  console.log(">>>>");
};

const addMemberModal = ref(false);
const refFormEmail = ref("");
const refFormStorage = ref("");
const formAddMember = ref({
  user_id: "",
  email: "",
  role: "member",
  storage: null,
});

const onResetAddModal = () => {
  formAddMember.value.email = "";
  formAddMember.value.role = "member";
  formAddMember.value.storage = null;
  addMemberModal.value = false;
};

const onAddMember = async () => {
  try {
    // const params = {
    //   email: formAddMember.value.email,
    //   role: formAddMember.value.role,
    //   storage: formAddMember.value.storage,
    // };
    // WorkspaceService.addWorkspaceMember(workspaceId, params);
    $useCmFn.onNotify({
      message: "신규 멤버가 추가되었습니다.",
      type: "positive"
    });
    onResetAddModal();
    await onSearch();
  } catch (e) {
    $useCmFn.onNotify({
      message: "멤버 추가에 실패하였습니다. 다시 시도해주세요.",
      type: "negative"
    });
    return false;
  }
};

const onRemoveMembers = async () => {
  try {
    $useCmFn.onNotify({
      message: "멤버가 삭제되었습니다.",
      type: "positive"
    });
    await onSearch();
  } catch {
    $useCmFn.onNotify({
      message: "멤버 삭제에 실패하였습니다. 다시 시도해주세요",
      type: "negative"
    });
  }
};

const disabledAdd = computed(() => {
  const emailValid = formAddMember.value.email && !refFormEmail.value?.getHasError;
  const storageValid = formAddMember.value.storage && !refFormStorage.value?.getHasError;
  return !emailValid || !storageValid;
});

const formRules = {
  email: [
    (value) => (!!value) || "이메일을 입력해주세요",
    (value) => $utils.testRegex(value, "email") || "이메일 형식으로 입력해주세요",
  ],
  storage: [
    (value) => (!!value) || "스토리지 용량을 입력해주세요",
    (value) => (value % 50 === 0) || "50GB 단위로 입력해주세요",
    (value) => (value <= 50000) || "할당 가능 용량 초과",
  ]
};

const onMemberClick = (row) => {
  console.log("row >>>", row.id);
  router.push(`/workspace/${workspaceId}/members/${row.id}`);
};
</script>

<style lang="scss" scoped>
@import 'src/css/members';
</style>
