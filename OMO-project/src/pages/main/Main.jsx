import styles from "./Main.module.css";
import {CategoryBox} from "../../components/CategoryBox/CategoryBox";
import {main} from "../../const/main";
import {Weather} from "../../components/Weather/Weather";
import Search from "../../components/Search/Search";

const Main = () => (
  <>
    <Search />
    <Weather />
    <div className={styles["main-category-container"]}>
      {main.map((el) => {
        return <CategoryBox key={el.id} title={el.title} img={el.src} />;
      })}
    </div>
  </>
);

export default Main;
