import Filter from "../../components/Filter/Filter";
import styles from "./Notice.module.css";
import {myCourseFilter} from "../../const/myCourseFilter";
import {notice} from "../../const/notice";
import {ScrollToTop} from "../../components/ScrollToTop/ScrollToTop";
import NoticeItems from './../../components/NoticeItems/NoticeItems';

const Notice = () => (
  <div className={styles["notice-container"]}>
    <h2 className={styles["notice-title"]}> 공지사항</h2>
    <div className={styles["notice-filter-container"]}>
      {myCourseFilter.map((el) => {
        return <Filter key={el.id} title={el.title} bar={el.bar} />;
      })}
    </div>
    <div className={styles["notice-main-container"]}>
      <div className={styles["notice-main-title-container"]}>
        <p className={styles["notice-main-subTitle-division"]}>구분</p>
        <p className={styles["notice-main-subTitle-title"]}>제목</p>
        <p className={styles["notice-main-subTitle-date"]}>작성일</p>
      </div>
      {notice.map((el) => {
        return <NoticeItems key={el.id} title={el.title} division={el.division} date={el.date} />;
      })}
    </div>
    <ScrollToTop />
  </div>
);

export default Notice;
