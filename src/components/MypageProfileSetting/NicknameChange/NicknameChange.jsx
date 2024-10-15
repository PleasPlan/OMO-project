import styles from "./NicknameChange.module.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 가져옵니다.

const NicknameChange = () => {
  const [nickname, setNickname] = useState("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기

  const checkNickname = async () => {
    if (nickname.length < 2) {
      alert("닉네임을 2글자 이상 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.oneulmohae.co.kr/checkNickname",
        { nickname: nickname },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === 200) {
        alert("사용 가능한 닉네임입니다.");
        setIsNicknameChecked(true);
      } else {
        alert("이미 사용 중인 닉네임입니다.");
        setIsNicknameChecked(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // 403 에러인 경우 (GUEST일 때)
        alert("회원 추가 정보 입력이 필요합니다. 해당 페이지로 이동합니다.");
        navigate("/Signup", { replace: true });
      } else if (error.response && error.response.data.status === 404) {
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        alert("닉네임 중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
      setIsNicknameChecked(false);
    }
  };

  const ChangeNickName = async () => {
    if (!isNicknameChecked) {
      alert("닉네임 중복확인을 해주세요.");
      return;
    }
    const confirmChange = window.confirm("닉네임을 변경하시겠습니까?");

    if (confirmChange) {
      try {
        const response = await axios.patch(
          `https://api.oneulmohae.co.kr/myPage/nickname`,
          { nickname },
          {
            headers: {
              Authorization: localStorage.getItem("accessToken"),
            },
            withCredentials: true,
          }
        );

        if (response.status === 200 || response.status === 204) {
          alert("닉네임이 변경되었습니다.");
          window.location.reload();
        } else {
          alert("닉네임 변경 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // 403 에러인 경우 (GUEST일 때)
          alert("회원 추가 정보 입력이 필요합니다. 해당 페이지로 이동합니다.");
          navigate("/Signup", { replace: true });
        } else {
          alert("닉네임 변경 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
      }
    } else {
      setNickname("");
      setIsNicknameChecked(false);
    }
  };

  return (
    <div className={styles["profile-setting-main-nickname-change-container"]}>
      <p className={styles["profile-setting-main-nickname-change-title"]}>닉네임 변경</p>
      <input
        type="text"
        placeholder="닉네임을 입력해주세요."
        className={styles["profile-setting-main-nickname-change-input"]}
        value={nickname}
        minLength="2"
        maxLength="8"
        onChange={(e) => {
          setNickname(e.target.value);
          setIsNicknameChecked(false);
        }}
      />
      <button
        type="button"
        className={styles["profile-setting-main-nickname-change-check-button"]}
        onClick={checkNickname}
      >
        중복 확인
      </button>
      <button
        type="button"
        className={styles["profile-setting-main-nickname-change-button"]}
        onClick={ChangeNickName}
      >
        변경하기
      </button>
    </div>
  );
};

export default NicknameChange;
