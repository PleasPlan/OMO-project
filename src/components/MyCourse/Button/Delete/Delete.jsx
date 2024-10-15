import styles from "./Delete.module.css";

const Delete = ({onClick}) => (
  <button type="button" className={styles["delete-button"]} onClick={onClick}>
    삭제
  </button>
);
export default Delete;
