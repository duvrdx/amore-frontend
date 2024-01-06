import axios, { AxiosResponse } from 'axios';

interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export const getAddressFromCEP = async (cep: string): Promise<Address> => {
  try {
    const response: AxiosResponse<Address> = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao obter o endereço do CEP.');
  }
};
