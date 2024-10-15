import styles from "../../main/Main.module.css";
import {SubCategoryBox} from "../../../components/SubCategoryBox/SubCategoryBox";
import {themeCafe} from "../../../const/themeCafe";

const ThemeCafe = () => (
  <>
    <div className={styles["main-category-container"]}>
      {themeCafe.map((el) => {
        return <SubCategoryBox key={el.id} {...el} />;
      })}
    </div>
  </>
);

export default ThemeCafe;
