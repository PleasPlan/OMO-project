import {CommunityCategory} from "../../../components/CommunityCategory/CommunityCategory";
import CommunityInquiryBox from "../../../components/CommunityInquiryBox/CommunityInquiryBox";
import CommunityInquiryFilter from "../../../components/CommunityInquiryFilter/CommunityInquiryFilter";
import ListSearch from "../../../components/ListSearch/ListSearch";
import {ScrollToTop} from "../../../components/ScrollToTop/ScrollToTop";
import {WritingButton} from "../../../components/WritingButton/WritingButton";
import {communityInquiryFrequent} from "../../../const/communityInquiryFrequent";
import styles from "./InquiryBoardFrequent.module.css";

const InquiryBoardFrequent = () => (
  <div>
    <CommunityCategory />
    <div className={styles["inquiry-board-filter-search-container"]}>
      <CommunityInquiryFilter />
      <ListSearch />
    </div>
    <hr className={styles["inquiry-board-hr"]} />
    {communityInquiryFrequent.map((el) => {
      return <CommunityInquiryBox key={el.id} title={el.title} nickname={el.nickname} content={el.content} />;
    })}
    <ScrollToTop />
    <WritingButton />
  </div>
);

export default InquiryBoardFrequent;
