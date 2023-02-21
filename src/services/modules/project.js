import { api } from "boot/axios";

export const ProjectService = {
  /**
   * 설명: 프로젝트 및 workspace 정보 가져오기
   */
  async getProjects() {
    const response = await api.get("/projects");
    return response.data;
  },
};
