import styles from "./List.module.css";
import Filter from "../../components/Filter/Filter";
import ListSearch from "../../components/ListSearch/ListSearch";
import {data} from "../../const/data";
import {listPageFilter} from "../../const/listPageFilter";
import {ListBox} from "../../components/ListBox/ListBox";
import {ScrollToTop} from "../../components/ScrollToTop/ScrollToTop";

const List = () => (
  <>
    <div className={styles["list-component-container"]}>
      <div className={styles["list-filter-container"]}>
        {listPageFilter.map((el) => {
          return <Filter key={el.id} title={el.title} bar={el.bar} />;
        })}
      </div>
      <ListSearch />
    </div>
    <section className={styles["list-list-container"]}>
      <div className={styles["list-list-box-container"]}>
        {data.map((el) => {
          return <ListBox key={el.id} title={el.title} like={el.like} jjim={el.jjim} runTime={el.runTime} intro={el.intro} addressBrief={el.addressBrief} img1={el.src1} img2={el.src2} />;
        })}
      </div>
    </section>
    <ScrollToTop />
  </>
);

export default List;
