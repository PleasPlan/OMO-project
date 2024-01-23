import styles from "../../Main/Main.module.css";
import {SubCategoryBox} from "../../../components/SubCategoryBox/SubCategoryBox";
import {eating} from "../../../const/eating";
import Search from "../../../components/Search/Search";

const Eating = () => (
  <>
    <Search />
    <div className={styles["main-category-container"]}>
      {eating.map((el) => {
        return <SubCategoryBox key={el.id} title={el.title} img={el.src} />;
      })}
    </div>
  </>
);

export default Eating;
