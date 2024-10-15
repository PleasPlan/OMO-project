import styles from "./MyCourseFindRecentModal.module.css";
import { MyCourseItemListBox } from "../MyCourseItemListBox/MyCourseItemListBox";
import ModalClose from "./../../../assets/modal-close.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loading } from "../../Loading/Loading";

const MyCourseFindRecentModal = ({
  recentModal,
  setRecentModal,
  state,
  setState,
  setPlaceName,
  setPlaceId,
}) => {
  const [recentData, setRecentData] = useState([]); // 초기 상태를 빈 배열로 설정
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const storedRecentData = localStorage.getItem("recentData");
      if (storedRecentData) {
        const parsedData = JSON.parse(storedRecentData);
        const placeNameList = parsedData.map((place) => place.place_name || ""); // 기본값 추가
        const placeIdList = parsedData.map((place) => place.id || ""); // 기본값 추가

        const postData = {
          placeNameList,
          placeIdList,
        };

        try {
          const response = await axios.post(
            "https://api.oneulmohae.co.kr/place/recent",
            postData,
            {
              headers: {
                Authorization: localStorage.getItem("accessToken"),
              },
            }
          );

          // 데이터 유효성 검사
          const recentDataArray = Array.isArray(response.data.recentPlace)
            ? response.data.recentPlace
            : [];
          setRecentData(recentDataArray);
        } catch (error) {
          console.error("Error fetching recent data", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleClickItem = (place_name, id) => {
    setPlaceName(place_name);
    setPlaceId(id);
  };

  return (
    <div className={styles["Overlay"]}>
      <div className={styles["mycourse-find-recent-modal-container"]}>
        <label
          className={styles["mycourse-find-recent-modal-title"]}
          htmlFor="find-recent"
        >
          최근 본 장소에서 찾기
          <button
            className={styles["mycourse-find-recent-close-btn"]}
            type="button"
            onClick={() => setRecentModal(false)}
          >
            <img
              className={styles["mycourse-find-recent-close-btn-img"]}
              src={ModalClose}
              alt="닫기 아이콘"
            />
          </button>
        </label>

        <div className={styles["mycourse-find-recent-modal-list-box-container"]}>
          {loading ? (
            <div>
              <Loading />
            </div>
          ) : recentData.length === 0 ? (
            <div className={styles["no-recent-list"]}>
              최근 본 장소가 없습니다.
            </div>
          ) : (
            <div>
              {recentData.map((el) => (
                el && el.id && el.place_name ? (
                  <MyCourseItemListBox
                    key={el.id}
                    state={state}
                    setState={setState}
                    el={el}
                    onClick={(place_name, id) => handleClickItem(place_name, id)}
                  />
                ) : null
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCourseFindRecentModal;
