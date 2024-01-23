import styles from "./DetailTariff.module.css";
import {data} from "../../../const/data";
import {DetailItemsTariff} from "../../../components/DetailItems/DetailItemsTariff/DetailItemsTariff";
import {ScrollToTop} from "../../../components/ScrollToTop/ScrollToTop";

const DetailTariff = () => {
  const storeItem = data.find((item) => item.id === 1);
  return (
    <>
      <section className={styles["detail-container"]}>
        <DetailItemsTariff key={storeItem.id} data={storeItem} />
      </section>
      <ScrollToTop />
    </>
  );
};

export default DetailTariff;
