import React, { useState, useEffect, forwardRef } from "react";
import axios from "axios";
import styles from "./ListBox.module.css";
import Like from "../../assets/detail/purple-thumb.png";
import Jjim from "../../assets/detail/red-heart.png";
import {useNavigate} from "react-router-dom";
import defaultListImg from "../../assets/detail/defaultDetailIcon.png"

const ListBox = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchReviewImages = async () => {
      try {
        // 리뷰 이미지 이름을 가져오는 API 호출
        const response = await axios.get(`https://api.oneulmohae.co.kr/review/${props.id}?page=1&size=10`);
        const fetchedPosts = response.data.data;

        // 이미지 이름 배열 생성
        const imageNames = fetchedPosts.map(post => post.imageName).filter(imageName => imageName !== null);

        // 이미지 파일을 가져오는 API 호출
        const fetchImagePromises = imageNames.map(async (imageName) => {
          const imageResponse = await axios.get(`https://api.oneulmohae.co.kr/image/${encodeURIComponent(imageName)}`, { responseType: 'blob' });
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
      <button
        ref={ref}
        onClick={() => {
          navigate(`/DetailMenu/${props.id}/${props.place_name}`);
          props.addRecentItem({
            id: props.id,
            place_name: props.place_name,
            address_name: props.address_name,
            road_address_name: props.road_address_name,
            phone: props.phone,
            mine: props.mine,
            recommend: props.recommend,
          });
        }}
        className={styles["list-box-container"]}
      >
        <div className={styles["list-box-inner-container"]}>
          <span className={styles["list-box-title"]}>{props.place_name}</span>

          <div className={styles["list-box-like-jjim-container"]}>
            <div className={styles["list-box-jjim"]}>
              <img src={Jjim} alt="찜 아이콘" style={{position: "absolute", top: "0px", width: "23px", height: "23px"}} />
              <span className={styles["list-box-jjim-number"]}> {props.mine}</span>
            </div>
            <div className={styles["list-box-like"]}>
              <img src={Like} alt="좋아요 아이콘" style={{position: "absolute", top: "-1px", width: "24px", height: "24px"}} />
              <span className={styles["list-box-like-number"]}> {props.recommend}</span>
            </div>
          </div>

          <span className={styles["list-box-address-brief"]}>{props.address_name}</span>
          {firstImages.length === 1 ? (
            <>
              <img
                className={styles["list-box-img1"]}
                src={firstImages[0]}
                alt="list image 1"
              />
              <img
                className={styles["list-box-img2"]}
                src={defaultListImg}
                alt="default list image 2"
              />
            </>
          ) : firstImages.length > 0 ? (
            <>
              {firstImages.map((image, index) => (
                <img
                  key={index}
                  className={index === 0 ? styles["list-box-img1"] : styles["list-box-img2"]}
                  src={image}
                  alt={`list image ${index + 1}`}
                />
              ))}
            </>
          ) : (
            <>
              <img className={styles["list-box-img1"]} src={defaultListImg} alt="default list image 1" />
              <img className={styles["list-box-img2"]} src={defaultListImg} alt="default list image 2" />
            </>
          )}
        </div>
      </button>
    </>
  );
});

// 디스플레이 이름 설정
ListBox.displayName = "ListBox";

export {ListBox};
