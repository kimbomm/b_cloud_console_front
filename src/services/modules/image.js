import { api } from "boot/axios";

export const imageService = {
  /**
   * 설명: 내 이미지 가져오기 List Shared Images
   * @param { string } workspaceId {{workspace_id}}
   */
  async getMyImages(workspaceId) {
    const response = await api.get(`/workspaces/${workspaceId}/images/me`);
    return response.data;
  },

  /**
   * 설명: 기본 이미지 가져오기 List BaseImages
   */
  async getBaseImages() {
    const response = await api.get("/base-images");
    return response.data;
  },

  /**
   * 설명: 공유받은 이미지 가져오기 List Shared Images
   * @param { string } workspaceId {{workspace_id}}
   */
  async getSharedImages(workspaceId) {
    const response = await api.get(`/workspaces/${workspaceId}/shared-images`);
    return response.data;
  },
};
