import styles from "./MbtiChange.module.css";

const MbtiChange = () => (
  <div className={styles["profile-setting-main-mbti-change-container"]}>
    <p className={styles["profile-setting-main-mbti-change-title"]}>MBTI 변경</p>
    <div className={styles["profile-setting-main-mbti-change-select-container"]}>
      <select className={styles["profile-setting-main-mbti-change-select-IE"]} name="mbti" id="mbti-select">
        <option value="I">I</option>
        <option value="E">E</option>
      </select>
      <select className={styles["profile-setting-main-mbti-change-select-SN"]} name="mbti" id="mbti-select">
        <option value="S">S</option>
        <option value="N">N</option>
      </select>
      <select className={styles["profile-setting-main-mbti-change-select-TF"]} name="mbti" id="mbti-select">
        <option value="T">T</option>
        <option value="F">F</option>
      </select>
      <select className={styles["profile-setting-main-mbti-change-select-JP"]} name="mbti" id="mbti-select">
        <option value="J">J</option>
        <option value="P">P</option>
      </select>
    </div>
    <button type="button" className={styles["profile-setting-main-mbti-change-button"]}>
      변경하기
    </button>
  </div>
);

export default MbtiChange;
