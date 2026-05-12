import { api } from "./api";

export const AuthService = {
  login: async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data.user;
  },

  register: async (fullName: string, email: string, password: string) => {
    const response = await api.post("/auth/register", {
      "name": fullName,
      email,
      password,
    });
    return response.data.user;
  },

  logout: async () => {
    await api.post("/auth/logout");
  },

  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};
