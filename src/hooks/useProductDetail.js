import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchProductDetail = async (productId) => {
  const res = await api.get('/'); // 전체 데이터 가져오기
  const product = res.data.products.find((p) => p.id === Number(productId));

  if (!product) {
    throw new Error('상품을 찾을 수 없습니다');
  }

  return product;
};

export const useProductDetail = (productId) => {
  return useQuery({
    queryKey: ['product_detail', productId],
    queryFn: () => fetchProductDetail(productId),
    suspense: true,
  });
};
