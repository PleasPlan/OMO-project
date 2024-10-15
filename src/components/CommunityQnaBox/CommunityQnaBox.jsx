import React, { useMemo, useRef, useState, useEffect } from "react";
import axios from "axios";
import styles from "./CommunityQnaBox.module.css";
import Comment from "../../assets/community/inquiry-board/comment.png";
import DefaultProfileImage from "../../assets/profile-default.png"; // 기본 프로필 이미지
import { formatDate } from "../../utils/Time/formatDate";

export const CommunityQnABox = (props) => {
  const [showComments, setShowComments] = useState(false); // 초기에 숨김 상태

  // 댓글 달기 버튼 클릭 시 댓글창 표시/숨김 토글
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  // 게시글 더보기/닫기 기능
  const [isShowMore, setIsShowMore] = useState(false); // 더보기 열고 닫는 스위치
  const textLimit = useRef(100); // 글자수 제한 선언

  const commenter = useMemo(() => {
    // 조건에 따라 게시글을 보여주는 함수
    const shortReview = props.content.slice(0, textLimit.current); // 원본에서 글자 수만큼 자른 짧은 버전

    if (props.content.length > textLimit.current) {
      // 원본이 길면 (원본 글자수 > 제한된 갯수)
      if (isShowMore) {
        return props.content;
      } // 더보기가 true 면 원본 바로 리턴
      return shortReview; // (더보기가 false면) 짧은 버전 리턴
    }
    return props.content; // 그렇지않으면 (짧은 글에는) 쓴글 그대로 리턴
  }, [isShowMore]); // isShowMore의 상태가 바뀔때마다 호출됨

  const [profileImage, setProfileImage] = useState(DefaultProfileImage);

  useEffect(() => {
    const fetchProfileImage = async () => {
      if (props.profileURL) {
        try {
          const imageUrl = `https://api.oneulmohae.co.kr/image/${encodeURIComponent(props.profileURL)}`;
          const imageResponse = await axios.get(imageUrl, {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
            responseType: "blob",
          });

          const imageBlob = imageResponse.data;
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setProfileImage(imageObjectURL);
        } catch (error) {
          setProfileImage(props.profileURL);
        }
      }
    };

    fetchProfileImage();
  }, [props.profileURL]);

  return (
    <>
      {/* 전체 영역 */}
      <div className={styles["community-qnapost-container"]}>
        {/*버튼 전까지 윗부분 영역*/}
        <div className={styles["community-qnapost-content-container"]}>
          <div className={styles["community-qnapost-content-title-date"]}>
            {/* 제목 */}
            <span className={styles["community-qnapost-title"]}>{props.title}</span>

            {/* 날짜 */}
            <span className={styles["community-qnapost-date"]}>{formatDate(props.createdDate)}</span>
          </div>

          {/* 프로필 이미지+닉네임 */}
          <div className={styles["community-qnapost-profile"]}>
            <img
              className={styles["community-qnapost-profile-img"]}
              src={profileImage}
              alt="프로필 이미지"
              style={{ width: "32px", height: "32px" }}
              onError={(e) => { e.target.onerror = null; e.target.src = DefaultProfileImage; }}
            />
            <span className={styles["community-qnapost-profile-nick"]}>{props.writer}</span>
          </div>

          {/* 글 내용 */}
          <span className={styles["community-qnapost-content"]}>{commenter}</span>
          <div className={styles["community-post-content-show"]} onClick={() => setIsShowMore(!isShowMore)}>
            {props.content.length > textLimit.current && (isShowMore ? "[접기]" : "... [더 보기]")}
          </div>
        </div>

        <div className={styles["community-qnapost-button-wrapper"]}>
          {/* 답변 버튼 */}
          <button type="button" className={`${styles["community-qnapost-comment-button"]}  ${showComments ? styles["show-comments"] : ""}`} onClick={toggleComments}>
            <img className={styles["community-qnapost-comment-button-img"]} src={Comment} />
            답변
          </button>
        </div>
        {/* 하단 댓글창 전체박스 */}
        <div className={`${styles["community-qnapost-comment-container"]} ${showComments ? styles["show-comments"] : ""}`}>
          {/* 답변 내용 */}
          {props.comments && props.comments.length > 0 ? (
            props.comments.map((el) => (
              <div key={el.id}>
                <ul className={styles["community-qnapost-comment"]}>
                  <li>
                    <img className={styles["community-qnapost-comment-profile-img"]} src={el.src} alt="프로필 이미지" style={{ width: "50px", height: "50px" }} />
                    <div className={styles["community-qnapost-comment-box"]}>
                      <div className={styles["community-qnapost-comment-nick-date"]}>
                        <span className={styles["community-qnapost-comment-box-nick"]}>OmO 운영진</span>
                        <span className={styles["community-qnapost-comment-box-date"]}>{el.reg_at}</span>
                      </div>
                      <span className={styles["community-qnapost-comment-box-content"]}>{el.content}</span>
                    </div>
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <div className={styles["no-comments"]}>작성된 답변이 없습니다.</div>
          )}
        </div>
      </div>
    </>
  );
};
