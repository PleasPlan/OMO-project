import React, { useEffect, useState } from "react";
import styles from "./MyCourseFindBox.module.css";
import downArrow from "../../../assets/my-course/write/down-arrow.png";
import Delete from "../Button/Delete/Delete";
import MyCourseCalendar from "../MyCourseCalendar/MyCourseCalendar";
import MyCourseDataBox from "../MyCourseDataBox/MyCourseDataBox";
import FindButton from "./FindButton/FindButton";
import MyCourseFindInterestModal from "../MyCourseFindInterestModal/MyCourseFindInterestModal";
import MyCourseFindRecentModal from "../MyCourseFindRecentModal/MyCourseFindRecentModal";
import MyCourseFindRecommendModal from "../MyCourseFindRecommendModal/MyCourseFindRecommendModal";
import axios from "axios";

const MyCourseFindBox = ({ time, setTime, content, setContent, idx, handleDelete }) => {
  const [interestModal, setInterestModal] = useState(false);
  const [recentModal, setRecentModal] = useState(false);
  const [recommendModal, setRecommendModal] = useState(false);
  const [isFindBoxVisible, setFindBoxVisible] = useState(true);
  const [placeName, setPlaceName] = useState(null);
  const [placeId, setPlaceId] = useState(null);
  const [findItem, setFindItem] = useState(null);
  const [state, setState] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (placeName && placeId) {
        try {
          const accessToken = localStorage.getItem("accessToken");
          const response = await axios.get(`https://api.oneulmohae.co.kr/place/${placeName}`, {
            headers: {
              Authorization: accessToken,
              placeId: placeId,
            },
          });

          if (response.data) {
            const foundItem = response.data;
            setFindItem(foundItem);
          } else {
            setFindItem(null);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [placeName, placeId]);

  useEffect(() => {
    if (findItem) {
      changeSetContent(findItem);
    }
  }, [findItem]);

  const changeSetContent = (arrayEl) => {
    setContent((prevContent) => {
      const newContent = [...prevContent];
      newContent[idx] = arrayEl;
      return newContent;
    });
  };

  return (
    <>
      {isFindBoxVisible && (
        <div className={styles["mycourse-find-box-total-container"]}>
          <MyCourseCalendar time={time} setTime={setTime} idx={idx} />
          <Delete onClick={handleDelete} />

          {state && findItem ? (
            <MyCourseDataBox key={findItem.id} data={findItem} />
          ) : (
            <div className={styles["mycourse-find-box-button-container"]}>
              <FindButton
                text={"관심 목록에서 찾기"}
                onClick={() => {
                  setInterestModal(true);
                }}
              />
              {interestModal && (
                <MyCourseFindInterestModal
                  interestModal={interestModal}
                  setInterestModal={setInterestModal}
                  state={state}
                  setState={setState}
                  setPlaceName={setPlaceName} // setPlaceName 전달
                  setPlaceId={setPlaceId} // setPlaceId 전달
                />
              )}

              <FindButton
                text={"추천한 장소에서 찾기"}
                onClick={() => {
                  setRecommendModal(true);
                }}
              />
              {recommendModal && (
                <MyCourseFindRecommendModal
                  recommendModal={recommendModal}
                  setRecommendModal={setRecommendModal}
                  state={state}
                  setState={setState}
                  setPlaceName={setPlaceName} // setPlaceName 전달
                  setPlaceId={setPlaceId} // setPlaceId 전달
                />
              )}

              <FindButton
                text={"최근 본 장소에서 찾기"}
                onClick={() => {
                  setRecentModal(true);
                }}
              />
              {recentModal && (
                <MyCourseFindRecentModal
                  recentModal={recentModal}
                  setRecentModal={setRecentModal}
                  state={state}
                  setState={setState}
                  setPlaceName={setPlaceName} // setPlaceName 전달
                  setPlaceId={setPlaceId} // setPlaceId 전달
                />
              )}
            </div>
          )}

          <img src={downArrow} alt="아래 화살표" className={styles["mycourse-find-box-down-arrow-img"]} />
        </div>
      )}
    </>
  );
};

export default MyCourseFindBox;
