import styles from "./CommunityQnAPostList.module.css";
import { CommunityQnABox } from "../CommunityQnaBox/CommunityQnaBox";

export const CommunityQnAPostList = ({communityQnAPostList}) => {
  return (
    <>
      <section className={styles["community-qna-container"]}>
        {communityQnAPostList.map((el) => {
      return (
        <CommunityQnABox
          key={el.boardId}
          {...el}
        />
      );
    })}
      </section>
    </>
  );
};