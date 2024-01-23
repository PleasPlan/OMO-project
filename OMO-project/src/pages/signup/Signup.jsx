import Calendar from "../../components/Calender/Calendar";
import styles from "./Signup.module.css";
import Required from "../../assets/sign-up/required.png";
import {Radio} from "../../components/Radio/Radio";
import {RadioGroup} from "../../components/Radio/RadioGroup";
import CheckBox from "../../components/CheckBox/CheckBox";

const Signup = () => (
  <>
    <section className={styles["signup-container"]}>
      <div className={styles["signup-title-container"]}>
        <h2 className={styles["signup-title"]}>회원가입</h2>
        <p className={styles["essential"]}>
          <img src={Required} alt="필수항목표시" style={{width: "10px", height: "10px", position: "relative", bottom: "10px", right: "1px"}} className={styles["required"]} />
          필수입력사항
        </p>
      </div>
      <div div className={styles["signup-inner-container"]}>
        
        <div className={styles["signup-birth-date-container"]}>
          <label className={styles["signup-birth-date"]} htmlFor="birth-date">
            생년월일 <img src={Required} alt="필수항목표시" style={{width: "10px", height: "10px", position: "relative", bottom: "17px", right: "7px"}} />
          </label>
          <Calendar />
        </div>

        <div className={styles["signup-nickname-container"]}>
          <label className={styles["signup-nickname"]} htmlFor="nickname">
            닉네임 <img src={Required} alt="필수항목표시" style={{width: "10px", height: "10px", position: "relative", bottom: "17px", right: "7px"}} />
          </label>
          <input className={styles["signup-nickname-input"]} type="text" id="nickname" placeholder="닉네임을 입력해주세요." />
          <button className={styles["signup-nickname-certification"]} type="submit">
            중복 확인
          </button>
        </div>

        <div className={styles["signup-mbti-container"]}>
          <label className={styles["signup-mbti"]} htmlFor="mbti">
            MBTI <img src={Required} alt="필수항목표시" style={{width: "10px", height: "10px", position: "relative", bottom: "17px", right: "7px"}} />
          </label>

          <select className={styles["mbti-select-IE"]} name="mbti" id="mbti-select">
            <option value="I" className={styles["mbti-color"]}>
              I
            </option>
            <option value="E">E</option>
          </select>

          <select className={styles["mbti-select-SN"]} name="mbti" id="mbti-select">
            <option value="S">S</option>
            <option value="N">N</option>
          </select>

          <select className={styles["mbti-select-TF"]} name="mbti" id="mbti-select">
            <option value="T">T</option>
            <option value="F">F</option>
          </select>

          <select className={styles["mbti-select-JP"]} name="mbti" id="mbti-select">
            <option value="J">J</option>
            <option value="P">P</option>
          </select>
        </div>

        <div className={styles["signup-gender-container"]}>
          <label className={styles["signup-gender"]} htmlFor="gender">
            성별 <img src={Required} alt="필수항목표시" style={{width: "10px", height: "10px", position: "relative", bottom: "17px", right: "7px"}} />
          </label>
          <form className={styles["signup-gender-radio-container"]}>
            <RadioGroup>
              <Radio name="gender" value="MALE" defaultChecked>
                남자
              </Radio>
              <Radio name="gender" value="FEMALE">
                여자
              </Radio>
            </RadioGroup>
          </form>
        </div>

        <CheckBox />

        <div className={styles["signup-btn-container"]}>
          <button type="submit" className={styles["signup-btn-signup"]}>
            가입하기
          </button>
        </div>
      </div>
    </section>
  </>
);

export default Signup;
