import styles from "../Interest/Interest.module.css";
import Mypage from "../../../components/Mypage/Mypage";
import {MypageListBox} from "../../../components/MypageListBox/MypageListBox";
import {ScrollToTop} from "../../../components/ScrollToTop/ScrollToTop";
import { data } from './../../../const/data';
import RecommendIcon from "../../../assets/my-page/my-info/empty-thumb.png";

const Recommend = () => (
  <>
    <div className={styles["mypage-list-component-container"]}>
    <h2 className={styles["mypage-list-title-container"]}>
    <div><img src={RecommendIcon} alt="추천한 장소 아이콘"/> <span>추천한 장소</span></div>
    </h2> 

    <section className={styles["mypage-list-container"]}>
    <Mypage />
      <div className={styles["mypage-list-box-container"]}>
        {data.map((el) => {
          return <MypageListBox key={el.id} title={el.title} like={el.like} jjim={el.jjim} runTime={el.runTime} intro={el.intro} addressBrief={el.addressBrief} img1={el.src1} img2={el.src2} />;
        })}
      </div>
    </section>
   
    
    </div>
    <ScrollToTop/>

  </>
);

export default Recommend;
