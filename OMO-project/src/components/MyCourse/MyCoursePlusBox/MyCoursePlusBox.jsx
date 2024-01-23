import styles from "./MyCoursePlusBox.module.css";
import downArrow from "../../../assets/my-course/write/down-arrow.png";
import PlusButton from "../../../assets/my-course/write/plus.png";
import MyCourseSearchBox from "../MyCourseSearchBox/MyCourseSearchBox";

const MyCoursePlusBox = () => (
  <div className={styles["myCoursePlusBox-arrow-total-container"]}>
    <div className={styles["myCoursePlusBox-total-container"]}>
      <button type="button" className={styles["myCoursePlusBox-plus-box"]}>
        <img src={PlusButton} alt="플러스 버튼" className={styles["myCoursePlusBox-plusButton"]} />
      </button>
    </div>
  </div>
);

export default MyCoursePlusBox;
