import { ref } from "vue";
import { defineStore } from "pinia";

export const useProjectStore = defineStore("projects", () => {
  const isProjectChange = ref(false);
  const useProjects = ref([]);
  function setUseProjects(projects) {
    useProjects.value = projects;
  }

  function setIsProjectChange(isChange) {
    isProjectChange.value = isChange;
  }

  return {
    useProjects,
    setUseProjects,
    isProjectChange,
    setIsProjectChange,
  };
});

// export const useProjectsStore = defineStore("projects", {
//   state: () => ({
//     workspaceId: null,
//     userId: null,

//     projects: [],
//   }),
//   getters: {
//     // 사이드바 메뉴 리스트 id 내림차순 정렬
//     projectMenu(state) {
//       const sortedList = state.projects.sort((a, b) => a.id - b.id);
//       const projectMenu = sortedList.map((data) => ({
//         type: "pjtsub",
//         label: data.name,
//         path: `workspace/${state.workspaceId}/projects/${data.id}`,
//       }));
//       return projectMenu;
//     },
//   },

//   actions: {
//     // 현재 유저 프로젝트 리스트 출력
//     async getUserInfo() {
//       try {
//         const commonStore = useCommonStore();
//         await UserService.getMe().then((user) => {
//           commonStore.setMe(user);
//           this.userId = commonStore.me.id;
//         });
//       } catch (e) {
//         console.log(e);
//         return false;
//       }

//       try {
//         const { projects } = await ProjectService.getUserProjects(this.workspaceId, this.userId);
//         this.SET_PROJECTS(projects);
//       } catch (e) {
//         console.log(e);
//         return false;
//       }
//     },

//     SET_PROJECTS(projects) {
//       this.projects = projects;
//     },

//   }
// });
