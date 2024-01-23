import styles from "./MypageListBox.module.css";
import Like from "../../assets/my-page/interest/empty-thumb.png"
import Jjim from "../../assets/my-page/interest/empty-heart.png"


export const MypageListBox = (props) => (
  <>
    <a href="#" className={styles["mypage-list-box-container"]}>
    <div className={styles["mypage-list-box-inner-container"]}>
    <span className={styles["mypage-list-box-title"]}>{props.title}</span>

    
    <div className={styles["mypage-list-box-like-jjim-container"]}>
          <div className={styles["mypage-list-box-jjim"]}>
            <img src={Jjim} alt="찜 아이콘" /> <span className={styles["mypage-list-box-jjim-number"]}> {props.jjim}</span>
          </div>
          <div className={styles["mypage-list-box-like"]}>
            <img src={Like} alt="좋아요 아이콘" /> <span className={styles["mypage-list-box-like-number"]}> {props.like}</span>
          </div>
        </div>

    <span className={styles["mypage-list-box-runtime"]}>{props.runTime}</span>
    <span className={styles["mypage-list-box-intro"]}>{props.intro}</span>
    <span className={styles["mypage-list-box-address-brief"]}>{props.addressBrief}</span>
    <img className={styles["mypage-list-box-img1"]} src={props.img1} />
    <img className={styles["mypage-list-box-img2"]} src={props.img2} />
    </div>
    </a>
  </>
);
