import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchSearchProduct = async ({ keyword }) => {
  const res = await api.get('/'); // 전체 데이터 받아오기
  const allProducts = res.data.products;

  // 상품명에 키워드가 포함된 것만 필터링 (대소문자 구분 없이)
  return allProducts.filter((product) =>
    product.name.toLowerCase().includes(keyword.toLowerCase())
  );
};

export const useSearchProductQuery = ({ keyword }) => {
  return useQuery({
    queryKey: ['product-search', { keyword }],
    queryFn: () => fetchSearchProduct({ keyword }),
    suspense: true,
    enabled: !!keyword, // 키워드가 있을 때만 실행
  });
};
