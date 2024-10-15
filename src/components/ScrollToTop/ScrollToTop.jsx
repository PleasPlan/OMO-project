import styles from "./ScrollToTop.module.css";
import TopButtonImg from "../../assets/top-button.png";
import { useState, useEffect } from 'react'



export function ScrollToTop() {


  const handleTop = () => {  // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  return(
  <>
    <div className={styles["top-btn-container"]}>
      <button 
        className={styles["top-btn"]} 
        onClick={handleTop}  // 버튼 클릭시 함수 호출
      ><img src={TopButtonImg} alt="탑버튼 아이콘" style={{width: "80px", height: "80px"}}/></button>

    </div>
  </>
);
    }



