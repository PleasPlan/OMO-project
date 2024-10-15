import styles from "./MyCourseFindSearchModal.module.css";
import {MyCourseItemListBox} from "../MyCourseItemListBox/MyCourseItemListBox";
import {data} from "./../../../const/data";
import Magnifier from "./../../../assets/magnifier.png";
import ModalClose from "./../../../assets/modal-close.png";
import {useState} from "react";

const MyCourseFindSearchModal = ({searchModal, setSearchModal, state, setState, item, setItem, changeSetContent}) => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색창 상태 관리

  const filteredData = data.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  // filter메서드는 제공된 함수에 의해 구현된 테스트를 통과한 모든 요소가 포함된 새 배열을 만든다.
  // 필터 함수의 조건이 (title에 있는 글자를 포함하는 것이) true인 경우 해당 요소가 배열에 들어간다.

  // state를 업데이트 해주는 함수
  const onSearch = (term) => {
    setSearchTerm(term);
  };

  const handleInputChange = (event) => {
    const term = event.target.value; // term은 입력하는 글자
    onSearch(term); // 검색하는 글자(term)로 실시간으로 상태를 업데이트
  };

  const handleClickItem = (item) => {
    setItem(item); // 받아온 id를 업데이트 해줌
  };
  return (
    <>
      <div className={styles["Overlay"]}>
        <div className={styles["mycourse-find-search-modal-container"]}>
          <label className={styles["mycourse-find-search-modal-title"]} htmlFor="find-search">
            <div className={styles["mycourse-find-search-container"]}>
              <div className={styles["mycourse-find-search-img-container"]}>
                <a href="#">
                  <img src={Magnifier} alt="돋보기" />
                </a>
              </div>
              <button
                className={styles["mycourse-find-search-close-btn"]}
                type="button"
                onClick={() => {
                  setSearchModal(false);
                }}
              >
                <img className={styles["mycourse-find-search-close-btn-img"]} src={ModalClose} alt="닫기 아이콘" />
                {!searchModal ? setSearchModal(true) : null}
              </button>
              <input className={styles["mycourse-find-search-input-container"]} placeholder="검색어를 입력해 주세요." maxLength={20} value={searchTerm} onChange={handleInputChange} />
            </div>
          </label>
          <div className={styles["mycourse-find-search-modal-list-box-container"]}>
            {filteredData.map((el) => {
              return <MyCourseItemListBox key={el.id} state={state} setState={setState} el={el} onClick={handleClickItem} changeSetContent={changeSetContent} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyCourseFindSearchModal;
