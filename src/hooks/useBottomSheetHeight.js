import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom'; // Outlet 라우터
import useUIStore from '../stores/useUIStore';

const useBottomSheetHeight = (ref) => {
  const setSheetHeight = useUIStore((state) => state.setSheetHeight);
  const location = useLocation();

  useEffect(() => {
    // 초기화
    setSheetHeight(0);

    const timer = setTimeout(() => {
      if (ref.current) {
        const h = ref.current.getBoundingClientRect().height;
        setSheetHeight(h);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [ref, location.pathname]);

  // 페이지 나갈때 초기화
  useEffect(() => {
    return () => {
      // 초기화
      setSheetHeight(0);
    };
  }, []);
};

export default useBottomSheetHeight;
