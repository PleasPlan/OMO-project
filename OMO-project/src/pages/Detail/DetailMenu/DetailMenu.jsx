import styles from "./DetailMenu.module.css";
import { DetailItemsMenu } from "../../../components/DetailItems/DetailItemsMenu/DetailItemsMenu";
import { ScrollToTop } from "../../../components/ScrollToTop/ScrollToTop";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const DetailMenu = ({ setDefaultListImg }) => {
  const { id, place_name } = useParams();
  const navigate = useNavigate();
  
  const [DetailItemsMenuData, setDetailItemsMenuData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.oneulmohae.co.kr/place/${place_name}`, {
          headers: {
            placeId: id,
            Authorization: `${localStorage.getItem("accessToken")}`,
          },
        });

        const data = response.data;
        
        if (data && data.place_name === place_name) {
          setDetailItemsMenuData(data);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, place_name]);

  if (loading) return <div>Loading...</div>;

  if (error) {
    return (
      <div className={styles.error}>
        <h2>유효하지 않은 URL이거나 존재하지 않는 페이지입니다.</h2>
        <button onClick={() => navigate("/")}>메인 페이지로 이동</button>
      </div>
    );
  }

  // 제목이 15글자보다 길면 자르고 "..."을 붙임
  const truncatedTitle = DetailItemsMenuData.place_name.length > 15
    ? DetailItemsMenuData.place_name.slice(0, 15) + "..."
    : DetailItemsMenuData.place_name;

  return (
    <>
      <section className={styles["detail-container"]}>
        {/* 자른 제목을 표시 */}
        <h1>{truncatedTitle}</h1>
        <DetailItemsMenu DetailItemsMenuData={DetailItemsMenuData} setDefaultListImg={setDefaultListImg} place_name={place_name} placeId={id} />
      </section>
      <ScrollToTop />
    </>
  );
};

export default DetailMenu;
