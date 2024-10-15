import styles from "./NoticeItems.module.css";
import React, {useState} from "react";

const NoticeItems = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const containerClassName = expanded ? styles["noticeitems-total-container-expanded"] : styles["noticeitems-total-container"];
  return (
    <div className={containerClassName} onClick={handleClick}>
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
};

export default NoticeItems;
