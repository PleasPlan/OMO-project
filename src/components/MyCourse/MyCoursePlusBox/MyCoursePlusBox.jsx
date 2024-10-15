import styles from "./MyCoursePlusBox.module.css";
import downArrow from "../../../assets/my-course/write/down-arrow.png";
import PlusButton from "../../../assets/my-course/write/plus.png";
import MyCourseFindBox from "../MyCourseFindBox/MyCourseFindBox";

const MyCoursePlusBox = ({onPlusButtonClick}) => (
  <div className={styles["mycourse-plus-box-arrow-total-container"]}>
    <div className={styles["mycourse-plus-box-total-container"]}>
      <button
        type="button"
        className={styles["mycourse-plus-box-plus-box"]}
        onClick={onPlusButtonClick} // 클릭 시 MyCourseFindBox 추가
      >
        <img src={PlusButton} alt="플러스 버튼" className={styles["mycourse-plus-box-plus-button"]} />
      </button>
    </div>
  </div>
);

export default MyCoursePlusBox;
