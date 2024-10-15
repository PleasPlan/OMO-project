import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import App from './App';
import "./css/index.css";
import axios from 'axios';
import TokenExtension from './components/TokenExtension/TokenExtension';

const Root = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('https://api.oneulmohae.co.kr/logout', {}, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          Refresh: localStorage.getItem('refreshToken'),
        },
        withCredentials: true,
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('isExistingMember');
      localStorage.removeItem('recentData');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('savedCoordinates');
      alert("로그아웃 되었습니다.");
      navigate("/Login", { replace: true });
      window.history.replaceState(null, null, "/Login");
      setIsLoggedIn(false);
    } catch (error) {
      console.error("로그아웃에 실패하였습니다: ", error);
      alert("로그아웃에 실패하였습니다.");
    }
  };

  return (
    <>
      <TokenExtension setIsLoggedIn={setIsLoggedIn} />
      <App handleLogout={handleLogout} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </>
  );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
);
