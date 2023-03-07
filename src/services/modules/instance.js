import { api } from "boot/axios";

export const InstanceService = {
  /**
   * 설명: 인스턴스 리스트 가져오기
   * @param { number } projectId 프로젝트 id
   * @param { Object } params 검색조건
   */
  async getProjectIntances(projectId, params) {
    const response = await api.get(`/projects/${projectId}/instances`, params);
    return response.data;
  },

};
