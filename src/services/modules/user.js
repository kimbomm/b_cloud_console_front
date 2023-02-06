import { api } from "boot/axios";

export const UserService = {
  async getMe() {
    const response = await api.get("/user/me");
    return response.data;
  }
};
