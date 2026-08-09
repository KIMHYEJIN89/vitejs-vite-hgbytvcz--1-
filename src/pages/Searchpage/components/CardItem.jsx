import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../Searchpage.module.css';

function CardItem({ item }) {
  const navigate = useNavigate();
  const getDisCountRate = (origin_price, sell_price) => {
    // 1. 할인 금액 계산
    const discountAmount = origin_price - sell_price;

    // 2. 할인율(%) 계산 (소수점 버림 처리)
    const discountRate = Math.floor((discountAmount / origin_price) * 100);

    return discountRate;
  };

  const goDetail = (e, id) => {
    e.preventDefault();
    navigate(`/products/${id}`);
  };

  return (
    <div className={styles.item} onClick={(e) => goDetail(e, item.id)}>
      <p className={styles.thum}>
        <img src={item.thumbnail} />
      </p>
      <div className={styles.info_wrap}>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.price}>
          <b>{getDisCountRate(item.origin_price, item.sell_price)}%</b>
          {item.sell_price.toLocaleString()}
        </p>
        <p
          className={`${styles.flag} ${
            item.deliveryFee === 0 ? `${styles.show}` : ''
          }`}
        >
          <span>{item.deliveryFee === 0 ? '무료배송' : ''}</span>
        </p>
      </div>
    </div>
  );
}

export default CardItem;
