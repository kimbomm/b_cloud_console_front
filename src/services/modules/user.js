import { api } from "boot/axios";

export const UserService = {
  async getMe() {
    const response = await api.get("/users/me");
    return response.data;
  },
  async updateMe(payload) {
    const response = await api.patch(`/users/${payload.id}`, payload.body);
    return response.data;
  },
  async getSSHKeys(userId) {
    const response = await api.get(`/users/${userId}/ssh-keys`);
    return response.data;
  },
  async delSSHKeys(userId, sshKey) {
    const response = await api.delete(`/users/${userId}/ssh-keys/${sshKey}`);
    return response.data;
  },
  async getApiKeys(userId) {
    const response = await api.get(`/users/${userId}/api-keys`);
    return response.data;
  },
  async delApiKeys(userId, accessKey) {
    const response = await api.delete(`/users/${userId}/api-keys/${accessKey}`);
    return response.data;
  },
  async createApiKeys(userId) {
    const response = await api.post(`/users/${userId}/api-keys`);
    return response.data;
  },
  async reIssueApiKeys(userId, accessKey) {
    const response = await api.post(`/users/${userId}/api-keys/${accessKey}`);
    return response.data;
  }
};
