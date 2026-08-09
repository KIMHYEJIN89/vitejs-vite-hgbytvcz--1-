import { useProducts } from '../../../../hooks/useProducts';
import { useMainData } from '../../../../hooks/useMainData';
import Alert from 'react-bootstrap/Alert';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import cmmStyles from '../../HomePage.module.css';
import styles from './TimeSale.module.css';
import './TimeSaleSwiper.css';

import { Link, useNavigate } from 'react-router-dom';

function TimeSale() {
  const { data: mian_data } = useMainData();
  const { data, isError, error } = useProducts();

  const navigate = useNavigate();

  const showDetail = (e, id) => {
    e.preventDefault();
    navigate(`/products/${id}`);
  };

  const getDisCountRate = (origin_price, sell_price) => {
    // 1. 할인 금액 계산
    const discountAmount = origin_price - sell_price;

    // 2. 할인율(%) 계산 (소수점 버림 처리)
    const discountRate = Math.floor((discountAmount / origin_price) * 100);

    return discountRate;
  };

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className={`${cmmStyles.section_item} ${styles.section_item}`}>
      <div className={`${cmmStyles.section_header} ${styles.section_header}`}>
        <h2 className={cmmStyles.section_title}>타임특가 ⏰</h2>
        <div className={styles.time}>3일 23:04</div>
      </div>

      <Swiper
        // install Swiper modules
        className="time_swiper"
        modules={[Pagination]}
        centeredSlides={false}
        loop={true}
        pagination={{
          type: 'fraction',
          className: `${styles.aa}`,
        }}
        spaceBetween={16}
        slidesPerView={1.15}
      >
        {data
          .filter((item) => mian_data?.time_sale.productId?.includes(item.id))
          .map((item) => (
            <SwiperSlide
              className={styles.swiper_slide}
              onClick={(e) => showDetail(e, item.id)}
            >
              <img src={item.thumbnail} />
              <div className={styles.text_wrap}>
                <span className={styles.per}>
                  {' '}
                  {getDisCountRate(item.origin_price, item.sell_price)}%
                </span>
                <div className={styles.title}>{item.name}</div>
                <div className={styles.price}>{item.price}</div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default TimeSale;
