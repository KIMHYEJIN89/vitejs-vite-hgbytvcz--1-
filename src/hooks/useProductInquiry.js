import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
const fetchProductInquiry = (productId) => {
  return api.get(`/inquiry?productId=${productId}`);
};

export const useProductInquiry = (productId) => {
  return useQuery({
    queryKey: ['inquiry', productId],
    queryFn: () => fetchProductInquiry(productId),
    enabled: !!productId,
    suspense: true,
    select: (res) => res.data,
  });
};
