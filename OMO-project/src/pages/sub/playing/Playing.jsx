import styles from "../../Main/Main.module.css";
import {SubCategoryBox} from "../../../components/SubCategoryBox/SubCategoryBox";
import {playing} from "../../../const/playing";
import Search from "../../../components/Search/Search";

const Playing = () => (
  <>
    <Search />
    <div className={styles["main-category-container"]}>
      {playing.map((el) => {
        return <SubCategoryBox key={el.id} title={el.title} img={el.src} />;
      })}
    </div>
  </>
);

export default Playing;
