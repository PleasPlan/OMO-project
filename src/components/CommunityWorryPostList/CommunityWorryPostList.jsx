import styles from "./CommunityWorryPostList.module.css";
import { CommunityPostItem } from "../CommunityPostItem/CommunityPostItem";

export const CommunityWorryPostList = ({ communityWorryPostList, setPosts, category }) => {
  return (
    <>
      <section className={styles["community-worry-container"]}>
        {communityWorryPostList.map((el) => {
          return <CommunityPostItem key={el.boardId} {...el} setPosts={setPosts} category={category} />;
        })}
      </section>
    </>
  );
};
