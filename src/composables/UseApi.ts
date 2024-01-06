import { api } from 'src/boot/axios';
import Entity from 'src/models/Entity';

export default function useApi(url: string) {
  const list = async () => {
    try {
      const { data } = await api.get(url);
      return data;
    } catch (error) {
      throw new Error(String(error));
    }
  };

  const getById = async (id: number) => {
    try {
      const { data } = await api.get(`${url}/${id}`);
      return data;
    } catch (error) {
      throw new Error(String(error));
    }
  };

  const post = async (entity: Entity) => {
    try {
      const { data } = await api.post(`${url}/`, entity);
      return data;
    } catch (error) {
      throw new Error(String(error));
    }
  };

  const update = async (entity: Entity) => {
    try {
      const { data } = await api.put(`${url}/${entity.id}`, entity);
      return data;
    } catch (error) {
      throw new Error(String(error));
    }
  };

  const remove = async (id: number) => {
    try {
      const { data } = await api.delete(`${url}/${id}`);
      return data;
    } catch (error) {
      throw new Error(String(error));
    }
  };

  return {
    list,
    post,
    update,
    remove,
    getById,
  };
}
