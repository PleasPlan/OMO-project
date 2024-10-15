import styles from "./ListSearch.module.css";
import Magnifier from "../../assets/magnifier.png";

const ListSearch = ({ onSearch, searchTerm }) => {

  const handleInputChange = (event) => {
    const term = event.target.value;
    onSearch(term);
  };

  return (
    <div className={styles["list-search-container"]}>
      <div className={styles["list-search-img-container"]}>
        <a href="#">
          <img src={Magnifier} alt="돋보기" />
        </a>
      </div>
      <input className={styles["list-search-input-container"]} placeholder="검색어를 입력해 주세요." maxLength={20} value={searchTerm} onChange={handleInputChange} />
    </div>
  );
};

export default ListSearch;
