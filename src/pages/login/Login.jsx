import styles from "./Login.module.css";
import naver from "../../assets/login/naver-icon.png";
import google from "../../assets/login/google-icon.png";
import kakao from "../../assets/login/kakao-icon.png";
import {useEffect} from "react";

const Login = () => {
  useEffect(() => {
    window.history.replaceState(null, null, window.location.href);
  }, []);

  const handleLogin = (service) => {
    window.location.href = `https://api.oneulmohae.co.kr/oauth2/authorization/${service}`;
  };

  return (
    <>
      <section className={styles["login-container"]}>
        <h2 className={styles["login-title"]}>로그인</h2>

        <div className={styles["login-community-container"]}>
          <button onClick={() => handleLogin("kakao")} className={styles["login-community-kakao"]}>
            <img src={kakao} className={styles["login-community-kakao-icon"]} alt="Kakao Login"></img>
            <span className={styles["login-community-kakao-letter"]}>카카오 로그인</span>
          </button>

          <button onClick={() => handleLogin("naver")} className={styles["login-community-naver"]}>
            <img src={naver} className={styles["login-community-naver-icon"]} alt="Naver Login"></img>
            <span className={styles["login-community-naver-letter"]}>네이버 로그인</span>
          </button>

          <button onClick={() => handleLogin("google")} className={styles["login-community-google"]}>
            <img src={google} className={styles["login-community-google-icon"]} alt="Google Login"></img>
            <span className={styles["login-community-google-letter"]}>구글 로그인</span>
          </button>
        </div>
      </section>
    </>
  );
};

export default Login;
