import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchProduct = async () => {
  const res = await api.get('/'); // 전체 데이터 받아오기
  return res.data.products; // 상품 배열 그대로 반환
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProduct,
    suspense: true,
  });
};
