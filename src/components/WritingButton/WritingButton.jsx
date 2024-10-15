import styles from "./WritingButton.module.css";
import WritingButtonImg from "../../assets/writing-button.png";

export const WritingButton = () => (
  <>
    <div className={styles["writing-btn-container"]}>
      <button type="button" className={styles["writing-btn"]}>
        <img src={WritingButtonImg} alt="글쓰기 아이콘" style={{width: "80px", height: "80px"}} />{" "}
      </button>
    </div>
  </>
);
