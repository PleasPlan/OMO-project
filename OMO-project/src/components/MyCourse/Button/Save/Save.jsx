import styles from "./Save.module.css";

const Save = () => (
  <div className={styles["save-button-container"]}>
    <button type="button" className={styles["save-button"]}>
      저장
    </button>
  </div>
);

export default Save;
