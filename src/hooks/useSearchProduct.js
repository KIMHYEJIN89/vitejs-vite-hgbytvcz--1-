import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';
const fetchSearchProduct = ({ keyword }) => {
  return api.get(`/search/result?query=${keyword}`);
};

export const useSearchProductQuery = ({ keyword }) => {
  return useQuery({
    queryKey: ['product-search', { keyword }],
    queryFn: () => fetchSearchProduct({ keyword }),
    suspense: true,
    enabled: !!keyword, //키워드가 있을때만 실행
    select: (result) => result.data,
  });
};
