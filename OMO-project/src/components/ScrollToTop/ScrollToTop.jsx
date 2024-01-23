import styles from "./ScrollToTop.module.css";
import TopButtonImg from "../../assets/top-button.png";
import { useState, useEffect } from 'react'



export function ScrollToTop() {

  const [BtnStatus, setBtnStatus] = useState(false); // 버튼 상태
  
  const handleFollow = () => {
    // setScrollY(window.pageYOffset);
    if(window.ScrollY > 100) {
      // 100 이상이면 버튼이 보이게
      setBtnStatus(true);
    } else {
      // 100 이하면 버튼이 사라지게
      setBtnStatus(false);
    }
  }

  const handleTop = () => {  // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow)
    }
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow)
    }
  })

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



