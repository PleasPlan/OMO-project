// 상세페이지 (Diary)

import styles from "./MyCourseDetail.module.css";
import {ScrollToTop} from "../../../components/ScrollToTop/ScrollToTop";
import {data} from "../../../const/data";
import MyCourseDataBox from "../../../components/MyCourse/MyCourseDataBox/MyCourseDataBox";
import MyCourseCalendar from "../../../components/MyCourse/MyCourseCalendar/MyCourseCalendar";
import Share from "../../../components/MyCourse/Button/Share/Share";
import Edit from "../../../components/MyCourse/Button/Edit/Edit";
import downArrow from "../../../assets/my-course/write/down-arrow.png";
import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {MyCourseStateContext} from "../../../App";
import MyCourseDetailBox from "../../../components/MyCourseDetailBox/MyCourseDetailBox";

const MyCourseDetail = () => {
  const {id} = useParams();
  const myCourseList = useContext(MyCourseStateContext);
  const navigate = useNavigate();
  const [data, setData] = useState();
  const getStringDate = (date) => {
    const options = {year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", hour12: false};
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
  };

  useEffect(() => {
    if (myCourseList.length >= 1) {
      const targetMyCourse = myCourseList.find((it) => parseInt(it.id) === parseInt(id));
      console.log(targetMyCourse);

      if (targetMyCourse) {
        setData(targetMyCourse);
      } else {
        // alert("존재하지 않는 코스입니다.")
        navigate("/MyCourseMain", {replace: true});
      }
    }
  }, [id, myCourseList]);

  if (!data) {
    return <div>로딩중입니다...</div>;
  } else {
    return (
      <div className={styles["mycourse-detail-total-container"]}>
        <div className={styles["mycourse-detail-title-container"]}>
          <span>{data.title}</span>
        </div>
        <div className={styles["mycourse-detail-course-container"]}>
          <div className={styles["mycourse-detail-course-item-container"]}>
            <div className={styles["mycourse-detail-calendar-container"]}>{getStringDate(new Date(data.date))}</div>
            <div>{data.content}</div>
            <MyCourseDetailBox />
          </div>
          <img src={downArrow} alt="아래 화살표" className={styles["mycourse-detail-down-arrow-img"]}></img>
          <div className={styles["mycourse-detail-course-item-container"]}>
            <div className={styles["mycourse-detail-calendar-container"]}>{getStringDate(new Date(data.date))}</div>
            <div>{data.content}</div>
            <MyCourseDetailBox />
          </div>
          <img src={downArrow} alt="아래 화살표" className={styles["mycourse-detail-down-arrow-img"]}></img>
          <div className={styles["mycourse-detail-course-item-container"]}>
            <div className={styles["mycourse-detail-calendar-container"]}>{getStringDate(new Date(data.date))}</div>
            <div>{data.content}</div>
            <MyCourseDetailBox />
          </div>
        </div>
        <div className={styles["mycourse-detail-edit-share-button-container"]}>
          <Edit /> <Share />
        </div>
        <ScrollToTop />
      </div>
    );
  }
};

export default MyCourseDetail;
