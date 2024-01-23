import MyCourseList from "../../../components/MyCourse/MyCourseList/MyCourseList";
import {ScrollToTop} from "../../../components/ScrollToTop/ScrollToTop";
import {myCourse} from "../../../const/myCourse";
import styles from "./MyCourseMain.module.css";

const MyCourseMain = () => (
  <div className={styles["mycourse-container"]}>
    <h2 className={styles["mycourse-title"]}> 나만의 코스 </h2>

    {myCourse.map((el) => {
      return <MyCourseList key={el.id} title={el.title} reg_at={el.reg_at} />;
    })}

    <ScrollToTop />
  </div>
);

export default MyCourseMain;
