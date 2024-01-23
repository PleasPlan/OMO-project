import styles from "./MyCourseFindSearchModal.module.css";
import { MypageListBox } from './../../MypageListBox/MypageListBox';
import { data } from './../../../const/data';
import MyCourseFindSearchBox from './../MyCourseFindSearchBox/MyCourseFindSearchBox';


const MyCourseFindSearchModal = () => (
  <>
  <div className={styles["mycourse-find-search-modal-container"]}>
      <label className={styles["mycourse-find-search-modal-title"]}  htmlFor="find-search">
      <MyCourseFindSearchBox />     
      </label>
      <div className={styles["mycourse-find-search-modal-list-box-container"]}>
        {data.map((el) => {
          return <MypageListBox key={el.id} title={el.title} like={el.like} jjim={el.jjim} runTime={el.runTime} intro={el.intro} addressBrief={el.addressBrief} img1={el.src1} img2={el.src2} />;
        })}
      </div>

    </div>
  </>

);

export default MyCourseFindSearchModal;