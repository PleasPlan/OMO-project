import axios from "axios";
import styles from "./Mypage.module.css";
import { Link } from "react-router-dom";
import MyInfoIcon from "../../assets/my-page/my-info/my-info.png";
import MyInfoHeart from "../../assets/my-page/my-info/empty-heart.png";
import MyInfoWrote from "../../assets/my-page/my-info/my-writing.png";
import MyInfoSetting from "../../assets/my-page/my-info/profile-setting.png";
import MyInfoRecent from "../../assets/my-page/my-info/recent-place.png";
import MyInfoThumb from "../../assets/my-page/my-info/empty-thumb.png";
import { mbtiReverseMapping } from "../../const/mbtiReverseMapping";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultProfileImage from "../../assets/profile-default.png"; // 기본 프로필 이미지

const Mypage = () => {
  const navigate = useNavigate();
  const [myPageData, setMyPageData] = useState(null);
  const [image, setImage] = useState(DefaultProfileImage);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        const response = await axios.get(`https://api.oneulmohae.co.kr/myPage/myInfo`, {
          headers: {
            Authorization: accessToken,
          },
        });
        setMyPageData(response.data);

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
            // 프로필 이미지를 가져오는 데 실패하면 기본 프로필 이미지를 사용
            setImage(response.data.profileImageUrl);
          }
        }
      } catch (error) {
        alert("마이페이지를 불러오는데 실패하였습니다.")
        navigate("/Login");
      }
    };
    fetchData();
  }, []);

  const getMbtiString = (mbtiValue) => {
    return mbtiReverseMapping[mbtiValue] || "";
  };

  return (
    <>
      {myPageData && (
        <div className={styles["myinfo-categories-list"]}>
          <div className={styles["myinfo-categories-list-infoContainer"]}>
            <img className={styles["myinfo-categories-list-logo"]} src={image} alt="기본 프로필" />
            <p className={styles["myinfo-categories-list-nickname"]}>{myPageData.nickname}</p>
            <p className={styles["myinfo-categories-list-mbti"]}>{myPageData.mbti === -1 ? "" : getMbtiString(myPageData.mbti)}</p>
          </div>
          <div className={styles["myinfo-categories-mypage-container"]}>
            <p className={styles["myinfo-categories-mypage"]}>My page</p>
          </div>
          <div className={styles["myinfo-categories-list-container"]}>
            <Link to="/MyInfo" className={styles["myinfo-categories-myinfo-container"]}>
              <img className={styles["myinfo-categories-myinfo-icon"]} src={MyInfoIcon} alt="내 정보 아이콘" />
              <p className={styles["myinfo-categories-myinfo-text"]}> 내 정보</p>
            </Link>

            <Link to="/Interest" className={styles["myinfo-categories-heart-container"]}>
              <img className={styles["myinfo-categories-heart-icon"]} src={MyInfoHeart} alt="관심 목록 아이콘" />
              <p className={styles["myinfo-categories-heart-text"]}> 관심 목록</p>
            </Link>

            <Link to="/Recommend" className={styles["myinfo-categories-thumb-container"]}>
              <img className={styles["myinfo-categories-thumb-icon"]} src={MyInfoThumb} alt="추천한 장소 아이콘" />
              <p className={styles["myinfo-categories-thumb-text"]}> 추천한 장소</p>
            </Link>

            <Link to="/Recent" className={styles["myinfo-categories-recent-container"]}>
              <img className={styles["myinfo-categories-recent-icon"]} src={MyInfoRecent} alt="최근 본 아이콘" />
              <p className={styles["myinfo-categories-recent-text"]}> 최근 본 장소</p>
            </Link>

            <Link to="/MyWrote" className={styles["myinfo-categories-wrote-container"]}>
              <img className={styles["myinfo-categories-wrote-icon"]} src={MyInfoWrote} alt="내가 쓴 글 아이콘" />
              <p className={styles["myinfo-categories-wrote-text"]}> 내가 쓴 글</p>
            </Link>

            <Link to="/ProfileSetting" className={styles["myinfo-categories-setting-container"]}>
              <img className={styles["myinfo-categories-setting-icon"]} src={MyInfoSetting} alt="프로필 설정 아이콘" />
              <p className={styles["myinfo-categories-setting-text"]}> 프로필 설정</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Mypage;
