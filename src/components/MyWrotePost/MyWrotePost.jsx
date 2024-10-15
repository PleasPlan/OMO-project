import {formatDate} from "../../utils/Time/formatDate";
import styles from "./MyWrotePost.module.css";
import React, {useState} from "react";

export const MyWrotePost = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };
  const containerClassName = expanded ? styles["my-wrote-post-container-expanded"] : styles["my-wrote-post-container"];

  const getCategoryDisplayName = () => {
    switch (props.category) {
      case "FREE":
        return "자유게시판";
      case "TROUBLE":
        return "고민게시판";
      case "QNA":
        return "문의게시판";
      default:
        return props.category;
    }
  };

  return (
    <>
      {/* 전체 영역 */}
      <div className={containerClassName} onClick={handleClick}>
        {/*버튼 전까지 윗부분 영역*/}
        <div className={styles["my-wrote-post-content-container"]}>
          <div className={styles["my-wrote-post-content-title-date"]}>
            {/* 제목 */}
            <span className={styles["my-wrote-post-title"]}>{props.title}</span>

            <div className={styles["my-wrote-post-category-date"]}>
              {/* 카테고리 */}
              <span className={styles["my-wrote-post-category"]}>{getCategoryDisplayName()}</span>
              {/* 날짜 */}
              <span className={styles["my-wrote-post-date"]}>{formatDate(props.createdDate)}</span>
            </div>
          </div>

          {/* 글 내용 */}
          <span className={styles["my-wrote-post-content"]}>{props.content}</span>
        </div>

        {/* 하단 댓글창 전체박스 */}
        <div className={styles["my-wrote-post-comment-container"]}>
          {/* 댓글 내용 */}
          {/* {props.comment_list.map((el) => (
            <ul className={styles["my-wrote-post-comment"]}>
              <li>
                <img className={styles["my-wrote-post-comment-profile-img"]} src={el.src} alt="프로필 이미지" style={{width: "50px", height: "50px"}} />
                <div className={styles["my-wrote-post-comment-box"]}>
                  <div className={styles["my-wrote-post-comment-nick-date"]}>
                    <span className={styles["my-wrote-post-comment-box-nick"]}>{el.nick}</span>
                    <span className={styles["my-wrote-post-comment-box-date"]}>{el.reg_at}</span>
                  </div>
                  <span className={styles["my-wrote-post-comment-box-content"]}>{el.content}</span>
                </div>
              </li>
            </ul>
          ))} */}
        </div>
      </div>
    </>
  );
};
