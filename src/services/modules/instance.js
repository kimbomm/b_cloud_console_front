import { api } from "boot/axios";

export const InstanceService = {
  /**
   * 설명: 인스턴스 리스트 가져오기
   * @param { number } projectId 프로젝트 id
   * @param { Object } params 검색조건
   */
  async getProjectIntances(projectId, params) {
    const response = await api.get(`/projects/${projectId}/instances`, { params });
    return response.data;
  },

  /**
   * 설명: 인스턴스 삭제
   * @param { Number } projectId 프로젝트 id
   * @param { Number } instanceId 인스턴스 id
   */
  async deleteIntance(projectId, instanceId) {
    const response = await api.delete(`/projects/${projectId}/instances/${instanceId}`);
    return response.data;
  },

  /**
   * 설명: 인스턴스 정지
   * @param { Number } projectId 프로젝트 id
   * @param { Number } instanceId 인스턴스 id
   */
  async stopIntance(projectId, instanceId) {
    const response = await api.post(`/projects/${projectId}/instances/${instanceId}/stop`);
    return response.data;
  },

  /**
   * 설명: 인스턴스 시작
   * @param { Number } projectId 프로젝트 id
   * @param { Number } instanceId 인스턴스 id
   */
  async startIntance(projectId, instanceId) {
    const response = await api.post(`/projects/${projectId}/instances/${instanceId}/start`);
    return response.data;
  },

};
