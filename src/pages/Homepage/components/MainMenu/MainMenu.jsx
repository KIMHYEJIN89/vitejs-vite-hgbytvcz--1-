import { useMainData } from '../../../../hooks/useMainData';
import Alert from 'react-bootstrap/Alert';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar, A11y } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './MainMenu.module.css';

function MainMenu() {
  const { data, isError, error } = useMainData();

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className={styles.menu_item_area}>
      <Swiper
        // install Swiper modules
        modules={[Scrollbar]}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        wrapperClass={styles.swiper_wrap}
      >
        {data?.menu_name.map((item) => (
          <SwiperSlide className={styles.menu_item}>
            <div className={styles.icon}>
              <img src={item.thumbnail} />
            </div>
            <div className={styles.name}>{item.name}</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MainMenu;
