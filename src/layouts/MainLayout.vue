<template>
  <q-layout ref="input" view="hHh Lpr lff" class="l-wrap l-console"
  :class="{iconMode: drawer, textMode: sideClick}">
    <q-header class="l-header">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" class="c_icon menu" />
        <top-nav
          :workspaces="topNavMenu"
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
  watch,
  computed,
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
import TopNav from "components/layout/TopNav.vue";
import SideBar from "components/layout/SideBar.vue";
import CMessageBox from "components/common/CMessageBox.vue";
import { $useCmFn } from "src/composables/useCommonFunction";

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
const topNavMenu = computed(() => (workspaces.value
  ? workspaces.value.map((item) => ({ value: item.id, label: item.name }))
  : []));

const initMe = async () => {
  await UserService.getMe().then((user) => {
    setMe(user);
  }).catch(() => {
    $useCmFn.onMessage({
      message: "네트워크 연결을 확인해주세요",
      description: "테스트 사용자는 VPN연결 확인 부탁드립니다.",
      positive: {
        value: "확인",
        callback: () => {
          router.replace("/login");
        }
      }
    });
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

function checkWorkspace() {
  const { workspaceId } = route.params;
  return !!workspaces.value.find((wks) => wks.id === Number(workspaceId));
}

/**
 * 설명: 초기화
 */
const init = async () => {
  if (!me.value) await initMe();
  let workspaceList;
  try {
    workspaceList = await WorkspaceService.getUserWorkspaceList(me.value.id);
    await setMyWorkspaces(workspaceList.workspaces);
    workspaces.value = workspaceList.workspaces;
  } catch (e) {
    $useCmFn.onMessage({
      message: "소속된 워크스페이스가 없습니다.",
      description: "워크스페이스 관리자에게 초대를 요청하거나<br/>서비스 이용문의를 남겨주세요",
      positive: {
        value: "확인",
        callback: () => {
          router.replace("/login");
        }
      },
      negative: {
        value: "서비스 이용문의",
        callback: () => {
          router.replace("/login");
        }
      }
    });
  }
  const { workspaceId } = route.params;

  if (workspaceId && checkWorkspace()) {
    await getUserProjects(workspaceId || 1);
  } else {
    await getUserProjects(workspaces.value[0].id);
    await router.replace(`/workspace/${workspaces.value[0].id}/projects`);
  }

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

/**
 * user가 임의로 workspaceId 변경시
 */
watch(() => route.params.workspaceId, async () => {
  if (!checkWorkspace()) {
    router.replace(`/workspace/${workspaces.value[0].id}/projects`);
  }
});
</script>
<style lang="scss" scoped>
</style>
