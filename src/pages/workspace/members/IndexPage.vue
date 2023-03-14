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
    <!-- //.chead -->
    <div v-if="onLoad" class="p-body">
      <!-- /* 멤버 - 메인(워크스페이스 관리자) */ -->
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
              :options="options"
              :outlined="true"
              class="w220"
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
              disabled
              :btn-names="'멤버삭제'"
              class="btn"
              >
              <template #prepend>
                <i class="ico plus" />
              </template>
            </c-button>
          </template>
          <template v-else>
            <!-- TODO: TBD 개발 -->
            <!-- <c-button
              :outline="true"
              :size="'medium'"
              :btn-names="'멤버 초대 요청'"
              class="btn"
            >
              <template #prepend>
                <i class="ico plus"></i>
              </template>
            </c-button> -->
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
              <span class="txt" :class="{ noJoin: !item.joined }">{{ item.name }}</span>
              <span v-if="!item.joined" class="n_join_badge">회원가입 미완료</span>
            </div>
          </template>
          <template #item-email="item">
            <span class="txt" :class="{ noJoin: !item.joined }">{{ item.email }}</span>
          </template>
          <template #item-role="item">
            <span class="txt" :class="{ noJoin: !item.joined }">{{ $utils.getRoleName(item.role, "workspace") }}</span>
          </template>
          <template #item-description="item">
            <span class="txt" :class="{ noJoin: !item.joined }">{{ item.description }}</span>
          </template>
          <!-- <template #item-buttons="item">
            <div v-if="actionButtons || item.buttons" class="cell btngroup">
              <c-button
                v-if="item.buttons"
                :btn-names="'초대요청 확인'"
              >
                <span class="txt">{{ item.buttons.name }}</span>
              </c-button>
            </div>
          </template> -->
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
    :message="'프로젝트 멤버 추가'"
  >
    <template #contents>
      <div class="c_group">
        <div class="c_inpgroup">
          <q-select
            outlined
            v-model="shareChipModel"
            placeholder="사용자 이메일 입력"
            use-input
            use-chips
            multiple
            input-debounce="0"
            @new-value="createValue"
            :options="filterOptions"
            @filter="chipFilterFn"
            class="c_inpchip"
          >
            <template v-slot:prepend>
              <q-icon
                name="search"
                class="ico_search"
              />
            </template>
            <template v-slot:append>
              <div class="slotopt"></div>
            </template>
            <template v-slot:no-option>
              <q-item class="no_data">
                <q-item-section>
                  검색 결과 없습니다.
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <div class="c_selectgroup f_start">
            <CDropdown
              v-model:selected="memberSelModel"
              :label="'프로젝트 관리자'"
              :options="memberSelOptions"
              :type="'text'"
            />
          </div>
        </div>
        <q-btn class="c_btn medium add">
          <span class="txt">추가하기</span>
        </q-btn>
      </div>
      <!-- 검색 완료 -->
      <!-- <q-list class="p_list membermng">
        <q-item class="item">
          <i class="ico member" />
          <q-item-section class="item_card">
            <q-item-label class="name">root.choi</q-item-label>
            <q-item-label class="mail">root.choi@kakaobrain.com</q-item-label>
          </q-item-section>
          <CDropdown
            v-model:selected="memberSelModel"
            :label="'멤버'"
            :options="memberSelOptions"
            :type="'text'"
          />
        </q-item>
        <q-item class="item">
          <i class="ico member" />
          <q-item-section class="item_card">
            <q-item-label class="name">김나온</q-item-label>
            <q-item-label class="mail">naon12@gmail.com</q-item-label>
          </q-item-section>
          <CDropdown
            v-model:selected="memberSelModel"
            :label="'멤버'"
            :options="memberSelOptions"
            :type="'text'"
          />
        </q-item>
        <q-item class="item">
          <i class="ico member" />
          <q-item-section class="item_card">
            <q-item-label class="name">김나온</q-item-label>
            <q-item-label class="mail">naon12@gmail.com</q-item-label>
          </q-item-section>
          <CDropdown
            v-model:selected="memberSelModel"
            :label="'멤버'"
            :options="memberSelOptions"
            :type="'text'"
          />
        </q-item>
      </q-list> -->
    </template>
    <template #footer>
      <c-button
        :btn-names="'취소'"
        class="line"
        @click="addMemberModal = false"
      />
      <c-button
        :btn-names="'확인'"
        class="primary"
        @click="addMemberModal = false"
      />
    </template>
  </c-dialog>
  <!-- End : [프로젝트 - 멤버관리] 멤버 - 추가 -->
</template>
<script setup>
import { ref } from "vue";
import { useMeta } from "quasar";
import { useRoute } from "vue-router";
import { useCommonStore } from "stores/useCommonStore.js";
import { WorkspaceService } from "src/services";
import { $utils } from "src/utils/utils";
import CDropdown from "components/common/CDropdown.vue";
import CInputText from "components/common/CInputText.vue";
import CButton from "components/common/CButton.vue";
import CDialog from "components/common/CDialog.vue";
import CPagination from "components/common/CPagination.vue";

const route = useRoute();
const { workspaceId } = route.params;
const { me, myWorkspaces } = useCommonStore();
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

const setMembers = (users) => {
  members.value = users.map((user) => ({
    ...user,
    checked: false,
    disabled: false,
    joined: true
  }));
};
const getMembers = async () => {
  const { users } = await WorkspaceService.getWorkspaceMembers(workspaceId);
  const { role } = await WorkspaceService.getMemberInfo(workspaceId, me.id);
  setMembers(users);
  originMembers.value = users;

  myRole.value = role;
  onLoad.value = true;
};
getMembers();

useMeta(() => ({
  title,
}));

const roleFilter = ref("전체");
const rowPerPaging = ref("10");
const options = ref([
  { label: "역할전체", value: "ALL" },
  { label: "워크스페이스 관리자", value: "manager" },
  { label: "워크스페이스 멤버", value: "member" },
  { label: "정산 관리자", value: "billing_manager" },
]);
const rowPerPagingOptions = ref([
  { label: "10", value: 10 },
  { label: "25", value: 25 },
  { label: "50", value: 50 },
]);

// Table1
// const itemsSelected = ref([]);

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
    member.checked = isAll;
    if (isAll) {
      chkGrp.value.push(member.id);
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

const onSearch = () => {
  const users = $utils.searchList(originMembers.value, ["name", "email"], searchModel.value);
  setMembers(users);
};

const onPaging = () => {
  console.log(">>>>");
};

const addMemberModal = ref(false);
</script>

<style lang="scss" scoped>
@import 'src/css/members';
</style>
