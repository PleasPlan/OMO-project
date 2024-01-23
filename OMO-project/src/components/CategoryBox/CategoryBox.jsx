import styles from "./CategoryBox.module.css";

export const CategoryBox = (props) => (
  <>
    <a href="#" className={styles["main-category-container"]}>
      <div className={styles["main-category-box"]}>
        <span className={styles["main-category-box-title"]}>{props.title}</span>
        <img className={styles["main-category-box-img"]} src={props.img} />
      </div>
    </a>
  </>
);
