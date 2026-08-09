import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reset.css';
import './App.css';
import './modal.css';

import { Routes, Route } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import HomePage from './pages/Homepage/HomePage';
import Loginpage from './pages/Loginpage/Loginpage';
import Searchpage from './pages/Searchpage/Searchpage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import OrderCompletePage from './pages/OrderCompletepage/OrderCompletePage';
import CartPage from './pages/Cartpage/CartPage';
import EventPage from './pages/Eventpage/EventPage';

function App() {
  const [cartCount, setCartCount] = useState(0);
  return (
    <Routes>
      <Route path="/" element={<AppLayout cartCount={cartCount} />}>
        {/* 홈 */}
        <Route index element={<HomePage />} />

        {/* 상품 */}
        <Route path="products">
          <Route path=":id">
            <Route
              index
              element={<ProductDetailPage setCartCount={setCartCount} />}
            />
          </Route>
        </Route>

        {/* 장바구니 */}
        <Route
          path="cart"
          element={
            <CartPage cartCount={cartCount} setCartCount={setCartCount} />
          }
        />

        {/* 구매완료 */}
        <Route path="orderComplete" element={<OrderCompletePage />} />

        {/* 로그인 */}
        <Route path="member" element={<Loginpage />} />

        {/* 검색 */}
        <Route path="search" element={<Searchpage />} />

        {/* 프로모션 */}
        <Route path="event">
          <Route path=":id">
            <Route index element={<EventPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
