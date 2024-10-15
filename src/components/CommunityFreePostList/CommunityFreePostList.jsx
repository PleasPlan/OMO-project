import styles from "./CommunityFreePostList.module.css";
import {CommunityPostItem} from "../CommunityPostItem/CommunityPostItem";

export const CommunityFreePostList = ({communityFreePostList, setPosts, category}) => {
  return (
    <>
      <section className={styles["community-free-container"]}>
        {communityFreePostList.map((el) => {
          return <CommunityPostItem key={el.boardId} {...el}  setPosts={setPosts} category={category} />;
        })}
      </section>
    </>
  );
};
