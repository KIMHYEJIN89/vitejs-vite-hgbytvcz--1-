import { useState, Suspense, CSSProperties } from 'react';
import BannerSlides from './components/BannerSlides/BannerSlides';
import MainMenu from './components/MainMenu/MainMenu';
import BestSelling from './components/BestSelling/BestSelling';
import NewProducts from './components/NewProducts/NewProducts';
import TimeSale from './components/TimeSale/TimeSale';
import ClipLoader from 'react-spinners/ClipLoader';
import MdPickSection from './components/MdPick/MdPickSection';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'yellow',
  position: 'absolute',
  top: '50%',
  left: 0,
  right: 0,
  zindex: '99',
};
function HomePage() {
  let [loading, setLoading] = useState(true);

  return (
    <>
      <Suspense
        fallback={
          <ClipLoader
            color="##FFE11F"
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }
      >
        {/* <div
          style={{
            padding: '16px',
            textAlign: 'center',
            fontSize: '20px',
            background: 'red',
          }}
        >
          <p style={{ fontSize: '20px', color: '#fff' }}>
            ★★ 포트폴리오용 React ★★
          </p>
        </div> */}
        <BannerSlides />
        <MainMenu />
        <BestSelling />
        <NewProducts />
        <TimeSale />
        <MdPickSection />
      </Suspense>
      {/* <div
        style={{
          padding: '16px',
          textAlign: 'center',
          fontSize: '20px',
          background: 'red',
        }}
      >
        <p style={{ fontSize: '20px', color: '#fff' }}>
          ★★ 포트폴리오용 React ★★
        </p>
      </div> */}
    </>
  );
}

export default HomePage;
