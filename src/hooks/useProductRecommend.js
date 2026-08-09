import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
const fetchProductRecommend = () => {
  return api.get(`/recommend`);
};

export const useProductRecommend = () => {
  return useQuery({
    queryKey: ['recommend'],
    queryFn: () => fetchProductRecommend(),
    suspense: true,
    select: (res) => res.data,
  });
};
