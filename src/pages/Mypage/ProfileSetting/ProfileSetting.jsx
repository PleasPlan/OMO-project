import styles from "./ProfileSetting.module.css";
import SettingIcon from "../../../assets/my-page/setting/profile-setting.png";
import Mypage from "../../../components/Mypage/Mypage";
import ProfileChange from "../../../components/MypageProfileSetting/ProfileChange/ProfileChange";
import {useNavigate} from "react-router-dom";
import NicknameChange from "../../../components/MypageProfileSetting/NicknameChange/NicknameChange";
import MbtiChange from "../../../components/MypageProfileSetting/MbtiChange/MbtiChange";
import MembershipWithdrawal from "../../../components/MypageProfileSetting/MembershipWithdrawal/MembershipWithdrawal";
import {useEffect} from "react";

const ProfileSetting = ({setIsLoggedIn}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedIn) {
      alert("로그인 후 이용 가능한 서비스입니다.");
      navigate("/Login", {replace: true});
    }
  }, [navigate]);

  return (
    <div className={styles["profile-setting-total-container"]}>
      <h2 className={styles["profile-setting-title-container"]}>
        <img src={SettingIcon} alt="프로필 설정" /> 프로필 설정
      </h2>
      <div className={styles["profile-setting-categories-main-container"]}>
        <Mypage />
        <ProfileChange />
        <NicknameChange />
        <MbtiChange />
        <MembershipWithdrawal setIsLoggedIn={setIsLoggedIn} />
      </div>
    </div>
  );
};
export default ProfileSetting;
