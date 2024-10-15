import React, { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode"; // 기본 가져오기 방식으로 수정
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TokenExtension = ({ setIsLoggedIn }) => {
  const [remainingTime, setRemainingTime] = useState({ access: null, refresh: null });
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
  const [isPageFocused, setIsPageFocused] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken && refreshToken) {
      // console.log("로컬스토리지 액세스토큰: ", accessToken);
      // console.log("로컬스토리지 리프레쉬토큰: ", refreshToken);

      const accessExpirationTime = getTokenExpiration(accessToken);
      const refreshExpirationTime = getTokenExpiration(refreshToken);
      if (accessExpirationTime && refreshExpirationTime) {
        // console.log("엑세스토큰 남은시간: ", formatRemainingTime(remainingTime.access));
        // console.log("리프레쉬토큰 남은시간: ", formatRemainingTime(remainingTime.refresh));
        updateRemainingTime(accessExpirationTime, refreshExpirationTime);
        const intervalId = setInterval(() => {
          if (isPageFocused) {
            updateRemainingTime(accessExpirationTime, refreshExpirationTime);
          }
        }, 1000);

        const handleFocus = () => setIsPageFocused(true);
        const handleBlur = () => setIsPageFocused(false);

        window.addEventListener("focus", handleFocus);
        window.addEventListener("blur", handleBlur);

        return () => {
          clearInterval(intervalId);
          window.removeEventListener("focus", handleFocus);
          window.removeEventListener("blur", handleBlur);
        };
      }
    }
  }, [accessToken, refreshToken, isPageFocused]);

  const getTokenExpiration = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return exp * 1000; // 밀리초 단위로 변환
    } catch (error) {
      console.error("토큰 디코딩 실패:", error);
      return null;
    }
  };

  const formatRemainingTime = (timeInSeconds) => {
    if (timeInSeconds <= 0) return "0분 0초";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}분 ${seconds}초`;
  };

  const updateRemainingTime = (accessExpirationTime, refreshExpirationTime) => {
    const currentTime = Date.now();
    const accessTimeLeft = Math.floor((accessExpirationTime - currentTime) / 1000);
    const refreshTimeLeft = Math.floor((refreshExpirationTime - currentTime) / 1000);

    if (accessTimeLeft <= 0 || refreshTimeLeft <= 0) {
      alert("로그아웃 됐습니다.");
      navigate("/Login", { replace: true });
      setIsLoggedIn(false);
      localStorage.setItem("isLoggedIn", "false");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setAccessToken(null);
      setRefreshToken(null);
      setRemainingTime({ access: null, refresh: null });
  
    } else {
      setRemainingTime({
        access: accessTimeLeft,
        refresh: refreshTimeLeft,
      });

      // 30초 남았을 때 갱신 요청을 보내도록 설정
      if (accessTimeLeft <= 30) {
        handleTokenRefresh();
      }
    }
  };

  const handleTokenRefresh = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (!accessToken || !refreshToken) {
        throw new Error("토큰이 없습니다.");
      }

      const response = await axios.get("https://api.oneulmohae.co.kr/reissueToken", {
        headers: {
          Authorization: accessToken,
          Refresh: refreshToken,
        },
      });

      const newAccessToken = response.headers.authorization;
      const newRefreshToken = response.headers.refresh;
      // console.log("새로운 액세스토큰: ", newAccessToken);
      // console.log("새로운 리프레쉬토큰: ", newRefreshToken);

      if (!newAccessToken || !newRefreshToken) {
        throw new Error("새로운 토큰을 받지 못했습니다.");
      }
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
    } catch (error) {
      console.error("토큰 갱신 실패:", error);
    }
  };

  return null;
  // <div className={styles['token-extension-container']}>
  //   <span className={styles['token-extension-time']}>
  //     남은 시간: {remainingTime.access !== null ? formatRemainingTime(remainingTime.access) : '토큰 없음'} <br />
  //     리프레시 토큰 남은 시간: {remainingTime.refresh !== null ? formatRemainingTime(remainingTime.refresh) : '토큰 없음'}
  //   </span>
  //   <button className={styles['token-extension-button']} onClick={handleTokenRefresh}>
  //     연장
  //   </button>
  // </div>
};

export default TokenExtension;
