import useApi from 'src/composables/UseApi';
import User from 'src/models/User';

export default function useUserService() {
  const { list, post, update, remove, getById } = useApi('users');

  const create = async (user: User) => {
    return await post(user);
  }

  const edit = async (user: User) => {
    return await update(user);
  }

  const removeUser = async (id: number) => {
    return await remove(id);
  }

  const getUserById = async (id: number) => {
    return await getById(id);
  }

  const getUsers = async () => {
    return await list();
  }

  return {
    create,
    edit,
    removeUser,
    getUserById,
    getUsers
  }
}
