import styles from "./MyCourseWrite.module.css";
import pencil from "../../../assets/my-course/write/gray-pencil.png";
import MyCoursePlusBox from "../../../components/MyCourse/MyCoursePlusBox/MyCoursePlusBox";
import MyCourseSearchBox from "../../../components/MyCourse/MyCourseSearchBox/MyCourseSearchBox";
import MyCourseAfter from "../../../components/MyCourse/MyCourseAfter/MyCourseAfter";
import {ScrollToTop} from "../../../components/ScrollToTop/ScrollToTop";
import {WritingButton} from "../../../components/WritingButton/WritingButton";
import Save from "../../../components/MyCourse/Button/Save/Save";
import EditShare from "../../../components/MyCourse/Button/Edit-Share/Edit-Share";
import MyCourseFindInterestModal from "./../../../components/MyCourse/MyCourseFindInterestModal/MyCourseFindInterestModal"; // 관심 목록에서 찾기 모달창
import MyCourseFindRecentModal from "./../../../components/MyCourse/MyCourseFindRecentModal/MyCourseFindRecentModal"; // 최근 본 목록에서 찾기 모달창
import MyCourseFindSearchModal from "../../../components/MyCourse/MyCourseFindSearchModal/MyCourseFindSearchModal";


const MyCourseWrite = () => (
  <div className={styles["myCourseWrite-total-container"]}>
    <div className={styles["myCourseWrite-title-container"]}>
      <input type="text" placeholder="나만의 코스" maxLength="10" className={styles["myCourseWrite-input-title"]} />
      <img src={pencil} alt="연필" className={styles["myCourseWrite-img-title"]} />
    </div>
    <MyCourseSearchBox />
    <MyCourseSearchBox />
    <MyCourseSearchBox />
    {/* <MyCoursePlusBox /> */}
    <MyCourseAfter />
    <Save />
    {/* <EditShare /> */}
    <ScrollToTop />
    <WritingButton />
    {/* <MyCourseFindInterestModal /> */}
    {/* <MyCourseFindRecentModal /> */}
    {/* <MyCourseFindSearchModal /> */}
  </div>
);

export default MyCourseWrite;
