import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "../../components/Filter/Filter";
import styles from "./Notice.module.css";
import { noticeFilter } from './../../const/noticeFilter';
import { ScrollToTop } from "../../components/ScrollToTop/ScrollToTop";
import NoticeItems from "./../../components/NoticeItems/NoticeItems";
import { Loading } from "../../components/Loading/Loading";

const Notice = () => {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.oneulmohae.co.kr/notice?page=1&size=10&type=all`);
        setNotices(response.data.data);
        setIsLoading(false); 
      } catch (error) {
        console.error("공지사항을 불러오는데 실패하였습니다.", error);
      }
    };

    fetchData();
  }, []); 

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles["notice-container"]}>
      <h2 className={styles["notice-title"]}>공지사항</h2>
      {notices.length > 0 && <hr className={styles["notice-container-hr"]} />}
      <div className={styles["notice-main-container"]}>
        {notices.length > 0 ? (
          notices.map((el) => <NoticeItems key={el.id} {...el} />)
        ) : (
          <p className={styles["notice-main-nothing"]}>공지사항이 없습니다.</p>
        )}
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Notice;
