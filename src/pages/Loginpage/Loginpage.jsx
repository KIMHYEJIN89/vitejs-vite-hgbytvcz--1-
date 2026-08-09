import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../stores/useAuthStore.js';
import styles from './Loginpage.module.css';

function Loginpage() {
  const [showPwd, setShowPwd] = useState(false);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (hasKorean.test(id)) {
      alert('아이디에 한글은 사용할 수 없습니다.');
    } else {
      setValidated(true);
      login(id);
      navigate('/');
    }
  };

  useEffect(() => {}, []);

  const togglePwd = () => {
    if (showPwd === true) {
      setShowPwd(false);
    } else {
      setShowPwd(true);
    }
  };

  return (
    <>
      <header></header>
      <main className={styles.login_wrap}>
        <h2 className={styles.logo}>
          <Link to="/">
            <img
              loading="lazy"
              alt="로고"
              src="https://d2flpcev1i6zjo.cloudfront.net/image/logo/heodak-logo-en.svg"
              width="110"
              height="44"
            />
          </Link>
          <span>건강한 한 끼, 지금 바로 시작하세요</span>
        </h2>

        <Form
          className={styles.login_form}
          onSubmit={(event) => handleSubmit(event)}
        >
          <Form.Group
            as={Row}
            className="mb-3"
            type="id"
            onChange={(event) => setId(event.target.value)}
          >
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder="아이디"
                className="input_id"
                required
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          >
            <Col sm="10" className={styles.btn_view}>
              <Form.Control
                type={showPwd ? 'text' : 'password'}
                placeholder="비밀번호"
                className="input_pwd"
                required
              />
              <button type="button" onClick={togglePwd}>
                <>
                  {showPwd ? (
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
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
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
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </>
              </button>
            </Col>
            <Col>
              <div className={styles.btn_login}>
                <button id="pwd" type="submit">
                  로그인
                </button>
              </div>
            </Col>
          </Form.Group>
        </Form>
      </main>
    </>
  );
}

export default Loginpage;
