import { api } from "boot/axios";

export const AuthService = {
  /**
   * 설명: Google 로그인
   * @param { object } payload
   * @param { string } payload.id_token google login access_token
   * @link http://swagger.bcloud.dev.kakaobrain.com/#/auth/GoogleLogin
   */
  async postGoogleLogin(payload) {
    const response = await api.post("/auth/login/google", payload);
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
