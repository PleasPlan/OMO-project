import styles from "./Save.module.css";
import {Link} from "react-router-dom";

const Save = () => {
  const saveClick = () => {
    alert("저장되었습니다.");
  };
  return (
    <div className={styles["save-button-container"]}>
      <Link to="/MyCourseDetail" onClick={saveClick}>
        <button type="button" className={styles["save-button"]}>
          저장
        </button>
      </Link>
    </div>
  );
};
export default Save;
