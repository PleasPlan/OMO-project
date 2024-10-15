import styles from "./CategoryBox.module.css";
import {useNavigate} from "react-router-dom";

export const CategoryBox = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <button
        onClick={() => {
          navigate(props.route);
        }}
        className={styles["main-category-container"]}
      >
        <div className={styles["main-category-box"]}>
          <span className={styles["main-category-box-title"]}>{props.title}</span>
          <img className={styles["main-category-box-img"]} src={props.src} />
        </div>
      </button>
    </>
  );
};
