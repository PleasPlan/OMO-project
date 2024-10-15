import styles from "./MembershipWithdrawal.module.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const MembershipWithdrawal = ({setIsLoggedIn}) => {
  const navigate = useNavigate();

  const handleWithdrawal = async () => {
    const confirmWithdrawal = window.confirm("정말 탈퇴하시겠습니까?");

    if (confirmWithdrawal) {
      try {
        const response = await axios.delete(`https://api.oneulmohae.co.kr/member`, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
          withCredentials: true,
        });

        if (response.status === 200 || response.status === 204) {
          alert("탈퇴되었습니다.");
          setIsLoggedIn(false);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("isExistingMember");
          localStorage.removeItem("recentData");
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('savedCoordinates');
          navigate("/", {replace: true});
        } else {
          alert("탈퇴에 실패하였습니다. 다시 시도해 주세요.");
        }
      } catch (error) {
        alert("탈퇴에 실패하였습니다. 다시 시도해 주세요.");
      }
    }
  };

  return (
    <div className={styles["profile-setting-main-membership-withdrawal-container"]}>
      <p className={styles["profile-setting-main-membership-withdrawal-title"]}>탈퇴하기</p>
      <button type="button" className={styles["profile-setting-main-membership-withdrawal-button"]} onClick={handleWithdrawal}>
        회원 탈퇴
      </button>
    </div>
  );
};

export default MembershipWithdrawal;
