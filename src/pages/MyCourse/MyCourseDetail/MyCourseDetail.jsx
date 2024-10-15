import styles from "./MyCourseDetail.module.css";
import {ScrollToTop} from "../../../components/ScrollToTop/ScrollToTop";
import Share from "../../../components/MyCourse/Button/Share/Share";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import MyCourseDetailBox from "../../../components/MyCourseDetailBox/MyCourseDetailBox";
import downArrow from "../../../assets/my-course/write/down-arrow.png";
import {Loading} from "../../../components/Loading/Loading";
import Like from "../../../assets/community/my-course-board/empty-thumb.png";
import LikeClicked from "../../../assets/detail/purple-thumb.png";
import Time from "../../../assets/my-course/detail/time.png";
import User from "../../../assets/my-course/detail/user.png";
import Report from "../../../assets/community/worry-board/report.png";
import MyCourseReportModal from "../../../components/ReportModal/MyCourseReportModal/MyCourseReportModal";

const MyCourseDetail = () => {
  const {id} = useParams();
  const [detailData, setDetailData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // 신고 모달창 열기
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedIn) {
      alert("로그인 후 이용 가능한 서비스입니다.");
      navigate("/Login", {replace: true});
    }
  }, [navigate]);

  const getStringDate = (date) => {
    const options = {year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"};
    return new Intl.DateTimeFormat("ko-KR", options).format(new Date(date));
  };

  // 좋아요 버튼 (이미지, 클릭토글)
  const [imageSrcLike, setImageSrcLike] = useState(Like);
  const [isClickedLike, setIsClickedLike] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.oneulmohae.co.kr/mycourse/${id}`, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        setDetailData(response.data);
        setLoading(false);
      } catch (error) {
        setError("데이터를 불러오는 데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // 좋아요 버튼
  const handleClickLike = async () => {
    try {
      const response = await axios.put(
        `https://api.oneulmohae.co.kr/mycourse/like/${detailData.courseId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const getResponse = await axios.get(`https://api.oneulmohae.co.kr/mycourse/${id}`, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        if (getResponse.status === 200) {
          // 이미지 변경 및 카운트 업데이트
          if (isClickedLike) {
            setImageSrcLike(Like);
            setIsClickedLike(false);
          } else {
            setImageSrcLike(LikeClicked);
            setIsClickedLike(true);
          }
          setDetailData(getResponse.data);
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
        navigate("/Signup", { replace: true });
      } else {
        console.error("게시글을 가져오는데 실패하였습니다:", error);
        setLoading(false);
      }
    }
  }
  // like 값을 사용하여 초기 상태 설정 (따봉 누른 것들 새로고침해도 유지하게끔)
  useEffect(() => {
    if (detailData) {
      if (detailData.myLiked) {
        setImageSrcLike(LikeClicked);
        setIsClickedLike(true);
      } else {
        setImageSrcLike(Like);
        setIsClickedLike(false);
      }
    }
  }, [detailData]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className={styles["error"]}>{error}</div>;
  }

  return (
    <div className={styles["mycourse-detail-total-container"]}>
      <div className={styles["mycourse-detail-title-container"]}>
        <span>{detailData.courseName}</span>
      </div>
      <div className={styles["mycourse-detail-like-container"]}>
        <button className={styles["mycourse-detail-like-button"]} onClick={handleClickLike} type="button">
          <img src={imageSrcLike} alt="좋아요 아이콘" />
        </button>
        <span className={styles["community-mycourse-detail-like-number"]}> {detailData.likeCount}</span>
      </div>
      <div className={styles["mycourse-detail-created"]}>
        <img src={User} alt="유저 아이콘" className={styles["community-mycourse-detail-user-icon"]} /> <span className={styles["mycourse-detail-created-user"]}> {detailData.writerName}</span>
        <img src={Time} alt="시간 아이콘" className={styles["community-mycourse-detail-time-icon"]} />
        <span className={styles["mycourse-detail-created-time"]}> {getStringDate(detailData.createdAt)}</span>
      </div>
      {/* 신고 아이콘 */}
      {detailData.writerUserMatch ? null : (
        <button
          className={styles["community-post-report-button"]}
          type="button"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <img className={styles["community-post-report"]} alt="신고 아이콘" src={Report} style={{width: "32px", height: "32px"}} />
        </button>
      )}
      {openModal ? <MyCourseReportModal openModal={openModal} setOpenModal={setOpenModal} courseId={detailData.courseId} /> : null}
      <div className={styles["mycourse-detail-course-container"]}>
        <div className={styles["mycourse-detail-course-item-container"]}>
          {detailData.contents.map((contentItem, index) => (
            <React.Fragment key={index}>
              <div className={styles["mycourse-detail-calendar-container"]}>{getStringDate(contentItem.time)}</div>
              <MyCourseDetailBox {...contentItem} />
              {index !== detailData.contents.length - 1 && <img src={downArrow} className={styles["mycourse-data-box-down-arrow-img"]} />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className={styles["mycourse-detail-edit-share-button-container"]}>
        {detailData.writerUserMatch ? <Share courseId={detailData.courseId} share={detailData.share} /> : null}
        {/* writerUserMatch */}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default MyCourseDetail;
