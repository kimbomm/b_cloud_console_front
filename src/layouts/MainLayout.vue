<template>
  <q-layout ref="input" view="hHh Lpr lff" class="l-wrap l-console"
  :class="{iconMode: drawer, textMode: sideClick}">
    <q-header class="l-header">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" class="c_icon menu" />
        <top-nav
          :workspaces="workspaces"
          @changeWorkspace="changeWorkspace"
        />
      </q-toolbar>
    </q-header>

    <aside class="l-sidebar fixed">
      <q-btn flat @click="sideClick = !sideClick" round dense icon="menu" class="c_icon menu" />
      <side-bar
        :project-menu="projectMenu"
        @updateMenu="updateMenu"
      />
    </aside>

    <q-page-container class="l-container">
      <router-view v-if="isLoaded" />
    </q-page-container>
    <c-message-box />
  </q-layout>
</template>

<script setup>
import {
  ref,
  watch
} from "vue";
import { useMeta } from "quasar";
import {
  UserService,
  WorkspaceService,
  ProjectService,
} from "src/services";
import { useCommonStore } from "stores/useCommonStore.js";
import { useProjectStore } from "stores/useProjectStore.js";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
// import { ProjectService } from "src/services";
// import { $useCmFn } from "src/composables/useCommonFunction.js";
// import { $utils } from "src/utils/utils";
import TopNav from "components/layout/TopNav.vue";
import SideBar from "components/layout/SideBar.vue";
import CMessageBox from "components/common/CMessageBox.vue";

const metaData = {
  title: "Brain Cloud",
  titleTemplate: (title) => `${title} | Brain Cloud`,
};
useMeta(metaData);
const route = useRoute();
const router = useRouter();
const isLoaded = ref(false);
const drawer = ref(false);
const sideClick = ref(false);

const { me } = storeToRefs(useCommonStore());
const { isProjectChange } = storeToRefs(useProjectStore());
const { setMe, setMyWorkspaces } = useCommonStore();
const { setIsProjectChange } = useProjectStore();
const workspaces = ref([]);

const initMe = async () => {
  await UserService.getMe().then((user) => {
    setMe(user);
  }).catch(() => {
    console.log("유저 정보가 없습니다.");
  });
};

/**
 * 설명: 내 워크스페이스 > 프로젝트 목록 가져오기
 */
const projectStore = useProjectStore();
const projectMenu = ref([]);
const getUserProjects = async (workspaceId) => {
  const { projects } = await ProjectService.getUserProjects(workspaceId, me.value.id);
  projectStore.setUseProjects(projects);

  const sortedList = projects.sort((a, b) => a.id - b.id);
  projectMenu.value = sortedList.map((data) => ({
    type: "pjtsub",
    label: data.name,
    path: `workspace/${workspaceId}/projects/${data.id}`,
  }));
};

const updateMenu = () => {
  const { workspaceId } = route.params;
  getUserProjects(workspaceId);
};

/**
 * 설명: 초기화
 */
const init = async () => {
  if (!me.value) await initMe();
  const [workspaceList] = await Promise.all([
    WorkspaceService.getUserWorkspaceList(me.value.id),
  ]);

  const { workspaceId } = route.params;
  await getUserProjects(workspaceId);

  setMyWorkspaces(workspaceList);
  workspaces.value = workspaceList;
  isLoaded.value = true;
};
init();

/**
 * workspace 변경시 이벤트
 */
const changeWorkspace = (workspace) => {
  const workspaceId = workspace.value;
  router.push(`/workspace/${workspaceId}/projects`);
  getUserProjects(workspaceId);
};

/**
 * 설명: 워크스페이스 > 프로젝트 > 대시보드 > 프로젝트 변경시
 */
watch(() => isProjectChange.value, async () => {
  if (isProjectChange.value) {
    await updateMenu();
    await setIsProjectChange(false);
  }
});

// const route = useRoute();
// const router = useRouter();

// const onProtect = () => {
//   const { params } = route;
//   if (!$utils.isBlank(params.workspaceId)) {
//     console.log("route.params::", params);
//   }
// };

// const projects = ref([]);
// const workspaces = ref([]);
// /**
//  * 로그인 직후 workspace 및 project 정보를 통한 router 이동
//  */
// const init = () => {
//   ProjectService.getProjects().then((res) => {
//     projects.value = res.projects;
//     if (!$utils.isBlank(projects.value)) {
//       projects.value = res.projects.map((item) => ({
//         projectId: item.project_id,
//         projectName: item.project_name,
//       }));
//       workspaces.value = res.projects.map((item) => ({
//         workspaceId: item.workspace_id,
//         workspaceName: item.workspace_name,
//       }));
//       router.replace(`/workspace/${projects.value[0].workspace_id}/projects`);
//     } else {
//       $useCmFn.onMessage({
//         message: "소속된 워크스페이스가 없습니다.",
//         description: "워크스페이스 관리자에게 초대를 요청하거나 서비스 이용문의를 남겨주세요",
//         positive: {
//           value: "확인",
//           callback: () => {
//             router.replace("/");
//           }
//         },
//         negative: {
//           value: "서비스 이용문의",
//           callback: () => {
//             console.log("서비스 이용문의 화면으로 이동!!");
//           }
//         }
//       })
//     }
//   }).catch((e) => {
//     console.log(e);
//   });
// };
// init();

// watch(() => route.path, () => {
//   onProtect();
// });
</script>
<style lang="scss" scoped>
</style>
