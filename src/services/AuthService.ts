import { api } from 'src/boot/axios';
import { useAuthStore } from 'src/stores/auth';

interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export default {
  login: async (username: string, password: string): Promise<TokenResponse> => {

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const data = new URLSearchParams();

    data.append('grant_type', 'password');
    data.append('client_id', 'dev');
    data.append('client_secret', 'dev');
    data.append('username', username);
    data.append('password', password);

    try {
      const response = await api.post<TokenResponse>('o/token/', data, { headers });
      const authStore = useAuthStore();

      authStore.setTokens({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      });

      return response.data;
    } catch (error){
      throw error;
    }
  },
  refresh: async (refreshToken: string): Promise<TokenResponse> => {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const data = new URLSearchParams();

    data.append('grant_type', 'refresh_token');
    data.append('client_id', 'dev');
    data.append('client_secret', 'dev');
    data.append('refresh_token', refreshToken);

    try {
      const response = await api.post<TokenResponse>('o/token/', data, { headers });
      const authStore = useAuthStore();

      authStore.setTokens({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
