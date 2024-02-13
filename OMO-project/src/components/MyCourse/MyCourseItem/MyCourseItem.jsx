// 나만의 코스 개별 아이템

import styles from "./MyCourseItem.module.css";
import {useNavigate} from "react-router-dom";

const MyCourseItem = ({id, title, regat}) => {
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/MyCourseDetail/${id}`);
  };
  
  return (
    <>
    <div className={styles["mycourse-item-container"]} onClick={goDetail}>
      <div className={styles["mycourse-item-title"]}>{title}</div>
      <div className={styles["mycourse-item-date"]}>{regat}</div>
    </div>
      </>
  );
};

export default MyCourseItem;
