import axios from "axios";
import styles from "./MyInfo.module.css";
import Mypage from "../../../components/Mypage/Mypage";
import MyInfoIcon from "../../../assets/my-page/my-info/my-info.png";
import DefaultProfileImage from "../../../assets/profile-default.png";
import {useEffect, useState} from "react";
import {mbtiReverseMapping} from "../../../const/mbtiReverseMapping";
import {Loading} from "../../../components/Loading/Loading";
import {Link, useNavigate} from "react-router-dom";

const MyInfo = () => {
  const [myInfoData, setMyInfoData] = useState(null);
  const [image, setImage] = useState(DefaultProfileImage);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedIn) {
      alert("로그인 후 이용 가능한 서비스입니다.");
      navigate("/Login", {replace: true});
    }
  }, [navigate]);

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
        navigate("/Login", {replace: true});
        console.error("내정보를 불러오는데 실패하였습니다.", error);
      }
    };

    fetchData();
  }, []);

  const getMbtiString = (mbtiValue) => {
    return mbtiReverseMapping[mbtiValue] || "Unknown MBTI";
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles["myinfo-total-container"]}>
        <h2 className={styles["myinfo-title-container"]}>
          <img src={MyInfoIcon} alt="내 정보 아이콘" /> 내 정보
        </h2>
        <div className={styles["myinfo-categories-container"]}>
          <Mypage />
          {myInfoData && (
            <div className={styles["myinfo-logo-info-container"]}>
              <img
                className={styles["myinfo-circle-logo"]}
                src={image}
                alt="기본 프로필"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DefaultProfileImage;
                }}
              />
              <div className={styles["myinfo-info-container"]}>
                <div className={styles["myinfo-nickname-container"]}>
                  <p>닉네임</p>
                  <p className={styles["myinfo-nickname-line"]}>|</p>
                  <p className={styles["myinfo-nickname"]}>{myInfoData.nickname}</p>
                </div>
                <div className={styles["myinfo-email-container"]}>
                  <p>이메일</p>
                  <p className={styles["myinfo-email-line"]}>|</p>
                  <p className={styles["myinfo-email"]}>{myInfoData.email}</p>
                </div>
                <div className={styles["myinfo-birthday-container"]}>
                  <p>생년월일</p>
                  <p className={styles["myinfo-birthday-line"]}>|</p>
                  <p className={styles["myinfo-birthday"]}>{myInfoData.birth ? myInfoData.birth : "미입력"}</p>
                </div>
                <div className={styles["myinfo-mbti-container"]}>
                  <p>MBTI</p>
                  <p className={styles["myinfo-mbti-line"]}>|</p>
                  <p className={styles["myinfo-mbti"]}>{myInfoData.mbti === -1 ? "미입력" : getMbtiString(myInfoData.mbti)}</p>
                </div>
              </div>
              <div className={styles["myinfo-status-container"]}>
                <p className={styles["myinfo-status-myStatus"]}>내 정보</p>
                <div className={styles["myinfo-status-heart"]}>
                  <p className={styles["myinfo-status-heart-title"]}>내 관심 수</p>
                  <Link to="/Interest" className={styles["myinfo-status-heart-num"]}>
                    {myInfoData.placeLikeCount}
                  </Link>
                </div>
                <div className={styles["myinfo-status-thumb"]}>
                  <p className={styles["myinfo-status-thumb-title"]}>내 추천 수</p>
                  <Link to="/Recommend" className={styles["myinfo-status-thumb-num"]}>
                    {myInfoData.placeRecommendCount}
                  </Link>
                </div>
                <div className={styles["myinfo-status-write"]}>
                  <p className={styles["myinfo-status-write-title"]}>내가 쓴 글</p>
                  <Link to="/MyWrote" className={styles["myinfo-status-write-num"]}>
                    {myInfoData.myWrittenBoardCount}
                  </Link>
                </div>
                <div className={styles["myinfo-status-course"]}>
                  <p className={styles["myinfo-status-course-title"]}>나의 코스</p>
                  <Link to="/MyCourseMain" className={styles["myinfo-status-course-num"]}>
                    {myInfoData.myCourseCount}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyInfo;
