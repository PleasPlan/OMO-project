import styles from "./SubCategoryBox.module.css";

export const SubCategoryBox = (props) => (
    <>
      <a href="#" className={styles["sub-category-container"]}>
      <div className={styles["sub-category-box"]}>
        <span className={styles["sub-category-box-title"]}>{props.title}</span>
        <img className={styles["sub-category-box-img"]} src={props.img} />
      </div>
      </a>
    </>
  );

