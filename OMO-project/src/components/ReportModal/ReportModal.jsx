import styles from "./ReportModal.module.css";
import {Radio} from "../Radio/Radio";
import {RadioGroup} from "../../components/Radio/RadioGroup";
import ReportClose from "../../assets/modal-close.png";

const ReportModal = () => (
  <>
    <div className={styles["report-modal-container"]}>
      <label className={styles["report-modal-select"]}  htmlFor="report-reason">
        신고 사유를 선택해주세요
        <button className={styles["report-modal-close-btn"]} type="button">
          <img className={styles["report-modal-close-btn-img"]} src={ReportClose} alt="닫기 아이콘" />
        </button>
      </label>
      <form className={styles["report-modal-radio-container"]}>
        <RadioGroup>
          <Radio name="report-reason" value="INAPPROPRIATE-SUBJECT" defaultChecked>
            부적절한 주제
          </Radio>
          <Radio name="report-reason" value="INACCURATE-IMFORMAION">
            부정확한 정보
          </Radio>
          <Radio name="report-reason" value="DUPLICATION">
            중복 게시물 도배
          </Radio>
          <Radio name="report-reason" value="UNRELATED-SUBJECT">
            주제와 맞지 않음
          </Radio>
          <Radio name="report-reason" value="SWEAR">
            욕설 및 비방
          </Radio>
          <Radio name="report-reason" value="ETC">
            기타
            <input className={styles["report-modal-etc-input"]} type="text" id="etc"></input>
          </Radio>
        </RadioGroup> 
      </form>
      <div className={styles["report-btn-container"]}>
          <button type="submit" className={styles["report-btn"]}>
            신고하기
          </button>
        </div>
    </div>
  </>
);

export default ReportModal;
