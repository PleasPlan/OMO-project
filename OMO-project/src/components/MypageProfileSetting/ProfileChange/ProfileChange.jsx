import styles from "./ProfileChange.module.css";
import ImgChange from "../../../assets/my-page/setting/white-pencil.png";
import ProfileImg from "../../../assets/profile-img.jpg";

const ProfileChange = () => (
  <div className={styles["profile-setting-main-profile-change-container"]}>
    <p className={styles["profile-setting-main-profile-change-title"]}>프로필 변경</p>
    <img src={ProfileImg} alt="프로필 사진" className={styles["profile-setting-main-profile-change-img"]} />
    <a className={styles["profile-setting-main-profile-change-background"]}></a>
    <img src={ImgChange} alt="이미지 변경" className={styles["profile-setting-main-profile-change-change-img"]} />
    <a href="#" className={styles["profile-setting-main-profile-change-click"]}></a>
  </div>
);

export default ProfileChange;
