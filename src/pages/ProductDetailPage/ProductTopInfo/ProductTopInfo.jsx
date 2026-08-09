import styles from './ProductTopInfo.module.css';
import { useProductReview } from '../../../hooks/useProductReview';

function ProductTopInfo({ data, id }) {
  const { data: reviews } = useProductReview(id);

  const getDisCountRate = (origin_price, sell_price) => {
    // 1. 할인 금액 계산
    const discountAmount = origin_price - sell_price;

    // 2. 할인율(%) 계산 (소수점 버림 처리)
    const discountRate = Math.floor((discountAmount / origin_price) * 100);

    return discountRate;
  };

  return (
    <div className={styles.productInfoSection} id="productInfoSection">
      <div className={styles.productTop}>
        <div className={styles.productBrand}>
          {data.brand}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
        <div className={styles.productRating}>
          <span>
            <svg
              class="   stroke-none  "
              width="12"
              height="12"
              viewBox="0 0 12 12"
            >
              <path
                d="M6.00124 8.85535L3.52178 10.418C3.41092 10.4818 3.30256 10.5084 3.19673 10.4977C3.0909 10.4871 2.99767 10.4499 2.91704 10.3861C2.83641 10.3223 2.77593 10.2346 2.73562 10.123C2.6953 10.0114 2.69026 9.89711 2.7205 9.78018L3.3706 6.86219L1.1784 4.90091C1.08769 4.81587 1.03225 4.71754 1.01209 4.60592C0.991937 4.49431 0.996976 4.38535 1.02721 4.27904C1.05745 4.17274 1.11289 4.08504 1.19352 4.01595C1.27415 3.94685 1.37494 3.90699 1.49589 3.89636L4.36843 3.62529L5.50232 0.850797C5.55272 0.733865 5.62327 0.646166 5.71398 0.587699C5.8047 0.529233 5.90045 0.5 6.00124 0.5C6.10203 0.5 6.19778 0.529233 6.28849 0.587699C6.3792 0.646166 6.44976 0.733865 6.50015 0.850797L7.63405 3.64123L10.5066 3.89636C10.6275 3.90699 10.7283 3.94951 10.809 4.02392C10.8896 4.09833 10.945 4.18869 10.9753 4.29499C11.0055 4.40129 11.008 4.50759 10.9828 4.6139C10.9576 4.7202 10.8997 4.81587 10.809 4.90091L8.63188 6.86219L9.28198 9.78018C9.31221 9.89711 9.30717 10.0114 9.26686 10.123C9.22654 10.2346 9.16607 10.3223 9.08543 10.3861C9.0048 10.4499 8.91157 10.4871 8.80574 10.4977C8.69991 10.5084 8.59156 10.4818 8.48069 10.418L6.00124 8.85535Z"
                fill="#ffc107"
              ></path>
            </svg>
          </span>
          <span>{data.rating}</span>
          <span>({reviews.length})</span>
        </div>
      </div>
      <div className={styles.productName}>{data.name}</div>
      <div className={styles.productOrigin}>원산지 : {data.origin}</div>
      <div className={styles.productPrice}>
        <span className={styles.priceOrigin}>
          {data.origin_price.toLocaleString()}원
        </span>
        <span className={styles.price}>
          <span>{data.sell_price.toLocaleString()}원</span>
          <span className={styles.discountRate}>
            {getDisCountRate(data.origin_price, data.sell_price)}%
          </span>
        </span>
      </div>
    </div>
  );
}

export default ProductTopInfo;
