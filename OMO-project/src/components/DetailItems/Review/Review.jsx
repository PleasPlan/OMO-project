import styles from "./Review.module.css";


export const Review = ( {data}) => {
  return (
    <>
        <div className={styles["detail-review-box"]}>
          <div className={styles["detail-review-inner-top-container"]}>
            <div className={styles["detail-review-profile"]}>
            <div className={styles["detail-review-profile-img"]}> <img 
            src={data.src} 

            alt="프로필 이미지" style={{width: "50px", height: "50px"}} /></div>
              <span className={styles["detail-review-profile-nick"]}>{data.nick}</span>
            </div>
            <span className={styles["detail-review-date"]}>{data.reg_at}</span>
          </div>
          <span className={styles["detail-review-content"]} >{data.comment}</span>
        </div>
  
    </>
  );
}

