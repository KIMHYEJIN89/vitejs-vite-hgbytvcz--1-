import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchProductRecommend = async () => {
  const res = await api.get('/');
  return res.data.recommend; // { chicken: [...], steak: [...], meal: [...] }
};

export const useProductRecommend = () => {
  return useQuery({
    queryKey: ['recommend'],
    queryFn: fetchProductRecommend,
    suspense: true,
  });
};
