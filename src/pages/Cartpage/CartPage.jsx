import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore.js';
import styles from './CartPage.module.css';
import useBottomSheetHeight from '../../hooks/useBottomSheetHeight';

function CartPage({ cartCount, setCartCount }) {
  const [items, setItems] = useState([]);
  const { isLogin, logout } = useAuthStore();
  const [checkedIds, setCheckedIds] = useState([]);
  const [checkedDelivery, setChkedDelivery] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  let sell_price = 0;
  let delivery_fee = 0;
  const footerRef = useRef(null);
  const navigate = useNavigate();

  useBottomSheetHeight(footerRef);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    setCartCount(cart.length);

    // 초기세팅
    if (cart) {
      setItems(
        cart.map((item) => ({
          ...item,
          qty: item.qty,
        }))
      );
    }
  }, []);

  useEffect(() => {
    // 장바구니 저장 (items바뀔 때마다 자동 저장)

    localStorage.setItem('cart', JSON.stringify(items));
    setCheckedIds(items.map((item) => item.id));
  }, [items]);

  const totalPrice = items.reduce(
    // 전체 금액 계산
    (acc, item) => acc + item.sell_price * item.qty,

    0
  );

  if (totalPrice > 40000) {
    delivery_fee = 0;
  } else {
    delivery_fee = 3000;
  }
  const handleQty = (type, id) => {
    setItems(
      (
        prev // prev 지금 시점 기준 가장 최신 state, 리액트는 비동기 방식이라서 (모아놨다가 한번에 처리)
      ) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item, // 아이템중의 qty만 바꾸게 하려고 (...item)
                qty: type === 'plus' ? item.qty + 1 : Math.max(1, item.qty - 1), // 최소 1 유지
              }
            : item
        )
    );
  };

  const cartRemove = (id) => {
    console.log('장바구니 삭제', id);
    // console.log('장바구니 type', type);

    // id가 일치하지 않는 아이템만 남겨서 상태 업데이트
    setItems((prev) =>
      prev.length === checkedIds.length
        ? []
        : prev.filter((item) => item.id !== Math.max(...Object.values(id)))
    );

    setCartCount((prev) => prev - checkedIds.length);
  };

  const handleCheck = (id) => {
    setCheckedIds(
      (prev) =>
        prev.includes(id)
          ? prev.filter((v) => v !== id) // 있으면 해제
          : [...prev, id] // 없으면 선택
    );
  };

  const handleAllCheck = () => {
    setCheckedIds(
      (prev) =>
        prev.length === items.length
          ? [] // 다 선택된 상태 전체 해제
          : items.map((item) => item.id) // 아니면 전체 선택
    );
  };
  let chkQty = 0;
  const orderPrice = items.reduce((acc, item) => {
    if (checkedIds.includes(item.id)) {
      if (chkQty < cartCount) {
        chkQty = chkQty + 1;
      } else {
        chkQty = chkQty - 1;
      }
      sell_price =
        acc + item.origin_price * item.qty - (acc + item.sell_price * item.qty);

      return acc + item.sell_price * item.qty;
    }
    return acc;
  }, 0);

  const layerClose = () => {
    setIsOpen(false);
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

    // 1. 같은 상품 찾기 (id 기준)
    const idx = order.findIndex((item) => item.id === items.id);

    order.push({
      ...items,
      origin_price: orderPrice,
      sell_price: sell_price,
      order_num: getOrderNum(),
      order_date: getOrderDate(),
      deliveryFee: delivery_fee,
    });

    // 4. 저장
    localStorage.setItem('order', JSON.stringify(order));

    console.log('주문 리스트', order);

    // 주문완료되면, 장바구니 초기화
    setItems([]);
    setCartCount(0);

    navigate(`/orderComplete`);
  };

  const goLogin = () => {
    navigate(`/member/`);
  };

  // const layerClose = () => {
  //   setIsOpen(false);
  //   setIsOpen2(false);
  // };

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

  return (
    <>
      <main className={styles.cart_wrap}>
        {cartCount > 0 ? (
          <div className={styles.cart_content}>
            <div className={styles.cart_select}>
              <span className="check_label">
                <input
                  type="checkbox"
                  id="allChk"
                  checked={checkedIds.length === items.length}
                  onChange={() => handleAllCheck()}
                />

                <label for="allChk" className="items_center">
                  <span className="check_bx">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="svg_check"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                  전체선택
                </label>
              </span>
              <button
                className="btn_outline"
                onClick={() => cartRemove(checkedIds)}
              >
                선택삭제
              </button>
            </div>
            <div className={styles.cart_group}>
              <div className={styles.group_header}>
                <span className={`check_label ${styles.check_label}`}>
                  <input
                    type="checkbox"
                    id="deliveryChk"
                    checked={checkedIds.length === items.length}
                    onChange={() => handleAllCheck()}
                  />
                  <label for="deliveryChk">
                    <span className={`check_bx ${styles.check_bx}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="svg_check"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span className={styles.delivery_desc}>
                      <span className={styles.title}>
                        <svg width="24" height="24" viewBox="0 0 16 16">
                          <path
                            d="M3.99996 13.3333C3.4444 13.3333 2.97218 13.1388 2.58329 12.75C2.1944 12.3611 1.99996 11.8888 1.99996 11.3333H0.666626V3.99996C0.666626 3.63329 0.797182 3.3194 1.05829 3.05829C1.3194 2.79718 1.63329 2.66663 1.99996 2.66663H11.3333V5.33329H13.3333L15.3333 7.99996V11.3333H14C14 11.8888 13.8055 12.3611 13.4166 12.75C13.0277 13.1388 12.5555 13.3333 12 13.3333C11.4444 13.3333 10.9722 13.1388 10.5833 12.75C10.1944 12.3611 9.99996 11.8888 9.99996 11.3333H5.99996C5.99996 11.8888 5.80552 12.3611 5.41663 12.75C5.02774 13.1388 4.55552 13.3333 3.99996 13.3333ZM3.99996 12C4.18885 12 4.34718 11.9361 4.47496 11.8083C4.60274 11.6805 4.66663 11.5222 4.66663 11.3333C4.66663 11.1444 4.60274 10.9861 4.47496 10.8583C4.34718 10.7305 4.18885 10.6666 3.99996 10.6666C3.81107 10.6666 3.65274 10.7305 3.52496 10.8583C3.39718 10.9861 3.33329 11.1444 3.33329 11.3333C3.33329 11.5222 3.39718 11.6805 3.52496 11.8083C3.65274 11.9361 3.81107 12 3.99996 12ZM12 12C12.1888 12 12.3472 11.9361 12.475 11.8083C12.6027 11.6805 12.6666 11.5222 12.6666 11.3333C12.6666 11.1444 12.6027 10.9861 12.475 10.8583C12.3472 10.7305 12.1888 10.6666 12 10.6666C11.8111 10.6666 11.6527 10.7305 11.525 10.8583C11.3972 10.9861 11.3333 11.1444 11.3333 11.3333C11.3333 11.5222 11.3972 11.6805 11.525 11.8083C11.6527 11.9361 11.8111 12 12 12ZM11.3333 8.66663H14.1666L12.6666 6.66663H11.3333V8.66663Z"
                            fill="#E53935"
                          ></path>
                        </svg>
                        허닭 레드 배송
                      </span>
                      <span className={styles.desc}>
                        상품 유형에 따라 분리배송 될 수 있습니다
                      </span>
                    </span>
                  </label>
                </span>
              </div>
              <div className={styles.group_box}>
                <div className={styles.delivery_info}>
                  <span>
                    지금 주문하면 <span>4/20 (월) 발송</span>
                  </span>
                  {/* <span>
                  오후 12:00까지 주문하면 <span>오늘 (화) 발송</span>
                </span> */}
                </div>
                {items.map((item, index) => (
                  <div className={styles.cart_item} key={item.id || index}>
                    <span className="check_label">
                      <input
                        type="checkbox"
                        id={item.id}
                        checked={checkedIds.includes(item.id)}
                        onChange={() => handleCheck(item.id)}
                      />
                      <label for={item.id} className="items_center">
                        <span className="check_bx">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="svg_check"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                        <span className="blind">선택</span>
                      </label>
                    </span>
                    <div className={styles.item_thumb}>
                      <button>
                        <img src={item.thumbnail} />
                      </button>
                    </div>
                    <div className={styles.item_info}>
                      <p className={styles.item_name}>{item.name}</p>
                      <div className={styles.item_bottom}>
                        <div className={styles.qty}>
                          <button
                            type="button"
                            onClick={() => handleQty('minus', item.id)}
                          >
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
                            <input type="number" value={item.qty} />
                          </fieldset>
                          <button
                            type="button"
                            onClick={() => handleQty('plus', item.id)}
                          >
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

                        <div className={styles.price}>
                          <del>
                            {(item.origin_price * item.qty).toLocaleString()}원
                          </del>
                          <strong>
                            {(item.sell_price * item.qty).toLocaleString()}원
                          </strong>
                        </div>
                      </div>
                    </div>
                    <button
                      className={styles.btn_delete_item}
                      onClick={() => cartRemove(item.id)}
                    >
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
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      <span className="blind">삭제</span>
                    </button>
                  </div>
                ))}

                <div className={styles.cart_summary}>
                  <div>
                    주문금액 <strong>{totalPrice.toLocaleString()}</strong>원 +
                    배송비{' '}
                    <span>
                      {totalPrice > 40000 ? 0 : (3000).toLocaleString()}원
                    </span>
                  </div>
                  <div className={styles.progress_bar}>
                    <div
                      className={styles.progress_bar_fill}
                      style={{
                        width: `${Math.min((totalPrice / 40000) * 100, 100)}%`,
                      }}
                    ></div>
                  </div>
                  <div className={styles.free_shipping}>
                    40,000원 이상 무료배송{' '}
                    <span>
                      {totalPrice > 40000 ? (
                        <>
                          <strong>
                            무료배송 달성 <i>!</i>
                          </strong>
                        </>
                      ) : (
                        `${(40000 - totalPrice).toLocaleString()}원 남음`
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.cart_empty}>
            <div
              className={`${styles.cart_login_banner} ${
                isLogin ? `${styles.open}` : ''
              }`}
            >
              <Link to="/member">
                <p>
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path
                      d="M15.2742 2.5C15.4667 2.5 15.6513 2.56673 15.7874 2.6855C15.9235 2.80427 16 2.96536 16 3.13333V6.61667C15.5187 6.61667 15.0572 6.78348 14.7169 7.08041C14.3766 7.37735 14.1854 7.78007 14.1854 8.2C14.1854 8.61993 14.3766 9.02265 14.7169 9.31959C15.0572 9.61652 15.5187 9.78333 16 9.78333V13.2667C16 13.4346 15.9235 13.5957 15.7874 13.7145C15.6513 13.8333 15.4667 13.9 15.2742 13.9H0.725828C0.533327 13.9 0.348709 13.8333 0.21259 13.7145C0.0764709 13.5957 0 13.4346 0 13.2667C0 9.47019 0 7.19885 0 3.13333C0 2.96536 0.0764709 2.80427 0.21259 2.6855C0.348709 2.56673 0.533327 2.5 0.725828 2.5H15.2742Z"
                      fill="#f44336"
                    ></path>
                    <path
                      d="M15.3196 2.5C15.5001 2.5 15.6731 2.56673 15.8007 2.6855C15.9283 2.80427 16 2.96536 16 3.13333V6.61667C15.5489 6.61667 15.1162 6.78348 14.7972 7.08041C14.4782 7.37735 14.299 7.78007 14.299 8.2C14.299 8.61993 14.4782 9.02265 14.7972 9.31959C15.1162 9.61652 15.5489 9.78333 16 9.78333V13.2667C16 13.4346 15.9283 13.5957 15.8007 13.7145C15.6731 13.8333 15.5001 13.9 15.3196 13.9H12V2.5L15.3196 2.5Z"
                      fill="#ec407a"
                    ></path>
                    <path
                      d="M8.80294 7.31152C8.80294 7.23525 8.78879 7.21009 8.75458 7.16763C8.30751 7.16763 7.74248 7.19909 7.34142 7.15191C7.32019 7.06699 7.3308 7.0835 7.36501 7.00802V6.9121H7.3886C7.39686 6.86964 7.40512 6.82718 7.4122 6.78472H7.43579V6.73676H7.45938V6.68879H7.48297V6.65656H7.50656V6.60859H7.53016C7.54667 6.57636 7.56201 6.5449 7.57852 6.51267C7.6375 6.45055 7.74012 6.40416 7.81798 6.35305C7.83449 6.33733 7.84983 6.32082 7.86634 6.30509H7.91471C7.92296 6.29408 7.93122 6.28386 7.9383 6.27285C7.98666 6.26185 8.03384 6.25162 8.08221 6.24062V6.22489H8.13057V6.20917C8.23438 6.19816 8.33818 6.18794 8.44199 6.17693C8.51866 6.1612 8.97988 6.13997 9.08841 6.1612C9.1639 6.17536 9.2677 6.19816 9.35146 6.20917C9.37151 6.19265 9.39274 6.18636 9.42341 6.17693C9.4647 6.04483 9.52958 5.89701 9.59091 5.7775V5.6973H9.61451C9.62276 5.65484 9.63102 5.61238 9.6381 5.56992C9.6841 5.47557 9.72185 5.43233 9.68646 5.31438C9.64636 5.30888 9.60625 5.30338 9.56614 5.29866V5.28293C9.5107 5.27743 9.45408 5.27193 9.39864 5.26721V5.25148H9.23114V5.23576H8.89613V5.22003C8.64016 5.22554 8.38537 5.23104 8.12939 5.23576V5.25148H7.9383V5.26721H7.86634V5.28293H7.74602V5.29866H7.65048V5.31438H7.57852V5.33011H7.50656V5.34584H7.43461V5.36156H7.38625V5.37729H7.31429V5.39301C7.26593 5.40402 7.21874 5.41424 7.17038 5.42525V5.44097H7.12201V5.4567C7.09017 5.4622 7.05832 5.46771 7.02647 5.47243C7.01821 5.48343 7.00995 5.49366 7.00288 5.50466C6.97103 5.51017 6.93918 5.51567 6.90733 5.52039V5.53611C6.88374 5.54162 6.85896 5.54712 6.83537 5.55184C6.82712 5.56285 6.81886 5.57307 6.81178 5.58408H6.76342C6.75516 5.59508 6.7469 5.60531 6.73983 5.61631C6.71623 5.62182 6.69146 5.62732 6.66787 5.63204C6.64428 5.65327 6.61951 5.6745 6.59591 5.69573H6.54755C6.53929 5.70674 6.53104 5.71696 6.52396 5.72797C6.46852 5.7602 6.4119 5.79165 6.35646 5.82389V5.85613C6.30809 5.88286 6.26091 5.90959 6.21254 5.93633V5.96857C6.19603 5.97407 6.1807 5.97957 6.16418 5.98429C6.15592 6.00002 6.14767 6.01653 6.14059 6.03225H6.117V6.06449C6.10048 6.06999 6.08515 6.0755 6.06863 6.08022C6.06038 6.10145 6.05212 6.12268 6.04504 6.1439C6.02853 6.14941 6.01319 6.15491 5.99668 6.15963C5.98842 6.18086 5.98016 6.20209 5.97309 6.22332H5.94949C5.93298 6.25556 5.91764 6.28701 5.90113 6.31924H5.87754V6.36721H5.85395V6.39944H5.83035V6.44741H5.80676V6.47964H5.78317V6.52761H5.75958V6.57557H5.73599V6.62353H5.71239V6.67149H5.6888V6.73518H5.66521C5.6251 6.81381 5.64398 6.95455 5.56966 7.00645C5.56966 7.11574 5.55197 7.10473 5.49771 7.16606H4.85129C4.77107 7.16606 4.65547 7.15663 4.61183 7.18179C4.58824 7.18729 4.56347 7.1928 4.53987 7.19751C4.48443 7.38386 4.42781 7.57021 4.37237 7.75655C4.35586 7.84147 4.34052 7.92718 4.32401 8.01209H4.30042C4.31811 8.05691 4.34288 8.0577 4.37237 8.09229C4.64958 8.09072 5.08839 8.05691 5.28302 8.12453C5.25943 8.23618 5.23466 8.34783 5.21107 8.45948H5.18747V8.57113H5.16388V8.68279H5.14029V8.73075H5.1167V8.85813H5.09311V8.93833H5.06951V9.01853H5.04592V9.13018H5.02233V9.19386H4.99874C4.99048 9.26306 4.98222 9.33225 4.97515 9.40144H4.95155C4.9433 9.45963 4.93504 9.5186 4.92796 9.57678H4.90437V9.67271H4.88078V9.73639H4.85719C4.84893 9.79458 4.84067 9.85355 4.83359 9.91173H4.81V10.0234H4.78641V10.1193H4.76282V10.1995H4.73923V10.2954H4.71563V10.3914C4.6425 10.551 4.62245 10.7601 4.54813 10.9182V11.0141H4.52454C4.49387 11.0809 4.53398 11.1454 4.47618 11.1894C4.47618 11.261 4.49151 11.2767 4.52454 11.3168H6.15356C6.15356 11.3168 6.20193 11.2775 6.22552 11.2688C6.25855 11.154 6.2963 11.007 6.34584 10.9017V10.79H6.36943V10.6941H6.39302V10.6304H6.41662C6.42487 10.5667 6.43313 10.503 6.44021 10.4385H6.4638V10.3426C6.5216 10.2137 6.54873 10.0383 6.60771 9.91173C6.61597 9.84254 6.62422 9.77335 6.6313 9.70416C6.70444 9.54454 6.72567 9.33539 6.7988 9.17735C6.80706 9.10816 6.81532 9.03897 6.8224 8.96978H6.84599V8.90609H6.86958C6.87784 8.8479 6.8861 8.78893 6.89317 8.73075H6.91676V8.6191H6.94036C6.94861 8.56563 6.95687 8.51295 6.96395 8.45948H6.98754V8.34783H7.01113V8.25191H7.03472V8.18822H7.05832V8.14026H7.08191C7.09842 8.12453 7.11376 8.10802 7.13027 8.09229H8.16006C8.26151 8.09229 8.46204 8.11038 8.51984 8.07657C8.54343 8.07106 8.5682 8.06556 8.59179 8.06084C8.6437 7.87685 8.68144 7.65906 8.7593 7.48608C8.78997 7.41924 8.74986 7.35477 8.80766 7.31074L8.80294 7.31152Z"
                      fill="#e0e0e0"
                    ></path>
                  </svg>
                  로그인하면 10개의 쿠폰을받을 수 있어요
                </p>
                <span>로그인</span>
              </Link>
            </div>
            <div className={styles.empty_inner}>
              <p>
                <img
                  loading="lazy"
                  className="block mx-auto"
                  src="https://d2flpcev1i6zjo.cloudfront.net/image/character/ic-empty-cart.png"
                  width="151"
                  height="151"
                  alt="장바구니 비어있음"
                />
              </p>
              <p className={styles.empty_title}>장바구니가 비어있어요</p>
              <p className={styles.empty_desc}>인기있는 상품을 둘러보세요</p>
              <Link to="" className={styles.btn_primary}>
                <span>
                  베스트 상품 둘러보기
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
                </span>
              </Link>
            </div>
          </div>
        )}

        <div className={styles.cart_notice}>
          <p className={styles.notice_title}>
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
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>{' '}
            장바구니 사용안내
          </p>
          <ul>
            <li>로그인 상태에서 장바구니 상품은 최대 3개월간 저장됩니다.</li>
            <li>
              가격, 옵션 등 상품 정보가 변경된 경우에는 주문이 불가할 수
              있습니다.
            </li>
            <li>
              배송비와 구매 가능 여부는 입력하신 배송지 기준이며, 배송지를
              변경할 경우에는 배송비가 변경되거나 구매가 불가할 수 있습니다.
            </li>
            <li>
              발송 예정일 정보는 물류 및 택배사 사정에 의해서 안내드린 날짜보다
              지연될 수 있습니다.
            </li>
          </ul>
        </div>
      </main>

      <div
        className="bottom_sheet_footer pd_order_bar full open"
        id="pd_order_bar"
        ref={footerRef}
      >
        <div className="dim" onClick={layerClose}></div>
        <div className="total_payment">
          <div className="title">
            주문금액 <span className="qty">{chkQty}건</span>
          </div>
          <div className="total_price">{orderPrice.toLocaleString()}원</div>
        </div>

        <div className="btn_wrap">
          <button
            type="button"
            className="c2"
            onClick={isLogin ? goOrderComplete : () => layerOpen('login')}
          >
            <span>주문하기</span>
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
    </>
  );
}

export default CartPage;
