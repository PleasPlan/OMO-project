import styles from "./Filter.module.css";

const Filter = (props) => (
  <div className={styles["filter-container"]}>
    <button href="#" className={styles["filter-button"]}>
      {props.title} <span className={styles["filter-bar"]}>{props.bar}</span>
    </button>
  </div>
);

export default Filter;
