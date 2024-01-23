import styles from "./MembershipWithdrawal.module.css";

const MembershipWithdrawal = () => (
  <div className={styles["profile-setting-main-membership-withdrawal-container"]}>
    <p className={styles["profile-setting-main-membership-withdrawal-title"]}>탈퇴하기</p>

    <button type="button" className={styles["profile-setting-main-membership-withdrawal-button"]}>
      회원 탈퇴
    </button>
  </div>
);

export default MembershipWithdrawal;
