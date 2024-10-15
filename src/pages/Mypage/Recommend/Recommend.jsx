import axios from "axios";
import styles from "../Recommend/Recommend.module.css";
import Mypage from "../../../components/Mypage/Mypage";
import { MypageListBox } from "../../../components/MypageListBox/MypageListBox";
import { ScrollToTop } from "../../../components/ScrollToTop/ScrollToTop";
import RecommendIcon from "../../../assets/my-page/my-info/empty-thumb.png";
import { useEffect, useState } from "react";
import { Loading } from "../../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

const Recommend = () => {
  const [recommendPosts, setRecommendPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1); // 페이지 번호 상태 추가
  const [hasMore, setHasMore] = useState(true); // 추가 데이터 여부 상태
  const [pageAble, setPageAble] = useState(1); // 총 페이지 수 상태
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
        `https://api.oneulmohae.co.kr/myPage/recommend?page=${page}&size=10`,
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      );

      const data = response.data.recommendPlace;
      const pageableCount = response.data.meta.pageable_count;
      setPageAble(pageableCount);

      if (Array.isArray(data)) {
        setRecommendPosts((prevPosts) => [...prevPosts, ...data]); // 기존 데이터에 추가
      }

      // 더 이상 가져올 데이터가 없으면 false로 설정
      setHasMore(page < pageableCount);
      setIsLoading(false);
    } catch (error) {
      console.error("추천한 장소를 불러오는데 실패하였습니다.", error);
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
            <img src={RecommendIcon} alt="추천한 장소 아이콘" /> <span>추천한 장소</span>
          </div>
        </h2>

        <section className={styles["mypage-list-container"]}>
          <Mypage />
          <div className={styles["mypage-list-box-container"]}>
            {recommendPosts.length === 0 ? (
              <div className={styles["no-like-list"]}>
                추천한 장소가 없습니다. 장소 상세 페이지에서 따봉을 눌러보세요!
              </div>
            ) : (
              <div>
                {recommendPosts.map((el) => {
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

export default Recommend;
