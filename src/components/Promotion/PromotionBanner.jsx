import { useProducts } from '../../hooks/useProducts';
import { useMainData } from '../../hooks/useMainData';
import { useParams } from 'react-router-dom';
import styles from './Promotion.module.css';

function PromotionBanner() {
  const { data: main_data } = useMainData();
  const { data, isError, error } = useProducts();

  let { id } = useParams();

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const item = data.find((item) => item.id === Number(id));

  return (
    item && (
      <div className={styles.top_banner}>
        <img src={item.image} />
      </div>
    )
  );
}

export default PromotionBanner;
