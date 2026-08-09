import React, { useState, useEffect, useMemo } from 'react';
import styles from './OrderCompletePage.module.css';

function OrderCompletePage() {
  const [items, setItems] = useState([]);

  const item = items[items.length - 1];

  useEffect(() => {
    const order = JSON.parse(localStorage.getItem('order')) || [];
    console.log('주문주문', order);
    // 초기세팅
    if (order) {
      setItems(
        order.map((item) => ({
          ...item,
        }))
      );
    }
  }, []);

  return (
    <>
      <main className={styles.order_complete_wrap}>
        <div className={styles.complete_text}>
          <h2>주문완료 되었어요.</h2>
          <p>주문 너무 감사해요! 정성껏 준비해서 보내드릴게요</p>
        </div>

        <div className={styles.order_summary}>
          <div className={styles.row}>
            <div className={styles.label}>주문번호</div>
            <div className={styles.value}>{item?.order_num}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>거래일시</div>
            <div className={styles.value}>{item?.order_date}</div>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.order_summary}>
          <div className={`${styles.row} ${styles.total}`}>
            <div className={styles.label}>주문금액</div>
            <div className={styles.value}>
              <span className={styles.price}>
                {item?.origin_price?.toLocaleString()}
              </span>
              <span className={styles.unit}>
                <span className={styles.unit}>원</span>
              </span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>총 상품가격</div>
            <div className={styles.value}>
              {item?.origin_price?.toLocaleString()}
              <span className={styles.unit}>원</span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>배송비</div>
            <div className={styles.value}>
              {item?.deliveryFee?.toLocaleString()}
              <span className={styles.unit}>원</span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>할인금액</div>
            <div className={styles.value}>
              {item?.sell_price?.toLocaleString()}
              <span className={styles.unit}>원</span>
            </div>
          </div>
        </div>

        <div className={styles.order_summary}>
          <div className={`${styles.row} ${styles.total}`}>
            <div className={styles.label}>카드결제</div>
            <div className={styles.value}>
              {item?.sell_price?.toLocaleString()}
              <span className={styles.unit}>원</span>
            </div>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.order_summary}>
          <div className={`${styles.row} ${styles.total}`}>
            <div className={styles.label}>구매 적립</div>
            <div className={styles.value}>
              최대 300<span className={styles.unit}>원</span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.label}>
              <div className={styles.point}>
                리뷰작성 적립
                <p>
                  일반 리뷰 작성시 상품 당 100
                  <span className={styles.unit}>원</span> 적립
                </p>
                <p>
                  포토 리뷰 작성시 상품 당 300
                  <span className={styles.unit}>원</span> 적립
                </p>
              </div>
            </div>
            <div className={styles.value}>
              최대 300<span className={styles.unit}>원</span>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default OrderCompletePage;
