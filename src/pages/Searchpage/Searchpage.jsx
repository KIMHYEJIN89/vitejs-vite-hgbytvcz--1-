import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import ResultInfo from './components/ResultInfo';
import TagItem from './components/TagItem';
import EmptyState from './components/EmptyState';
import CardGrid from './components/CardGrid';
import useUIStore from '../../stores/useUIStore';
import styles from './Searchpage.module.css';

function Searchpage() {
  const [query, setQuery] = useSearchParams();
  const [isGrid, setIsGrid] = useState(true);
  const keyword = query.get('result') || '';
  const searchCount = useUIStore((state) => state.searchCount);
  const [count, setCount] = useState(0);

  return (
    <>
      <SearchHeader />
      키워드 : {keyword}
      <main className={styles.search_wrap}>
        {!keyword ? (
          <TagItem />
        ) : count <= 0 ? (
          <>
            <ResultInfo
              searchCount={searchCount}
              isGrid={isGrid}
              setIsGrid={setIsGrid}
            />

            <CardGrid keyword={keyword} isGrid={isGrid} setCount={setCount} />
          </>
        ) : (
          <EmptyState />
        )}
      </main>
    </>
  );
}

export default Searchpage;
