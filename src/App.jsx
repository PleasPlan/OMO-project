import "./App.module.css";
import { Header } from "./components/Header/Header";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

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

  const currentLocation = useLocation(); // 현재 경로를 가져옴

  return (
    <div>
      {currentLocation.pathname !== "/Signup" && (
        <Header handleLogout={handleLogout} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      )}
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
        <Route path="/Signup" element={<Signup />} />  {/* Signup 페이지 */}
        <Route path="/LoginLoading" element={<LoginLoading setIsLoggedIn={setIsLoggedIn} />} />

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
            />
          }
        />

        {/* 상세페이지 */}
        <Route path="/DetailMenu/:id/:place_name" element={<DetailMenu defaultListImg={defaultListImg} setDefaultListImg={setDefaultListImg} />} />

        {/* 마이 페이지 */}
        <Route path="/MyInfo" element={<MyInfo />} />
        <Route path="/Interest" element={<Interest />} />
        <Route path="/Recommend" element={<Recommend />} />
        <Route path="/Recent" element={<Recent />} />
        <Route path="/MyWrote" element={<MyWrote />} />
        <Route path="/ProfileSetting" element={<ProfileSetting setIsLoggedIn={setIsLoggedIn} />} />

        {/* 나만의 코스 */}
        <Route path="/MyCourseMain" element={<MyCourseMain />} />
        <Route path="/MyCourseNewWrite" element={<MyCourseNewWrite />} />
        <Route path="/MyCourseDetail/:id" element={<MyCourseDetail />} />

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
  );
};

export default App;
