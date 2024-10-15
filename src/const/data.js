// import Ramen1 from "../assets/list/ramen-img1.jpg"
// import Ramen2 from "../assets/list/ramen-img2.jpg";
// import Map from "../assets/detail/google-map.png";
// import Thumbnail from "../assets/detail/thumbnail.png";
import Downarrow from "../assets/my-course/write/down-arrow.png";

import Cheol1 from "../assets/list/cheol-img1.jpg";
import Cheol2 from "../assets/list/cheol-img2.jpg";
import Cheol3 from "../assets/list/cheol-img3.jpg";
import CheolMap from "../assets/list/cheol-map.jpg";

import Deli1 from "../assets/list/deli-img1.jpg";
import Deli2 from "../assets/list/deli-img2.jpg";
import Deli3 from "../assets/list/deli-img3.jpg";
import DeliMap from "../assets/list/deli-map.jpg";

import Hek1 from "../assets/list/hek-img1.jpg";
import Hek2 from "../assets/list/hek-img2.jpg";
import Hek3 from "../assets/list/hek-img3.jpg";
import HekMap from "../assets/list/hek-map.jpg";

import Hon1 from "../assets/list/hon-img1.jpg";
import Hon2 from "../assets/list/hon-img2.jpg";
import Hon3 from "../assets/list/hon-img3.jpg";
import HonMap from "../assets/list/hon-map.jpg";

import Mog1 from "../assets/list/mog-img1.jpg";
import Mog2 from "../assets/list/mog-img2.jpg";
import Mog3 from "../assets/list/mog-img3.jpg";
import MogMap from "../assets/list/mog-map.jpg";

import Pizza1 from "../assets/list/pizza-img1.jpg";
import Pizza2 from "../assets/list/pizza-img2.jpg";
import Pizza3 from "../assets/list/pizza-img3.jpg";
import PizzaMap from "../assets/list/pizza-map.jpg";

import Yukji1 from "../assets/list/yukji-img1.jpg";
import Yukji2 from "../assets/list/yukji-img2.jpg";
import Yukji3 from "../assets/list/yukji-img3.jpg";
import YukjiMap from "../assets/list/yukji-map.jpg";

import Yuni1 from "../assets/list/yuni-img1.jpg";
import Yuni2 from "../assets/list/yuni-img2.jpg";
import Yuni3 from "../assets/list/yuni-img3.jpg";
import YuniMap from "../assets/list/yuni-map.jpg";




