import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
const fetchProductDetail = (productId) => {
  return api.get(`/products/${productId}`);
};

export const useProductDetail = (produtId) => {
  return useQuery({
    queryKey: ['product_detail', produtId],
    queryFn: () => fetchProductDetail(produtId),
    suspense: true,
    select: (res) => res.data,
  });
};
