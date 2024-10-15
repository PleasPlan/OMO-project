import styles from "./MyCourseCalendar.module.css";

const MyCourseCalendar = ({ time, setTime, idx }) => {
  const arrTime = (e) => {
    const newTime = [...time];
    newTime[idx] = e.target.value;
    setTime(newTime);
  };

  // 현재 시간을 ISO 포맷으로 변환하여 min 속성에 사용
  const getCurrentDateTime = () => {
    const now = new Date();
    return new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  };

  // 현재 시간부터 1년 뒤 시간을 계산
  const getOneYearLaterDateTime = () => {
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1); // 1년 더하기
    return new Date(oneYearLater.getTime() - oneYearLater.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  };

  return (
    <input
      className={styles["mycourse-time-container"]}
      type="datetime-local"
      id="meeting-time"
      name="meeting-time"
      value={time[idx] || getCurrentDateTime()}
      onChange={arrTime}
      max={getOneYearLaterDateTime()} // 1년 이후는 선택 불가
    />
  );
};

export default MyCourseCalendar;
