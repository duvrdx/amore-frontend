import useApi from 'src/composables/UseApi';

export default function useProductService() {
  const { list, getById } = useApi('products');

  const getProductById = async (id: number) => getById(id);

  const getProducts = async () => list();

  return {
    getProductById,
    getProducts
  };
}
