import styles from "./WriteBoard.module.css";

const WriteBoard = () => (
  <div className={styles["writeboard-total-container"]}>
    <h2 className={styles["writeboard-title"]}>글쓰기</h2>
    <div className={styles["writeboard-categories-title-container"]}>
      <select name="board" id="board-select" className={styles["board-select-box"]}>
        <option value="게시판 선택">게시판 선택</option>
        <option value="나만의 코스 게시판">나만의 코스 게시판</option>
        <option value="고민 게시판">고민 게시판</option>
        <option value="자유 게시판">자유 게시판</option>
        <option value="문의 게시판">문의 게시판</option>
      </select>
      <input type="text" className={styles["board-title"]} placeholder="글 제목" />
    </div>
    <div className={styles["board-content-container"]}>
      <textarea className={styles["board-content"]} placeholder="게시글의 내용을 적어주세요. (최대 400자)" />
    </div>
    <div className={styles["board-button-container"]}>
      <button type="button" className={styles["board-button-cancel"]}>
        취소
      </button>
      <button type="button" className={styles["board-button-submit"]}>
        등록
      </button>
    </div>
  </div>
);

export default WriteBoard;
