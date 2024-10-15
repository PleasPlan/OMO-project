import styles from "./DetailNone.module.css";
import {data} from "../../../const/data";
import {DetailItemsNone} from "../../../components/DetailItems/DetailItemsNone/DetailItemsNone";
import {ScrollToTop} from "../../../components/ScrollToTop/ScrollToTop";

const DetailNone = () => {
  const storeItem = data.find((item) => item.id === 1);
  return (
    <>
      <section className={styles["detail-container"]}>
        <DetailItemsNone key={storeItem.id} data={storeItem} />
      </section>
      <ScrollToTop />
    </>
  );
};

export default DetailNone;
