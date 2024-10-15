import React, {useState, useEffect} from "react";
import axios from "axios";
import styles from "./MyCourseBoard.module.css";
import {communityPageFilter} from "./../../../const/communityPageFilter";
import {CommunityCategory} from "./../../../components/CommunityCategory/CommunityCategory";
import Filter from "../../../components/Filter/Filter";
import ListSearch from "./../../../components/ListSearch/ListSearch";
import {ScrollToTop} from "../../../components/ScrollToTop/ScrollToTop";
import CommunityMyCourseList from "../../../components/CommunityMyCourseList/CommunityMyCourseList";
import {Link} from "react-router-dom";
import {mbtiBox} from "../../../const/mbtiBox";
import {MbtiBox} from "../../../components/MbtiBox/MbtiBox";
import WritingButtonImg from "../../../assets/writing-button.png";
import {Loading} from "../../../components/Loading/Loading";

const MyCourseBoard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [communityMyCourse, setCommunityMyCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMbtiGroup1, setSelectedMbtiGroup1] = useState(null);
  const [selectedMbtiGroup2, setSelectedMbtiGroup2] = useState(null);

  const fetchData = async (IorE, PorJ) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.oneulmohae.co.kr/mycourse/mbti?IorE=${IorE}&PorJ=${PorJ}&page=1&size=10&sorting=createdAt`, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      setCommunityMyCourse(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let IorE = "A";
    let PorJ = "B";

    if (selectedMbtiGroup1 === 1) {
      IorE = "I";
    } else if (selectedMbtiGroup1 === 2) {
      IorE = "E";
    }

    if (selectedMbtiGroup2 === 3) {
      PorJ = "J";
    } else if (selectedMbtiGroup2 === 4) {
      PorJ = "P";
    }

    fetchData(IorE, PorJ);
  }, [selectedMbtiGroup1, selectedMbtiGroup2]);

  const filteredData = communityMyCourse.filter((item) => item.courseName && item.courseName.toLowerCase().includes(searchTerm.toLowerCase()));

  const onSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSelectMbti = (id) => {
    if (id === 1 || id === 2) {
      setSelectedMbtiGroup1((prevSelected) => (prevSelected === id ? null : id));
    } else if (id === 3 || id === 4) {
      setSelectedMbtiGroup2((prevSelected) => (prevSelected === id ? null : id));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {/* 카테고리 */}
      <CommunityCategory />

      {/* 필터 + 검색창 */}
      <div className={styles["community-component-container"]}>
        <div className={styles["community-filter-container"]}>
          {/* {communityPageFilter.map((el) => {
            return <Filter key={el.id} {...el} />;
          })} */}
        </div>
        <ListSearch searchTerm={searchTerm} onSearch={onSearch} />
      </div>

      {/* MBTI pick과 리스트 */}
      <div className={styles["community-mycourse-container"]}>
        {/* MBTI pick */}
        <div className={styles["community-mbti-pick-container"]}>
          <span className={styles["community-mbti-pick-title"]}>MBTI별 pick</span>
          <ul className={styles["community-mbti-pick-box"]}>
            {mbtiBox.map((e) => (
              <MbtiBox key={e.id} data={e} selected={e.id === selectedMbtiGroup1 || e.id === selectedMbtiGroup2} onSelect={handleSelectMbti} />
            ))}
          </ul>
        </div>

        {/* 리스트 */}
        {filteredData && filteredData.length > 0 ? (
          <div className={styles["community-mycourse-list-box"]}>
            {filteredData.map((el) => (
              <CommunityMyCourseList key={el.courseId} {...el} />
            ))}
          </div>
        ) : (
          <div className={styles["list-no-search-result-container"]}>
            <span className={styles["list-no-search-result"]}>검색 결과가 없습니다.</span>
          </div>
        )}
      </div>

      <ScrollToTop />

      <Link to="/MyCourseNewWrite">
        <div className={styles["writing-btn-container"]}>
          <button type="button" className={styles["writing-btn"]}>
            <img src={WritingButtonImg} alt="글쓰기 아이콘" style={{width: "80px", height: "80px"}} />
          </button>
        </div>
      </Link>
    </>
  );
};

export default MyCourseBoard;
