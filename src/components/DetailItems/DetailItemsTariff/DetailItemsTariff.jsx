import {useState, useRef} from "react";
import styles from "./DetailItemsTariff.module.css";
import Jjim from "../../../assets/detail/empty-heart.png";
import JjimClicked from "../../../assets/detail/red-heart.png";
import Like from "../../../assets/detail/empty-thumb.png";
import LikeClicked from "../../../assets/detail/purple-thumb.png";
import Address from "../../../assets/detail/address.png";
import SalesInfo from "../../../assets/detail/sales-info.png";
import Menu from "../../../assets/detail/menu.png";
import Call from "../../../assets/detail/call.png";
import Graph from "../../../assets/detail/graph.png";
import ReviewIcon from "../../../assets/detail/review.png";
import Submit from "../../../assets/submit.png";
import SubmitHover from "../../../assets/submit-hover.png";
import {Review} from "../Review/Review";
import {priceTemplate} from "../../../utils/priceTemplate";
import {reviewData} from "../../../const/reviewData";

export const DetailItemsTariff = (props) => {
  // 찜 버튼
  const [item, setItem] = useState([]); // 상태변화함수, 빈배열로 시작

  const [content, setContent] = useState(""); // 댓글 내용

  const dataId = useRef(0); // id 인덱스 추가-> 변수처럼 사용 필요 -> useRef 사용

  // 데이터 가져오기
  const {data} = props;

  // 찜 버튼
  const [imageSrcJjim, setImageSrcJjim] = useState(Jjim);
  const [isClikedJjim, setIsClickedJjim] = useState(false);
  const [countJjim, setCountJjim] = useState(0);

  // 좋아요 버튼
  const [imageSrcLike, setImageSrcLike] = useState(Like);
  const [isClikedLike, setIsClickedLike] = useState(false);
  const [countLike, setCountLike] = useState(0);

  // onCreate 함수 (댓글 리스트에 댓글 추가)
  const onCreate = (content) => {
    const created_date = new Date().getTime();
    const newItem = {
      content,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setItem([newItem, ...item]);
  };

  // handleClickJjim 함수 (찜 버튼 - 색, 카운트)
  const handleClickJjim = () => {
    if (isClikedJjim) {
      setImageSrcJjim(Jjim);
      setIsClickedJjim(false);
      setCountJjim((count) => count - 1);
    } else {
      setImageSrcJjim(JjimClicked);
      setIsClickedJjim(true);
      setCountJjim((count) => count + 1);
    }
  };

  // handleClickLike 함수 (좋아요 버튼 - 색, 카운트)
  const handleClickLike = () => {
    if (isClikedLike) {
      setImageSrcLike(Like);
      setIsClickedLike(false);
      setCountLike(countLike - 1);
    } else {
      setImageSrcLike(LikeClicked);
      setIsClickedLike(true);
      setCountLike(countLike + 1);
    }
  };

  // handleSubmit 함수 (리뷰 제출 버튼)
  const handleSubmit = () => {
    if (content.length < 1) {
      alert("리뷰는 최소 1글자 이상 입력해주세요"); // 댓글 최소 글자
      return;
    }
    onCreate(content); 
    setContent('');
  };

      // handleOnKeyPress함수 (input에 적용할 Enter 키 입력 함수)
      const handleOnKeyPress = (e) => {
        if (e.key === "Enter") {
          handleSubmit(); // Enter 입력이 되면 클릭 이벤트 실행
        }
      };

  return (
    <>
      <section className={styles["detail-title-container"]}>
        <div className={styles["detail-thumbnail-container"]}>
          <img src={data.thumbnail} alt="썸네일 이미지" />
        </div>
        <span className={styles["detail-title"]}>{data.title}</span>
        <div className={styles["detail-like-jjim-container"]}>
          <div className={styles["detail-jjim"]}>
            <button type="button" onClick={handleClickJjim}>
              <img src={imageSrcJjim} alt="찜 아이콘" style={{position: "absolute", top: "1px"}} />
            </button>
            <span className={styles["detail-jjim-number"]}> {countJjim}</span>
          </div>
          <span className={styles["detail-like-jjim-line"]}>|</span>
          <div className={styles["detail-like"]}>
            <button type="button" onClick={handleClickLike}>
              <img src={imageSrcLike} alt="좋아요 아이콘" style={{position: "absolute", top: "-1px"}} />
            </button>
            <span className={styles["detail-like-number"]}> {countLike}</span>
          </div>
        </div>
      </section>

      <div className={styles["detail-inner-container"]}>
        <section className={styles["detail-address-container"]}>
          <div className={styles["detail-address-inner-container"]}>
            <img src={Address} alt="주소 아이콘" style={{width: "20px", height: "25px", position: "absolute", top: "1px"}} />
            <span className={styles["detail-address-title"]}>주소</span>
          </div>
          <span className={styles["detail-address-info-street"]}>{data.addressStreet}</span>
          <span className={styles["detail-address-info-number"]}>{data.addressNumber}</span>
        </section>

        <section className={styles["detail-sales-info-container"]}>
          <div className={styles["detail-sales-info-inner-container"]}>
            <img src={SalesInfo} alt="영업정보 아이콘" style={{width: "25px", height: "25px", position: "absolute", top: "3px"}} />
            <span className={styles["detail-sales-info-title"]}>영업정보</span>
          </div>
          <div className={styles["detail-sales-info-time-container"]}>
            <span className={styles["detail-sales-info-time"]}>시간</span>
            <span className={styles["detail-sales-info-line"]}>|</span>
            <span className={styles["detail-sales-info-time-info"]}>{data.time}</span>
          </div>
          <div className={styles["detail-sales-info-holiday-container"]}>
            <span className={styles["detail-sales-info-holiday"]}>휴무</span> <span className={styles["detail-sales-info-line"]}>|</span>
            <span className={styles["detail-sales-info-holiday-info"]}>{data.holiday}</span>
          </div>
        </section>

        <section className={styles["detail-tariff-container"]}>
          <div className={styles["detail-tariff-inner-container"]}>
            <img src={Menu} alt="메뉴 아이콘" style={{width: "20px", height: "25px", position: "absolute", top: "1px"}} />
            <span className={styles["detail-tariff-title"]}>요금표</span>
          </div>
          {data.tariff.map((el) => (
             <div key={el.id}>
            <ul className={styles["detail-tariff"]}>
              <li className={styles["detail-tariff-list"]}>
                <span className={styles["detail-tariff-list-title"]}>{el.title}</span> <span className={styles["detail-tariff-list-price"]}>{priceTemplate(el.price)}원</span>
              </li>
            </ul>
            </div>
          ))}
        </section>

        <section className={styles["detail-call-container"]}>
          <div className={styles["detail-call-inner-container"]}>
            <img src={Call} alt="전화 아이콘" style={{width: "25px", height: "25px", position: "absolute", top: "1px"}} />
            <span className={styles["detail-call-title"]}>전화</span>
          </div>
          <span className={styles["detail-call"]}>{data.call}</span>
        </section>

        <section className={styles["detail-google-map-container"]}>
          <div className={styles["detail-google-map-inner-container"]}>
            <img src={data.googleMap} alt="구글맵 이미지" style={{width: "1000px", height: "300px"}} />
          </div>
        </section>

        <section className={styles["detail-mbti-stats-container"]}>
          <div className={styles["detail-mbti-stats-inner-container"]}>
            <img src={Graph} alt="통계 아이콘" style={{width: "25px", height: "25px", position: "absolute", top: "1px"}} />
            <span className={styles["detail-mbti-stats-title"]}>MBTI별 통계</span>
          </div>

          <div className={styles["detail-mbti-graph-container"]}>
            <div className={styles["detail-mbti-graph-inner-container"]}>
              <div className={styles["detail-mbti-graph-alphabat-box"]}>
                <span className={styles["detail-mbti-graph-alphabat"]}>E</span>
                <span className={styles["detail-mbti-graph-text"]}>외향</span>
              </div>
              <div className={styles["detail-mbti-graph-EI-bar"]}>
                <div className={styles["detail-mbti-graph-EI-bar-percent"]}></div>
              </div>
              <div className={styles["detail-mbti-graph-alphabat-box"]}>
                <span className={styles["detail-mbti-graph-alphabat"]}>I</span>
                <span className={styles["detail-mbti-graph-text"]}>내향</span>
              </div>
            </div>

            <div className={styles["detail-mbti-graph-inner-container"]}>
              <div className={styles["detail-mbti-graph-alphabat-box"]}>
                <span className={styles["detail-mbti-graph-alphabat"]}>S</span>
                <span className={styles["detail-mbti-graph-text"]}>현실</span>
              </div>
              <div className={styles["detail-mbti-graph-SN-bar"]}>
                <div className={styles["detail-mbti-graph-SN-bar-percent"]}></div>
              </div>
              <div className={styles["detail-mbti-graph-alphabat-box"]}>
                <span className={styles["detail-mbti-graph-N"]}>N</span>
                <span className={styles["detail-mbti-graph-text"]}>직관</span>
              </div>
            </div>

            <div className={styles["detail-mbti-graph-inner-container"]}>
              <div className={styles["detail-mbti-graph-alphabat-box"]}>
                <span className={styles["detail-mbti-graph-alphabat"]}>T</span>
                <span className={styles["detail-mbti-graph-text"]}>사고</span>
              </div>
              <div className={styles["detail-mbti-graph-TF-bar"]}>
                <div className={styles["detail-mbti-graph-TF-bar-percent"]}></div>
              </div>
              <div className={styles["detail-mbti-graph-alphabat-box"]}>
                <span className={styles["detail-mbti-graph-alphabat"]}>F</span>
                <span className={styles["detail-mbti-graph-text"]}>감정</span>
              </div>
            </div>

            <div className={styles["detail-mbti-graph-inner-container"]}>
              <div className={styles["detail-mbti-graph-alphabat-box"]}>
                <span className={styles["detail-mbti-graph-alphabat"]}>P</span>
                <span className={styles["detail-mbti-graph-text"]}>탐색</span>
              </div>
              <div className={styles["detail-mbti-graph-PJ-bar"]}>
                <div className={styles["detail-mbti-graph-PJ-bar-percent"]}></div>
              </div>
              <div className={styles["detail-mbti-graph-alphabat-box"]}>
                <span className={styles["detail-mbti-graph-alphabat"]}>J</span>
                <span className={styles["detail-mbti-graph-text"]}>계획</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles["detail-review-container"]}>
          <div className={styles["detail-review-inner-container"]}>
            <img src={ReviewIcon} alt="리뷰 아이콘" style={{width: "25px", height: "25px", position: "absolute", top: "3px"}} />
            <span className={styles["detail-review-title"]}>리뷰 ({item.length})</span>

            <div className={styles["detail-review-box-container"]}>
              <div className={styles["detail-review-input-box"]}>
                <img src={reviewData.find((item) => item.id).src} alt="프로필 이미지" style={{width: "50px", height: "50px"}} />
                <button onClick={handleSubmit} className={styles["detail-review-input-button"]} src={Submit} type="submit">
                  <img className={styles["detail-review-input-button-img"]} src={Submit} alt="제출 이미지" style={{width: "35px", height: "35px"}} />
                  <img className={styles["detail-review-input-button-img-hover"]} src={SubmitHover} alt="제출 hover 이미지" style={{width: "35px", height: "35px"}} />
                </button>
                <input
                 onKeyDown={handleOnKeyPress}
                  value={content || ""}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                  className={styles["detail-review-input"]}
                  type="text"
                  id="review"
                  name="review"
                  minLength="2"
                  maxLength="40"
                  size="10"
                  placeholder="리뷰를 입력하세요..."
                ></input>
              </div>

              {item.map((review) => (
                <Review key={review.id} {...review} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
