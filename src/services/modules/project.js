import { api } from "boot/axios";

export const ProjectService = {
  /**
   * 설명: 프로젝트 및 workspace 정보 가져오기
   */
  async getProjects() {
    const response = await api.get("/projects");
    return response.data;
  },
  /**
   * 설명: workspace 멤버의 프로젝트 가져오기
   * @param { number } workspaceId 워크스페이스 id
   * @param { number } userId 유저 id
   */
  async getUserProjects(workspaceId, userId) {
    const response = await api.get(`/workspaces/${workspaceId}/members/${userId}/projects`);
    return response.data;
  },
};
