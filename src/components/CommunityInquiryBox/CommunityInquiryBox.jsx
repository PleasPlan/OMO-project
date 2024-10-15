import styles from "./CommunityInquiryBox.module.css";
import CommunityProfile from "../../assets/profile-img.jpg";
import React, {useState} from "react";

const CommunityInquiryBox = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const containerClassName = expanded ? styles["community-inquiry-box-total-container-expanded"] : styles["community-inquiry-box-total-container"];
  return (
    <div className={containerClassName} onClick={handleClick}>
      <div className={styles["community-inquiry-box-title-img-nickname-content-container"]}>
        <p className={styles["community-inquiry-box-title"]}>{props.title}</p>
        <div className={styles["community-inquiry-box-img-nickname-container"]}>
          <img className={styles["community-inquiry-box-profile-img"]} src={CommunityProfile} alt="프로필 이미지" />
          <span className={styles["community-inquiry-box-nickcame"]}>OmO 운영진</span>
        </div>
        <p className={styles["community-inquiry-box-content"]}>{props.content}</p>
      </div>
    </div>
  );
};
export default CommunityInquiryBox;
