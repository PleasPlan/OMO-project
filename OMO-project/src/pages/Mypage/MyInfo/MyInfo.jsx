import styles from "./MyInfo.module.css";

import Mypage from "../../../components/Mypage/Mypage";
import LogoCircle from "../../../assets/logo-circle.png";
import MyInfoIcon from "../../../assets/my-page/my-info/my-info.png";

const MyInfo = () => (
  <div className={styles["myInfo-total-container"]}>
    <h2 className={styles["myInfo-title-container"]}>
      <img src={MyInfoIcon} alt="내 정보 아이콘" /> 내 정보
    </h2>
    <div className={styles["myInfo-categories-container"]}>
      <Mypage />
      <div className={styles["myInfo-logo-info-container"]}>
        <img className={styles["myInfo-circle-logo"]} src={LogoCircle} alt="동그라미 로고" />
        <div className={styles["myInfo-info-container"]}>
          <div className={styles["myInfo-nickName-container"]}>
            <p>닉네임</p>
            <p className={styles["myInfo-nickName-line"]}>|</p>
            <p>이니</p>
          </div>
          <div className={styles["myInfo-email-container"]}>
            <p>이메일</p>
            <p className={styles["myInfo-email-line"]}>|</p>
            <p>hhi9037@naver.com</p>
          </div>
          <div className={styles["myInfo-birthDay-container"]}>
            <p>생년월일</p>
            <p className={styles["myInfo-birthDay-line"]}>|</p>
            <p>1996-04-16</p>
          </div>
          <div className={styles["myInfo-mbti-container"]}>
            <p>MBTI</p>
            <p className={styles["myInfo-mbti-line"]}>|</p>
            <p>ISTJ</p>
          </div>
        </div>
        <div className={styles["myInfo-status-container"]}>
          <p className={styles["myInfo-status-myStatus"]}>내 정보</p>
          <div className={styles["myInfo-status-heart"]}>
            <p className={styles["myInfo-status-heart-title"]}>내 관심 수</p>
            <p className={styles["myInfo-status-heart-num"]}>4</p>
          </div>
          <div className={styles["myInfo-status-thumb"]}>
            <p className={styles["myInfo-status-thumb-title"]}>내 추천 수</p>
            <p className={styles["myInfo-status-thumb-num"]}>4</p>
          </div>
          <div className={styles["myInfo-status-write"]}>
            <p className={styles["myInfo-status-write-title"]}>내가 쓴 글</p>
            <p className={styles["myInfo-status-write-num"]}>4</p>
          </div>
          <div className={styles["myInfo-status-course"]}>
            <p className={styles["myInfo-status-course-title"]}>나의 코스</p>
            <p className={styles["myInfo-status-course-num"]}>4</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MyInfo;
