import './Header.style.css';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Outlet 라우터
import useAuthStore from '../../stores/useAuthStore.js';

function Header({ cartCount }) {
  const navigate = useNavigate();
  const { isLogin, logout } = useAuthStore();
  const location = useLocation();
  const isLoginPage = location.pathname === '/member';
  const isMain = location.pathname === '/';
  const isCart = location.pathname === '/cart';
  const isEvent = location.pathname.startsWith('/event');
  const isProducts = location.pathname.startsWith('/products');
  const isOrderComplete = location.pathname === '/orderComplete';
  const isSearchPage = location.pathname === '/search';

  const goLogin = () => {
    if (isLogin === true) {
      logout();
      navigate(`/`);
    } else {
      navigate(`/member/`);
    }
  };
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // console.log('장바구니', cart);

  // 검색페이지면 아예 렌더 안함
  if (isSearchPage) return null;

  return (
    <div className="header_wrapper">
      {/* 메인에서만 */}
      {isMain && (
        <>
          <h1 className="logo">
            <Link to="/">
              <img
                src="../../src/assets/images/unity/heo-dak-black.svg"
                alt="로고"
              />
            </Link>
          </h1>

          <div className="right_menu">
            <button type="button" onClick={() => navigate(`/search`)}>
              <span className="blind">검색</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => navigate(`/cart`)}
              className="btn_cart"
            >
              <span className="blind">장바구니</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart_count">{cartCount}</span>
            </button>

            <button type="button" onClick={goLogin}>
              <span> {isLogin ? '로그아웃' : '로그인'}</span>
            </button>
          </div>
        </>
      )}
      {/* 상품 */}
      {(isProducts || isEvent) && (
        <>
          <button onClick={() => navigate(-1)} className="btn_prev">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span className="blind">뒤로가기</span>
          </button>

          <div className="right_menu">
            <button type="button" onClick={() => navigate(`/search`)}>
              <span className="blind">검색</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => navigate(`/cart`)}
              className="btn_cart"
            >
              <span className="blind">장바구니</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart_count">{cart.length}</span>
            </button>
          </div>
        </>
      )}
      {/* 장바구니 */}
      {isCart && (
        <>
          <button onClick={() => navigate(-1)} className="btn_prev">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span className="blind">뒤로가기</span>
          </button>
          <h2>장바구니</h2>

          <div className="right_menu">
            <button type="button" onClick={() => navigate(`/search`)}>
              <span className="blind">검색</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </Link>
          </div>
        </>
      )}

      {/* 주문완료 */}
      {isOrderComplete && (
        <>
          <div className="right_menu">
            <button type="button" onClick={() => navigate(`/search`)}>
              <span className="blind">검색</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </Link>
          </div>
        </>
      )}

      {/* 로그인 */}
      {isLoginPage && (
        <>
          <button onClick={() => navigate(-1)} className="btn_prev">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <span className="blind">뒤로가기</span>
          </button>
        </>
      )}
    </div>
  );
}

export default Header;
