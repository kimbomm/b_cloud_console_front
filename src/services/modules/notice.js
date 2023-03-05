import { api } from "boot/axios";

export const NoticeService = {
  /**
   * 설명: 공지사항 리스트
   */
  async getNotices() {
    const response = await api.get("/notices");
    return response.data;
  },
  /**
   * 설명: 로그아웃
   * @link http://swagger.bcloud.dev.kakaobrain.com/#/auth/Logout
   */
  async postLogout() {
    const response = await api.post("/auth/logout");
    return response.data;
  }
};
