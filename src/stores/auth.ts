// auth.ts
import { defineStore } from 'pinia';
import User from 'src/models/User';
import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    getUser: (state) =>  state.user,
  },
  actions: {
    setTokens(tokens: { accessToken: string; refreshToken: string }) {
      this.accessToken = tokens.accessToken;
      this.refreshToken = tokens.refreshToken;

      // Salva no localStorage
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
    },
    async fetchUser() {
      try {
        const response: AxiosResponse<User> = await api.get(`/get_user_data/?access_token=${this.accessToken}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        this.user = response.data;
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
      }
    },
    clearTokens() {
      this.accessToken = null;
      this.refreshToken = null;
      this.user = null;

      // Remove do localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
  },
});
