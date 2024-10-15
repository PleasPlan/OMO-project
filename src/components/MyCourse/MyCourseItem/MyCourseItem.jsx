import styles from "./MyCourseItem.module.css";
import {useNavigate} from "react-router-dom";
import Like from "../../../assets/community/my-course-board/empty-thumb.png";
import LikeClicked from "../../../assets/detail/purple-thumb.png";

const MyCourseItem = ({writerName, courseId, courseName, createdAt, likeCount, myLiked}) => {
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/MyCourseDetail/${courseId}`);
  };

  const formatDate = (dateString) => {
    const options = {year: "numeric", month: "2-digit", day: "2-digit"};
    const date = new Date(dateString);
    return date.toLocaleDateString("ko-KR", options).replace(/\./g, ". ").trim();
  };

  return (
    <div className={styles["mycourse-item-container"]} onClick={goDetail}>
      <div className={styles["mycourse-item-box"]}>
        <div className={styles["mycourse-item-title"]}>{courseName}</div>
        <img src={myLiked ? LikeClicked : Like} alt="좋아요 아이콘" className={styles["mycourse-item-img"]} />
        <span className={styles["mycourse-item-like-number"]}> {likeCount}</span>
      </div>
    <div>
      <div className={styles["mycourse-item-writer"]}>{writerName}</div>
      <div className={styles["mycourse-item-date"]}>{formatDate(createdAt)}</div>
      </div>
    </div>
  );
};

export default MyCourseItem;
