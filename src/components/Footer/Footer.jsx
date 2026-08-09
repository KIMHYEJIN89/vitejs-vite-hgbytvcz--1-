import './Footer.style.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
function Footer() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/member';
  const isSearchPage = location.pathname === '/search';

  if (isSearchPage) return null;

  return (
    <>
      {!isLoginPage && !isSearchPage && (
        <footer className="footer">
          <Link to="/">
            <img
              loading="lazy"
              width="60"
              height="28"
              src="https://d2flpcev1i6zjo.cloudfront.net/image/logo/heo-dak-black-s.png"
              alt="heodak"
            />
          </Link>
          <div>
            <div className="foot_text">
              고객님은 안전거래를 위해 현금 등으로 결제 시 저희 쇼핑몰에서
              가입한 KICC의 구매안전서비스를 이용하실 수 있습니다.
            </div>
            <div className="foot_text">
              허닭에서 판매되는 상품 중에는 허닭에 입점한 개별 판매자가 판매하는
              상품이 포함되어 있습니다. 해당 상품의 경우 ㈜허닭은
              통신판매중개자로서 거래당사자가 아니므로 해당 상품, 상품정보,
              거래에 관하여 어떠한 의무와 책임을 지지 않습니다.
            </div>
          </div>
          <div className="call_center">
            <p>1234-5678</p>
            <dl>
              <dt>전화 상담 시간</dt>
              <dd>13:00~17:00 (주말/공휴일 제외)</dd>
              <dt>채팅 상담 시간</dt>
              <dd>10:00~17:00 (주말/공휴일 제외)</dd>
              <dt>점심시간</dt>
              <dd>12:00 ~ 13:00</dd>
            </dl>
          </div>
        </footer>
      )}
    </>
  );
}

export default Footer;
