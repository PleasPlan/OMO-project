import styles from "../../main/Main.module.css";
import {SubCategoryBox} from "../../../components/SubCategoryBox/SubCategoryBox";
import {eating} from "../../../const/eating";
import Search from "../../../components/Search/Search";

const Eating = () => (
  <>
    <div className={styles["main-category-container"]}>
      {eating.map((el) => {
        return <SubCategoryBox key={el.id} {...el} />;
      })}
    </div>
  </>
);

export default Eating;
