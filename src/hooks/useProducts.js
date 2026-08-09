import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
const fetchProduct = () => {
  return api.get(`/products`);
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProduct(),
    suspense: true,
    select: (res) => res.data,
  });
};
