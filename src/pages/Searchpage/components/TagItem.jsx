import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from '../Searchpage.module.css';

function TagItem({}) {
  const navigate = useNavigate();

  const tagList = [
    '실온닭가슴살',
    '저당닭다리',
    '저당도시락',
    '저당 닭가슴살',
    '현미곤약밥',
    '유부초밥',
    '곤약볶음밥',
    '구운계란',
    '소시지',
    '주먹밥',
    '네네치킨',
    '푸라닭',
    '누구나홀딱',
    '프레시지',
    '오빠닭',
  ];

  return (
    <>
      <h2 className={styles.title}>추천 검색어</h2>
      <div className={styles.tagList}>
        {tagList.map((item, index) => (
          <button
            type="button"
            onClick={() => navigate(`/search?result=${item}`)}
          >
            <span>{item}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export default TagItem;
