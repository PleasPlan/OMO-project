import axios from "axios";
import Calendar from "../../components/Calender/Calendar";
import styles from "./Signup.module.css";
import Required from "../../assets/sign-up/required.png";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {mbtiMapping} from "../../const/mbtiMapping";
import {GenderRadioGroup} from "../../components/Radio/GenderRadio/GenderRadioGroup";
import {GenderRadio} from "../../components/Radio/GenderRadio/GenderRadio";

const Signup = () => {
  const navigate = useNavigate();

  const [birthdate, setBirthdate] = useState(new Date());
  const [nickname, setNickname] = useState("");
  const [mbtiIE, setMbtiIE] = useState("");
  const [mbtiSN, setMbtiSN] = useState("");
  const [mbtiTF, setMbtiTF] = useState("");
  const [mbtiJP, setMbtiJP] = useState("");
  const [genderType, setGenderType] = useState("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);

  const singUpInfo = async () => {
    if (!birthdate) {
      alert("생년월일을 입력해주세요.");
      return;
    }
    if (!nickname) {
      alert("닉네임을 입력해주세요.");
      return;
    }
    if (!isNicknameChecked) {
      alert("닉네임 중복확인을 해주세요.");
      return;
    }
    if (!mbtiIE || !mbtiSN || !mbtiTF || !mbtiJP) {
      alert("MBTI를 완전히 선택해주세요.");
      return;
    }
    if (!genderType) {
      alert("성별을 선택해주세요.");
      return;
    }

    const getMbtiValue = (mbtiIE, mbtiSN, mbtiTF, mbtiJP) => {
      const fullMbti = `${mbtiIE}${mbtiSN}${mbtiTF}${mbtiJP}`;
      return mbtiMapping[fullMbti];
    };

    // 날짜에서 년, 월, 일 추출
    const birthYear = birthdate.getFullYear();
    const birthMonth = birthdate.getMonth() + 1;
    const birthDay = birthdate.getDate();

    // MBTI 값 매핑
    const mbti = getMbtiValue(mbtiIE, mbtiSN, mbtiTF, mbtiJP);

    // 성별을 0과 1로 변환
    const gender = genderType === "MALE" ? 0 : 1;

    try {
      const response = await axios.post(
        `https://api.oneulmohae.co.kr/memberInfo`,
        {
          nickname: nickname,
          birthYear: birthYear,
          birthMonth: birthMonth,
          birthDay: birthDay,
          mbti: mbti,
          gender: gender,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("accessToken")}`,
          },
        }
      );

      alert("가입되었습니다");
      navigate("/");
    } catch (error) {
      alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const checkNickname = async () => {
    if (nickname.length < 2) {
      alert("닉네임을 2글자 이상 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "https://api.oneulmohae.co.kr/checkNickname",
        {nickname: nickname},
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
      if (error.response && error.response.data.status === 404) {
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        alert("닉네임 중복 확인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
      setIsNicknameChecked(false);
    }
  };

  return (
    <>
      <div className={styles["signup"]}>
        <section className={styles["signup-container"]}>
          <div className={styles["signup-title-container"]}>
            <h2 className={styles["signup-title"]}>회원 정보 추가 입력</h2>
            <p className={styles["essential"]}>
              <img className={styles["signup-ess"]} src={Required} alt="필수항목표시" />
              필수입력사항
            </p>
          </div>
          <div className={styles["signup-inner-container"]}>
            <div className={styles["signup-birth-date-container"]}>
              <label className={styles["signup-birth-date"]} htmlFor="birth-date">
                생년월일 <img className={styles["signup-birth-date-ess"]} src={Required} alt="필수항목표시" />
              </label>
              <Calendar birthdate={birthdate} setBirthdate={setBirthdate} />
            </div>

            <div className={styles["signup-nickname-container"]}>
              <label className={styles["signup-nickname"]} htmlFor="nickname">
                닉네임 <img className={styles["signup-nickname-ess"]} src={Required} alt="필수항목표시" />
              </label>
              <input
                className={styles["signup-nickname-input"]}
                type="text"
                id="nickname"
                minLength="2"
                maxLength="8"
                placeholder="닉네임을 입력해주세요 (최대 8글자)"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <button className={styles["signup-nickname-certification"]} type="button" onClick={checkNickname}>
                중복 확인
              </button>
            </div>

            <div className={styles["signup-mbti-container"]}>
              <label className={styles["signup-mbti"]} htmlFor="mbti-IE">
                MBTI <img className={styles["signup-mbti-ess"]} src={Required} alt="필수항목표시" />
              </label>

              <select className={styles["mbti-select-IE"]} name="mbtiIE" id="mbti-IE" value={mbtiIE} onChange={(e) => setMbtiIE(e.target.value)}>
                <option value="">I/E</option>
                <option value="I">I</option>
                <option value="E">E</option>
              </select>

              <select className={styles["mbti-select-SN"]} name="mbtiSN" id="mbti-SN" value={mbtiSN} onChange={(e) => setMbtiSN(e.target.value)}>
                <option value="">S/N</option>
                <option value="S">S</option>
                <option value="N">N</option>
              </select>

              <select className={styles["mbti-select-TF"]} name="mbtiTF" id="mbti-TF" value={mbtiTF} onChange={(e) => setMbtiTF(e.target.value)}>
                <option value="">T/F</option>
                <option value="T">T</option>
                <option value="F">F</option>
              </select>

              <select className={styles["mbti-select-JP"]} name="mbtiJP" id="mbti-JP" value={mbtiJP} onChange={(e) => setMbtiJP(e.target.value)}>
                <option value="">J/P</option>
                <option value="J">J</option>
                <option value="P">P</option>
              </select>
            </div>

            <div className={styles["signup-gender-container"]}>
              <label className={styles["signup-gender"]} htmlFor="gender">
                성별 <img className={styles["signup-gender-ess"]} src={Required} alt="필수항목표시" />
              </label>
              <form className={styles["signup-gender-radio-container"]}>
                <GenderRadioGroup name="genderType">
                  <GenderRadio name="gender" value="MALE" defaultChecked={genderType === "MALE"} setGender={setGenderType}>
                    남자
                  </GenderRadio>
                  <GenderRadio name="gender" value="FEMALE" defaultChecked={genderType === "FEMALE"} setGender={setGenderType}>
                    여자
                  </GenderRadio>
                </GenderRadioGroup>
              </form>
            </div>

            <div className={styles["signup-btn-container"]}>
              <button type="submit" className={styles["signup-btn-signup"]} onClick={singUpInfo}>
                가입하기
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Signup;
