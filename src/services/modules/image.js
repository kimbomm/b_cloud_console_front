import { api } from "boot/axios";

export const imageService = {
  /**
   * 설명: 내 이미지 가져오기
   * @param { Number } workspaceId 워크스페이스 id
   * @param { Number } userId 유저 id
   */
  async getMyImages(workspaceId, userId) {
    const response = await api.get(`/workspaces/${workspaceId}/members/${userId}/images`);
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
   * @param { Number } userId 유저 id
   */
  async getSharedImages(workspaceId, userId) {
    const response = await api.get(`/workspaces/${workspaceId}/members/${userId}/shared-images`);
    return response.data;
  },

  /**
   * 설명: 이미지 삭제하기
   * @param { Number } workspaceId 워크스페이스 id
   * @param { Number } imgId 이미지 id
   */
  async deleteImage(workspaceId, imgId, params) {
    const response = await api.delete(`/workspaces/${workspaceId}/images/${imgId}`, params);

    return response.data;
  },

  /**
   * 설명: 공유받은 이미지 정보 가져오기
   * @param { Number } workspaceId 워크스페이스 id
   */
  async getSahredInfoImage(workspaceId, imageId) {
    const response = await api.get(`/workspaces/${workspaceId}/images/${imageId}`);
    return response.data;
  },

};
