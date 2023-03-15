import { api } from "boot/axios";

export const WorkspaceService = {
  /**
   * 설명: 워크스페이스 내 유저 정보 | 권한 등...
   * @param { number } workspaceId 워크스페이스 id
   * @param { number } userId 유저 id
   */
  async getMemberInfo(workspaceId, userId) {
    const response = await api.get(`/workspaces/${workspaceId}/members/${userId}`);
    return response.data;
  },
  /**
   * 설명: 유저 워크스페이스 리스트
   * @param { number } userId 유저 id
   */
  async getUserWorkspaceList(userId) {
    const response = await api.get(`/users/${userId}/workspaces`);
    return response.data;
  },

};
