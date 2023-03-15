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
