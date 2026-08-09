import { Outlet } from 'react-router-dom'; // Outlet 라우터 안에 있는 자손들을 갖고 오게 해주는 것 (컴포넌트)
import Header from '../components/Header/Header';
import GoTop from '../components/GoTop/GoTop';
import Footer from '../components/Footer/Footer';
import useUIStore from '../stores/useUIStore.js';

function AppLayout({ cartCount }) {
  const sheetHeight = useUIStore((state) => state.sheetHeight);

  return (
    <div className="app_layout" style={{ paddingBottom: sheetHeight }}>
      <Header cartCount={cartCount} />
      <Outlet />
      <GoTop />
      <Footer />
    </div>
  );
}

export default AppLayout;
