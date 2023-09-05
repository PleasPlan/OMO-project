import styles from "./NoticeItems.module.css";

const NoticeItems = (props) => (
  <div className={styles["noticeitems-total-container"]}>
    <div className={styles["noticeitems-title-division-date-content-container"]}>
      <p className={styles["noticeitems-title"]}>{props.title}</p>
      <div className={styles["noticeitems-division-date-container"]}>
        <p className={styles["noticeitems-division"]}>{props.division}</p>
        <p className={styles["noticeitems-date"]}>{props.date}</p>
      </div>
      <p className={styles["noticeitems-content"]}>{props.content}</p>
    </div>
  </div>
);

export default NoticeItems;
