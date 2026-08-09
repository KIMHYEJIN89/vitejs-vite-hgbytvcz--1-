import { useState, useMemo, useEffect } from 'react';
import { useProductInquiry } from '../../../hooks/useProductInquiry';
import styles from './ProductInquiry.module.css';

function ProductInquiry({ id }) {
  const { data } = useProductInquiry(id);
  const [openIndex, setOpenIndex] = useState(null);
  const [answerOpenIndex, setAnswerOpenIndex] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const inquiry_list = useMemo(() => {
    /* useMemo :: 계산결과 캐싱용 즉 다시 렌더링 */
    if (!data) return [];

    return isChecked ? data.filter((i) => !i.isPrivate) : data;
  }, [data, isChecked]);

  const list = [
    {
      title: '배송/교환/환불 안내',
      content: (
        <ol>
          <li>
            [교환 반품 안내] 교환/반품이 가능한 경우
            <ul>
              <li>
                받으신 상품이 표시,광고 내용 또는 계약 내용과 다른 경우에는
                상품을 받은 날부터 3개월 이내, 그 사실을 알게 된 날부터 30일
                이내에 반품을 요청하실 수 있습니다.
              </li>
              <li>
                상품의 이상이 확인되는 경우, 제품의 정확한 상태를 확인할 수 있는
                사진과 함께 고객센터로 접수 부탁드립니다.
              </li>
              <li>
                상품의 하자나 불량, 판매자의 실수에 의한 교환/반품시 배송비는
                판매자가 부담합니다.
              </li>
            </ul>
          </li>
          <li>
            [교환 반품 안내] 교환/반품이 불가한 경우
            <ul>
              <li>
                (신선/냉동/냉장)제품 특성상 재판매가 불가하여 단순 변심, 주문
                착오로 인한 교환/반품이 불가합니다.
              </li>
              <li>
                (신선/냉동/냉장)수령자 정보 오기재 및 연락 부재로 인해 제품이
                반송/방치/변질된 경우 교환/반품이 불가합니다.
              </li>
              <li>
                (신선/냉동/냉장)맛이나 냄새 등 주관적인 사유로 인한 교환/반품은
                불가합니다.
              </li>
              <li>
                (상온)고객님의 사유로 인한 교환/반품이 발생하는 경우 왕복
                배송비를 부담하실 수 있습니다. 고객센터로 접수 부탁드립니다.
              </li>
              <li>
                (공통)판매자와 협의 없이 임의로 반송되는 경우 교환/반품이 불가할
                수 있습니다.
              </li>
              <li>
                (공통)올바르지 않은 제품 보관, 제품 훼손 등 고객님의 사유로 인해
                상품 가치가 감소한 경우 교환/반품이 불가합니다
              </li>
            </ul>
          </li>
          <li>
            취소 안내
            <ul>
              <li>
                "결제 완료" 단계에서는 마이페이지 &gt; 주문 내역에서 직접 취소
                가능합니다.
              </li>
              <li>
                "배송준비중"부터는 출고를 준비하는 단계로 주문 취소 및 수령자
                정보 수정이 불가합니다.
              </li>
            </ul>
          </li>
        </ol>
      ),
    },
    {
      title: '판매자 정보',
      content: (
        <dl>
          <dt>상호/대표자</dt>
          <dd>(주)허닭 / 김주형</dd>
          <dt>연락처</dt>
          <dd>16611355</dd>
          <dt>E-mail</dt>
          <dd>help@heodak.co.kr</dd>
          <dt>통신판매 신고번호</dt>
          <dd>제2020-서울강남-00165호</dd>
          <dt>사업자번호</dt>
          <dd>2208802497</dd>
        </dl>
      ),
    },
  ];
  return (
    <div className="tab_cont" id="productInquiry">
      <h2 className="title">상품문의 </h2>
      <div className={styles.secret_state}>
        <input
          type="checkbox"
          id="chk_secret"
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <label htmlFor="chk_secret">
          <span>
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
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
          비밀글 제외
        </label>
      </div>

      {inquiry_list.length > 0 ? (
        <div className={styles.answer_list}>
          {inquiry_list.map((item, index) => (
            <div
              className={`${styles.answer_item} 
            ${item.answer != null ? styles.active : ''}
            ${answerOpenIndex === index ? styles.on : ''}`}
            >
              <div className={styles.answer_tit}>
                <p className={styles.answer_state}>
                  <span>
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
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    {item.status}
                  </span>
                  <button
                    className={styles.btn_arrow}
                    key={index}
                    onClick={() =>
                      setAnswerOpenIndex((prev) =>
                        prev === index ? null : index
                      )
                    }
                  >
                    <svg
                      className={styles.arrow}
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
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </p>
                <p className={styles.user_info}>
                  <span className={styles.name}>{item.userNickname}</span>
                  <span className={styles.date}>{item.date}</span>
                </p>
                <p className={styles.question}>{item.question}</p>
              </div>

              <div
                className={`${styles.answer_cont} ${
                  answerOpenIndex === index ? styles.active : ''
                }`}
              >
                <p>
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
                    <polyline points="15 10 20 15 15 20"></polyline>
                    <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
                  </svg>
                  <strong className={styles.cs_name}>{item.cs_name}</strong>
                  {item.cs_date}
                </p>
                <p className={styles.answer}>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.none_box}>
          <p className={styles.text}>
            새로운 문의를 기다리고 있어요!
            <br />
            궁금하신 점을 남겨주시면 친절히 답변해드릴게요
          </p>
        </div>
      )}

      <div className={styles.divider}></div>
      <div className={styles.acod_list}>
        {list.map((item, index) => (
          <div className={styles.acod_item}>
            <div
              className={`${styles.acod_title} ${
                openIndex === index ? styles.active : ''
              }`}
              role="button"
              key={index}
              onClick={() =>
                setOpenIndex((prev) => (prev === index ? null : index))
              }
            >
              <h2>{item.title}</h2>
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
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

            <div className={styles.acod_cont}>
              {openIndex === index && item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductInquiry;
