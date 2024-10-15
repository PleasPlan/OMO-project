import styles from "./ComeBackList.module.css";

const ComeBackList = () => (
  <div className={styles["comebacklist-button-container"]}>
    <button type="button" className={styles["comebacklist-button"]}>
      목록으로 돌아가기
    </button>
  </div>
);
export default ComeBackList;
