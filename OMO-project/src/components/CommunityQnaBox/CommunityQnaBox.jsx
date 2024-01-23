import styles from "./CommunityQnABox.module.css";
import Report from "../../assets/community/worry-board/report.png";
import Like from "../../assets/detail/empty-thumb.png";
import Comment from "../../assets/community/inquiry-board/comment.png";

export const CommunityQnABox = (props) => (
  <>
    {/* 전체 영역 */}
    <div className={styles["community-qnapost-container"]}>
      {/*버튼 전까지 윗부분 영역*/}
      <div className={styles["community-qnapost-content-container"]}>
        <div className={styles["community-qnapost-content-title-date"]}>
          {/* 제목 */}
          <span className={styles["community-qnapost-title"]}>{props.title}</span>

          {/* 날짜 */}
          <span className={styles["community-qnapost-date"]}>{props.reg_at}</span>
        </div>

        {/* 프로필 이미지+닉네임 */}
        <div className={styles["community-qnapost-profile"]}>
          <img className={styles["community-qnapost-profile-img"]} src={props.src} alt="프로필 이미지" style={{width: "32px", height: "32px"}} />
          <span className={styles["community-qnapost-profile-nick"]}>{props.nick}</span>
        </div>

        {/* 글 내용 */}
        <span className={styles["community-qnapost-content"]}>{props.content}</span>

        {/*공감수*/}
        <div className={styles["community-qnapost-number-report-wapper"]}>
          <span className={styles["community-qnapost-view-number"]}> 조회수 {props.view}</span>
          <span className={styles["community-qnapost-comment-number"]}>• 댓글 {props.comment}</span>

          {/* 신고 아이콘 */}
          <button className={styles["community-qnapost-report-button"]} type="button">
            <img className={styles["community-qnapost-report"]} alt="신고 아이콘" src={Report} style={{width: "32px", height: "32px"}} />
          </button>
        </div>
      </div>

      <div className={styles["community-qnapost-button-wrapper"]}>
        {/* 댓글달기 버튼 */}
        <button type="button" className={styles["community-qnapost-comment-button"]}>
          <img className={styles["community-qnapost-comment-button-img"]} src={Comment} />
          댓글
        </button>
      </div>

      {/* 하단 댓글창 전체박스 */}
      <div className={styles["community-qnapost-comment-container"]}>
        {/* 댓글 내용 */}
        {props.comment_list.map((el) => (
          <ul className={styles["community-qnapost-comment"]}>
            <li>
              <img className={styles["community-qnapost-comment-profile-img"]} src={el.src} alt="프로필 이미지" style={{width: "50px", height: "50px"}} />
              <div className={styles["community-qnapost-comment-box"]}>
                <div className={styles["community-qnapost-comment-nick-date"]}>
                  <span className={styles["community-qnapost-comment-box-nick"]}>{el.nick}</span>
                  <span className={styles["community-qnapost-comment-box-date"]}>{el.reg_at}</span>
                </div>
                <span className={styles["community-qnapost-comment-box-content"]}>{el.content}</span>
              </div>
            </li>
          </ul>
        ))}
      </div>
    </div>
  </>
);
