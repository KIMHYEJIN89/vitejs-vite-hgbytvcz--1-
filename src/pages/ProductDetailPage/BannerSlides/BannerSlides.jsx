import Alert from 'react-bootstrap/Alert';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './BannerSlides.module.css';
import './BannerSlides.style.css';

function BannerSlides({ data }) {
  console.log('data', data);

  return (
    <>
      {' '}
      <Swiper
        // install Swiper modules
        modules={[Pagination]}
      >
        <SwiperSlide className={styles.mainBannerItem}>
          <div>
            <img src={data.thumbnail} />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default BannerSlides;
