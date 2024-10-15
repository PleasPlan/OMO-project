import axios from "axios";
import React, {useEffect, useState} from "react";
import Mypage from "../../../components/Mypage/Mypage";
import styles from "./MyWrote.module.css";
import MyWroteIcon from "../../../assets/my-page/my-info/my-writing.png";
import MyPageFilter from "../../../components/MypageFilter/MypageFilter";
import MypageWroteMain from "../../../components/MypageWroteMain/MypageWroteMain";
import {ScrollToTop} from "../../../components/ScrollToTop/ScrollToTop";
import {Loading} from "../../../components/Loading/Loading";
import {useNavigate} from "react-router-dom";

const MyWrote = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedIn) {
      alert("로그인 후 이용 가능한 서비스입니다.");
      navigate("/Login", {replace: true});
    }
  }, [navigate]);

  useEffect(() => {
    const MyWroteData = async () => {
      try {
        const response = await axios.get("https://api.oneulmohae.co.kr/myPage/boards?page=1", {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        });
        if (Array.isArray(response.data)) {
          const sortedData = response.data.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
          setMyPosts(sortedData);
        } else {
          setMyPosts([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("내가 쓴 글 데이터를 불러오는데 실패하였습니다:", error);
        setMyPosts([]);
      }
    };

    MyWroteData();
  }, []);

  const filteredData = myPosts.filter((item) => selectedCategory === "all" || item.category === selectedCategory.toUpperCase());

  const getCategoryDisplayName = () => {
    switch (selectedCategory) {
      case "all":
        return "전체";
      case "free":
        return "자유";
      case "trouble":
        return "고민";
      case "qna":
        return "문의게시판-QnA";
      default:
        return selectedCategory;
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles["my-wrote-total-container"]}>
        <h2 className={styles["my-wrote-title-container"]}>
          <img src={MyWroteIcon} alt="내가 쓴 글 아이콘" /> 내가 쓴 글
        </h2>

        <Mypage />

        <div className={styles["my-wrote-filter-main-container"]}>
          <MyPageFilter setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
          <div className={styles["my-wrote-main-title-container"]}>
            {filteredData.length === 0 ? (
              <div className={styles["no-board-list"]}>글 작성 내역이 없습니다. 커뮤니티 페이지 내 {getCategoryDisplayName()}게시판에 글을 작성해주세요.</div>
            ) : (
              <MypageWroteMain postList={filteredData} />
            )}
          </div>
        </div>
        <ScrollToTop />
      </div>
    </>
  );
};

export default MyWrote;
