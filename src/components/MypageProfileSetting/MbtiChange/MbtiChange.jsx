import axios from "axios";
import styles from "./MbtiChange.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { mbtiMapping } from "../../../const/mbtiMapping";

const MbtiChange = () => {
  const navigate = useNavigate();

  const [mbtiIE, setMbtiIE] = useState("");
  const [mbtiSN, setMbtiSN] = useState("");
  const [mbtiTF, setMbtiTF] = useState("");
  const [mbtiJP, setMbtiJP] = useState("");

  const ChangeMbti = async () => {
    const confirmChange = window.confirm("MBTI를 변경하시겠습니까?");

    if (confirmChange) {
      const fullMbti = `${mbtiIE}${mbtiSN}${mbtiTF}${mbtiJP}`;
      const mbti = mbtiMapping[fullMbti];

      if (!mbtiIE || !mbtiSN || !mbtiTF || !mbtiJP) {
        alert("MBTI를 완전히 선택해주세요.");
        return;
      }

      try {
        const response = await axios.patch(
          `https://api.oneulmohae.co.kr/myPage/mbti`,
          { mbti: mbti },
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
          }
        );

        alert("MBTI가 변경되었습니다.");
        window.location.reload(); // 페이지 리로딩
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // 403 에러인 경우 (GUEST일 때)
          alert("회원 추가 정보 입력이 필요합니다. 해당 페이지로 이동합니다.");
          navigate("/Signup", { replace: true });
        } else {
          alert("MBTI 변경 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    } else {
      setMbtiIE("");
      setMbtiSN("");
      setMbtiTF("");
      setMbtiJP("");
    }
  };

  return (
    <div className={styles["profile-setting-main-mbti-change-container"]}>
      <p className={styles["profile-setting-main-mbti-change-title"]}>MBTI 변경</p>
      <div className={styles["profile-setting-main-mbti-change-select-container"]}>
        <select
          className={styles["profile-setting-main-mbti-change-select-IE"]}
          name="mbtiIE"
          id="mbti-IE"
          value={mbtiIE}
          onChange={(e) => setMbtiIE(e.target.value)}
        >
          <option value="">I/E</option>
          <option value="I">I</option>
          <option value="E">E</option>
        </select>
        <select
          className={styles["profile-setting-main-mbti-change-select-SN"]}
          name="mbtiSN"
          id="mbti-SN"
          value={mbtiSN}
          onChange={(e) => setMbtiSN(e.target.value)}
        >
          <option value="">S/N</option>
          <option value="S">S</option>
          <option value="N">N</option>
        </select>
        <select
          className={styles["profile-setting-main-mbti-change-select-TF"]}
          name="mbtiTF"
          id="mbti-TF"
          value={mbtiTF}
          onChange={(e) => setMbtiTF(e.target.value)}
        >
          <option value="">T/F</option>
          <option value="T">T</option>
          <option value="F">F</option>
        </select>
        <select
          className={styles["profile-setting-main-mbti-change-select-JP"]}
          name="mbtiJP"
          id="mbti-JP"
          value={mbtiJP}
          onChange={(e) => setMbtiJP(e.target.value)}
        >
          <option value="">J/P</option>
          <option value="J">J</option>
          <option value="P">P</option>
        </select>
      </div>
      <button
        type="button"
        className={styles["profile-setting-main-mbti-change-button"]}
        onClick={ChangeMbti}
      >
        변경하기
      </button>
    </div>
  );
};

export default MbtiChange;
