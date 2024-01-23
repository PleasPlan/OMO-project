import styles from "./MyCourseFindRecentModal.module.css";
import {MypageListBox} from "./../../MypageListBox/MypageListBox";
import {data} from "./../../../const/data";
import ModalClose from "./../../../assets/modal-close.png";

const MyCourseFindRecentModal = () => (
  <>
    <div className={styles["mycourse-find-recent-modal-container"]}>
      <label className={styles["mycourse-find-recent-modal-title"]} htmlFor="find-recent">
        최근 본 목록에서 찾기
        <button className={styles["mycourse-find-recent-close-btn"]} type="button">
          <img className={styles["mycourse-find-recent-close-btn-img"]} src={ModalClose} alt="닫기 아이콘" />
        </button>
      </label>
      <div className={styles["mycourse-find-recent-modal-list-box-container"]}>
        {data.map((el) => {
          return <MypageListBox key={el.id} title={el.title} like={el.like} jjim={el.jjim} runTime={el.runTime} intro={el.intro} addressBrief={el.addressBrief} img1={el.src1} img2={el.src2} />;
        })}
      </div>
    </div>
  </>
);

export default MyCourseFindRecentModal;
