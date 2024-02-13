import styles from "./Header.module.css";
import MainLogo from "../../assets/logo-main.png";
import {Link} from "react-router-dom";

export const Header = () => (
  <>
    <header>
      <div className={styles["main-header-container"]}>
        <div>
          <Link to="/">
            <img src={MainLogo} alt="메인 로고" />
          </Link>
        </div>

<div className={styles["main-header-menu-container"]}>

        <div className={styles["main-header-menu-left-container"]}>
          <div>
            <Link to="/MyCourseBoard">커뮤니티</Link>
          </div>
          <div>
            <Link to="/MyCourseMain">나만의 코스</Link>
          </div>
          <div>
            <Link to="/Notice">공지사항</Link>
          </div>
        </div>


        <div className={styles["main-header-menu-right-container"]}>
        <div>
          <Link to="/SignUp" className={styles["main-header-signup"]}>
            회원가입
          </Link>
        </div>
        <div>
          <Link to="/Login" className={styles["main-header-login"]}>
            로그인
          </Link>
        </div>
        <div>
          <Link to="/MyInfo" className={styles["main-header-mypage"]}>
            마이 페이지
          </Link>
        </div>
        </div>

        </div>

      </div>
      <hr />
    </header>
  </>
);
