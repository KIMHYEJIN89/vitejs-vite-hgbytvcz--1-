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
import styles from './NewProducts.module.css';

import { Link, useNavigate } from 'react-router-dom';

function NewProducts() {
  const { data: mian_data } = useMainData();
  const { data, isError, error } = useProducts();
  const navigate = useNavigate();

  const showDetail = (e, id) => {
    e.preventDefault();
    console.log('들어옴?');

    navigate(`/event/${id}`);
  };

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className={cmmStyles.section_item}>
      <div className={cmmStyles.section_header}>
        <h2 className={cmmStyles.section_title}>NEW ✨ 신제품 특가</h2>
      </div>

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
        {data
          .filter((item) =>
            mian_data?.new_products.productId?.includes(item.id)
          )
          .map((item) => (
            <SwiperSlide
              className={styles.item}
              onClick={(e) => showDetail(e, item.id)}
            >
              <img src={item.thumbnail} />

              <div className={`${styles.text_wrap} ${styles[item.color]}`}>
                <h2>{item.name}</h2>
                <div className={styles.tag}>{item.tag}</div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default NewProducts;
