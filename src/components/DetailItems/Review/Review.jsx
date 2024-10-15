import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./Review.module.css";
import logoCircle from "../../../assets/logo-circle.png";
import { elapsedText } from './../../../utils/Time/elapsedText';
import DefaultProfileImage from "../../../assets/profile-default.png";


export const Review = ({ id, writer, createdDate, imageName, content, profileImageUrl, fetchImgFile, writerProfileImage }) => {
  const [profileImage, setProfileImage] = useState(logoCircle);

  // const navigate = useNavigate();

  // // 마이페이지 내 정보에서 빼온 게시글 댓글 달기 입력창 프로필 사진 
  // const [myInfoData, setMyInfoData] = useState(null);
  // const [image, setImage] = useState(DefaultProfileImage);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const loggedIn = localStorage.getItem("isLoggedIn") === "true";
  //   if (!loggedIn) {
  //     alert("로그인 후 이용 가능한 서비스입니다.");
  //     navigate("/Login", {replace: true});
  //   }
  // }, [navigate]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const accessToken = localStorage.getItem("accessToken");

  //       const response = await axios.get(`https://api.oneulmohae.co.kr/myPage/myInfo`, {
  //         headers: {
  //           Authorization: accessToken,
  //         },
  //       });
  //       setMyInfoData(response.data);
  //       setIsLoading(false);

  //       if (response.data.profileImageUrl) {
  //         const imageUrl = `https://api.oneulmohae.co.kr/image/${encodeURIComponent(response.data.profileImageUrl)}`;

  //         try {
  //           const imageResponse = await axios.get(imageUrl, {
  //             headers: {
  //               Authorization: accessToken,
  //             },
  //             responseType: "blob",
  //           });

  //           const imageBlob = imageResponse.data;
  //           const imageObjectURL = URL.createObjectURL(imageBlob);
  //           setImage(imageObjectURL);
  //         } catch (imageError) {
  //           setImage(response.data.profileImageUrl);
  //         }
  //       }
  //     } catch (error) {
  //       navigate("/Login", {replace: true});
  //       console.error("내정보를 불러오는데 실패하였습니다.", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (writerProfileImage) {
        try {
          const imageUrl = `https://api.oneulmohae.co.kr/image/${encodeURIComponent(writerProfileImage)}`;
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
          setProfileImage(logoCircle);
        }
      }
    };

    fetchProfileImage();
  }, [writerProfileImage]);

  return (
    <>
      <div className={styles["detail-review-box"]}>
        <div className={styles["detail-review-inner-top-container"]}>
          <div className={styles["detail-review-profile"]}>
            {fetchImgFile && <img src={fetchImgFile} alt="리뷰 이미지" className={styles["detail-review-image"]} />} {/* 이미지가 있을 때만 이미지 표시 */}
            <div className={styles["detail-review-profile-img"]}>
              <img src={profileImage} alt="프로필 이미지" style={{ width: "50px", height: "50px" }} onError={(e) => { e.target.onerror = null; e.target.src = logoCircle; }} />
              <span className={styles["detail-review-profile-nick"]}>{writer}</span>
              <p className={`${styles["detail-review-content"]} ${!imageName && styles["detail-review-no-image"]}`}>{content}</p>
            </div>
          </div>
          <span className={styles["detail-review-date"]}>{elapsedText(new Date(createdDate)).toLocaleString()}</span>
        </div>
      </div>
    </>
  );
};
