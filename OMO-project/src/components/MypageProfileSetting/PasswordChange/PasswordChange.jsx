import styles from "./PasswordChange.module.css";

const PasswordChange = () => (
  <div className={styles["profile-setting-main-password-change-container"]}>
    <p className={styles["profile-setting-main-password-change-title"]}>비밀번호 변경</p>
    <input type="text" placeholder="비밀번호를 입력해주세요." className={styles["profile-setting-main-password-change-input"]} />
    <button type="button" className={styles["profile-setting-main-password-change-button"]}>
      변경하기
    </button>
  </div>
);

export default PasswordChange;
