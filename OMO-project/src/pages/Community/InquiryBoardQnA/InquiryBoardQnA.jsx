import {CommunityCategory} from "../../../components/CommunityCategory/CommunityCategory";
import {CommunityQnABox} from "../../../components/CommunityQnABox/CommunityQnABox";
import CommunityInquiryFilter from "../../../components/CommunityInquiryFilter/CommunityInquiryFilter";
import ListSearch from "../../../components/ListSearch/ListSearch";
import {ScrollToTop} from "../../../components/ScrollToTop/ScrollToTop";
import {WritingButton} from "../../../components/WritingButton/WritingButton";
import {communityQnAPost} from "../../../const/communityQnAPost";
import styles from "./InquiryBoardQnA.module.css";

const InquiryBoardQnA = () => (
  <div>
    <CommunityCategory />
    <div className={styles["inquiry-board-qna-filter-search-container"]}>
      <CommunityInquiryFilter />
      <ListSearch />
    </div>
    <hr className={styles["inquiry-board-qna-hr"]} />
    {communityQnAPost.map((el) => {
      return (
        <CommunityQnABox
          key={el.id}
          title={el.title}
          reg_at={el.reg_at}
          src={el.src}
          nick={el.nick}
          content={el.content}
          like={el.like}
          view={el.view}
          comment={el.comment}
          comment_list={el.comment_list}
        />
      );
    })}
    <ScrollToTop />
    <WritingButton />
  </div>
);

export default InquiryBoardQnA;
