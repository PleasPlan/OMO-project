import styles from "./FindButton.module.css";

const FindButton = ({text, type, onClick}) => {
  return (
    <>
      <button className={styles["mycourse-find-box-button"]} onClick={onClick}>
        {text}
      </button>
    </>
  );
};

export default FindButton;

