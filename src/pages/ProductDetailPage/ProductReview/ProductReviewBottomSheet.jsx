import styles from './ProductReview.module.css';
import React, { useState } from 'react';

function ProductReviewSort({ isOpen, setIsOpen, sortType, setSortType }) {
  const reviewsort = (type) => {
    if (type == 0) {
      setSortType(0);
    } else if (type == 1) {
      setSortType(1);
    } else if (type == 2) {
      setSortType(2);
    }
    close();
  };
  const layerClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={
          isOpen
            ? 'react_modal_sheet review_modal full open'
            : 'react_modal_sheet review_modal full'
        }
      >
        <div className="dim" onClick={layerClose}></div>
        <div className="sheet_wrap">
          <div className="sheet_header">
            <span></span>
            <span></span>
          </div>
          <div className="sheet_content">
            <div className="btn_sort_group">
              <button onClick={() => reviewsort(0)}>
                <p>최신순</p>
                <span style={{ display: sortType === 0 ? 'block' : 'none' }}>
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
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
              </button>
              <button onClick={() => reviewsort(1)}>
                <p>별점높은순</p>
                <span style={{ display: sortType === 1 ? 'block' : 'none' }}>
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
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
              </button>
              <button onClick={() => reviewsort(2)}>
                <p>별점낮은순</p>
                <span style={{ display: sortType === 2 ? 'block' : 'none' }}>
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
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductReviewSort;
