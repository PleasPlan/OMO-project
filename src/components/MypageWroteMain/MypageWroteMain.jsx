import styles from "./MypageWroteMain.module.css";
import {MyWrotePost} from "./../MyWrotePost/MyWrotePost";

const MypageWroteMain = ({postList}) => {
  return (
    <>
      <div className={styles["my-page-wrote-main-total-container"]}>
        {postList.map((el) => {
          return <MyWrotePost key={el.boardId} {...el} />;
        })}
      </div>
    </>
  );
};
export default MypageWroteMain;
