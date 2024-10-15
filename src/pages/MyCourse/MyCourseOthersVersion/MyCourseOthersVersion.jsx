import styles from "./MyCourseOthersVersion.module.css";
import {ScrollToTop} from "../../../components/ScrollToTop/ScrollToTop";
import {data} from "../../../const/data";
import ComeBackList from "../../../components/MyCourse/Button/ComeBackList/ComeBackList";
import MyCourseCalendar from "./../../../components/MyCourse/MyCourseCalendar/MyCourseCalendar";
import {Link} from "react-router-dom";
import {MyCourseOthersDataBox} from "./../../../components/MyCourseOthersDataBox/MyCourseOthersDataBox";
import {communityMyCourse} from "../../../const/communityMyCourse";
import {useParams} from "react-router-dom";
import downArrow from "../../../assets/my-course/write/down-arrow.png";

const MyCourseOthersVersion = () => {
  const {id} = useParams();

  const targetData = communityMyCourse.find((it) => parseInt(it.id) === parseInt(id));
  const MyCourseOthersDataBox1 = data.find((item) => item.id === 1);
  const MyCourseOthersDataBox2 = data.find((item) => item.id === 2);
  const MyCourseOthersDataBox3 = data.find((item) => item.id === 3);
  const MyCourseOthersDataBox4 = data.find((item) => item.id === 4);

  return (
    <div className={styles["mycourse-detail-total-container"]}>
      <div className={styles["mycourse-detail-title-container"]}>
        <span>{targetData.title}</span>
      </div>
      <div className={styles["mycourse-detail-course-container"]}>
        <div className={styles["mycourse-detail-course-item-container"]}>
          <div className={styles["mycourse-detail-calendar-container"]}>2024년 1월 20일 오후 12:00</div>
          <MyCourseOthersDataBox key={MyCourseOthersDataBox1.id} {...MyCourseOthersDataBox1} />
          <img src={downArrow} className={styles["mycourse-data-box-down-arrow-img"]} />
        </div>

        <div className={styles["mycourse-detail-course-item-container"]}>
          <div className={styles["mycourse-detail-calendar-container"]}>2024년 1월 20일 오후 3:30</div>
          <MyCourseOthersDataBox key={MyCourseOthersDataBox2.id} {...MyCourseOthersDataBox2} />
          <img src={downArrow} className={styles["mycourse-data-box-down-arrow-img"]} />
        </div>

        <div className={styles["mycourse-detail-course-item-container"]}>
          <div className={styles["mycourse-detail-calendar-container"]}>2024년 1월 20일 오후 5:00</div>
          <MyCourseOthersDataBox key={MyCourseOthersDataBox3.id} {...MyCourseOthersDataBox3} />
          <img src={downArrow} className={styles["mycourse-data-box-down-arrow-img"]} />
        </div>

        <div className={styles["mycourse-detail-course-item-container"]}>
          <div className={styles["mycourse-detail-calendar-container"]}>2024년 1월 20일 오후 7:30</div>
          <MyCourseOthersDataBox key={MyCourseOthersDataBox3.id} {...MyCourseOthersDataBox4} />
        </div>
      </div>
      <div className={styles["mycourse-detail-edit-share-button-container"]}></div>
      <Link to="/MyCourseBoard">
        <ComeBackList />
      </Link>
      <ScrollToTop />
    </div>
  );
};

export default MyCourseOthersVersion;
