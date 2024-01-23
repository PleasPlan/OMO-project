import styles from "./CommunityInquiryFilter.module.css";

const CommunityInquiryFilter = () => (
  <div className={styles["inquiry-board-filter-container"]}>
  <a href="#" className={styles["inquiry-board-filter-frequency"]}>
    자주 하는 질문
  </a>
  <span className={styles["inquiry-board-filter-bar"]}>|</span>
  <a href="#" className={styles["inquiry-board-filter-qna"]}>
    QnA
  </a>
</div>
);

export default CommunityInquiryFilter;