import axios from "axios";
import styles from "./Interest.module.css";
import Mypage from "../../../components/Mypage/Mypage";
import { MypageListBox } from "../../../components/MypageListBox/MypageListBox";
import { ScrollToTop } from "../../../components/ScrollToTop/ScrollToTop";
import InterestIcon from "../../../assets/my-page/my-info/empty-heart.png";
import { useEffect, useState } from "react";
import { Loading } from "../../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

const Interest = () => {
  const [interestPosts, setInterestPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageAble, setPageAble] = useState(1);
  const [page, setPage] = useState(1); // 페이지 번호 추가
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부
  const navigate = useNavigate();

  // 로그인 여부 확인
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedIn) {
      alert("로그인 후 이용 가능한 서비스입니다.");
      navigate("/Login", { replace: true });
    }
  }, [navigate]);

  // 데이터 불러오기 함수
  const fetchData = async (page) => {
    try {
      const response = await axios.get(
        `https://api.oneulmohae.co.kr/myPage/likes?page=${page}&size=10`,
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      );
      const data = response.data.likedPlace;
      const pageableCount = response.data.meta.pageable_count;
      setPageAble(pageableCount);

      if (Array.isArray(data)) {
        setInterestPosts((prevPosts) => [...prevPosts, ...data]); // 데이터 추가
      }

      // 다음 페이지가 있는지 여부
      setHasMore(page < pageableCount);
      setIsLoading(false);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
      setIsLoading(false);
    }
  };

  // 페이지 변경 시 데이터 호출
  useEffect(() => {
    fetchData(page);
  }, [page]);

  // 마지막 요소 감지를 위한 IntersectionObserver
  useEffect(() => {
    if (isLoading || !hasMore) return; // 로딩 중이거나 더 가져올 데이터가 없으면 실행 안 함

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1); // 페이지 증가
      }
    });

    const target = document.querySelector("#end-of-list");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [isLoading, hasMore]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles["mypage-list-component-container"]}>
        <h2 className={styles["mypage-list-title-container"]}>
          <div>
            <img src={InterestIcon} alt="관심목록 아이콘" /> <span>관심 목록</span>
          </div>
        </h2>

        <section className={styles["mypage-list-container"]}>
          <Mypage />
          <div className={styles["mypage-list-box-container"]}>
            {interestPosts.length === 0 ? (
              <div className={styles["no-jjim-list"]}>
                관심 목록이 없습니다. 장소 상세 페이지에서 하트를 눌러보세요!
              </div>
            ) : (
              <div>
                {interestPosts.map((el) => {
                  return <MypageListBox key={el.id} {...el} />;
                })}
                {/* 마지막 요소 감지용 */}
                <div id="end-of-list" />
              </div>
            )}
          </div>
        </section>
      </div>
      <ScrollToTop />
    </>
  );
};

export default Interest;
