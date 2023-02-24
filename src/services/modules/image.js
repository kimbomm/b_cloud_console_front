import { api } from "boot/axios";

export const imageService = {
  /**
   * 설명: 내 이미지 가져오기
   * @param { Number } workspaceId 워크스페이스 id
   */
  async getMyImages(workspaceId) {
    const response = await api.get(`/workspaces/${workspaceId}/images/me`);
    return response.data;
  },

  /**
   * 설명: 기본 이미지 가져오기
   */
  async getBaseImages() {
    const response = await api.get("/base-images");
    return response.data;
  },

  /**
   * 설명: 공유받은 이미지 가져오기
   * @param { Number } workspaceId 워크스페이스 id
   */
  async getSharedImages(workspaceId) {
    const response = await api.get(`/workspaces/${workspaceId}/shared-images`);
    return response.data;
  },

  /**
   * 설명: 이미지 삭제하기
   * @param { Number } workspaceId 워크스페이스 id
   * @param { Number } imgId 이미지 id
   */
  async deleteImage(data) {
    const workspaceId = data.workspace_id;
    const imgId = data.image_id;
    const response = await api.delete(`/workspaces/${workspaceId}/images/${imgId}`, data);

    return response.data;
  },

};
