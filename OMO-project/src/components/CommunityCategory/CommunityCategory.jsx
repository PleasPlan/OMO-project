import styles from "./CommunityCategory.module.css";

export const CommunityCategory = () => (
  <>
    <div className={styles["community-category-container"]}>
      <div className={styles["community-category-title-container"]}>
        <a href="#" className={styles["community-category-mycourse"]}>
          나만의 코스 게시판
        </a>

        <a href="#" className={styles["community-category-worry"]}>
          고민 게시판
        </a>

        <a href="#" className={styles["community-category-free"]}>
          자유 게시판
        </a>

        <a href="#" className={styles["community-category-inquiry"]}>
          문의 게시판
        </a>
      </div>
    </div>
  </>
);
