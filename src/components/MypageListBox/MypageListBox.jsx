import React, {useState, useEffect} from "react";
import axios from "axios";
import styles from "./MypageListBox.module.css";
import Like from "../../assets/detail/purple-thumb.png";
import EmptyLike from "../../assets/detail/empty-thumb.png";
import Jjim from "../../assets/detail/red-heart.png";
import EmptyJjim from "../../assets/detail/empty-heart.png";
import defaultDetailIcon from "../../assets/detail/defaultDetailIcon.png";
import {useNavigate} from "react-router-dom";

export const MypageListBox = (props) => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchReviewImages = async () => {
      try {
        // 리뷰 이미지 이름을 가져오는 API 호출
        const response = await axios.get(`https://api.oneulmohae.co.kr/review/${props.id}?page=1&size=10`);
        const fetchedPosts = response.data.data;

        // 이미지 이름 배열 생성
        const imageNames = fetchedPosts.map((post) => post.imageName).filter((imageName) => imageName !== null);

        // 이미지 파일을 가져오는 API 호출
        const fetchImagePromises = imageNames.map(async (imageName) => {
          const imageResponse = await axios.get(`https://api.oneulmohae.co.kr/image/${encodeURIComponent(imageName)}`, {responseType: "blob"});
          return URL.createObjectURL(imageResponse.data);
        });

        const fetchedImages = await Promise.all(fetchImagePromises);
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchReviewImages();
  }, [props.id]);

  // 가장 처음 두 개의 이미지를 선택
  const firstImages = images.slice(0, 2);

  return (
    <>
      <div
        className={styles["mypage-list-box-inner-container"]}
        onClick={() => {
          navigate(`/DetailMenu/${props.id}/${props.place_name}`);
        }}
      >
        <span className={styles["mypage-list-box-title"]}>{props.place_name}</span>

        <div className={styles["mypage-list-box-like-jjim-container"]}>
          <div className={styles["mypage-list-box-jjim"]}>
            <img src={props.myMine ? Jjim : EmptyJjim} alt="찜 아이콘" />
            <span className={styles["mypage-list-box-jjim-number"]}> {props.mine}</span>
          </div>
          <div className={styles["mypage-list-box-like"]}>
            <img src={props.myRecommend ? Like : EmptyLike} alt="좋아요 아이콘" />
            <span className={styles["mypage-list-box-like-number"]}> {props.recommend}</span>
          </div>
        </div>

        <span className={styles["mypage-list-box-address-brief"]}>{props.address_name}</span>
        <span className={`${styles["mypage-list-box-phone"]} ${!props.phone ? styles["not_provided"] : ""}`}>{props.phone ? props.phone : "전화번호 미제공"}</span>

        {firstImages.length === 1 ? (
          <>
            <img className={styles["mypage-list-box-img1"]} src={firstImages[0]} alt="list image 1" />
            <img className={styles["mypage-list-box-img2"]} src={defaultDetailIcon} alt="default list image 2" />
          </>
        ) : firstImages.length > 0 ? (
          <>
            <img className={styles["mypage-list-box-img1"]} src={firstImages[0]} alt="list image 1" />
            <img className={styles["mypage-list-box-img2"]} src={firstImages[1]} alt="list image 2" />
          </>
        ) : (
          <>
            <img className={styles["mypage-list-box-img1"]} src={defaultDetailIcon} alt="default list image 1" />
            <img className={styles["mypage-list-box-img2"]} src={defaultDetailIcon} alt="default list image 2" />
          </>
        )}
      </div>
    </>
  );
};
