import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
const fetchProductBest = () => {
  return api.get(`/best`);
};

export const useProductBest = () => {
  return useQuery({
    queryKey: ['best'],
    queryFn: () => fetchProductBest(),
    suspense: true,
    select: (res) => res.data,
  });
};
