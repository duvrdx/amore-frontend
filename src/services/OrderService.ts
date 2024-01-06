
import { api } from 'src/boot/axios';


export default function useOrderService() {

  const getOrders = async () => {
    try {
      const { data } = await api.get('orders/', getAuthHeaders());
      return data;
    } catch (error) {
      throw new Error(String(error));
    }
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('Token de acesso não encontrado.');
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };


  return {
    getOrders,
  }
}
