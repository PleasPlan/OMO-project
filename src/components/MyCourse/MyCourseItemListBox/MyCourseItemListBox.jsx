import React, {useState, useEffect} from "react";
import axios from "axios";
import styles from "./MyCourseItemListBox.module.css";
import Like from "../../../assets/detail/purple-thumb.png";
import EmptyLike from "../../../assets/detail/empty-thumb.png";
import Jjim from "../../../assets/detail/red-heart.png";
import EmptyJjim from "../../../assets/detail/empty-heart.png";
import defaultDetailIcon from "../../../assets/detail/defaultDetailIcon.png";
import {useNavigate} from "react-router-dom";

// forwardRef를 적용해 ref 전달 가능하도록 수정
export const MyCourseItemListBox = React.forwardRef(({ state, setState, el, onClick }, ref) => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchReviewImages = async () => {
      try {
        const response = await axios.get(`https://api.oneulmohae.co.kr/review/${el.id}?page=1&size=10`);
        const fetchedPosts = response.data.data;

        const imageNames = fetchedPosts.map((post) => post.imageName).filter((imageName) => imageName !== null);

        const fetchImagePromises = imageNames.map(async (imageName) => {
          const imageResponse = await axios.get(`https://api.oneulmohae.co.kr/image/${encodeURIComponent(imageName)}`, {responseType: "blob"});
          return URL.createObjectURL(imageResponse.data);
        });

        const fetchedImages = await Promise.all(fetchImagePromises);
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
        // 기본 이미지를 설정합니다.
        setImages([defaultDetailIcon, defaultDetailIcon]);
      }
    };

    fetchReviewImages();
  }, [el.id]);

  const firstImages = images.slice(0, 2);

  return (
    <div
      className={styles["mycourse-list-box-inner-container"]}
      ref={ref} // ref를 적용
      onClick={() => {
        setState(!state);
        onClick(el.place_name, el.id);
      }}
    >
      <span className={styles["mycourse-list-box-title"]}>{el.place_name}</span>
      <div className={styles["mycourse-list-box-like-jjim-container"]}>
        <div className={styles["mycourse-list-box-jjim"]}>
          <img src={el.myMine ? Jjim : EmptyJjim} alt="찜 아이콘" />
          <span className={styles["mycourse-list-box-jjim-number"]}>{el.mine}</span>
        </div>
        <div className={styles["mycourse-list-box-like"]}>
          <img src={el.myRecommend ? Like : EmptyLike} alt="좋아요 아이콘" />
          <span className={styles["mycourse-list-box-like-number"]}>{el.recommend}</span>
        </div>
      </div>
      <span className={`${styles["mycourse-list-box-phone"]} ${!el.phone ? styles["not_provided"] : ""}`}>{el.phone ? el.phone : "전화번호 미제공"}</span>
      <span className={styles["mycourse-list-box-address-brief"]}>{el.road_address_name}</span>

      {firstImages.length === 1 ? (
        <>
          <img className={styles["mycourse-list-box-img1"]} src={firstImages[0]} alt="list image 1" />
          <img className={styles["mycourse-list-box-img2"]} src={defaultDetailIcon} alt="default list image 2" />
        </>
      ) : firstImages.length > 1 ? (
        <>
          <img className={styles["mycourse-list-box-img1"]} src={firstImages[0]} alt="list image 1" />
          <img className={styles["mycourse-list-box-img2"]} src={firstImages[1]} alt="list image 2" />
        </>
      ) : (
        <>
          <img className={styles["mycourse-list-box-img1"]} src={defaultDetailIcon} alt="default list image 1" />
          <img className={styles["mycourse-list-box-img2"]} src={defaultDetailIcon} alt="default list image 2" />
        </>
      )}
    </div>
  );
});
