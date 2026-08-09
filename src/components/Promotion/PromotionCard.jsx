import { useProducts } from '../../hooks/useProducts';
import { useMainData } from '../../hooks/useMainData';
import { useParams } from 'react-router-dom';
import styles from './Promotion.module.css';
import { useNavigate } from 'react-router-dom';

function PromotionCard() {
  const { data: main_data } = useMainData();
  const { data, isError, error } = useProducts();

  let { id } = useParams();
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

  const product = data.find((item) => item.id === Number(id));
  const related = data.filter((item) => product.related?.includes(item.id));

  return (
    <div className={styles.item_list}>
      {related.map((item, index) => (
        <div className={styles.item} onClick={(e) => showDetail(e, item.id)}>
          <p className={styles.thum}>
            <img src={item.thumbnail} />
          </p>
          <p className={styles.name}>{item.name}</p>
          <p className={styles.price}>
            <b>{getDisCountRate(item.origin_price, item.sell_price)}%</b>
            {item.sell_price.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PromotionCard;
