import React, {useState, useRef, useEffect} from "react";
import { useNavigate } from "react-router-dom";
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
import {Review} from "../Review/Review";
import DeleteImg from "../../../assets/my-page/setting/profile-delete.png";
import DefaultImg from "../../../assets/detail/detail-default-background.png";
import defaultDetailIcon from "../../../assets/detail/defaultDetailIcon.png";
import {Loading} from "../../Loading/Loading";
import KakaoMap from "../../KaKaoMap/KaKaoMap";

export const DetailItemsMenu = (props) => {
  const [posts, setPosts] = useState([]); // 상태변화함수, 빈배열로 시작
  const [content, setContent] = useState(""); // 댓글 내용
  const dataId = useRef(0); // id 인덱스 추가-> 변수처럼 사용 필요 -> useRef 사용

  const navigate = useNavigate();

  // 로그인 여부 확인 함수
  const checkLoginAndProceed = () => {
    const accessToken = localStorage.getItem("accessToken");
  
    if (!accessToken) {
      // 사용자가 토큰이 없는 경우
      const confirmLogin = confirm("로그인 후 이용 가능한 서비스입니다. 로그인 페이지로 이동하시겠습니까?");
      if (confirmLogin) {
        navigate("/Login", { replace: true });
      }
      return false;
    }
  
    return true;
  };

  // 하트 버튼 (관심) 상태관리
  const [imageSrcJjim, setImageSrcJjim] = useState(Jjim); // 하트 이미지 토글
  const [isClikedJjim, setIsClickedJjim] = useState(false); // 하트 버튼 클릭 토글
  const [countJjim, setCountJjim] = useState(0); // 하트 카운트 값 관리

  // 따봉 버튼 (추천) 상태관리
  const [imageSrcLike, setImageSrcLike] = useState(Like); // 따봉 이미지 토글
  const [isClikedLike, setIsClickedLike] = useState(false); // 따봉 버튼 클릭 토글
  const [countLike, setCountLike] = useState(0); // 따봉 카운트 값 관리

  const [mbtiData, setMbtiData] = useState({
    ratioI: 0,
    ratioE: 0,
    ratioS: 0,
    ratioN: 0,
    ratioT: 0,
    ratioF: 0,
    ratioP: 0,
    ratioJ: 0,
  });

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

      // MBTI 데이터 설정
      setMbtiData({
        ratioI: props.DetailItemsMenuData.ratioI,
        ratioE: 1 - props.DetailItemsMenuData.ratioI,
        ratioS: props.DetailItemsMenuData.ratioS,
        ratioN: 1 - props.DetailItemsMenuData.ratioS,
        ratioT: props.DetailItemsMenuData.ratioT,
        ratioF: 1 - props.DetailItemsMenuData.ratioT,
        ratioP: props.DetailItemsMenuData.ratioP,
        ratioJ: 1 - props.DetailItemsMenuData.ratioP,
      });
    }
  }, [props.DetailItemsMenuData]); // props.DetailItemsMenuData가 변경될 때마다 실행

  // handleClickJjim 함수 (하트 버튼 (관심) - PUT+GET 요청, 이미지 변경, 카운트 업데이트)
  const handleClickJjim = async () => {
    if (!checkLoginAndProceed()) return;

    try {
      const response = await axios.put(
        `https://api.oneulmohae.co.kr/place/${props.place_name}`,
        {}, // 빈 객체를 본문으로 전달
        {
          headers: {
            placeId: props.placeId,
            Authorization: localStorage.getItem("accessToken"),
            LR: "true",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // PUT 요청이 성공한 후 GET 요청을 보내기
        const getResponse = await axios.get(`https://api.oneulmohae.co.kr/place/${props.place_name}`, {
          headers: {
            placeId: props.placeId,
          },
        });

        if (getResponse.status === 200) {
          const updatedData = getResponse.data;

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
          console.error("장소데이터를 가져오는데 실패하였습니다.");
        }
      } else {
        console.error("장소데이터를 가져오는데 실패하였습니다.");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // 403 에러인 경우 (GUEST일 때)
        alert("회원 추가 정보 입력이 필요합니다. 해당 페이지로 이동합니다.");
        navigate("/Signup", { replace: true });
      } else {
        console.error("장소데이터를 가져오는데 실패하였습니다:", error);
      }
    }
  };

  // handleClickLike 함수 (따봉 버튼 (추천) - PUT+GET 요청, 이미지 변경, 카운트 업데이트)
  const handleClickLike = async () => {
    if (!checkLoginAndProceed()) return;

    try {
      const response = await axios.put(
        `https://api.oneulmohae.co.kr/place/${props.place_name}`,
        {}, // 빈 객체를 본문으로 전달
        {
          headers: {
            placeId: props.placeId,
            Authorization: localStorage.getItem("accessToken"),
            LR: "false",
          },
          withCredentials: true,
        }
      );

      if (response.data !== "No review. Write review first before recommend.") {
        // PUT 요청이 성공한 후 GET 요청을 보내기
        const getResponse = await axios.get(`https://api.oneulmohae.co.kr/place/${props.place_name}`, {
          headers: {
            placeId: props.placeId,
          },
        });

        if (getResponse.status === 200) {
          const updatedData = getResponse.data;

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
          console.error("장소데이터를 가져오는데 실패하였습니다.");
        }
      } else {
        alert("리뷰를 먼저 작성하여야 추천 버튼을 누를 수 있습니다.");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // 403 에러인 경우 (GUEST일 때)
        alert("회원 추가 정보 입력이 필요합니다. 해당 페이지로 이동합니다.");
        navigate("/Signup", { replace: true });
      } else {
        console.error("장소데이터를 가져오는데 실패하였습니다:", error);
      }
    }
  };

  // 리뷰 사진 제출
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

  // 리뷰 데이터
  const [reviewId, setReviewId] = useState("");

  // 리뷰 작성
  const postReview = async (content, imageFile) => {
    if (!checkLoginAndProceed()) return;

    const formData = new FormData();
    formData.append("placeId", props.placeId);
    formData.append("content", content);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post("https://api.oneulmohae.co.kr/review/write", formData, {
        headers: {
          Authorization: localStorage.getItem("accessToken"),
          "Content-Type": "multipart/form-data",
        },
      });

      const newPost = response.data;
      setReviewId(newPost.reviewId); // 새로 생성된 리뷰의 ID를 reviewId로 설정

      // 새로운 리뷰를 posts 상태에 추가
      setPosts((prevPosts) => [newPost, ...prevPosts]);

      // 새로운 이미지 이름을 getImgNames 상태에 추가
      if (newPost.imageName) {
        setGetImgNames((prevImgNames) => [newPost.imageName, ...prevImgNames]);
      }

      setContent(""); // 댓글 초기화
      setImage(DefaultImg); // 이미지 초기화
      setFile(""); // 파일 초기화
      fileInput.current.value = null; // 파일 인풋 초기화
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // 403 에러인 경우 (GUEST일 때)
        alert("회원 추가 정보 입력이 필요합니다. 해당 페이지로 이동합니다.");
        navigate("/Signup", { replace: true });
      } else {
        console.error("장소데이터를 가져오는데 실패하였습니다:", error);
      }
    }
  };

  const reviewPlaceId = props.placeId;

  //리뷰 불러오기
  const fetchData = async (reviewPlaceId) => {
    try {
      const response = await axios.get(`https://api.oneulmohae.co.kr/review/${reviewPlaceId}?page=1&size=10`);

      const fetchedPosts = response.data.data;
      setPosts(fetchedPosts); // 불러온 리뷰들을 상태에 저장

      // imageName이 null이 아닌 값들만 추출하여 설정
      const imageNames = fetchedPosts.map((post) => post.imageName).filter((imageName) => imageName !== null);
      if (imageNames.length > 0) {
        setGetImgNames(imageNames); // imageNames 배열 설정
      } else {
        setGetImgNames([]); // imageNames가 없을 경우 빈 배열로 설정
      }
    } catch (error) {
      console.error("리뷰를 가져오는데 실패하였습니다:", error);
    }
  };
  useEffect(() => {
    if (reviewPlaceId) {
      fetchData(reviewPlaceId);
    }
  }, [reviewPlaceId]);

  const [getImgNames, setGetImgNames] = useState([]);
  const [fetchImgFile, setFetchImgFile] = useState([]);

  // 리뷰 이미지 불러오기
  const fetchImgs = async (imageNames) => {
    try {
      const fetchImagePromises = imageNames.map(async (imageName) => {
        const response = await axios.get(`https://api.oneulmohae.co.kr/image/${encodeURIComponent(imageName)}`, {responseType: "blob"});
        const fetchedImage = response.data;
        const fetchedImageURL = URL.createObjectURL(fetchedImage);

        return {imageName, fetchedImageURL};
      });

      const fetchedImages = await Promise.all(fetchImagePromises);

      // posts 상태 업데이트
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          const matchedImage = fetchedImages.find((image) => image.imageName === post.imageName);
          if (matchedImage) {
            return {...post, fetchImgFile: matchedImage.fetchedImageURL};
          }
          return post;
        })
      );
    } catch (error) {
      console.error("이미지를 가져오는데 실패하였습니다:", error);
    }
  };

  useEffect(() => {
    if (getImgNames.length > 0) {
      fetchImgs(getImgNames);
    }
  }, [getImgNames]);

  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.length < 1) {
      alert("리뷰는 최소 1글자 이상 입력해주세요");
      return;
    }
    const imageFile = fileInput.current.files[0];
    postReview(content, imageFile);
  };

  // 첫 번째로 이미지가 포함된 리뷰를 찾는 함수
  const findFirstReviewWithImage = (posts) => {
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].fetchImgFile) {
        return posts[i].fetchImgFile;
      }
    }
    return defaultDetailIcon;
  };

  const firstImage = findFirstReviewWithImage(posts);

  const calculateBarWidth = (ratio) => `${ratio * 100}%`;

  return (
    <>
      {props.DetailItemsMenuData === null ? (
        <Loading />
      ) : (
        <div>
          <section className={styles["detail-title-container"]}>
            <div className={styles["detail-thumbnail-container"]}>
              <img src={firstImage} alt="썸네일 이미지" />
            </div>
            <span className={styles["detail-title"]}>{props.DetailItemsMenuData.place_name}</span>
            <div className={styles["detail-like-jjim-container"]}>
              <div className={styles["detail-jjim"]}>
                <span className={styles["detail-jjim-line"]}>|</span>
                <button type="button" onClick={handleClickJjim}>
                  <img src={imageSrcJjim} alt="찜 아이콘" style={{position: "absolute", top: "1px"}} />
                </button>
                <span className={styles["detail-jjim-number"]}> {countJjim}</span>
              </div>
              <div className={styles["detail-like"]}>
                <span className={styles["detail-like-line"]}>|</span>
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
              <span className={styles["detail-address-info-street"]}>{props.DetailItemsMenuData.road_address_name}</span>
              <span className={styles["detail-address-info-number"]}>{props.DetailItemsMenuData.address_name}</span>
            </section>

            <section className={styles["detail-call-container"]}>
              <div className={styles["detail-call-inner-container"]}>
                <img src={Call} alt="전화 아이콘" style={{width: "25px", height: "25px", position: "absolute", top: "1px"}} />
                <span className={styles["detail-call-title"]}>전화</span>
              </div>
              <span className={styles["detail-call"]}>{props.DetailItemsMenuData.phone ? props.DetailItemsMenuData.phone : "전화번호 미제공"}</span>
            </section>

            <section className={styles["detail-google-map-container"]}>
              <KakaoMap latitude={props.DetailItemsMenuData.y} longitude={props.DetailItemsMenuData.x} placeName={props.DetailItemsMenuData.place_name} />
            </section>

            <section className={styles["detail-mbti-stats-container"]}>
              <div className={styles["detail-mbti-stats-inner-container"]}>
                <img src={Graph} alt="통계 아이콘" style={{width: "25px", height: "25px", position: "absolute", top: "1px"}} />
                <span className={styles["detail-mbti-stats-title"]}>MBTI별  <img src={Like} alt="통계 추천 아이콘" /> 통계 </span>
               
              </div>
              <div className={styles["detail-mbti-graph-container"]}>
                {/* 내향/외향 */}
                <div className={styles["detail-mbti-graph-inner-container"]}>
                  <div className={styles["detail-mbti-graph-alphabat-box"]}>
                    <span className={styles["detail-mbti-graph-alphabat"]}>I</span>
                    <span className={styles["detail-mbti-graph-text"]}>내향</span>
                  </div>
                  <div className={styles["detail-mbti-graph-EI-bar"]}>
                    <div className={styles["detail-mbti-graph-EI-bar-percent"]} style={{width: calculateBarWidth(mbtiData.ratioI)}}>
                     
                    </div>
                    <span className={styles["detail-mbti-graph-percent-text-left"]}>{(isNaN(mbtiData.ratioI) ? 0 : mbtiData.ratioI * 100).toFixed(0)}%</span>
                    <div className={styles["detail-mbti-graph-EI-bar-percent-reverse"]} style={{width: calculateBarWidth(mbtiData.ratioE)}}>
                      
                    </div>
                    <span className={styles["detail-mbti-graph-percent-text-right"]}>{(isNaN(mbtiData.ratioE) ? 0 : mbtiData.ratioE * 100).toFixed(0)}%</span>
                  </div>
                  <div className={styles["detail-mbti-graph-alphabat-box"]}>
                    <span className={styles["detail-mbti-graph-alphabat"]}>E</span>
                    <span className={styles["detail-mbti-graph-text"]}>외향</span>
                  </div>
                </div>
                {/* 현실/직관 */}
                <div className={styles["detail-mbti-graph-inner-container"]}>
                  <div className={styles["detail-mbti-graph-alphabat-box"]}>
                    <span className={styles["detail-mbti-graph-alphabat"]}>S</span>
                    <span className={styles["detail-mbti-graph-text"]}>현실</span>
                  </div>
                  <div className={styles["detail-mbti-graph-SN-bar"]}>
                    <div className={styles["detail-mbti-graph-SN-bar-percent"]} style={{width: calculateBarWidth(mbtiData.ratioS)}}>
                      
                    </div><span className={styles["detail-mbti-graph-percent-text-left"]}>{(isNaN(mbtiData.ratioS) ? 0 : mbtiData.ratioS * 100).toFixed(0)}%</span>

                    <div className={styles["detail-mbti-graph-SN-bar-percent-reverse"]} style={{width: calculateBarWidth(mbtiData.ratioN)}}>
                    
                    </div>
                    <span className={styles["detail-mbti-graph-percent-text-right"]}>{(isNaN(mbtiData.ratioN) ? 0 : mbtiData.ratioN * 100).toFixed(0)}%</span>
                  </div>
                  <div className={styles["detail-mbti-graph-alphabat-box"]}>
                    <span className={styles["detail-mbti-graph-alphabat"]}>N</span>
                    <span className={styles["detail-mbti-graph-text"]}>직관</span>
                  </div>
                </div>
                {/* 사고/감정 */}
                <div className={styles["detail-mbti-graph-inner-container"]}>
                  <div className={styles["detail-mbti-graph-alphabat-box"]}>
                    <span className={styles["detail-mbti-graph-alphabat"]}>T</span>
                    <span className={styles["detail-mbti-graph-text"]}>사고</span>
                  </div>
                  <div className={styles["detail-mbti-graph-TF-bar"]}>
                    <div className={styles["detail-mbti-graph-TF-bar-percent"]} style={{width: calculateBarWidth(mbtiData.ratioT)}}>
                      
                    </div>
                    <span className={styles["detail-mbti-graph-percent-text-left"]}>{(isNaN(mbtiData.ratioT) ? 0 : mbtiData.ratioT * 100).toFixed(0)}%</span>
                    <div className={styles["detail-mbti-graph-TF-bar-percent-reverse"]} style={{width: calculateBarWidth(mbtiData.ratioF)}}>
                    
                    </div>
                    <span className={styles["detail-mbti-graph-percent-text-right"]}>{(isNaN(mbtiData.ratioF) ? 0 : mbtiData.ratioF * 100).toFixed(0)}%</span>
                  </div>
                  <div className={styles["detail-mbti-graph-alphabat-box"]}>
                    <span className={styles["detail-mbti-graph-alphabat"]}>F</span>
                    <span className={styles["detail-mbti-graph-text"]}>감정</span>
                  </div>
                </div>
                {/* 탐색/계획 */}
                <div className={styles["detail-mbti-graph-inner-container"]}>
                  <div className={styles["detail-mbti-graph-alphabat-box"]}>
                    <span className={styles["detail-mbti-graph-alphabat"]}>P</span>
                    <span className={styles["detail-mbti-graph-text"]}>탐색</span>
                  </div>
                  <div className={styles["detail-mbti-graph-PJ-bar"]}>
                    <div className={styles["detail-mbti-graph-PJ-bar-percent"]} style={{width: calculateBarWidth(mbtiData.ratioP)}}>
                      
                    </div>
                    <span className={styles["detail-mbti-graph-percent-text-left"]}>{(isNaN(mbtiData.ratioP) ? 0 : mbtiData.ratioP * 100).toFixed(0) }%</span>
                    <div className={styles["detail-mbti-graph-PJ-bar-percent-reverse"]} style={{width: calculateBarWidth(mbtiData.ratioJ)}}>
                    </div>
                    <span className={styles["detail-mbti-graph-percent-text-right"]}>{(isNaN(mbtiData.ratioJ) ? 0 : mbtiData.ratioJ * 100).toFixed(0)}%</span>
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
                <span className={styles["detail-review-title"]}>리뷰 ({posts.length})</span>

                <div className={styles["detail-review-box-container"]}>
                  <form className={styles["detail-review-input-box"]} onSubmit={handleSubmit}>
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
                    />
                    <button className={styles["detail-review-input-button"]} src={Submit} type="submit">
                      <img className={styles["detail-review-input-button-img"]} src={Submit} alt="제출 이미지" style={{width: "35px", height: "35px"}} />
                      <img className={styles["detail-review-input-button-img-hover"]} src={SubmitHover} alt="제출 hover 이미지" style={{width: "35px", height: "35px"}} />
                    </button>
                  </form>

                  {posts.map((review) => (
                    <Review key={review.reviewId} {...review} />
                  ))}
                </div>
              </div>
            </section>

            <section className={styles["detail-more-container"]}>
              <div className={styles["detail-more-inner-container"]}>
                <img src={Magnifier} alt="더보기 아이콘" style={{width: "25px", height: "25px", position: "absolute", top: "1px"}} />
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
