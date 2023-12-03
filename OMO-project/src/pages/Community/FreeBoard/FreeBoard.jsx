import React, {useEffect, useRef, useState, useReducer} from "react";
import styles from "./FreeBoard.module.css";
import {communityPageFilter} from "./../../../const/communityPageFilter"; //필터 데이터
import {CommunityCategory} from "./../../../components/CommunityCategory/CommunityCategory"; //카테고리
import Filter from "../../../components/Filter/Filter"; //필터 컴포넌트
import ListSearch from "./../../../components/ListSearch/ListSearch"; //검생창
import {ScrollToTop} from "../../../components/ScrollToTop/ScrollToTop"; //스크롤버튼
import {CommunityFreePostList} from "../../../components/CommunityFreePostList/CommunityFreePostList";
import WritingButtonImg from "../../../assets/writing-button.png";
import WriteFreeBoard from "../../../components/WritePost/WriteFreeBoard/WriteFreeBoard";
import { communityFreePost } from "../../../const/communityFreePost";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("freeboard", JSON.stringify(newState));
  return newState;
};

export const BoardStateContext = React.createContext();
export const BoardDispatchContext = React.createContext();


const FreeBoard = () => {

  const [data, dispatch] = useReducer(reducer, communityFreePost);

  useEffect(() => {
    const localData = localStorage.getItem("freeboard");
    if (localData) {
      const boardList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id));

      if (boardList.length >= 1) {
        dataId.current = parseInt(boardList[0].id) + 1;
        dispatch({type: "INIT", data: boardList});
      }
    }
  }, []);

  const [openModal, setOpenModal] = useState(false);

  const dataId = useRef(0);

 // CREATE
 const onCreate = (title, content, category) => {
  dispatch({
    type: "CREATE",
    data: {
      id: dataId.current,
      reg_at: new Date().getTime(),
      title,
      content,
      category: "자유게시판",
    },
  });
  dataId.current += 1;
};
  return (
    <>
          <BoardStateContext.Provider value={data}>
        <BoardDispatchContext.Provider
          value={{
            onCreate,
          }}
        >
      {/* 카테고리 */}
      <CommunityCategory />

      {/* 필터 + 검색창 */}
      <div className={styles["community-component-container"]}>
        {/* <div className={styles["community-filter-container"]}>
          {communityPageFilter.map((el) => {
            return <Filter key={el.id} {...el} />;
          })}
        </div> */}
        <ListSearch />
      </div>

      {/* 게시글 리스트 */}

      <CommunityFreePostList communityFreePostList={data} />

      {/* 스크롤 */}
      <ScrollToTop />

      {/* 글쓰기 */}
      <div className={styles["writing-btn-container"]}>
        <button
          type="button"
          className={styles["writing-btn"]}
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <img src={WritingButtonImg} alt="글쓰기 아이콘" style={{width: "80px", height: "80px"}} />{" "}
        </button>
        {openModal ? <WriteFreeBoard onCreate={onCreate} openModal={openModal} setOpenModal={setOpenModal} /> : null}
      </div>
      </BoardDispatchContext.Provider>
      </BoardStateContext.Provider>
    </>
  );
};

export default FreeBoard;
