import React, { useState } from 'react';
import axios from 'axios';
import styles from "./CommunityReportModal.module.css";
import ReportClose from "../../../assets/modal-close.png";
import { ReportRadioGroup } from '../../Radio/ReportRadio/ReportRadioGroup';
import { ReportRadio } from '../../Radio/ReportRadio/ReportRadio';

const CommunityReportModal = ({ openModal, setOpenModal, boardId }) => {
  const [selectedReason, setSelectedReason] = useState("INAPPROPRIATE-SUBJECT");
  const [etcReason, setEtcReason] = useState("");

  const handleSubmit = async () => {
    const reason = selectedReason === "ETC" ? etcReason : "";
    let reportType = 1;

    switch (selectedReason) {
      case "INAPPROPRIATE-SUBJECT":
        reportType = 1;
        break;
      case "INACCURATE-INFORMATION":
        reportType = 2;
        break;
      case "DUPLICATION":
        reportType = 3;
        break;
      case "UNRELATED-SUBJECT":
        reportType = 4;
        break;
      case "SWEAR":
        reportType = 5;
        break;
      case "ETC":
        reportType = 6;
        break;
      default:
        reportType = 1;
    }

    if (reportType === 6 && !reason) {
      alert("신고 사유를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(`https://api.oneulmohae.co.kr/boardReport/${boardId}`, 
        {
          reportType,
          reason,
        },
        {
          headers: {
            'Authorization': `${localStorage.getItem("accessToken")}`,
          }
        }
      );

      if (response.status === 200 || response.status === 201){
        alert("신고 접수가 완료되었습니다.");
        setOpenModal(false);
      } else {
        alert("신고 접수에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      alert("신고 접수에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className={styles["Overlay"]}>
        <div className={styles["report-modal-container"]}>
          <label className={styles["report-modal-select"]} htmlFor="report-reason">
            <div className={styles["report-modal-title"]}>신고 사유를 선택해주세요</div>
            <button
              className={styles["report-modal-close-btn"]}
              type="button"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <img className={styles["report-modal-close-btn-img"]} src={ReportClose} alt="닫기 아이콘" />
              {!openModal ? setOpenModal(true) : null}
            </button>
          </label>

          <form className={styles["report-modal-radio-container"]}>
            <ReportRadioGroup name="report-reason">
              <ReportRadio name="report-reason" value="INAPPROPRIATE-SUBJECT" defaultChecked setSelectedReason={setSelectedReason}>
                부적절한 주제
              </ReportRadio>
              <ReportRadio name="report-reason" value="INACCURATE-INFORMATION" setSelectedReason={setSelectedReason}>
                부정확한 정보
              </ReportRadio>
              <ReportRadio name="report-reason" value="DUPLICATION" setSelectedReason={setSelectedReason}>
                중복 게시물 도배
              </ReportRadio>
              <ReportRadio name="report-reason" value="UNRELATED-SUBJECT" setSelectedReason={setSelectedReason}>
                주제와 맞지 않음
              </ReportRadio>
              <ReportRadio name="report-reason" value="SWEAR" setSelectedReason={setSelectedReason}>
                욕설 및 비방
              </ReportRadio>
              <ReportRadio name="report-reason" value="ETC" setSelectedReason={setSelectedReason}>
                기타
                {selectedReason === "ETC" && (
                  <input
                    className={styles["report-modal-etc-input"]}
                    type="text"
                    id="etc"
                    maxLength={50}
                    value={etcReason}
                    onChange={(e) => setEtcReason(e.target.value)}
                  />
                )}
              </ReportRadio>
            </ReportRadioGroup>
          </form>
          <div className={styles["report-btn-container"]}>
            <button
              type="submit"
              className={styles["report-btn"]}
              onClick={handleSubmit}
            >
              신고하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityReportModal;
