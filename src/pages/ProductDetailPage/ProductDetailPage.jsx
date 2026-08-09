import { useState, useEffect, Suspense, CSSProperties } from 'react';
import { useProductDetail } from '../../hooks/useProductDetail';
import BannerSlides from './BannerSlides/BannerSlides';
import ProductTopInfo from './ProductTopInfo/ProductTopInfo';
import ProductDelivery from './ProductDelivery/ProductDelivery';
import ProductDetailInfo from './ProductDetailInfo/ProductDetailInfo';
import ProductReview from './ProductReview/ProductReview';
import ProductRecommend from './ProductRecommend/ProductRecommend';
import ProductReviewBottomSheet from './ProductReview/ProductReviewBottomSheet';
import ProductBuyAction from './ProductBuyAction/ProductBuyAction';
import ProductInquiry from './ProductInquiry/ProductInquiry';

import { useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import styles from './ProductDetailPage.module.css';
import './ProductDetailPage.style.css';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: 'yellow',
  position: 'absolute',
  top: '50%',
  left: 0,
  right: 0,
  zindex: '99',
};

function ProductDetailPage({ cartCount, setCartCount }) {
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [sortType, setSortType] = useState(0);

  let { id } = useParams();
  const { data } = useProductDetail(id);
  const [openIndex, setOpenIndex] = useState(0);
  const tabList = [
    { title: '상품정보', id: 'productInfo' },
    { title: '리뷰', id: 'productReview' },
    { title: '추천상품', id: 'productRecommend' },
    { title: '문의', id: 'productInquiry' },
  ];

  const handleTabClick = (index) => (e) => {
    e.preventDefault();

    const target = document.getElementById(tabList[index].id);
    const top = target.offsetTop - 44; // 탭메뉴 높이값;

    setOpenIndex((prev) => (prev === index ? null : index));

    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Suspense
        fallback={
          <ClipLoader
            color="#FFE11F"
            loading={loading}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        }
      >
        <BannerSlides data={data} />
        <ProductTopInfo id={id} data={data} />
        <div className={styles.divider}></div>
        <ProductDelivery data={data} />
        <div className={styles.divider}></div>
        <div className={styles.tab_menu}>
          {tabList.map((item, index) => (
            <a
              href={`#${item.id}`}
              onClick={handleTabClick(index)}
              className={` ${styles.tab} ${
                openIndex === index ? styles.on : ''
              }`}
            >
              {item.title}
            </a>
          ))}
        </div>
        <ProductDetailInfo data={data} />
        <ProductReview id={id} setIsOpen={setIsOpen} sortType={sortType} />
        <ProductRecommend data={data} id={id} />
        <ProductInquiry id={id} />
      </Suspense>
      <ProductReviewBottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        sortType={sortType}
        setSortType={setSortType}
      />
      <ProductBuyAction
        data={data}
        cartCount={cartCount}
        setCartCount={setCartCount}
      />
    </>
  );
}

export default ProductDetailPage;
