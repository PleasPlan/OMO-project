import styles from "./Search.module.css";
import LogoCircle from "../../assets/logo-circle.png";
import Magnifier from "../../assets/magnifier.png";

const Search = () => (
  <div className={styles["main-search-container"]}>
    <div className={styles["main-search-img-container"]}>
      <img src={LogoCircle} alt="로고 동그라미" />
      <a href="#">
        <img src={Magnifier} alt="돋보기" />
      </a>
    </div>
    <input className={styles["main-search-input-container"]} placeholder="장소를 입력해주세요" />
  </div>
);
export default Search;
