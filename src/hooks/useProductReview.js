import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchProductReview = async (productId) => {
  const res = await api.get('/'); // 전체 데이터 받아오기
  const allReviews = res.data.reviews; // 전체 리뷰 배열

  // productId가 일치하는 리뷰만 필터링
  return allReviews.filter((review) => review.productId === Number(productId));
};

export const useProductReview = (productId) => {
  return useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => fetchProductReview(productId),
    enabled: !!productId,
    suspense: true,
  });
};
