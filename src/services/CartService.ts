import Cart from 'src/models/Cart';
import { api } from 'src/boot/axios';

export default function useCartService() {
  const create = async (cart: Cart) => {
    try {
      const { data } = await api.post('carts/', cart, getAuthHeaders());
      return data;
    } catch (error) {
      console.log(error);

      throw new Error(String(error));
    }
  }

  const checkout = async (id: number) => {
    try {
      const { data } = await api.put(`carts/${id}/checkout/`, getAuthHeaders());

      return data;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  const addItem = async (id: number, product: number) => {
    try {

      const { data } = await api.put(`carts/${id}/add/${product}`, getAuthHeaders());

      return data;
    } catch (error) {
      throw new Error(String(error));
    }
  }

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
    create,
    checkout,
    addItem
  }
}
