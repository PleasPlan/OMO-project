import React, {useState} from "react";
import styles from "./MyCourseFindBox.module.css";
import downArrow from "../../../assets/my-course/write/down-arrow.png";
import Delete from "../Button/Delete/Delete";
import MyCourseCalendar from "../MyCourseCalendar/MyCourseCalendar";
import MyCourseDataBox from "../MyCourseDataBox/MyCourseDataBox";
import FindButton from "./FindButton/FindButton";
import MyCourseFindInterestModal from "../MyCourseFindInterestModal/MyCourseFindInterestModal";
import MyCourseFindRecentModal from "../MyCourseFindRecentModal/MyCourseFindRecentModal";
import MyCourseFindSearchModal from "../MyCourseFindSearchModal/MyCourseFindSearchModal";
import {data} from "../../../const/data";

const MyCourseFindBox = ({dates, setDates, content, setContent, idx}) => {
  const [interestModal, setInterestModal] = useState(false);
  const [recentModal, setRecentModal] = useState(false);
  const [searchModal, setSearchModal] = useState(false);
  const [isFindBoxVisible, setFindBoxVisible] = useState(true); // Add this state

  const handleDeleteClick = () => {
    setFindBoxVisible(false);
    alert("삭제되었습니다.");
  };

  const [item, setItem] = useState(); // id의 상태

  const [state, setState] = useState(false);

  //  선택한 item(id)와 같은 id를 data에서 찾아서 findItem에 넣어줌
  const findItem = data.find((el) => el.id === item);

  const changeSetContent = (arrayEl) => {
    const newContent = content.length === 0 ? [arrayEl] : [...content, arrayEl];
    //  기존 배열에 새로운 요소를 추가하기 전에 배열의 길이를 확인하고, 길이가 0이라면 0으로 시작하도록 처리

    const flattenedContent = newContent.flat(); // 이 부분을 추가해서 중첩 배열을 평탄화합니다. (객체가 바로 들어감)

    // console.log(flattenedContent); // 평탄화된 배열

    setContent(flattenedContent); // 업데이트
  };

  // console.log(findItem);
  // console.log("MyCourseFindBox에서 content: ", content);

  return (
    <>
      {isFindBoxVisible && (
        <div className={styles["mycourse-find-box-total-container"]}>
          <MyCourseCalendar dates={dates} setDates={setDates} idx={idx}/>
          <Delete onClick={handleDeleteClick} />

          {state ? (
            // findItem.map((el) => {
            //   return <MyCourseItemListBox key={el.id} {...el}/>;
            // })
            <MyCourseDataBox key={findItem.id} data={findItem} />
          ) : (
            <div className={styles["mycourse-find-box-button-container"]}>
              <FindButton
                text={"관심 목록에서 찾기"}
                onClick={() => {
                  setInterestModal(true);
                }}
              />
              {interestModal ? (
                <MyCourseFindInterestModal
                  item={item}
                  setItem={setItem}
                  state={state}
                  setState={setState}
                  interestModal={interestModal}
                  setInterestModal={setInterestModal}
                  changeSetContent={changeSetContent}
                />
              ) : null}

              <FindButton
                text={"최근 본 목록에서 찾기"}
                onClick={() => {
                  setRecentModal(true);
                }}
              />
              {recentModal ? (
                <MyCourseFindRecentModal
                  item={item}
                  setItem={setItem}
                  state={state}
                  setState={setState}
                  recentModal={recentModal}
                  setRecentModal={setRecentModal}
                  changeSetContent={changeSetContent}
                />
              ) : null}

              <FindButton
                text={"검색을 통해 찾기"}
                onClick={() => {
                  setSearchModal(true);
                }}
              />
              {searchModal ? (
                <MyCourseFindSearchModal
                  item={item}
                  setItem={setItem}
                  state={state}
                  setState={setState}
                  searchModal={searchModal}
                  setSearchModal={setSearchModal}
                  changeSetContent={changeSetContent}
                />
              ) : null}
            </div>
          )}

          <img src={downArrow} alt="아래 화살표" className={styles["mycourse-find-box-down-arrow-img"]} />
        </div>
      )}
    </>
  );
};
export default MyCourseFindBox;
