import { useState, useEffect } from 'react';
import { useProducts } from '../../../hooks/useProducts';
import { useProductRecommend } from '../../../hooks/useProductRecommend';
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProductRecommend.module.css';

function ProductRecommend({ data, id }) {
  const { data: products, isError, error } = useProducts();
  const { data: recommend } = useProductRecommend();
  const [currentPage, setCurrentPage] = useState(0);

  const [count, setCount] = useState(3);
  const [viewPage, setViewPage] = useState(1);

  const [isShow, setIsShow] = useState(true);

  const navigate = useNavigate();
  const showDetail = (e, id) => {
    // e.stopPropagation();
    e.preventDefault();

    console.log('아이디값', id);
    navigate(`/products/${id}`);
  };

  const getDisCountRate = (origin_price, sell_price) => {
    // 1. 할인 금액 계산
    const discountAmount = origin_price - sell_price;

    // 2. 할인율(%) 계산 (소수점 버림 처리)
    const discountRate = Math.floor((discountAmount / origin_price) * 100);

    return discountRate;
  };

  const currentCategories = data.categorys;
  const recommendIds = currentCategories.flatMap((cat) => recommend[cat] || []);
  const recommendProducts = products.filter((product) =>
    recommendIds.includes(product.id)
  );

  console.log('추천상품 ', recommendProducts);
  // console.log('추천 상품 길이', recommendProducts.length);

  const totalPage = Math.ceil(recommendProducts.length / 3);

  const handleNewItem = () => {
    if (count > recommendProducts.length) {
      setCount(3);
      setCurrentPage(0);
      setViewPage(1);
    } else {
      setCount((prev) => prev + 3);
      setCurrentPage((prev) => prev + 3);
      setViewPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (recommendProducts.length < 3) {
      setIsShow(false);
    }
  }, [totalPage, ...products]);

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div className="tab_cont" id="productRecommend">
      <h2 className="title">추천 상품이에요</h2>
      {recommendProducts.slice(currentPage, count).map((item) => (
        <div
          className={styles.product_item}
          onClick={(e) => showDetail(e, item.id)}
        >
          <div className={styles.thum}>
            <img src={item.thumbnail} alt="상품 이미지" />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>{item.name}</div>
            <div className={styles.price}>
              <span className={styles.discount}>
                {getDisCountRate(item.origin_price, item.sell_price)}%
              </span>
              <span className={styles.price}>
                {item.sell_price.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>
      ))}

      <div
        className={`${styles.btn_view} 
            ${isShow ? styles.on : ''}`}
      >
        <button type="button" onClick={() => handleNewItem()}>
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
            class="stroke-2"
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          새로운 상품 보기 {viewPage} / {totalPage}
        </button>
      </div>
    </div>
  );
}

export default ProductRecommend;
