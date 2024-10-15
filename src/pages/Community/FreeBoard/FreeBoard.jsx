import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FreeBoard.module.css";
import { CommunityCategory } from "./../../../components/CommunityCategory/CommunityCategory";
import ListSearch from "./../../../components/ListSearch/ListSearch";
import { ScrollToTop } from "../../../components/ScrollToTop/ScrollToTop";
import { CommunityFreePostList } from "../../../components/CommunityFreePostList/CommunityFreePostList";
import WritingButtonImg from "../../../assets/writing-button.png";
import WriteFreeBoard from "../../../components/WritePost/WriteFreeBoard/WriteFreeBoard";
import { Loading } from "../../../components/Loading/Loading";

const FreeBoard = () => {
  const [posts, setPosts] = useState([]);
  const [boardId, setBoardId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const category = "Free";
  const navigate = useNavigate();

   // 게시글 불러오기
   const fetchData = async () => {
    const accessToken = localStorage.getItem("accessToken"); // accessToken 확인
    const config = {
      headers: {},
    };

    // accessToken이 있으면 헤더에 추가
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    try {
      const response = await axios.get("https://api.oneulmohae.co.kr/board/Free?page=1&size=10&sorting=createdAt", config);
      setPosts(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("자유게시판을 불러오는데 실패했습니다.", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [posts, searchTerm]);

  // 게시글 작성
  const onCreate = async (title, content) => {
    const postData = {
      title,
      content,
      type: "FREE",
    };

    try {
      const response = await axios.post("https://api.oneulmohae.co.kr/board/write", postData, {
        headers: {
          Authorization: `${localStorage.getItem("accessToken")}`,
        },
      });

      const newPost = response.data;
      setBoardId(newPost.boardId); // 새로 생성된 게시글의 ID를 boardId로 설정
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    

    alert("등록되었습니다");

    } catch (error) {
      if (error.response && error.response.status === 403) {
        // 403 에러인 경우 (GUEST일 때)
        alert("회원정보 입력이 필요합니다. 회원가입 페이지로 이동합니다.");
        navigate("/Signup", {replace: true});
      } else {
        console.error("Error creating post:", error);
        alert("게시글 작성 중 오류가 발생했습니다.");
      }
    }
  };
  // 검색 기능
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // 글쓰기 버튼 클릭 시 로그인 여부 확인 및 처리
  const handleWritingButtonClick = () => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      const confirmLogin = confirm("로그인 후 이용 가능한 서비스입니다. 로그인 페이지로 이동하시겠습니까?");
      if (confirmLogin) {
        navigate("/Login", { replace: true });
      }
      return;
    }
    setOpenModal(true);
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
        <ListSearch onSearch={handleSearch} searchTerm={searchTerm} />
      </div>

      {/* 게시글 리스트 */}
      {filteredPosts.length === 0 ? (
        <div className={styles["no-boardlist"]}>글 작성 내역이 없습니다. 우측 하단에 있는 글쓰기 버튼을 통해 게시글을 작성해주세요.</div>
      ) : (
        <CommunityFreePostList communityFreePostList={filteredPosts} setPosts={setPosts} category={category} />
      )}

      {/* 스크롤 */}
      <ScrollToTop />

      {/* 글쓰기 */}
      <div className={styles["writing-btn-container"]}>
        <button type="button" className={styles["writing-btn"]} onClick={handleWritingButtonClick}>
          <img src={WritingButtonImg} alt="글쓰기 아이콘" style={{ width: "80px", height: "80px" }} />
        </button>
        {openModal && <WriteFreeBoard onCreate={onCreate} openModal={openModal} setOpenModal={setOpenModal} />}
      </div>
    </>
  );
};

export default FreeBoard;