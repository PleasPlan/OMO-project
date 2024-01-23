import styles from "./DetailMenu.module.css";
import {data} from "../../../const/data";
import {DetailItemsMenu} from "../../../components/DetailItems/DetailItemsMenu/DetailItemsMenu";
import {ScrollToTop} from "../../../components/ScrollToTop/ScrollToTop";

const DetailMenu = () => {
  const storeItem = data.find((item) => item.id === 1);
  return (
    <>
      <section className={styles["detail-container"]}>
        <DetailItemsMenu key={storeItem.id} data={storeItem} />
      </section>
      <ScrollToTop />
    </>
  );
};

export default DetailMenu;
