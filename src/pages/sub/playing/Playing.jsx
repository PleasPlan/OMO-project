import styles from "../../main/Main.module.css";
import {SubCategoryBox} from "../../../components/SubCategoryBox/SubCategoryBox";
import {playing} from "../../../const/playing";
import Search from "../../../components/Search/Search";

const Playing = () => (
  <>
    <div className={styles["main-category-container"]}>
      {playing.map((el) => {
        return <SubCategoryBox key={el.id} {...el} />;
      })}
    </div>
  </>
);

export default Playing;
