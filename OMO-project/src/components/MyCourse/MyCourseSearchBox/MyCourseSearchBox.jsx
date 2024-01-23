import styles from "./MyCourseSearchBox.module.css";
import downArrow from "../../../assets/my-course/write/down-arrow.png";
import Delete from "../Button/Delete/Delete";
import MyCourseCalendar from '../MyCourseCalendar/MyCourseCalendar';


const MyCourseSearchBox = () => (
  <div className={styles["myCourseSearchBox-total-container"]}>
       <MyCourseCalendar/>
      
    <div className={styles["myCourseSearchBox-button-container"]}>
      <button type="button" className={styles["myCourseSearchBox-button-popular"]}>
        찜 목록에서 찾기
      </button>
      <button type="button" className={styles["myCourseSearchBox-button-recent"]}>
        최근 본 목록에서 찾기
      </button>
      <button type="button" className={styles["myCourseSearchBox-button-search"]}>
        검색을 통해 찾기
      </button>
    </div>
    <Delete />
    <img src={downArrow} alt="아래 화살표" className={styles["myCourseSearchBox-downArrow-img"]} />
  </div>
);

export default MyCourseSearchBox;
