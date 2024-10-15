import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./MyCourseEditor.module.css";
import pencil from "../../assets/my-course/write/gray-pencil.png";
import MyCourseAfter from "./../MyCourse/MyCourseAfter/MyCourseAfter";
import {ScrollToTop} from "../../components/ScrollToTop/ScrollToTop";
import axios from "axios";

const MyCourseEditor = () => {
  const getStringDate = (time) => {
    const localTime = new Date(time.getTime() - time.getTimezoneOffset() * 60000);
    return localTime.toISOString().slice(0, 16);
  };

  const courseNameRef = useRef();
  const [courseName, setCourseName] = useState("");
  const [time, setTime] = useState([getStringDate(new Date())]);
  const [content, setContent] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (courseName.length < 1) {
      courseNameRef.current.focus();
      alert("제목을 1자 이상 입력해주세요.");
      return;
    }

    if (time.length < content.length) {
      alert("날짜를 입력해주세요.");
      return;
    }
    if (content.length < time.length) {
      alert("내용을 입력해주세요.");
      return;
    }

    if (window.confirm("새로운 코스를 작성하시겠습니까?")) {
      const placeNames = content.map((place) => place.place_name);
      const placeIds = content.map((place) => place.id);

      const postData = {
        courseName: courseName,
        placeName: placeNames,
        placeId: placeIds,
        time: time,
      };

      try {
        await axios.post("https://api.oneulmohae.co.kr/mycourse/new", postData, {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        });
        alert("새로운 코스가 저장되었습니다.");

        navigate("/MyCourseMain", {replace: true});
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // 403 에러인 경우 (GUEST일 때)
          alert("회원 추가 정보 입력이 필요합니다. 해당 페이지로 이동합니다.");
          navigate("/Signup", { replace: true });
        } else {
          console.error("장소데이터를 가져오는데 실패하였습니다:", error);
        }
      }
    }
  };

  return (
    <div className={styles["mycourse-editor-total-container"]}>
      <div className={styles["mycourse-editor-subject-container"]}>새로운 코스 만들기</div>
      <div className={styles["mycourse-editor-course-name-container"]}>
      <input
  type="text"
  placeholder="코스 이름을 작성해주세요."
  ref={courseNameRef}
  value={courseName}
  onChange={(e) => {
    if (e.target.value.length <= 10) {
      setCourseName(e.target.value);
    }
  }}
  maxLength="10"
  className={styles["mycourse-editor-input-course-name"]}
/>
        <img src={pencil} alt="연필" className={styles["mycourse-editor-pencil-img"]} />
      </div>

      <div className={styles["mycourse-editor-course-container"]}>
        <MyCourseAfter time={time} setTime={setTime} content={content} setContent={setContent} />
      </div>
      <div className={styles["save-button-container"]}>
        <button type="button" className={styles["save-button"]} onClick={handleSubmit}>
          저장
        </button>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default MyCourseEditor;

