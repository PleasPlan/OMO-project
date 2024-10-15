import React from "react";
import styles from "./MypageFilter.module.css";

const MypageFilter = ({ setSelectedCategory, selectedCategory }) => {
  return (
    <div className={styles["filter-container"]}>
      <button
        type="button"
        className={`${styles["filter-total"]} ${selectedCategory === "all" ? styles["filter-active"] : ""}`}
        onClick={() => setSelectedCategory("all")}
      >
        전체
      </button>
      <p className={styles["filter-bar"]}> | </p>
      <button
        type="button"
        className={`${styles["filter-worry"]} ${selectedCategory === "trouble" ? styles["filter-active"] : ""}`}
        onClick={() => setSelectedCategory("trouble")}
      >
        고민게시판
      </button>
      <p className={styles["filter-bar"]}> | </p>
      <button
        type="button"
        className={`${styles["filter-free"]} ${selectedCategory === "free" ? styles["filter-active"] : ""}`}
        onClick={() => setSelectedCategory("free")}
      >
        자유게시판
      </button>
      <p className={styles["filter-bar"]}> | </p>
      <button
        type="button"
        className={`${styles["filter-qna"]} ${selectedCategory === "qna" ? styles["filter-active"] : ""}`}
        onClick={() => setSelectedCategory("qna")}
      >
        문의게시판
      </button>
    </div>
  );
};

export default MypageFilter;
