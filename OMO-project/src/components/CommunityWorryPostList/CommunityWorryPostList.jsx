import styles from "./CommunityWorryPostList.module.css";
import {CommunityPostItem} from "../CommunityPostItem/CommunityPostItem";

export const CommunityWorryPostList = ({communityWorryPostList}) => {
  return (
    <>
      <section className={styles["community-worry-container"]}>
        {communityWorryPostList.map((el) => {
          return <CommunityPostItem key={el.id} {...el} />;
        })}
      </section>
    </>
  );
};
