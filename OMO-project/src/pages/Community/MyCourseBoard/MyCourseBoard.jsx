import styles from "./MyCourseBoard.module.css";
import {useState} from "react";
import {communityPageFilter} from "./../../../const/communityPageFilter";
import {communityMyCourse} from "../../../const/communityMyCourse";
import {CommunityCategory} from "./../../../components/CommunityCategory/CommunityCategory";
import Filter from "../../../components/Filter/Filter";
import ListSearch from "./../../../components/ListSearch/ListSearch";
import {ScrollToTop} from "../../../components/ScrollToTop/ScrollToTop";
import {WritingButton} from "../../../components/WritingButton/WritingButton";
import CommunityMyCourseList from "../../../components/CommunityMyCourseList/CommunityMyCourseList";
// import { communityMbtiFilter } from './../../../const/communityMbtiFilter';
import LightPurpleI from "../../../assets/community/my-course-board/I-light-purple.png";
import LightPurpleE from "../../../assets/community/my-course-board/E-light-purple.png";
import LightPurpleJ from "../../../assets/community/my-course-board/J-light-purple.png";
import LightPurpleP from "../../../assets/community/my-course-board/P-light-purple.png";
import DeepPurpleI from "../../../assets/community/my-course-board/I-deep-purple.png";
import DeepPurpleE from "../../../assets/community/my-course-board/E-deep-purple.png";
import DeepPurpleJ from "../../../assets/community/my-course-board/J-deep-purple.png";
import DeepPurpleP from "../../../assets/community/my-course-board/P-deep-purple.png";


const MyCourseBoard = () => {


  // 중복된 4개의 state를 하나의 state로 관리하기
  // 중복된 4개의 handleClick 함수를 하나의 함수로 관리하기

  // const [imaheSrc, setimaheSrc] = useState();
  // const [isClicked, setIsClicked] = useState(false);


  const [imageSrcI, setImageSrcI] = useState(LightPurpleI); 
  const [isClickedI, setIsClickedI] = useState(false); 

  const [imageSrcE, setImageSrcE] = useState(LightPurpleE); 
  const [isClickedE, setIsClickedE] = useState(false); 

  const [imageSrcJ, setImageSrcJ] = useState(LightPurpleJ); 
  const [isClickedJ, setIsClickedJ] = useState(false); 

  const [imageSrcP, setImageSrcP] = useState(LightPurpleP); 
  const [isClickedP, setIsClickedP] = useState(false); 

  const handleClickI = () => {
    if (isClickedI) {
      setImageSrcI(LightPurpleI);
        setIsClickedI(false); 
      } else {
        setImageSrcI(DeepPurpleI);
        setIsClickedI(true);
      }
  };

  const handleClickE = () => {
    if (isClickedE) {
      setImageSrcE(LightPurpleE);
        setIsClickedE(false); 
      } else {
        setImageSrcE(DeepPurpleE);
        setIsClickedE(true);
      }
  };

  const handleClickJ = () => {
    if (isClickedJ) {
      setImageSrcJ(LightPurpleJ);
        setIsClickedJ(false); 
      } else {
        setImageSrcJ(DeepPurpleJ);
        setIsClickedJ(true);
      }
  };

  const handleClickP = () => {
    if (isClickedP) {
      setImageSrcP(LightPurpleP);
        setIsClickedP(false); 
      } else {
        setImageSrcP(DeepPurpleP);
        setIsClickedP(true);
      }
  };

  return (
    <>
      {/* 카테고리 */}
      <CommunityCategory />

      {/* 필터 + 검색창 */}
      <div className={styles["community-component-container"]}>
        <div className={styles["community-filter-container"]}>
          {communityPageFilter.map((el) => {
            return <Filter key={el.id} title={el.title} bar={el.bar} />;
          })}
        </div>
        <ListSearch />
      </div>

      {/* 리스트 */}

      <section className={styles["community-mycourse-container"]}>
        {/* MBTI pick */}

      <div className={styles["community-mbti-pick-container"]}>
        <span className={styles["community-mbti-pick-title"]}>MBTI별 pick</span>
        <ul className={styles["community-mbti-pick-box"]}>
          <li>
            <button type="button" onClick={handleClickI}>
              <img src={imageSrcI} alt="MBTI I 아이콘"></img>
            </button>
          </li>
          <li>
            <button type="button" onClick={handleClickE}>
              <img src={imageSrcE} alt="MBTI E 아이콘"></img>
            </button>
          </li>
          <li>
            <button type="button" onClick={handleClickJ}>
              <img src={imageSrcJ} alt="MBTI J 아이콘"></img>
            </button>
          </li>
          <li>
            <button type="button" onClick={handleClickP}>
              <img src={imageSrcP} alt="MBTI P 아이콘"></img>
            </button>
          </li>
        </ul>
      </div>
      <div className={styles["community-mycourse-list-box"]}>
        {communityMyCourse.map((el) => {
          return <CommunityMyCourseList key={el.id} title={el.title} like={el.like} nick={el.nick} reg_at={el.reg_at} />;
        })}
      </div>
    </section>

      <ScrollToTop />
      <WritingButton />
    </>
  );
};

export default MyCourseBoard;


// 컴포넌트를 만든 이유: 위에 state를 한번에 선언해버리면 공통적으로 적용되니까 개별 관리가 안돼서 컴포넌트로 만들어서 4번 쓰는 방식으로 해야함
// const를 만들어서 배열을 만들고, map 돌려서 컴포넌트 사용하기 

// export const MbtiBox = ()=>{

//     const [imageSrc, setimageSrc] = useState();
//     const [isClicked, setIsClicked] = useState(false);

//   return (
//     <div>

//     </div>
//   )
// }
