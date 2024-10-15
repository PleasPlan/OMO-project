import styles from "./CommunityMyCourseList.module.css";
import Like from "../../assets/community/my-course-board/empty-thumb.png";
import LikeClicked from "../../assets/detail/purple-thumb.png";

import {useNavigate} from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}. ${month}. ${day}`;
};

const CommunityMyCourseList = (props) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles["community-mycourse-list-container"]}
      onClick={() => {
        navigate(`/MyCourseDetail/${props.courseId}`);
      }}
    >
      <div className={styles["community-mycourse-list-title"]}>
        <span className={styles["community-mycourse-list-course-name"]}>
          {props.courseName}
        </span>
        <img src={props.myLiked ? LikeClicked : Like} alt="좋아요 아이콘" className={styles["community-mycourse-list-img"]} />
        <span className={styles["community-mycourse-list-like-number"]}> {props.likeCount}</span>
      </div>

      <div className={styles["community-mycourse-list-nick"]}>
        <span>{props.writerName}</span>
      </div>
      <span className={styles["community-mycourse-list-date"]}>{formatDate(props.createdAt)}</span>
    </div>
  );
};

export default CommunityMyCourseList;
