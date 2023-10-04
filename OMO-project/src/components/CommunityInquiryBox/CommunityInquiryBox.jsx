import styles from "./CommunityInquiryBox.module.css";
import CommunityProfile from "../../assets/profile-img.jpg";
import React, {useState} from "react";

const CommunityInquiryBox = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
    console.log(expanded);
  };

  const containerClassName = expanded ? styles["Communityinquirybox-total-container-expanded"] : styles["Communityinquirybox-total-container"];
  return (
    <div className={containerClassName} onClick={handleClick}>
      <div className={styles["Communityinquirybox-title-img-nickname-content-container"]}>
        <p className={styles["Communityinquirybox-title"]}>{props.title}</p>
        <div className={styles["Communityinquirybox-img-nickname-container"]}>
          <img className={styles["Communityinquirybox-profile-img"]} src={CommunityProfile} alt="프로필 이미지" />
          <span className={styles["Communityinquirybox-nickcame"]}>{props.nickname}</span>
        </div>
        <p className={styles["Communityinquirybox-content"]}>{props.content}</p>
      </div>
    </div>
  );
};
export default CommunityInquiryBox;
