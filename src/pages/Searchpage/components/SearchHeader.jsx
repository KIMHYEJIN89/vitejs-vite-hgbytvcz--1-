import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from '../Searchpage.module.css';

function SearchHeader() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const searchBykeyword = (event) => {
    event.preventDefault();

    console.log('키워드', keyword);

    //url을 바까주기
    navigate(`/search?result=${keyword}`);
    setKeyword('');
  };

  return (
    <header className={styles.search_header}>
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
      <input
        type="text"
        value={keyword}
        placeholder="검색어를 입력해 주세요"
        onChange={(event) => setKeyword(event.target.value)}
      />
      <button type="button" className={styles.btn_del}>
        <span className="blind">삭제</span>
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path
            d="M9.99996 18.3334C14.6023 18.3334 18.3333 14.6024 18.3333 10C18.3333 5.39765 14.6023 1.66669 9.99996 1.66669C5.39759 1.66669 1.66663 5.39765 1.66663 10C1.66663 14.6024 5.39759 18.3334 9.99996 18.3334Z"
            fill="#e0e0e0"
          ></path>
          <path
            d="M12.5 7.5L7.5 12.5"
            stroke="#ffffff"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M7.5 7.5L12.5 12.5"
            stroke="#ffffff"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
      <button
        type="button"
        className={styles.btn_search}
        onClick={searchBykeyword}
      >
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
    </header>
  );
}

export default SearchHeader;
