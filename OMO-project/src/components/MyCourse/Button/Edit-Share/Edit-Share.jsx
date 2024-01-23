import styles from "./Edit-Share.module.css";

const EditShare = () => (
  <div className={styles["edit-share-button-container"]}>
    <button type="button" className={styles["edit-button"]}>
      편집
    </button>
    <button type="button" className={styles["share-button"]}>
      커뮤니티에 공유
    </button>
  </div>
);
export default EditShare;
