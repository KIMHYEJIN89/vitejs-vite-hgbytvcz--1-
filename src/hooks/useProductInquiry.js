import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchProductInquiry = async (productId) => {
  const res = await api.get('/'); // 전체 데이터 받아오기
  const allInquiries = res.data.inquiry; // 전체 문의 배열

  // productId가 일치하는 문의만 필터링
  return allInquiries.filter(
    (inquiry) => inquiry.productId === Number(productId)
  );
};

export const useProductInquiry = (productId) => {
  return useQuery({
    queryKey: ['inquiry', productId],
    queryFn: () => fetchProductInquiry(productId),
    enabled: !!productId,
    suspense: true,
  });
};
