import styles from "./ListBox.module.css";
import Like from "../../assets/detail/empty-thumb.png"
import Jjim from "../../assets/detail/empty-heart.png"


export const ListBox = (props) => (
  <>
    <a href="#" className={styles["list-box-container"]}>
    <div className={styles["list-box-inner-container"]}>
    <span className={styles["list-box-title"]}>{props.title}</span>
    
    <div className={styles["list-box-like-jjim-container"]}>
    <div className={styles["list-box-jjim"]}>
    <button type="button"><img src={Jjim} alt="찜 아이콘" style={{position: "absolute", top: "0px", width: "23px", height: "23px",}} /> </button> <span className={styles["list-box-jjim-number"]}> {props.jjim}</span>
    </div>
    <div className={styles["list-box-like"]}>
    <button type="button"><img src={Like} alt="좋아요 아이콘" style={{position: "absolute", top: "-1px", width: "24px", height: "24px",}} /> </button><span className={styles["list-box-like-number"]}> {props.like}</span>
    </div>
    </div>

    <span className={styles["list-box-runtime"]}>{props.runTime}</span>
    <span className={styles["list-box-intro"]}>{props.intro}</span>
    <span className={styles["list-box-address-brief"]}>{props.addressBrief}</span>
    <img className={styles["list-box-img1"]} src={props.img1} />
    <img className={styles["list-box-img2"]} src={props.img2} />
    </div>
    </a>
  </>
);
