import styles from './ProductDetailInfo.module.css';
import React, { useState } from 'react';

function ProductDetailInfo({ data, id }) {
  const [open, setOpen] = useState(false);
  const productInfoOpen = () => {
    setOpen(true);
  };
  return (
    <div className="tab_cont" id="productInfo">
      <h2 className="title">상품상세</h2>
      <div className={open && styles.open}>
        <div className={styles.descImages}>
          {data?.description_images.map((item) => (
            <img src={item} alt="" />
          ))}
        </div>

        <div className={styles.btnOpen}>
          <button type="button" onClick={productInfoOpen}>
            상품정보 열기
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
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailInfo;
