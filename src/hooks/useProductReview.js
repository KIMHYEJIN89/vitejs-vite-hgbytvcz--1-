import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
const fetchProductReview = (productId) => {
  return api.get(`/reviews?productId=${productId}`);
};

export const useProductReview = (productId) => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => fetchProductReview(productId),
    enabled: !!productId,
    suspense: true,
    select: (res) => res.data,
  });
};
