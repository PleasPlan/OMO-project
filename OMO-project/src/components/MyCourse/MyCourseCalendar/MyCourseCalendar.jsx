import styles from "./MyCourseCalendar.module.css";

 const MyCourseCalendar = () => (
  <>
<input className={styles["mycourse-time-container"]} type="datetime-local" id="meeting-time"
       name="meeting-time" value="2023-04-15T19:30"
       min="2023-04-15T00:00" max="2023-04-16T00:00"></input>

  </>
);

export default MyCourseCalendar ;