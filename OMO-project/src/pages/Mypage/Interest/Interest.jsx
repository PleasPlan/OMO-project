import axios from "axios";
import styles from "./Interest.module.css";
import Mypage from "../../../components/Mypage/Mypage";
import {MypageListBox} from "../../../components/MypageListBox/MypageListBox";
import {ScrollToTop} from "../../../components/ScrollToTop/ScrollToTop";
import InterestIcon from "../../../assets/my-page/my-info/empty-heart.png";
import {useEffect, useState} from "react";
import {Loading} from "../../../components/Loading/Loading";
import {useNavigate} from "react-router-dom";

const Interest = () => {
  const [interestPosts, setInterestPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!loggedIn) {
      alert("로그인 후 이용 가능한 서비스입니다.");
      navigate("/Login", {replace: true});
    }
  }, [navigate]);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://api.oneulmohae.co.kr/myPage/likes?page=1&size=10", {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      const data = response.data.likedPlace;

      if (Array.isArray(data)) {
        setInterestPosts(data);
      } else {
        setInterestPosts([]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("데이터 가져오기 실패:", error);
      setInterestPosts([]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles["mypage-list-component-container"]}>
        <h2 className={styles["mypage-list-title-container"]}>
          <div>
            <img src={InterestIcon} alt="관심목록 아이콘" /> <span>관심 목록</span>
          </div>
        </h2>

        <section className={styles["mypage-list-container"]}>
          <Mypage />
          <div className={styles["mypage-list-box-container"]}>
            {interestPosts.length === 0 ? (
              <div className={styles["no-jjim-list"]}>관심 목록이 없습니다. 장소 상세 페이지에서 하트를 눌러보세요!</div>
            ) : (
              <div>
                {interestPosts.map((el) => {
                  return <MypageListBox key={el.id} {...el} />;
                })}
              </div>
            )}
          </div>
        </section>
      </div>
      <ScrollToTop />
    </>
  );
};

export default Interest;
