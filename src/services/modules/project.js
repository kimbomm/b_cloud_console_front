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
   * 설명: 프로젝트 상세정보
   * @param { String } workspaceId 워크스페이스 id
   * @param { String } projectId project_id
   */
  async getProject(workspaceId, projectId) {
    const response = await api.get(`/workspaces/${workspaceId}/projects/${projectId}`);
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

  /**
   * 설명: 해당 workspace 의 모든 프로젝트 정보 가져오기
   * @param { number } workspaceId 워크스페이스 id
   */
  async getListProject(workspaceId) {
    const response = await api.get(`/workspaces/${workspaceId}/projects`);
    return response.data;
  },

  /**
   * 설명: 프로젝트 생성
   * @param { String } workspaceId 워크스페이스 id
   * @param { String } description 내용
   * @param { String } name 프로젝트 이름
   */
  async createProject(workspaceId, params) {
    const response = await api.post(`/workspaces/${workspaceId}/projects`, params);
    return response.data;
  },

  /**
   * 설명: 프로젝트 변경
   * @param { String } workspaceId 워크스페이스 id
   * @param { String } description 내용
   * @param { String } name 프로젝트 이름
   */
  async updateProject(workspaceId, projectId, params) {
    const response = await api.put(`/workspaces/${workspaceId}/projects/${projectId}`, params);
    return response.data;
  },

  /**
   * 설명: 이미지 공유 하기
   * @param { String } projectId 워크스페이스 id
   * @param { String } imgId 이미지 id
   */
  async postShareWorkspaceImage(projectId, imgId) {
    const response = await api.post(`/projects/${projectId}/images/${imgId}/share`);
    return response.data;
  },

  /**
   * 설명: 이미지 공유 해제하기
   * @param { number } projectId 워크스페이스 id
   * @param { number } imgId 이미지 id
   */
  async postUnShareWorkspaceImage(projectId, imgId) {
    const response = await api.post(`/projects/${projectId}/images/${imgId}/unshare`);
    return response.data;
  },

  /**
   * 설명: 할당량 변경
   * @param { number } projectId 프로젝트 id
   * @param { number } params 할당량 설정 상세
   */
  async putProjectQuota(projectId, params) {
    const response = await api.put(`/projects/${projectId}/quota`, { params });
    return response.data;
  },

};
