import styles from "../../Main/Main.module.css";
import {SubCategoryBox} from "../../../components/SubCategoryBox/SubCategoryBox";
import {themeCafe} from "../../../const/themeCafe";
import Search from "../../../components/Search/Search";

const ThemeCafe = () => (
  <>
    <Search />
    <div className={styles["main-category-container"]}>
      {themeCafe.map((el) => {
        return <SubCategoryBox key={el.id} title={el.title} img={el.src} />;
      })}
    </div>
  </>
);

export default ThemeCafe;
