import inquiryStyles from "./CommunityInquiryFilter.module.css";
import {Link, useLocation} from "react-router-dom";

const CommunityInquiryFilter = () => {
  const location = useLocation();
  const isInquiryFrequentActive = location.pathname === "/InquiryBoardFrequent";
  const isInquiryQnAActive = location.pathname === "/InquiryBoardQnA";

  return (
    <div className={inquiryStyles["inquiry-board-filter-container"]}>
      <Link to="/InquiryBoardFrequent" className={`${inquiryStyles["inquiry-board-filter-frequency"]} ${isInquiryFrequentActive ? inquiryStyles["inquiry-board-link-active"] : ""}`}>
        자주 하는 질문
      </Link>
      <span className={inquiryStyles["inquiry-board-filter-bar"]}>|</span>
      <Link to="/InquiryBoardQnA" className={`${inquiryStyles["inquiry-board-filter-qna"]} ${isInquiryQnAActive ? inquiryStyles["inquiry-board-link-active"] : ""}`}>
        QnA
      </Link>
    </div>
  );
};

export default CommunityInquiryFilter;
