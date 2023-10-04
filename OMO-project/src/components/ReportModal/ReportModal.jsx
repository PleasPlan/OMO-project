import React, {useState} from "react";
import styles from "./ReportModal.module.css";
import {Radio} from "../Radio/Radio";
import {RadioGroup} from "../../components/Radio/RadioGroup";
// import Portal from './../../utils/Portal';
import ReportClose from "../../assets/modal-close.png";

const ReportModal = () => {

  
  // 신고 모달창 닫기
  // const [modal, setModal] = useState(true);

  return (
  <div>
      <div className={styles['Overlay']}>
    <div className={styles["report-modal-container"]}>
      <label className={styles["report-modal-select"]}  htmlFor="report-reason">
      <div className={styles['report-modal-title']}>신고 사유를 선택해주세요</div>
        <button className={styles["report-modal-close-btn"]} type="button"  onClick={ () => { setModal(false) } }>
          <img className={styles["report-modal-close-btn-img"]} src={ReportClose} alt="닫기 아이콘" />
          {/* {modal === false ? setModal(true) : null } */}
        </button>
      </label>

      {/* <hr className={styles["hr"]} /> */}
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
            <input className={styles["report-modal-etc-input"]} type="text" id="etc" maxLength={50}></input>
          </Radio>
        </RadioGroup> 
      </form>
      <div className={styles["report-btn-container"]}>
          <button type="submit" className={styles["report-btn"]}>
            신고하기
          </button>
        </div>
    </div>
    </div>
  </div>
);
  };

export default ReportModal;
