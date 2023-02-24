<template>
  <!-- 해상도 1521 보다 작을 경우 class iconMode 추가 -->
  <q-layout ref="input" view="hHh Lpr lff" class="l-wrap l-console" :class="drawer ? '' : 'iconMode'">
    <q-header class="l-header">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="menu" class="c_icon menu" />
        <top-nav />
      </q-toolbar>
    </q-header>

    <div class="drawer-side">
      <q-drawer
        class="l-sidebar"
        v-model="drawer"
        show-if-above
        :width="316"
        :mini-width="80"
      >
        <!-- <q-btn flat @click="drawer = !drawer" round dense icon="menu" class="c_icon menu" /> -->
        <side-bar />
      </q-drawer>
    </div>

    <q-page-container class="l-container">
      <router-view />
    </q-page-container>
    <c-message-box />
  </q-layout>
</template>

<script setup>
import {
  ref,
  onMounted,
  onUnmounted,
  onBeforeUnmount
  // watch
} from "vue";
import { useMeta } from "quasar";
// import { useRoute, useRouter } from "vue-router";
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
const drawer = ref(false);

const scrollFn = () => {
  const rwdSize = ref(window.innerWidth);
  const { body } = document;
  if (rwdSize.value < 1521) {
    body.classList.add("laptop");
  } else {
    body.classList.remove("laptop");
  }
  // console.log(rwdSize.value);
};

onBeforeUnmount(() => {
  window.removeEventListener("resize", scrollFn);
});

onMounted(() => {
  window.addEventListener("resize", scrollFn);
});

onUnmounted(() => {
  window.removeEventListener("resize", scrollFn);
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
