import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../../../stores/useAuthStore.js';
import useBottomSheetHeight from '../../../hooks/useBottomSheetHeight';

function ProductBuyAction({ data, setCartCount }) {
  const [count, setCount] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isToastOpen, setIsToastOpen] = useState(false);

  const sheetRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const startTranslate = useRef(0);
  const isDragging = useRef(false);

  const { isLogin, logout } = useAuthStore();
  const [zzimCount, zzimSetCount] = useState(0);
  const navigate = useNavigate();
  const footerRef = useRef(null);

  useBottomSheetHeight(footerRef);

  const handleCount = (type) => {
    if (type == 'minus') {
      if (count <= 1) {
        return;
      } else setCount((prev) => prev - 1);
    } else {
      setCount((prev) => prev + 1);
    }
  };

  const layerClose = () => {
    setIsOpen(false);
    setIsOpen2(false);
  };

  const goLogin = () => {
    navigate(`/member/`);
  };

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;

    // 현재 translateY 가져오는 함수
    const getTranslateY = () => {
      const style = window.getComputedStyle(sheet);
      const matrix = new WebKitCSSMatrix(style.transform);
      return matrix.m42; // Translate Y값
    };

    const handleMouseDown = (e) => {
      isDragging.current = true;
      startY.current = e.clientY; // 시작 위치
      startTranslate.current = getTranslateY();
    };

    const handleMouseMove = (e) => {
      if (!isDragging.current) return;

      currentY.current = e.clientY;
      const distance = currentY.current - startY.current; // 이동거리 = 현재위치 - 시작위치

      let nextY = startTranslate.current + distance; //지금 이동할 최종 위치 = 기존위치(원래 위치) + 이동거리(이번에 움직인 거리)

      // 위로 너무 못 올라가게
      if (nextY < 0) nextY = 0;

      sheet.style.transform = `translateY(${nextY}px)`;
    };

    const handleMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const sheet = sheetRef.current;
      const current = getTranslateY();

      sheet.style.transition = 'transform 0.3s ease';

      if (current > window.innerHeight * 0.3) {
        // 많이 내렸으면 닫힘
        sheet.style.transform = 'translateY(100%)';
        setIsOpen(false);
      } else {
        // 덜 내렸으면 다시 올라감 (튕김 느낌)
        sheet.style.transform = 'translateY(0)';
      }

      setTimeout(() => {
        sheet.style.transition = '';
      }, 300);
    };

    sheet.addEventListener('pointerdown', handleMouseDown);
    document.addEventListener('pointermove', handleMouseMove);
    document.addEventListener('pointerup', handleMouseUp);

    return () => {
      sheet.removeEventListener('pointerdown', handleMouseDown);
      document.removeEventListener('pointermove', handleMouseMove);
      document.removeEventListener('pointerup', handleMouseUp);
    };
  }, []);

  const layerOpen = (type) => {
    if (type === 'login') {
      setIsOpen2(true);
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }

    const sheet = sheetRef.current;
    sheet.style.transform = 'translateY(0)';
  };

  const handleZzim = () => {
    zzimSetCount((prev) => prev + 1);
  };

  const addCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // 1. 같은 상품 찾기 (id 기준)
    const idx = cart.findIndex((item) => item.id === data.id);

    if (idx > -1) {
      // 2. 이미 있으면 qty 증가
      cart[idx] = {
        ...cart[idx],
        qty: cart[idx].qty + count,
      };
    } else {
      // 3. 없으면 새로 추가
      cart.push({
        ...data,
        qty: count,
      });
    }

    // 4. 저장
    localStorage.setItem('cart', JSON.stringify(cart));

    setCartCount(cart.length);
    setIsToastOpen(true);

    setTimeout(() => {
      setIsToastOpen(false);
    }, 3000);
  };

  const getOrderNum = () => {
    const now = new Date();
    const random = Math.floor(Math.random() * 100000);
    const date =
      now.getFullYear().toString().slice(2) +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0');

    return date + random;
  };

  const getOrderDate = () => {
    const now = new Date();

    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');

    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  };

  const goOrderComplete = () => {
    const order = JSON.parse(localStorage.getItem('order')) || [];

    order.push({
      ...data,
      order_num: getOrderNum(),
      order_date: getOrderDate(),
    });

    // 4. 저장
    localStorage.setItem('order', JSON.stringify(order));

    console.log('주문 리스트', order);

    navigate(`/orderComplete`);
  };

  return (
    <>
      <div
        id="pd_bottom_bar"
        className="bottom_sheet_footer full open"
        ref={footerRef}
      >
        <div className="dim" onClick={layerClose}></div>
        <div className="btn_wrap">
          <button
            type="button"
            className="btn_zzim"
            onClick={isLogin ? handleZzim : goLogin}
          >
            <span class="blind">찜하기</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>

            <span className="count">{isLogin ? zzimCount : '찜하기'}</span>
          </button>
          <button
            type="button"
            className="c2"
            onClick={() => layerOpen('payment')}
          >
            <span>구매하기</span>
          </button>
        </div>
      </div>

      <div
        id="pd_buy_modal"
        className={isOpen ? 'react_modal_sheet open' : 'react_modal_sheet'}
      >
        <div className="dim" onClick={layerClose}></div>
        <div className="sheet_wrap" ref={sheetRef}>
          <div className="sheet_header">
            <span></span>
            <span></span>
          </div>
          <div className="sheet_content">
            <article className="pd_info">
              <div className="pd_thumb">
                <img src={data.thumbnail} />
              </div>
              <div className="pd_details">
                <div className="pd_title">
                  [허닭] 오븐구이 닭가슴살바 80g 10팩
                </div>
                <div className="price_info">
                  <div className="pd_qty_sel">
                    <button type="button" onClick={() => handleCount('minus')}>
                      <span className="blind">수량 감소</span>
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
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                    <fieldset>
                      <input type="number" value={count} />
                    </fieldset>
                    <button type="button" onClick={() => handleCount('plus')}>
                      <span className="blind">수량 증가</span>
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
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                      </svg>
                    </button>
                  </div>
                  <div className="price_wrap">
                    <div className="origin_price">
                      <span class="blind">정상가</span>
                      <del>{(data.origin_price * count).toLocaleString()}</del>
                      원
                    </div>
                    <div className="sell_price">
                      <span class="blind">할인가</span>
                      <strong>
                        {(data.sell_price * count).toLocaleString()}
                      </strong>
                      원
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div
        id="pd_payment_bar"
        className={isOpen ? 'bottom_sheet_footer open' : 'bottom_sheet_footer'}
      >
        <div className="payment_summary">
          <strong className="tit">결제금액</strong>
          <strong className="total_amount">
            {(data.sell_price * count).toLocaleString()}원
          </strong>
        </div>
        <div className="btn_wrap">
          <button type="button" className="c1" onClick={() => addCart()}>
            <span>장바구니</span>
          </button>
          <button
            type="button"
            className="c2"
            onClick={isLogin ? goOrderComplete : () => layerOpen('login')}
          >
            <span>바로구매</span>
          </button>
        </div>
      </div>

      <div
        id="login_modal"
        className={isOpen2 ? 'react_modal_sheet open' : 'react_modal_sheet'}
      >
        <div className="dim" onClick={layerClose}></div>
        <div className="sheet_wrap">
          <div className="sheet_header">
            <span></span>
            <span></span>
          </div>
          <div className="sheet_content">
            <h2>
              더 편리한 구매를 위해
              <br />
              로그인하시겠어요?
            </h2>
            <p className="text">
              로그인하고 다양한 쿠폰 혜택과 편리한 쇼핑을 경험해보세요.
            </p>
          </div>
        </div>
      </div>
      <div
        id="login_bar"
        className={isOpen2 ? 'bottom_sheet_footer open' : 'bottom_sheet_footer'}
      >
        <div className="btn_wrap">
          <button type="button" className="c3" onClick={goLogin}>
            <span>로그인</span>
          </button>
        </div>
      </div>

      <div
        id="toast_cart"
        className={isToastOpen ? 'react_toast_popup open' : 'react_toast_popup'}
      >
        <div className="toast_msg">
          <p>장바구니에 담겼습니다.</p>
          <button onClick={() => navigate(`/cart`)}>바로가기</button>
        </div>
      </div>
    </>
  );
}

export default ProductBuyAction;
