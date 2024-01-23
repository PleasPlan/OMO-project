import styles from "./Login.module.css";
import naver from "../../assets/login/naver-icon.png";
import google from "../../assets/login/google-icon.png";
import kakao from "../../assets/login/kakao-icon.png";

const Login = () => (
  <>
    <section className={styles["login-container"]}>
      <h2 className={styles["login-title"]}>로그인</h2>

      <div className={styles["login-input-container"]}>
        <input className={styles["login-email-input"]} type="text" id="login-email" placeholder="이메일을 입력해주세요." />
        <input className={styles["login-pw-input"]} type="text" id="login-pw" placeholder="비밀번호 입력해주세요." />
      </div>
      <div className={styles["login-find-container"]}>
        <a href="#" className={styles["login-find-id"]}>
          아이디 찾기
        </a>
        <p className={styles["login-find-p"]}> | </p>
        <a href="#" className={styles["login-find-pw"]}>
          비밀번호 찾기
        </a>
      </div>
      <form className={styles["login-btn-container"]}>
        <button type="submit" className={styles["login-btn-login"]}>
          로그인
        </button>
        <button type="submit" className={styles["login-btn-signup"]}>
          회원가입
        </button>
      </form>
      <div className={styles["login-community-container"]}>
        <a href="#" className={styles["login-community-naver"]}>
          <img src={naver}></img>
        </a>
        <a href="#" className={styles["login-community-google"]}>
          <img src={google}></img>
        </a>
        <a href="#" className={styles["login-community-kakao"]}>
          <img src={kakao}></img>
        </a>
      </div>
    </section>
  </>
);

export default Login;
