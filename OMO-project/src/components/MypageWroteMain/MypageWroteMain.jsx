import styles from "./MypageWroteMain.module.css";
import {communityFreePost} from "../../const/communityFreePost";
import {communityWorryPost} from "../../const/communityWorryPost";
import {communityQnAPost} from "../../const/communityQnAPost";
import { MyWrotePost } from './../MyWrotePost/MyWrotePost';

const MypageWroteMain = () => (
  <>
  <div className={styles["my-page-wrote-main-total-container"]}>
    {communityFreePost.map((el) => {
          return <MyWrotePost key={el.id} category={el.category} title={el.title} reg_at={el.reg_at}  src={el.src}  nick={el.nick}  content={el.content} like={el.like} view={el.view}  comment={el.comment} comment_list={el.comment_list} />;
        })}
  </div>

  <div className={styles["my-page-wrote-main-total-container"]}>
    {communityWorryPost.map((el) => {
          return <MyWrotePost key={el.id} category={el.category} title={el.title} reg_at={el.reg_at}  src={el.src}  nick={el.nick}  content={el.content} like={el.like} view={el.view}  comment={el.comment} comment_list={el.comment_list} />;
        })}
  </div>

  <div className={styles["my-page-wrote-main-total-container"]}>
    {communityQnAPost.map((el) => {
          return <MyWrotePost key={el.id} category={el.category} title={el.title} reg_at={el.reg_at}  src={el.src}  nick={el.nick}  content={el.content} like={el.like} view={el.view}  comment={el.comment} comment_list={el.comment_list} />;
        })}
  </div>
  </>

);

export default MypageWroteMain;

