import styles from "./NicknameChange.module.css";

const NicknameChange = () => (
  <div className={styles["profile-setting-main-nickname-change-container"]}>
    <p className={styles["profile-setting-main-nickname-change-title"]}>닉네임 변경</p>
    <input type="text" placeholder="닉네임을 입력해주세요." className={styles["profile-setting-main-nickname-change-input"]} />
    <button type="button" className={styles["profile-setting-main-nickname-change-button"]}>
      변경하기
    </button>
  </div>
);

export default NicknameChange;