export const data = [
  {
    id: 1,
    title: "육지",
    like: "999+",
    jjim: "999+",
    intro: "고기와 계란찜이 맛있는 집",
    addressBrief: "서울특별시 마포구 서교동",
    addressStreet: "서울 특별시 마포구 독막로3길 34",
    addressNumber: "서울특별시 마포구 서교동 396-45",
    time: "12:00~22:00",
    runTime: "영업 중",
    holiday: "없음",
    menu: [
      {id: 1, title: "돈대갈비 160g", price: 18000},
      {id: 2, title: "이불갈비 180g", price: 16000},
      {id: 3, title: "삼겹살 160g", price: 16000},
      {id: 4, title: "목살 160g", price: 16000},
    ],
    tariff: [{id: 1, title: "입장료", price: 16000}],
    call: "0507-1379-3905",
    googleMap: YukjiMap,
    src1: Yukji1,
    src2: Yukji2,
    src3: Yukji3,
    thumbnail: Yukji1,
    downarrow: Downarrow,
  },

  {
    id: 2,
    title: "유니의 우아한 식탁",
    like: "999+",
    jjim: "999+",
    intro: "양식이 기깔나는 집",
    addressBrief: "서울특별시 마포구 연남동",
    addressStreet: "서울특별시 마포구 동교로 38길 27-8",
    addressNumber: "서울특별시 마포구 연남동 390-32",
    time: "11:30~21:00",
    runTime: "영업 준비 중",
    holiday: "없음",
    menu: [
      {id: 1, title: "눈꽃 치즈 파스타", price: 17000},
      {id: 2, title: "찹스테이크 토마토 리조또", price: 18000},
      {id: 3, title: "새우 칠리 토마토 파스타", price: 17000},
      {id: 4, title: "고르곤졸라 피자", price: 17000},
    ],
    call: "032-281-7197",
    googleMap: YuniMap,
    src1: Yuni1,
    src2: Yuni2,
    src3: Yuni3,
    downarrow: Downarrow,
    thumbnail: Yuni1,
  },

  {
    id: 3,
    title: "혼가츠",
    like: "89",
    jjim: "67",
    intro: "바삭한 돈까스가 있는 집",
    addressBrief: "서울특별시 마포구 서교동",
    addressStreet: "서울 마포구 와우산로21길 36-6",
    addressNumber: "서울특별시 마포구 서교동 358-49",
    time: "11:00~22:00",
    runTime: "영업 중",
    holiday: "없음",
    menu: [
      {id: 1, title: "치즈돈까스", price: 11000},
      {id: 2, title: "왕돈까스", price: 11000},
      {id: 3, title: "냉모밀&돈까스세트", price: 11000},
      {id: 4, title: "냉모밀", price: 8000},
    ],
    call: "02-322-8850",
    googleMap: HonMap,
    src1: Hon1,
    src2: Hon2,
    src3: Hon3,
    downarrow: Downarrow,
    thumbnail: Hon1,
  },

  {
    id: 4,
    title: "몽주막",
    like: "142",
    jjim: "99",
    intro: "탕이 땡긴다면 몽주막으로",
    addressBrief: "서울 마포구 서교동",
    addressStreet: "서울 마포구 독막로9길 12",
    addressNumber: "서울 마포구 서교동 402-10",
    time: "16:00~01:00",
    runTime: "영업 준비 중",
    holiday: "없음",
    menu: [
      {id: 1, title: "몽도리탕", price: 38000},
      {id: 2, title: "떡도리탕", price: 29000},
      {id: 3, title: "곱도리탕", price: 32000},
      {id: 4, title: "우삼겹김치찜", price: 29000},
    ],
    call: "0507-1353-3844",
    googleMap: MogMap,
    src1: Mog1,
    src2: Mog2,
    src3: Mog3,
    downarrow: Downarrow,
    thumbnail: Mog1,
  },

  {
    id: 5,
    title: "철인7호 치킨",
    like: "142",
    jjim: "99",
    intro: "치킨계의 유망주 철인치킨",
    addressBrief: "서울 마포구 서교동",
    addressStreet: "서울 마포구 양화로6길 99-3",
    addressNumber: "서울 마포구 서교동 402-4",
    time: "16:00~02:50",
    runTime: "영업 중",
    holiday: "없음",
    menu: [
      {id: 1, title: "달콤양념치킨", price: 17900},
      {id: 2, title: "매운간장치킨", price: 17900},
      {id: 3, title: "매떡치킨", price: 18900},
      {id: 4, title: "후라이드치킨", price: 16900},
    ],
    call: "0507-1373-7175",
    googleMap: CheolMap,
    src1: Cheol1,
    src2: Cheol2,
    src3: Cheol3,
    downarrow: Downarrow,
    thumbnail: Cheol1,
  },

  {
    id: 6,
    title: "핵밥",
    like: "142",
    jjim: "99",
    intro: "양식이 기깔나는 집",
    addressBrief: "서울 마포구 서교동",
    addressStreet: "서울 마포구 잔다리로6길 40-6",
    addressNumber: "서울 마포구 서교동 366-13",
    time: "11:30~22:00",
    runTime: "영업 중",
    holiday: "없음",
    menu: [
      {id: 1, title: "큐브스테이크덮밥", price: 12900},
      {id: 2, title: "카라이라멘", price: 10500},
      {id: 3, title: "마제소바", price: 9900},
      {id: 4, title: "경양식왕돈까스", price: 10500},
    ],
    call: "0507-1311-3252",
    googleMap: HekMap,
    src1: Hek1,
    src2: Hek2,
    src3: Hek3,
    downarrow: Downarrow,
    thumbnail: Hek1,
  },

  {
    id: 7,
    title: "피자네버슬립스",
    like: "142",
    jjim: "99",
    intro: "바삭한 돈까스가 있는 집",
    addressBrief: "서울 마포구 서교동",
    addressStreet: "서울 마포구 양화로6길 73",
    addressNumber: "서울 마포구 서교동 400-13",
    time: "12:00~24:00",
    runTime: "영업 중",
    holiday: "없음",
    menu: [
      {id: 1, title: "미나리 고추장 삼겹 피자", price: 28500},
      {id: 2, title: "콘브라운 피자", price: 28000},
      {id: 3, title: "더블 페퍼로니 피자", price: 25500},
      {id: 4, title: "치킨 네버슬립스 피자", price: 28500},
    ],
    call: "0507-1414-1820",
    googleMap: PizzaMap,
    src1: Pizza1,
    src2: Pizza2,
    src3: Pizza3,
    downarrow: Downarrow,
    thumbnail: Pizza1,
  },

  {
    id: 8,
    title: "델리인디아",
    like: "142",
    jjim: "99",
    intro: "고기와 계란찜이 맛있는 집",
    addressBrief: "서울 마포구 서교동",
    addressStreet: "서울 마포구 독막로9길 8 2층",
    addressNumber: "서울 마포구 서교동 402-6",
    time: "11:00~22:30",
    runTime: "영업 준비 중",
    holiday: "없음",
    menu: [
      {id: 1, title: "델리인디아 A세트", price: 27000},
      {id: 2, title: "델리인디아 B세트", price: 17000},
      {id: 3, title: "버터치킨", price: 12900},
      {id: 4, title: "탄두리치킨", price: 19000},
    ],
    call: "0507-1404-2109",
    googleMap: DeliMap,
    src1: Deli1,
    src2: Deli2,
    src3: Deli3,
    thumbnail: Deli1,
  },
];
