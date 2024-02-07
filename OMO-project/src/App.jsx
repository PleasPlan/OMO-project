import "./App.module.css";
import {Header} from "./components/Header/Header";
import React, {useReducer, useRef} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Signup from "./pages/Signup/Signup";
import Eating from "./pages/Sub/Eating/Eating";
import Watching from "./pages/Sub/Watching/Watching";
import Playing from "./pages/Sub/Playing/Playing";
import ThemeCafe from "./pages/Sub/ThemeCafe/ThemeCafe";
import Login from "./pages/Login/Login";
import List from "./pages/List/List";
import MyInfo from "./pages/Mypage/MyInfo/MyInfo";
import MyWrote from "./pages/Mypage/MyWrote/MyWrote";
import DetailMenu from "./pages/Detail/DetailMenu/DetailMenu";
import DetailNone from "./pages/Detail/DetailNone/DetailNone";
import DetailTariff from "./pages/Detail/DetailTariff/DetailTariff";
import Interest from "./pages/Mypage/Interest/Interest";
import Recent from "./pages/Mypage/Recent/Recent";
import Recommend from "./pages/Mypage/Recommend/Recommend";
import ProfileSetting from "./pages/Mypage/ProfileSetting/ProfileSetting";
import MyCourseMain from "./pages/MyCourse/MyCourseMain/MyCourseMain";
import Notice from "./pages/Notice/Notice";
import MyCourseBoard from "./pages/Community/MyCourseBoard/MyCourseBoard";
import InquiryBoardFrequent from "./pages/Community/InquiryBoardFrequent/InquiryBoardFrequent";
import InquiryBoardQnA from "./pages/community/InquiryBoardQnA/InquiryBoardQnA";
import WorryBoard from "./pages/Community/WorryBoard/WorryBoard";
import FreeBoard from "./pages/Community/FreeBoard/FreeBoard";
import MyCourseOthersVersion from "./pages/MyCourse/MyCourseOthersVersion/MyCourseOthersVersion";
import Main from "./pages/main/Main";
import MyCourseEdit from "./pages/MyCourse/MyCourseEdit/MyCourseEdit";
import MyCourseNewWrite from "./pages/MyCourse/MyCourseNewWrite/MyCourseNewWrite";
import MyCourseDetail from "./pages/MyCourse/MyCourseDetail/MyCourseDetail";

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
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) => (it.id === action.data.id ? {...action.data} : it));
      break;
    }
    default:
      return state;
  }
  return newState;
};

export const MyCourseStateContext = React.createContext();
export const MyCourseDispatchContext = React.createContext();


const App = () => {
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  //CREATE
  const onCreate = (dates, title, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        title,
        dates: new Date(dates).getTime(),
        content,
      },
    });
    dataId.current += 1;
  };

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({type: "REMOVE", targetId});
  };

  //EDIT
  const onEdit = (targetId, dates, title, content) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        title,
        dates: new Date(dates).getTime(),
        content,
      },
    });
  };


  return (
    <MyCourseStateContext.Provider value={data}>
      <MyCourseDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div>
            {/* 헤더 */}
            <Header />
            <Routes>
              {/* 메인 페이지 */}
              <Route path="/" element={<Main />} />

              {/* 서브 페이지 */}
              <Route path="/Eating" element={<Eating />} />
              <Route path="/Watching" element={<Watching />} />
              <Route path="/Playing" element={<Playing />} />
              <Route path="/ThemeCafe" element={<ThemeCafe />} />

              {/* 로그인/회원가입 */}
              <Route path="/Login" element={<Login />} />
              <Route path="/Signup" element={<Signup />} />

              {/* 리스트페이지 */}
              <Route path="/List" element={<List />} />

              {/* 상세페이지 */}
              <Route path="/DetailMenu/:id" element={<DetailMenu />} />
              <Route path="/DetailNone" element={<DetailNone />} />
              <Route path="/DetailTariff" element={<DetailTariff />} />

              {/* 마이 페이지 */}
              <Route path="/MyInfo" element={<MyInfo />} />
              <Route path="/Interest" element={<Interest />} />
              <Route path="/Recommend" element={<Recommend />} />
              <Route path="/Recent" element={<Recent />} />
              <Route path="/MyWrote" element={<MyWrote />} />
              <Route path="/ProfileSetting" element={<ProfileSetting />} />

              {/* 나만의 코스 */}
              <Route path="/MyCourseMain" element={<MyCourseMain />} />
              <Route path="/MyCourseNewWrite" element={<MyCourseNewWrite />} />
              <Route path="/MyCourseEdit/:id" element={<MyCourseEdit />} />
              <Route path="/MyCourseDetail/:id" element={<MyCourseDetail />} />
              <Route path="/MyCourseOthersVersion/:id" element={<MyCourseOthersVersion />} />

              {/* 커뮤니티 */}
              <Route path="/MyCourseBoard" element={<MyCourseBoard />} />
              <Route path="/WorryBoard" element={<WorryBoard />} />
              <Route path="/FreeBoard" element={<FreeBoard />} />
              <Route path="/InquiryBoardFrequent" element={<InquiryBoardFrequent />} />
              <Route path="/InquiryBoardQnA" element={<InquiryBoardQnA />} />

              {/* 공지사항 */}
              <Route path="/Notice" element={<Notice />} />
            </Routes>
          </div>
        </BrowserRouter>
      </MyCourseDispatchContext.Provider>
    </MyCourseStateContext.Provider>
  );
};
export default App;
