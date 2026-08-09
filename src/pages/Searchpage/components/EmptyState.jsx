import styles from '../Searchpage.module.css';

function CardSection() {
  return (
    <>
      <div className={styles.no_result}>
        <img
          src="https://d2flpcev1i6zjo.cloudfront.net/image/character/ic-empty-search.png"
          alt="로고"
          width="151"
          height="151"
        />
        <h2>검색하신 상품을 찾지 못했어요</h2>
        <span>다음엔 더 좋은 상품들로 채워볼게요.</span>
      </div>
    </>
  );
}

export default CardSection;
