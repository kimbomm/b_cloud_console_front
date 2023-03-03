import { defineStore } from "pinia";
import { ProjectService } from "src/services";

export const useProjectsStore = defineStore("projects", {
  state: () => ({
    workspaceId: null,
    userId: null,

    projects: [],
  }),
  getters: {
    projectMenu(state) {
      const sortedList = state.projects.sort((a, b) => a.id - b.id);
      const projectMenu = sortedList.map((data) => ({
        type: "pjtsub",
        label: data.name,
        path: `workspace/${state.workspaceId}/projects/${data.id}`,
      }));
      return projectMenu;
    },
  },

  actions: {
    async getUserInfo() {
      try {
        const { projects } = await ProjectService.getUserProjects(this.workspaceId, this.userId);
        this.SET_PROJECTS(projects);
      } catch (e) {
        console.log(e);
        return false;
      }
    },

    SET_PROJECTS(projects) {
      this.projects = projects;
    },

  }
});
