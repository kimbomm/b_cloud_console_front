import { api } from "boot/axios";

export const InstanceService = {

  /**
   * 설명: workspace 멤버의 프로젝트 가져오기
   * @param { number } workspaceId 워크스페이스 id
   * @param { number } userId 유저 id
   */
  async getIntances(projectId, params) {
    const response = await api.get(`/projects/${projectId}/instances`, params);
    return response.data;
  },

};
