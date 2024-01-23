import styles from "./Header.module.css";
import MainLogo from "../../assets/logo-main.png";

export const Header = () => (
    <>
      <header>
        <div className={styles["main-header-container"]}>
          <ul>
            <li>
              <a href="#">
                <img src={MainLogo} alt="메인 로고" />
              </a>
            </li>
            <li>
              <a href="#">커뮤니티</a>
            </li>
            <li>
              <a href="#">나만의 코스</a>
            </li>
            <li>
              <a href="#">공지사항</a>
            </li>
            <li>
              <a href="#" className={styles["main-header-login"]}>
                로그인
              </a>
            </li>
            <li>
              <a href="#">회원가입</a>
            </li>
          </ul>
        </div>
        <hr />
      </header>
    </>
  );

