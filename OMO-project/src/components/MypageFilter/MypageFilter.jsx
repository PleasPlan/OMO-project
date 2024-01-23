import styles from "./MypageFilter.module.css";

const MypageFilter = () => (
  <div className={styles["filter-container"]}>
    <button type="button" className={styles["filter-total"]}>
      전체
    </button>
    <p className={styles["filter-p"]}> | </p>
    <button type="button" className={styles["filter-free"]}>
      자유 게시판
    </button>
    <p className={styles["filter-p"]}> | </p>
    <button type="button" className={styles["filter-worry"]}>
      고민 게시판
    </button>
    <p className={styles["filter-p"]}> | </p>
    <button type="button" className={styles["filter-question"]}>
      문의 게시판
    </button>
  </div>
);

export default MypageFilter;
