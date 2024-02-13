import styles from "./MyCourseAfter.module.css";
import MyCourseFindBox from "../MyCourseFindBox/MyCourseFindBox";
import MyCoursePlusBox from "../MyCoursePlusBox/MyCoursePlusBox";
import React, {useState} from "react";

const MyCourseAfter = ({dates, setDates, content, setContent}) => {

  const getStringDate = (dates) => {
    return dates.toISOString().slice(0, 16);
  };
  const [myCourseFindBoxes, setMyCourseFindBoxes] = useState([]);

  const addMyCourseFindBox = () => {
    setMyCourseFindBoxes([...myCourseFindBoxes, <MyCourseFindBox dates={dates} setDates={setDates} content={content} setContent={setContent} key={myCourseFindBoxes.length} idx={dates.length} />]);
    setDates([...dates,  getStringDate(new Date())])
  };

  return (
    <div className={styles["mycourse-after-total-container"]}>
      {myCourseFindBoxes}

      <MyCoursePlusBox onPlusButtonClick={addMyCourseFindBox} />
    </div>
  );
};

export default MyCourseAfter;
