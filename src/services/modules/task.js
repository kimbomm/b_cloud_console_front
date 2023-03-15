import { api } from "boot/axios";

export const TaskService = {
  /**
   * 설명: 태스크 리스트 가져오기
   * @param { number } projectId 프로젝트 id
   * @param { Object } params 검색조건
   */
  async getProjectTasks(projectId, params) {
    const response = await api.get(`/projects/${projectId}/tasks`, params);
    return response.data;
  },

};
