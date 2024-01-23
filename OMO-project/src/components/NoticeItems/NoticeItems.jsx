import styles from "./NoticeItems.module.css";

const NoticeItems = (props) => (
  <div className={styles["notice-main-subtitle-free-container"]}>
    <a href="#" className={styles["notice-main-subtitle-free-division"]}>
      {props.division}
    </a>
    <a href="#" className={styles["notice-main-subtitle-free-title"]}>
      {props.title}
    </a>
    <a href="#" className={styles["notice-main-subtitle-free-date"]}>
      {props.date}
    </a>
  </div>
);

export default NoticeItems;
