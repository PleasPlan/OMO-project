import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./DetailItemsMenu.module.css";
import Jjim from "../../../assets/detail/empty-heart.png";
import JjimClicked from "../../../assets/detail/red-heart.png";
import Like from "../../../assets/detail/empty-thumb.png";
import LikeClicked from "../../../assets/detail/purple-thumb.png";
import Address from "../../../assets/detail/address.png";
import Call from "../../../assets/detail/call.png";
import Graph from "../../../assets/detail/graph.png";
import ReviewIcon from "../../../assets/detail/review.png";
import Submit from "../../../assets/submit.png";
import SubmitHover from "../../../assets/submit-hover.png";
import Magnifier from "../../../assets/detail/magnifier.png";
import { Review } from "../Review/Review";
import DeleteImg from "../../../assets/my-page/setting/profile-delete.png";
import DefaultImg from "../../../assets/detail/detail-default-background.png";
import defaultDetailIcon from "../../../assets/detail/defaultDetailIcon.png";
import { Loading } from "../../Loading/Loading";
import KakaoMap from "../../KaKaoMap/KaKaoMap";

export const DetailItemsMenu = (props) => {
  const [item, setItem] = useState([]); // 상태변화함수, 빈배열로 시작
  const [content, setContent] = useState(""); // 댓글 내용
  const dataId = useRef(0); // id 인덱스 추가-> 변수처럼 사용 필요 -> useRef 사용

  // 하트 버튼 (관심) 상태관리
  const [imageSrcJjim, setImageSrcJjim] = useState(Jjim); // 하트 이미지 토글
  const [isClikedJjim, setIsClickedJjim] = useState(false); // 하트 버튼 클릭 토글
  const [countJjim, setCountJjim] = useState(0); // 하트 카운트 값 관리

  // 따봉 버튼 (추천) 상태관리
  const [imageSrcLike, setImageSrcLike] = useState(Like); // 따봉 이미지 토글
  const [isClikedLike, setIsClickedLike] = useState(false); // 따봉 버튼 클릭 토글
  const [countLike, setCountLike] = useState(0); // 따봉 카운트 값 관리

  useEffect(() => {
    if (props.DetailItemsMenuData) {
      setCountJjim(props.DetailItemsMenuData.mine); // 관심 데이터가 로드되면 상태 업데이트
      setCountLike(props.DetailItemsMenuData.recommend); // 추천 데이터가 로드되면 상태 업데이트

      // mine 값을 사용하여 초기 상태 설정
      if (props.DetailItemsMenuData.myMine) {
        setImageSrcJjim(JjimClicked);
        setIsClickedJjim(true);
      } else {
        setImageSrcJjim(Jjim);
        setIsClickedJjim(false);
      }

      // recommend 값을 사용하여 초기 상태 설정
      if (props.DetailItemsMenuData.myRecommend) {
        setImageSrcLike(LikeClicked);
        setIsClickedLike(true);
      } else {
        setImageSrcLike(Like);
        setIsClickedLike(false);
      }
    }
  }, [props.DetailItemsMenuData]); // props.DetailItemsMenuData가 변경될 때마다 실행



  // handleClickJjim 함수 (하트 버튼 (관심) - PUT+GET 요청, 이미지 변경, 카운트 업데이트)
  const handleClickJjim = async () => {
    try {
      const response = await axios.put(
        `https://api.oneulmohae.co.kr/place/${props.place_name}`,
        {}, // 빈 객체를 본문으로 전달
        {
          headers: {
            placeId: props.placeId,
            Authorization: localStorage.getItem("accessToken"),
            memberId: localStorage.getItem("memberId"),
            LR: 'true',
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("put요청: ", response.data);
        // PUT 요청이 성공한 후 GET 요청을 보내기
        const getResponse = await axios.get(
          `https://api.oneulmohae.co.kr/place/${props.place_name}`,
          {
            headers: {
              placeId: props.placeId,
            },
          }
        );

        if (getResponse.status === 200) {
          const updatedData = getResponse.data;

          console.log("get요청: ", updatedData.mine);

          // 이미지 변경 및 카운트 업데이트
          if (isClikedJjim) {
            setImageSrcJjim(Jjim);
            setIsClickedJjim(false);
          } else {
            setImageSrcJjim(JjimClicked);
            setIsClickedJjim(true);
          }
          setCountJjim(updatedData.mine); // 새로운 데이터를 사용하여 업데이트
        } else {
          console.error("Failed to fetch updated jjim data");
        }
      } else {
        console.error("Failed to update jjim status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

    // handleClickLike 함수 (따봉 버튼 (추천) - PUT+GET 요청, 이미지 변경, 카운트 업데이트)
    const handleClickLike = async () => {
      try {
        const response = await axios.put(
          `https://api.oneulmohae.co.kr/place/${props.place_name}`,
          {}, // 빈 객체를 본문으로 전달
          {
            headers: {
              placeId: props.placeId,
              Authorization: localStorage.getItem("accessToken"),
              memberId: localStorage.getItem("memberId"),
              LR: 'false',
            },
            withCredentials: true,
          }
        );
  
        if (response.status === 200) {
          console.log("put요청: ", response.data);
          // PUT 요청이 성공한 후 GET 요청을 보내기
          const getResponse = await axios.get(
            `https://api.oneulmohae.co.kr/place/${props.place_name}`,
            {
              headers: {
                placeId: props.placeId,
              },
            }
          );
  
          if (getResponse.status === 200) {
            const updatedData = getResponse.data;
  
            console.log("get요청: ", updatedData.recommend);
  
            // 이미지 변경 및 카운트 업데이트
            if (isClikedLike) {
              setImageSrcLike(Like);
              setIsClickedLike(false);
            } else {
              setImageSrcLike(LikeClicked);
              setIsClickedLike(true);
            }
            setCountLike(updatedData.recommend); // 새로운 데이터를 사용하여 업데이트
          } else {
            console.error("Failed to fetch updated Like data");
          }
        } else {
          console.error("Failed to update Like status");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
  


  // onCreate 함수 (댓글 리스트에 댓글 추가)
  const onCreate = (content, imageSrc) => {
    const created_date = new Date().getTime();
    const newItem = {
      content,
      imageSrc, // 이미지 경로 추가
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setItem([newItem, ...item]);
  };

  //  리뷰 사진 체출
  const [Image, setImage] = useState(DefaultImg);
  const [File, setFile] = useState("");

  const fileInput = useRef(null);

  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setImage(DefaultImg);
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  // handleSubmit
  const handleSubmit = () => {
    if (content.length < 1) {
      alert("리뷰는 최소 1글자 이상 입력해주세요");
      return;
    }
    const imageToUpload = Image !== DefaultImg ? Image : ""; // 이미지가 기본 이미지와 다르면 이미지 사용, 아니면 빈 문자열
    onCreate(content, imageToUpload);
    setContent("");
    setImage(DefaultImg); // 이미지 초기화

    if (item.length > 0) {
      props.setDefaultListImg(item[0].imageSrc);
    }
  };

  // handleOnKeyPress함수 (input에 적용할 Enter 키 입력 함수)
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  return (
    <>
      {props.DetailItemsMenuData === null ? (
        <Loading />
      ) : (
        <div>
          <section className={styles["detail-title-container"]}>
            <div className={styles["detail-thumbnail-container"]}>
              <img src={item.length === 0 ? defaultDetailIcon : item[0].imageSrc} alt="썸네일 이미지" />
            </div>
            <span className={styles["detail-title"]}>{props.DetailItemsMenuData.place_name}</span>
            <div className={styles["detail-like-jjim-container"]}>
              <div className={styles["detail-jjim"]}>
                <span className={styles["detail-jjim-line"]}>|</span>
                <button type="button" onClick={handleClickJjim}>
                  <img src={imageSrcJjim} alt="찜 아이콘" style={{ position: "absolute", top: "1px" }} />
                </button>
                <span className={styles["detail-jjim-number"]}> {countJjim}</span>
              </div>
              <div className={styles["detail-like"]}>
                <span className={styles["detail-like-line"]}>|</span>
                <button type="button" onClick={handleClickLike}>
                  <img src={imageSrcLike} alt="좋아요 아이콘" style={{ position: "absolute", top: "-1px" }} />
                </button>
                <span className={styles["detail-like-number"]}> {countLike}</span>
              </div>
            </div>
          </section>
          <div className={styles["detail-inner-container"]}>
            <section className={styles["detail-address-container"]}>
              <div className={styles["detail-address-inner-container"]}>
                <img src={Address} alt="주소 아이콘" style={{ width: "20px", height: "25px", position: "absolute", top: "1px" }} />
                <span className={styles["detail-address-title"]}>주소</span>
              </div>
              <span className={styles["detail-address-info-street"]}>{props.DetailItemsMenuData.road_address_name}</span>
              <span className={styles["detail-address-info-number"]}>{props.DetailItemsMenuData.address_name}</span>
            </section>

            <section className={styles["detail-call-container"]}>
              <div className={styles["detail-call-inner-container"]}>
                <img src={Call} alt="전화 아이콘" style={{ width: "25px", height: "25px", position: "absolute", top: "1px" }} />
                <span className={styles["detail-call-title"]}>전화</span>
              </div>
              <span className={styles["detail-call"]}>{props.DetailItemsMenuData.phone}</span>
            </section>

            <section className={styles["detail-google-map-container"]}>
              <KakaoMap
                latitude={props.DetailItemsMenuData.y}
                longitude={props.DetailItemsMenuData.x}
                placeName={props.DetailItemsMenuData.place_name}
              />
            </section>

            <section className={styles["detail-mbti-stats-container"]}>
              <div className={styles["detail-mbti-stats-inner-container"]}>
                <img src={Graph} alt="통계 아이콘" style={{ width: "25px", height: "25px", position: "absolute", top: "1px" }} />
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
                    <span className={styles["detail-mbti-graph-alphabat"]}>N</span>
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
                <img src={ReviewIcon} alt="리뷰 아이콘" style={{ width: "25px", height: "25px", position: "absolute", top: "3px" }} />
                <span className={styles["detail-review-title"]}>리뷰 ({item.length})</span>

                <div className={styles["detail-review-box-container"]}>
                  <div className={styles["detail-review-input-box"]}>
                    <div className={styles["detail-review-input-box-change-img-box"]}>
                      <img src={Image} alt="리뷰 사진" className={styles["detail-review-input-change-img"]} />
                      <label className={styles["detail-review-input-change-img-add-img"]} htmlFor="input-file">
                        <span className={Image === DefaultImg ? styles["detail-review-input-change-img-add-img-icon"] : styles["detail-review-input-change-img-add-img-icon-setImg"]}>
                          블로그 이미지 찾아보기
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          id="input-file"
                          className={styles["detail-review-input-change-img-add-img-input"]}
                          onClick={() => {
                            fileInput.current.value = null;
                            fileInput.current.click();
                          }}
                          ref={fileInput}
                          onChange={onChange}
                        />
                      </label>
                      <button
                        type="button"
                        className={styles["detail-review-input-change-img-delete"]}
                        onClick={() => {
                          window.confirm("이미지를 삭제하겠습니까?") ? setImage(DefaultImg) : null;
                        }}
                      >
                        {Image === DefaultImg ? null : <img src={DeleteImg} alt="이미지 삭제" className={styles["detail-review-input-change-img-delete-img"]} />}
                      </button>
                    </div>

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
                      maxLength="39"
                      size="10"
                      placeholder="리뷰를 작성해주세요..."
                    ></input>
                    <button onClick={handleSubmit} className={styles["detail-review-input-button"]} src={Submit} type="submit">
                      <img className={styles["detail-review-input-button-img"]} src={Submit} alt="제출 이미지" style={{ width: "35px", height: "35px" }} />
                      <img className={styles["detail-review-input-button-img-hover"]} src={SubmitHover} alt="제출 hover 이미지" style={{ width: "35px", height: "35px" }} />
                    </button>
                  </div>

                  {item.map((review) => (
                    <Review key={review.id} {...review} />
                  ))}
                </div>
              </div>
            </section>

            <section className={styles["detail-more-container"]}>
              <div className={styles["detail-more-inner-container"]}>
                <img src={Magnifier} alt="더보기 아이콘" style={{ width: "25px", height: "25px", position: "absolute", top: "1px" }} />
                <span className={styles["detail-more-title"]}>더보기</span>
              </div>
              <a href={props.DetailItemsMenuData.place_url} className={styles["detail-more"]}>
                {props.DetailItemsMenuData.place_url}
              </a>
            </section>
          </div>
        </div>
      )}
    </>
  );
};