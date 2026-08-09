import { useMainData } from '../../../../hooks/useMainData';
import Alert from 'react-bootstrap/Alert';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './BannerSlides.module.css';
import './BannerSlidesSwiper.css';
import { Link, useNavigate } from 'react-router-dom';

function Banner() {
  const { data, isError, error } = useMainData();

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Pagination]}
        loop={true}
        pagination={{
          type: 'fraction',
        }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {data?.main_banners.map((item) => (
          <SwiperSlide className={styles.mainBannerItem}>
            <Link to="">
              <img src={item.image_url} />

              <div className={`${styles.mainBannerText} ${styles[item.color]}`}>
                <p className={styles.eyebrow}>{item.eyebrow}</p>
                <h2>{item.title}</h2>
                <p className={styles.subTitle}>{item.sub_title}</p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Banner;
