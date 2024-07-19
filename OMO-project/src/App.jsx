import "./App.module.css";
import { Header } from "./components/Header/Header";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "./pages/signup/Signup";
import Eating from "./pages/sub/eating/Eating";
import Watching from "./pages/sub/watching/Watching";
import Playing from "./pages/sub/playing/Playing";
import ThemeCafe from "./pages/sub/ThemeCafe/ThemeCafe";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import MyInfo from "./pages/Mypage/MyInfo/MyInfo";
import MyWrote from "./pages/Mypage/MyWrote/MyWrote";
import DetailMenu from "./pages/Detail/DetailMenu/DetailMenu";
import Interest from "./pages/Mypage/Interest/Interest";
import Recent from "./pages/Mypage/Recent/Recent";
import Recommend from "./pages/Mypage/Recommend/Recommend";
import ProfileSetting from "./pages/Mypage/ProfileSetting/ProfileSetting";
import MyCourseMain from "./pages/MyCourse/MyCourseMain/MyCourseMain";
import Notice from "./pages/notice/Notice";
import MyCourseBoard from "./pages/Community/MyCourseBoard/MyCourseBoard";
import InquiryBoardFrequent from "./pages/Community/InquiryBoardFrequent/InquiryBoardFrequent";
import InquiryBoardQnA from "./pages/Community/InquiryBoardQnA/InquiryBoardQnA";
import WorryBoard from "./pages/Community/WorryBoard/WorryBoard";
import FreeBoard from "./pages/Community/FreeBoard/FreeBoard";
import Main from "./pages/main/Main";
import MyCourseNewWrite from "./pages/MyCourse/MyCourseNewWrite/MyCourseNewWrite";
import MyCourseDetail from "./pages/MyCourse/MyCourseDetail/MyCourseDetail";
import LoginLoading from "./pages/LoginLoading/LoginLoading";
import useCurrentLocation from "./assets/hooks/useCurrentLocation";

const App = ({ handleLogout, isLoggedIn, setIsLoggedIn }) => {
  const { location, coordinates, setCoordinates, setLocation, locationAccessDenied } = useCurrentLocation();
  const [recentData, setRecentData] = useState([]);
  const [defaultListImg, setDefaultListImg] = useState("/src/assets/detail/defaultDetailIcon.png");

  return (
    <div>
      {/* 헤더 */}
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        {/* 메인 페이지 */}
        <Route
          path="/"
          element={
            <Main
              setSearchResultsX={(x) => setCoordinates((prev) => ({ ...prev, longitude: x }))}
              setSearchResultsY={(y) => setCoordinates((prev) => ({ ...prev, latitude: y }))}
              location={location}
              setLocation={setLocation}
              locationAccessDenied={locationAccessDenied}
            />
          }
        />

        {/* 서브 페이지 */}
        <Route path="/Eating" element={<Eating />} />
        <Route path="/Watching" element={<Watching />} />
        <Route path="/Playing" element={<Playing />} />
        <Route path="/ThemeCafe" element={<ThemeCafe />} />

        {/* 로그인/회원가입 */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/LoginLoading" element={<LoginLoading setIsLoggedIn={setIsLoggedIn}/>} />

        {/* 리스트페이지 */}
        <Route
          path="/List"
          element={
            <List
              recentData={recentData}
              setRecentData={setRecentData}
              searchResultsX={coordinates.longitude}
              searchResultsY={coordinates.latitude}
              defaultListImg={defaultListImg}
              setDefaultListImg={setDefaultListImg}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path="/List/:category"
          element={
            <List
              recentData={recentData}
              setRecentData={setRecentData}
              searchResultsX={coordinates.longitude}
              searchResultsY={coordinates.latitude}
              defaultListImg={defaultListImg}
              setDefaultListImg={setDefaultListImg}
              isLoggedIn={isLoggedIn}
            />
          }
        />

        {/* 상세페이지 */}
        <Route path="/DetailMenu/:id/:place_name" element={<DetailMenu defaultListImg={defaultListImg} setDefaultListImg={setDefaultListImg}/>} />

        {/* 마이 페이지 */}
        <Route path="/MyInfo" element={<MyInfo isLoggedIn={isLoggedIn}/>} />
        <Route path="/Interest" element={<Interest isLoggedIn={isLoggedIn}/>} />
        <Route path="/Recommend" element={<Recommend isLoggedIn={isLoggedIn} />} />
        <Route path="/Recent" element={<Recent recentData={recentData} isLoggedIn={isLoggedIn}/>} />
        <Route path="/MyWrote" element={<MyWrote isLoggedIn={isLoggedIn} />} />
        <Route path="/ProfileSetting" element={<ProfileSetting isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />

        {/* 나만의 코스 */}
        <Route path="/MyCourseMain" element={<MyCourseMain isLoggedIn={isLoggedIn}/>} />
        <Route path="/MyCourseNewWrite" element={<MyCourseNewWrite isLoggedIn={isLoggedIn} /> } />
        <Route path="/MyCourseDetail/:id" element={<MyCourseDetail isLoggedIn={isLoggedIn}  />} />

        {/* 커뮤니티 */}
        <Route path="/MyCourseBoard" element={<MyCourseBoard isLoggedIn={isLoggedIn} />} />
        <Route path="/WorryBoard" element={<WorryBoard isLoggedIn={isLoggedIn} />} />
        <Route path="/FreeBoard" element={<FreeBoard isLoggedIn={isLoggedIn}/>} />
        <Route path="/InquiryBoardFrequent" element={<InquiryBoardFrequent isLoggedIn={isLoggedIn} />} />
        <Route path="/InquiryBoardQnA" element={<InquiryBoardQnA  isLoggedIn={isLoggedIn}/>} />

        {/* 공지사항 */}
        <Route path="/Notice" element={<Notice />} />
      </Routes>
    </div>
  );
};
export default App;
