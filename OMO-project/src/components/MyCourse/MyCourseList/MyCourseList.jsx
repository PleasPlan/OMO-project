import styles from "./MyCourseList.module.css";

const MyCourseList = (props) => (
  <a href="#" className={styles["mycourse-list-container"]}>
    <p className={styles["mycourse-list-title"]}>{props.title}</p>
    <p className={styles["mycourse-list-date"]}>{props.reg_at}</p>
  </a>
);

export default MyCourseList;
