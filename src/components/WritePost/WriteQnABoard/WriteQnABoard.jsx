import styles from "./WriteQnABoard.module.css";
import {useRef, useState} from "react";

const WriteQnABoard = ({onCreate, openModal, setOpenModal}) => {
  const titleInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    title: "",
    content: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // 공백 제거된 상태로 유효성 검사
    const trimmedTitle = state.title.trim();
    const trimmedContent = state.content.trim();
  
    if (trimmedTitle.length < 3) {
      alert("글제목은 최소 3자 이상 입력해주세요");
      return;
    }
  
    if (trimmedContent.length < 5) {
      alert("본문은 최소 5자 이상 입력해주세요");
      return;
    }
  
    onCreate(trimmedTitle, trimmedContent);
    setState({
      title: "",
      content: "",
    });
    setOpenModal(false);
  };

  return (
    <div className={styles["Overlay"]}>
      <div className={styles["writeboard-total-container"]}>
        <div className={styles["writeboard-title"]}>문의 게시판에 글쓰기</div>
        <div className={styles["writeboard-categories-title-container"]}>
          <input
            ref={titleInput}
            name="title"
            type="text"
            className={styles["board-title"]}
            placeholder="글 제목 (최소 3글자, 최대 18자)"
            minLength="3"
            maxLength="16"
            value={state.title || ""}
            onChange={handleChangeState}
          />
        </div>
        <div className={styles["board-content-container"]}>
          <textarea
            ref={contentInput}
            name="content"
            className={styles["board-content"]}
            placeholder={`게시글의 내용을 적어주세요. (최소 5자, 최대 500자)\n\n\n\n* 주제와 관련 없는 글을 작성 할 시, 게시글이 삭제될 수 있습니다.\n\n* 회원 정보 추가 입력을 안 했을 시, 글쓰기가 불가합니다.`}
            minLength="5"
            maxLength="500"
            value={state.content}
            onChange={handleChangeState}
          />
        </div>
        <div className={styles["board-button-container"]}>
          <button
            type="button"
            className={styles["board-button-cancel"]}
            onClick={() => {
              setOpenModal(false);
            }}
          >
            취소
          </button>
          {!openModal ? setOpenModal(true) : null}
          <button
            type="button"
            className={styles["board-button-submit"]}
            onClick={() => {
              handleSubmit();
            }}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteQnABoard;
