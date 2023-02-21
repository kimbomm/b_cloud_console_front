import { api } from "boot/axios";

export const UserService = {
  async getMe() {
    const response = await api.get("/users/me");
    return response.data;
  }
};
