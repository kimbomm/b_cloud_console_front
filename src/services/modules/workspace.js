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
  }
};
