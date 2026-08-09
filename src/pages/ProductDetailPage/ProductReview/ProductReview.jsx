import styles from './ProductReview.module.css';
import React, { useState, useEffect, useMemo } from 'react';
import { useProductReview } from '../../../hooks/useProductReview';

function ProductReview({ id, setIsOpen, sortType }) {
  const { data: reviews } = useProductReview(id);
  const [helpCount, setHeplCount] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [filledCount, setFilledCount] = useState(0);
  const [sortText, setSortText] = useState('최신순');

  // let scoreCount;
  const handleHelp = (reviewId) => {
    setHeplCount((prev) => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1,
    }));
  };

  const list = useMemo(() => {
    const arr = [...(reviews ?? [])];
    if (sortType === 0) {
      setSortText('최신순');
      return arr.sort((a, b) => b.date - a.date);
    } else if (sortType === 1) {
      setSortText('별점높은순');
      return arr.sort((a, b) => b.score - a.score);
    } else if (sortType === 2) {
      setSortText('별점낮은순');
      return arr.sort((a, b) => a.score - b.score);
    }

    return arr;
  }, [reviews, sortType]);

  useEffect(() => {
    getScoreAvg();
  }, []);

  const getScoreAvg = () => {
    const avg = (
      reviews.reduce((sum, item) => sum + item.score, 0) / reviews.length
    ).toFixed(1);

    setTotalScore(avg);
    setFilledCount(Math.floor(avg));
  };

  const scoreCount = reviews.reduce((acc, item) => {
    const score = item?.score;

    acc[score] = (acc[score] || 0) + 1;

    return acc;
  }, {});

  const maxCount = Math.max(...Object.values(scoreCount));

  return (
    <div className="tab_cont" id="productReview">
      <h2 className="title">
        상품 리뷰 <span></span>
      </h2>
      {reviews.length > 0 ? (
        <div className={styles.review_section}>
          <div className={styles.review_score}>
            <div className={styles.score_box}>
              <div className={styles.title}>총 평점</div>

              <div className={styles.score}>{totalScore}</div>
              <div className={styles.star_point}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    className={
                      filledCount > index ? styles.star : styles.disabled
                    }
                    index
                    width="20"
                    height="20"
                    viewBox="0 0 12 12"
                  >
                    <path
                      d="M6.00124 8.85535L3.52178 10.418C3.41092 10.4818 3.30256 10.5084 3.19673 10.4977C3.0909 10.4871 2.99767 10.4499 2.91704 10.3861C2.83641 10.3223 2.77593 10.2346 2.73562 10.123C2.6953 10.0114 2.69026 9.89711 2.7205 9.78018L3.3706 6.86219L1.1784 4.90091C1.08769 4.81587 1.03225 4.71754 1.01209 4.60592C0.991937 4.49431 0.996976 4.38535 1.02721 4.27904C1.05745 4.17274 1.11289 4.08504 1.19352 4.01595C1.27415 3.94685 1.37494 3.90699 1.49589 3.89636L4.36843 3.62529L5.50232 0.850797C5.55272 0.733865 5.62327 0.646166 5.71398 0.587699C5.8047 0.529233 5.90045 0.5 6.00124 0.5C6.10203 0.5 6.19778 0.529233 6.28849 0.587699C6.3792 0.646166 6.44976 0.733865 6.50015 0.850797L7.63405 3.64123L10.5066 3.89636C10.6275 3.90699 10.7283 3.94951 10.809 4.02392C10.8896 4.09833 10.945 4.18869 10.9753 4.29499C11.0055 4.40129 11.008 4.50759 10.9828 4.6139C10.9576 4.7202 10.8997 4.81587 10.809 4.90091L8.63188 6.86219L9.28198 9.78018C9.31221 9.89711 9.30717 10.0114 9.26686 10.123C9.22654 10.2346 9.16607 10.3223 9.08543 10.3861C9.0048 10.4499 8.91157 10.4871 8.80574 10.4977C8.69991 10.5084 8.59156 10.4818 8.48069 10.418L6.00124 8.85535Z"
                      fill="#ffc107"
                    ></path>
                  </svg>
                ))}
              </div>
            </div>
            <div className={styles.graph_box}>
              {[5, 4, 3, 2, 1].map((score, index) => (
                <div className={styles.graph_item}>
                  <div
                    className={`${styles.unit} ${
                      scoreCount[score] === maxCount ? styles.active : ''
                    }`}
                  >
                    {Math.ceil((maxCount / reviews.length) * 100)}%
                  </div>

                  <div className={styles.percent}>
                    <div
                      className={`${styles.bar} ${
                        scoreCount[score] === maxCount ? styles.active : ''
                      }`}
                      style={{ height: `${scoreCount[score || 0] * 10}%` }}
                    ></div>
                  </div>
                  <div className={styles.score}>{5 - index}.0</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.review_content}>
            <div className={styles.review_sort}>
              <div className={styles.review_count}>
                <span>{reviews.length}</span>개의 리뷰
              </div>
              <div className={styles.btn_sort}>
                <button type="button" onClick={() => setIsOpen(true)}>
                  <span>{sortText}</span>
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
                    class=" stroke-2"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
            </div>
            {list.map((item) => (
              <div className={styles.review_item}>
                <div className={styles.point}>
                  <svg
                    class="stroke-none"
                    width="16"
                    height="16"
                    viewBox="0 0 12 12"
                  >
                    <path
                      d="M6.00124 8.85535L3.52178 10.418C3.41092 10.4818 3.30256 10.5084 3.19673 10.4977C3.0909 10.4871 2.99767 10.4499 2.91704 10.3861C2.83641 10.3223 2.77593 10.2346 2.73562 10.123C2.6953 10.0114 2.69026 9.89711 2.7205 9.78018L3.3706 6.86219L1.1784 4.90091C1.08769 4.81587 1.03225 4.71754 1.01209 4.60592C0.991937 4.49431 0.996976 4.38535 1.02721 4.27904C1.05745 4.17274 1.11289 4.08504 1.19352 4.01595C1.27415 3.94685 1.37494 3.90699 1.49589 3.89636L4.36843 3.62529L5.50232 0.850797C5.55272 0.733865 5.62327 0.646166 5.71398 0.587699C5.8047 0.529233 5.90045 0.5 6.00124 0.5C6.10203 0.5 6.19778 0.529233 6.28849 0.587699C6.3792 0.646166 6.44976 0.733865 6.50015 0.850797L7.63405 3.64123L10.5066 3.89636C10.6275 3.90699 10.7283 3.94951 10.809 4.02392C10.8896 4.09833 10.945 4.18869 10.9753 4.29499C11.0055 4.40129 11.008 4.50759 10.9828 4.6139C10.9576 4.7202 10.8997 4.81587 10.809 4.90091L8.63188 6.86219L9.28198 9.78018C9.31221 9.89711 9.30717 10.0114 9.26686 10.123C9.22654 10.2346 9.16607 10.3223 9.08543 10.3861C9.0048 10.4499 8.91157 10.4871 8.80574 10.4977C8.69991 10.5084 8.59156 10.4818 8.48069 10.418L6.00124 8.85535Z"
                      fill="#ffc107"
                    ></path>
                  </svg>
                  <span className={styles.score}>{item.score}.0</span>
                </div>
                <div className={styles.user_info}>
                  <div className={styles.nick_name}>{item.userNickname}</div>
                  <div className={styles.date}>{item.date}</div>
                </div>
                <div className={styles.review_cont}>
                  <div className={styles.content}>{item.content}</div>
                  {/* <div>이미지</div> */}
                </div>
                <div className={styles.review_help}>
                  <div className={styles.text}>리뷰가 도움이 되었나요?</div>
                  <button
                    type="button"
                    className={styles.btn_recom}
                    onClick={() => handleHelp(item.id)}
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
                      class="text-te-03 stroke-2"
                    >
                      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                    </svg>
                    도움돼요
                    <span className={styles.count}>
                      {helpCount[item.id] || 0}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.none_box}>
          <span>{reviews.length}</span>개의 리뷰
          <div className={styles.text}>
            첫번째 리뷰를 기다리고 있어요.
            <br />
            리뷰 작성 시 최대 300원이 지급됩니다.
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductReview;
