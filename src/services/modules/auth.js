import { api } from "boot/axios";

export const AuthService = {
  async sampleAuth() {
    const response = await api.get("/category?offset=0&limit=20&contentType=ARTICLE&targetLang=KR");
    return response.data;
  }
};
