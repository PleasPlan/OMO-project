import styles from "./CommunityCategory.module.css";
import {Link, useLocation} from "react-router-dom";

export const CommunityCategory = () => {
  const location = useLocation();

  const isMyCourseActive = location.pathname === "/MyCourseBoard";
  const isWorryActive = location.pathname === "/WorryBoard";
  const isFreeActive = location.pathname === "/FreeBoard";
  const isInquiryFrequentActive = location.pathname === "/InquiryBoardFrequent";
  const isInquiryQnAActive = location.pathname === "/InquiryBoardQnA";

  return (
    <div className={styles["community-category-container"]}>
      <div className={styles["community-category-title-container"]}>
        <Link to="/MyCourseBoard" className={`${styles["community-category-mycourse"]} ${isMyCourseActive ? styles["community-category-link-active"] : ""}`}>
          나만의 코스 게시판
        </Link>

        <Link to="/WorryBoard" className={`${styles["community-category-worry"]} ${isWorryActive ? styles["community-category-link-active"] : ""}`}>
          고민 게시판
        </Link>

        <Link to="/FreeBoard" className={`${styles["community-category-free"]} ${isFreeActive ? styles["community-category-link-active"] : ""}`}>
          자유 게시판
        </Link>

        <Link
          to="/InquiryBoardFrequent"
          className={`${styles["community-category-inquiry"]} ${isInquiryFrequentActive ? styles["community-category-link-active"] : ""}  ${
            isInquiryQnAActive ? styles["community-category-link-active"] : ""
          }`}
        >
          문의 게시판
        </Link>
      </div>
    </div>
  );
};
