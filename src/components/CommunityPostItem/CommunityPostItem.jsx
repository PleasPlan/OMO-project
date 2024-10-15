import React, {useRef, useState, useMemo, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import styles from "./CommunityPostItem.module.css";
import Report from "../../assets/community/worry-board/report.png";
import Like from "../../assets/detail/empty-thumb.png";
import LikeClicked from "../../assets/detail/purple-thumb.png";
import DefaultProfileImage from "../../assets/profile-default.png";
import Comment from "../../assets/community/worry-board/comment.png";
import Submit from "../../assets/submit.png";
import SubmitHover from "../../assets/submit-hover.png";
import {elapsedText} from "../../utils/Time/elapsedText";
import {formatDate} from "../../utils/Time/formatDate";
import CommunityReportModal from "../ReportModal/CommunityReportModal/CommunityReportModal";

export const CommunityPostItem = (props) => {
  const navigate = useNavigate();

  // 마이페이지 내 정보에서 빼온 게시글 댓글 달기 입력창 프로필 사진 
  const [myInfoData, setMyInfoData] = useState(null);
  const [image, setImage] = useState(DefaultProfileImage);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const loggedIn = localStorage.getItem("isLoggedIn") === "true";
  //   if (!loggedIn) {
  //     alert("로그인 후 이용 가능한 서비스입니다.");
  //     navigate("/Login", {replace: true});
  //   }
  // }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
  
        const response = await axios.get(`https://api.oneulmohae.co.kr/myPage/myInfo`, {
          headers: {
            Authorization: accessToken,
          },
        });
        setMyInfoData(response.data);
        setIsLoading(false);
  
        if (response.data.profileImageUrl) {
          const imageUrl = `https://api.oneulmohae.co.kr/image/${encodeURIComponent(response.data.profileImageUrl)}`;
  
          try {
            const imageResponse = await axios.get(imageUrl, {
              headers: {
                Authorization: accessToken,
              },
              responseType: "blob",
            });
  
            const imageBlob = imageResponse.data;
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImage(imageObjectURL);
          } catch (imageError) {
            setImage(response.data.profileImageUrl);
          }
        }
      } catch (error) {
        console.error("프로필 이미지를 불러오는데 실패하였습니다.", error);
      }
    };
  
    fetchData();
  }, []);
  


  // 신고 모달창 열기
  const [openModal, setOpenModal] = useState(false);

  // 작성자 여부에 따라 신고버튼 가시성
  const [showReportButton, setShowReportButton] = useState(null); // null로 초기화하여 아직 확인되지 않음을 의미

  // 좋아요 버튼 (이미지, 클릭토글)
  const [imageSrcLike, setImageSrcLike] = useState(Like);
  const [isClickedLike, setIsClickedLike] = useState(false);

  // 댓글창 초기에 숨김상태
  const [showComments, setShowComments] = useState(false);

  // 댓글 내용
  const [content, setContent] = useState("");

  useEffect(() => {
    if (props.writerUserMatch !== null && props.writerUserMatch !== undefined) {
      setShowReportButton(props.writerUserMatch);
    }
  }, [props.writerUserMatch]);

  // like 값을 사용하여 초기 상태 설정
  useEffect(() => {
    if (props.myLiked) {
      setImageSrcLike(LikeClicked);
      setIsClickedLike(true);
    } else {
      setImageSrcLike(Like);
      setIsClickedLike(false);
    }
  }, [props.myLiked]);

  // 댓글 달기 버튼 클릭 시 댓글창 표시/숨김 토글
  const toggleComments = () => {
    setShowComments(!showComments);
  };

  // 댓글 최소 글자
  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (content.length < 1) {
      alert("최소 1글자 이상 입력해주세요");
      return;
    }

    // 로그인 여부 확인
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      // 사용자가 토큰이 없는 경우
      const confirmLogin = confirm("로그인 후 이용 가능한 서비스입니다. 로그인 페이지로 이동하시겠습니까?");
      if (confirmLogin) {
        navigate("/Login", {replace: true});
      }
      return;
    }

    // 댓글 POST 통신
    try {
      const response = await axios.post(
        `https://api.oneulmohae.co.kr/comment/write`,
        {content, boardId: props.boardId},
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        // 댓글 작성 후 GET 통신으로 데이터 업데이트
        const getResponse = await axios.get(`https://api.oneulmohae.co.kr/board/${props.category}?page=1&size=10&sorting=createdAt`, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        if (getResponse.status === 200) {
          props.setPosts(getResponse.data.data);
        } else {
          console.error("게시글을 가져오는데 실패하였습니다.");
        }

        setContent("");
      } else {
        console.error("게시글을 가져오는데 실패하였습니다");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // 403 에러인 경우 (GUEST일 때)
        alert("회원 추가 정보 입력이 필요합니다. 해당 페이지로 이동합니다.");
        navigate("/Signup", {replace: true});
      } else {
        console.error("게시글을 가져오는데 실패하였습니다:", error);
      }
    }
  };

  // 좋아요 버튼
  const handleClickLike = async () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      // 사용자가 토큰이 없는 경우
      const confirmLogin = confirm("로그인 후 이용 가능한 서비스입니다. 로그인 페이지로 이동하시겠습니까?");
      if (confirmLogin) {
        navigate("/Login", {replace: true});
      }
      return;
    }

    try {
      const response = await axios.put(
        `https://api.oneulmohae.co.kr/board/like/${props.boardId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const getResponse = await axios.get(`https://api.oneulmohae.co.kr/board/${props.category}?page=1&size=10&sorting=createdAt`, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        if (getResponse.status === 200) {
          const updatedData = getResponse.data;

          if (isClickedLike) {
            setImageSrcLike(Like);
            setIsClickedLike(false);
          } else {
            setImageSrcLike(LikeClicked);
            setIsClickedLike(true);
          }
          props.setPosts(updatedData.data);
        } else {
          console.error("게시글을 가져오는데 실패하였습니다.");
        }
      } else {
        console.error("게시글을 가져오는데 실패하였습니다.");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // 403 에러인 경우 (GUEST일 때)
        alert("회원 추가 정보 입력이 필요합니다. 해당 페이지로 이동합니다.");
        navigate("/Signup", {replace: true});
      } else {
        console.error("게시글을 가져오는데 실패하였습니다:", error);
      }
    }
  };

  // 게시글 더보기/닫기 기능
  const [isShowMore, setIsShowMore] = useState(false);
  const textLimit = useRef(100);

  const commenter = useMemo(() => {
    const shortReview = props.content.slice(0, textLimit.current);

    if (props.content.length > textLimit.current) {
      if (isShowMore) {
        return props.content;
      }
      return shortReview;
    }
    return props.content;
  }, [isShowMore]);

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

  // 댓글 프로필 이미지 로직
  const [commentImages, setCommentImages] = useState({});

  useEffect(() => {
    const fetchCommentImages = async () => {
      const imagePromises = props.comments.map(async (el) => {
        if (el.profileURL) {
          try {
            const imageUrl = `https://api.oneulmohae.co.kr/image/${encodeURIComponent(el.profileURL)}`;
            const response = await axios.get(imageUrl, {
              headers: {
                Authorization: localStorage.getItem("accessToken"),
              },
              responseType: "blob",
            });

            const blob = response.data;
            const blobURL = URL.createObjectURL(blob);
            return {[el.commentId]: blobURL};
          } catch (error) {
            return { [el.commentId]: el.profileURL };
          }
        } else {
          return { [el.commentId]: el.profileURL };
        }
      });

      const imageObjects = await Promise.all(imagePromises);
      const imagesMap = imageObjects.reduce((acc, cur) => ({...acc, ...cur}), {});
      setCommentImages(imagesMap);
    };

    fetchCommentImages();
  }, [props.comments]);

  return (
    <>
      <div className={styles["community-post-container"]}>
        <div className={styles["community-post-content-container"]}>
          <div className={styles["community-post-content-title-date"]}>
            <span className={styles["community-post-title"]}>{props.title}</span>
            <span className={styles["community-post-date"]}>{formatDate(props.createdDate)}</span>
          </div>

          <div className={styles["community-post-profile"]}>
            <img
              className={styles["community-post-profile-img"]}
              src={profileImage}
              alt="프로필 이미지"
              style={{width: "32px", height: "32px"}}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = DefaultProfileImage;
              }}
            />
            <span className={styles["community-post-profile-nick"]}>{props.writer}</span>
          </div>

          <span className={styles["community-post-content"]}>{commenter}</span>
          <div className={styles["community-post-content-show"]} onClick={() => setIsShowMore(!isShowMore)}>
            {props.content.length > textLimit.current && (isShowMore ? "[접기]" : "... [더 보기]")}
          </div>

          <div className={styles["community-post-number-report-wapper"]}>
            <span className={styles["community-post-like-number"]}>좋아요 {props.likeCount}</span>
            <span className={styles["community-post-dot"]}>•</span>
            <span className={styles["community-post-comment-number"]} onClick={toggleComments}>
              댓글 {props.comments.length}
            </span>

            {showReportButton !== null && !showReportButton ? (
              <button
                className={styles["community-post-report-button"]}
                type="button"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                <img className={styles["community-post-report"]} alt="신고 아이콘" src={Report} style={{width: "32px", height: "32px"}} />
              </button>
            ) : null}
            {openModal ? <CommunityReportModal openModal={openModal} setOpenModal={setOpenModal} boardId={props.boardId} /> : null}
          </div>
        </div>

        <div className={styles["community-post-button-wrapper"]}>
          <button onClick={handleClickLike} type="button" className={`${styles["community-post-like-button"]} ${showComments ? styles["show-comments"] : ""}`}>
            <img className={styles["community-post-like-button-img"]} src={imageSrcLike} alt="좋아요 버튼" />
            좋아요
          </button>

          <button type="button" className={`${styles["community-post-comment-button"]} ${showComments ? styles["show-comments"] : ""}`} onClick={toggleComments}>
            <img className={styles["community-post-comment-button-img"]} src={Comment} alt="댓글 달기 버튼" />
            댓글 달기
          </button>

          <div className={`${styles["community-post-comment-container"]} ${showComments ? styles["show-comments"] : ""}`}>
            <form className={styles["community-post-comment-input-container"]} onSubmit={handleSubmit}>
              <img
                className={styles["community-post-comment-input-profile-img"]}
                src={image}
                alt="프로필 이미지"
                style={{ width: "50px", height: "50px" }}
              />
              <input
                className={styles["community-post-comment-input"]}
                type="text"
                id="comment"
                name="comment"
                minLength="2"
                maxLength="250"
                size="10"
                placeholder="댓글을 입력하세요..."
                value={content || ""}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
              <button className={styles["community-post-comment-input-button"]} type="submit">
                <img className={styles["community-post-comment-input-button-img"]} src={Submit} alt="제출 이미지" style={{width: "35px", height: "35px", marginTop: "6px"}} />
                <img className={styles["community-post-comment-input-button-img-hover"]} src={SubmitHover} alt="제출 hover 이미지" style={{width: "35px", height: "35px"}} />
              </button>
            </form>

            {props.comments
              .slice()
              .reverse()
              .map((el) => (
                <div key={el.commentId}>
                  <ul className={styles["community-post-comment"]}>
                    <li>
                      <img
                        className={styles["community-post-comment-profile-img"]}
                        src={commentImages[el.commentId] || DefaultProfileImage} // 댓글 작성자의 프로필 이미지
                        alt="프로필 이미지"
                        style={{width: "50px", height: "50px"}}
                      />
                      <div className={styles["community-post-comment-box"]}>
                        <div className={styles["community-post-comment-nick-date"]}>
                          <span className={styles["community-post-comment-box-nick"]}>{el.writer}</span>
                          <span className={styles["community-post-comment-box-date"]}>{elapsedText(new Date(el.createdAt)).toLocaleString()}</span>
                        </div>
                        <span className={styles["community-post-comment-box-content"]}>{el.content}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
