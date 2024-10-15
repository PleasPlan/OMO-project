import styles from "./MyCourseFindRecommendModal.module.css";
import { MyCourseItemListBox } from "../MyCourseItemListBox/MyCourseItemListBox";
import ModalClose from "./../../../assets/modal-close.png";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Loading } from "../../Loading/Loading";

const MyCourseFindRecommendModal = ({
  recommendModal,
  setRecommendModal,
  state,
  setState,
  setPlaceName,
  setPlaceId,
}) => {
  const [recommendPosts, setRecommendPosts] = useState([]); // 추천 장소 목록
  const [pagination, setPagination] = useState(1); // 현재 페이지
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [totalPage, setTotalPage] = useState(null); // 전체 데이터 개수, 초기값 null로 설정
  const observer = useRef(); // observer를 위한 ref
  const lastElementRef = useRef(null); // 마지막 요소 추적
  const [hasMoreData, setHasMoreData] = useState(true); // 더 많은 데이터가 있는지 확인

  // 데이터를 불러오는 함수
  const fetchData = async (page) => {
    if (!hasMoreData) return; // 더 이상 데이터가 없으면 함수 종료

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.oneulmohae.co.kr/myPage/recommend?page=${page}&size=10`,
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      );

      const totalItems = response.data?.meta?.total_count; // 안전하게 total_count 접근
      if (totalItems === undefined) {
        console.warn("더 이상 불러올 데이터가 없습니다.");
        setHasMoreData(false); // 더 이상 데이터가 없다고 설정
        return;
      }

      setTotalPage(totalItems); // 총 데이터 개수 설정

      // 데이터 설정
      const posts = Array.isArray(response.data?.recommendPlace)
        ? response.data.recommendPlace
        : [];

      if (posts.length === 0) {
        setHasMoreData(false); // 데이터가 없으면 더 이상 요청하지 않도록 설정
      }

      setRecommendPosts((prevPosts) => [...prevPosts, ...posts]); // 이전 데이터에 추가
    } catch (error) {
      console.error("데이터를 가져오는데 실패했습니다.", error);
    } finally {
      setLoading(false);
    }
  };

  // IntersectionObserver로 마지막 요소 감지
  const observerCallback = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading && hasMoreData) {
      setPagination((prevPage) => prevPage + 1); // 페이지 증가
    }
  }, [loading, hasMoreData]);

  // IntersectionObserver 초기화
  useEffect(() => {
    observer.current = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current); // 마지막 요소를 감시
    }

    return () => {
      if (lastElementRef.current) {
        observer.current.unobserve(lastElementRef.current); // 컴포넌트 언마운트 시 observer 해제
      }
    };
  }, [observerCallback]);

  useEffect(() => {
    if (hasMoreData) {
      fetchData(pagination); // 페이지가 바뀔 때마다 데이터 요청
    }
  }, [pagination, hasMoreData]);

  const handleClickItem = (place_name, id) => {
    setPlaceName(place_name);
    setPlaceId(id);
  };

  return (
    <div className={styles["Overlay"]}>
      <div className={styles["mycourse-find-recommend-modal-container"]}>
        <label className={styles["mycourse-find-recommend-modal-title"]} htmlFor="find-recommend">
          추천한 장소에서 찾기
          <button
            className={styles["mycourse-find-recommend-close-btn"]}
            type="button"
            onClick={() => setRecommendModal(false)}
          >
            <img
              className={styles["mycourse-find-recommend-close-btn-img"]}
              src={ModalClose}
              alt="닫기 아이콘"
            />
            {!recommendModal ? setRecommendModal(true) : null}
          </button>
        </label>
        {recommendPosts.length === 0 ? (
          <div className={styles["no-recommend-list"]}>
            추천한 장소가 없습니다. 장소 상세 페이지에서 따봉을 눌러보세요!
          </div>
        ) : (
          <div className={styles["mycourse-find-recommend-modal-list-box-container"]}>
            {recommendPosts.map((el, index) => (
              <MyCourseItemListBox
                key={el.id}
                state={state}
                setState={setState}
                el={el}
                onClick={(place_name, id) => handleClickItem(place_name, id)}
                ref={index === recommendPosts.length - 1 ? lastElementRef : null} // 마지막 요소에 ref 설정
              />
            ))}
            {loading && (
              <div>
                <Loading />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourseFindRecommendModal;
