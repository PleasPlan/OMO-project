import styles from "./Search.module.css";
import LogoCircle from "../../assets/logo-circle.png";
import Magnifier from "../../assets/magnifier.png";
import Location from "../../assets/main/location.png";
import { useState } from "react";

const Search = ({ handleSearch, query, setQuery, location, setLocation, locationAccessDenied }) => {

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(query);
    setQuery('');
  };

  return (
    <div className={styles["main-search-wrapper"]} onSubmit={handleSubmit}>
      <form className={styles["main-search-container"]}>
        <div className={styles["main-search-input-container"]}>
          <img className={styles["main-search-logocircle"]} src={LogoCircle} alt="로고 동그라미" />
          <input
            className={styles["main-search-input"]}
            type="text"
            placeholder="시/군/구를 정확하게 입력해주세요 (ex. 서울시 마포구 양화로(O) 홍대(X))"
            value={query}
            onChange={handleInputChange}
            maxLength={35}
          />
          <button className={styles["main-search-button"]} type="submit">
            <img src={Magnifier} alt="돋보기" />
          </button>
        </div>
      </form>
      <div className={styles["main-search-location-container"]}>
        <img src={Location} alt="위치" />
        {location === "현재 위치를 확인할 수 없습니다." ? (
          <div className={styles["main-search-location-current"]}>
            {location}
            {/* {locationAccessDenied && ( */}
              <div className={styles["location-access-denied-bubble"]}>
                위치 액세스를 허용해주세요
              </div>
            {/* )} */}
          </div>
        ) : (
          <div className={styles["main-search-location-current"]}>현재 설정된 위치 : {location}</div>
        )}
      </div>
    </div>
  );
};
export default Search;
