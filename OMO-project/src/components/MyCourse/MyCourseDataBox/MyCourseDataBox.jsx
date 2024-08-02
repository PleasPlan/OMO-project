import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MyCourseDataBox.module.css";
import Like from "../../../assets/detail/purple-thumb.png";
import Jjim from "../../../assets/detail/red-heart.png";
import defaultDetailIcon from "../../../assets/detail/defaultDetailIcon.png";

export const MyCourseDataBox = ({ data }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchReviewImages = async () => {
      try {
        const response = await axios.get(`https://api.oneulmohae.co.kr/review/${data.id}?page=1&size=10`);
        const fetchedPosts = response.data.data;

        const imageNames = fetchedPosts.map((post) => post.imageName).filter((imageName) => imageName !== null);

        const fetchImagePromises = imageNames.map(async (imageName) => {
          const imageResponse = await axios.get(`https://api.oneulmohae.co.kr/image/${encodeURIComponent(imageName)}`, { responseType: "blob" });
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
  }, [data.id]);

  const firstImages = images.slice(0, 2);
  console.log(firstImages)

  return (
    <div className={styles["mycourse-data-box-total-container"]}>
      <div className={styles["mycourse-data-box-box-container"]}>
        <div className={styles["mycourse-data-box-box-inner-container"]}>
          <span className={styles["mycourse-data-box-box-title"]}>{data.place_name}</span>

          <div className={styles["mycourse-data-box-box-like-jjim-container"]}>
            <div className={styles["mycourse-data-box-box-jjim"]}>
              <img src={Jjim} alt="찜 아이콘" style={{ position: "absolute", top: "2px", width: "20px", height: "20px" }} />
              <span className={styles["mycourse-data-box-box-jjim-number"]}> {data.mine}</span>
            </div>
            <div className={styles["mycourse-data-box-box-like"]}>
              <img src={Like} alt="좋아요 아이콘" style={{ position: "absolute", top: "0px", width: "20px", height: "20px" }} />
              <span className={styles["mycourse-data-box-box-like-number"]}> {data.recommend}</span>
            </div>
          </div>

          <span className={`${styles["mycourse-data-box-box-phone"]} ${!data.phone ? styles["not_provided"] : ""}`}>{data.phone ? data.phone : "전화번호 미제공"}</span>
          <span className={styles["mycourse-data-box-box-address-brief"]}>{data.road_address_name}</span>

          {firstImages.length === 1 ? (
            <>
              <img className={styles["mycourse-data-box-box-img1"]} src={firstImages[0]} alt="list image 1" />
              <img className={styles["mycourse-data-box-box-img2"]} src={defaultDetailIcon} alt="default list image 2" />
            </>
          ) : firstImages.length > 1 ? (
            <>
              <img className={styles["mycourse-data-box-box-img1"]} src={firstImages[0]} alt="list image 1" />
              <img className={styles["mycourse-data-box-box-img2"]} src={firstImages[1]} alt="list image 2" />
            </>
          ) : (
            <>
              <img className={styles["mycourse-data-box-box-img1"]} src={defaultDetailIcon} alt="default list image 1" />
              <img className={styles["mycourse-data-box-box-img2"]} src={defaultDetailIcon} alt="default list image 2" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourseDataBox;
