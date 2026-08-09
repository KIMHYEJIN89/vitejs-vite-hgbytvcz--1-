import React, { useState, useEffect, useRef } from 'react';
import { useProducts } from '../../../hooks/useProducts';
import useUIStore from '../../../stores/useUIStore';
import CardItem from './CardItem';
import styles from '../Searchpage.module.css';

function CardGrid({ keyword, isGrid, setCount }) {
  const { data, isLoading, isError, error } = useProducts();
  const setSearchCount = useUIStore((state) => state.setSearchCount);

  const filteredItems = data.filter((item) => item.name.includes(keyword));

  setSearchCount(filteredItems.length);

  setCount(filteredItems.length);

  return (
    <>
      <div className={`${styles.item_list} ${isGrid ? styles.grid2 : ''}`}>
        {data
          .filter((item) => item.name.includes(keyword))
          .map((item, index) => (
            <CardItem item={item} key={item.id} />
          ))}
      </div>
    </>
  );
}

export default CardGrid;
