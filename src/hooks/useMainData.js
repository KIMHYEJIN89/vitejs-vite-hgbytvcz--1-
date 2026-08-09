import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
const fetchMainData = () => {
  return api.get(`/main_data`);
};

export const useMainData = () => {
  return useQuery({
    queryKey: ['main_data'],
    queryFn: fetchMainData,
    suspense: true,
    select: (res) => res.data,
  });
};
