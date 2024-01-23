import React, { useState, useEffect } from "react";
// import "../static/home.css";
import NaverMapAPI from "./NaverMapApi";

const Map = () => {
  const { naver } = window;
  
  // 주소 검색 함수에 넘겨줄 address 상태 관리
  const [address, setAddress] = useState("");
  const [roadAddress, setRoadAddress] = useState(null);

// 변경 가능성이 있는 경도, 위도, zoom을 useState hook을 이용하여 상태 관리 한다.
  const [lat, setLat] = useState(37.54);
  const [lng, setLng] = useState(126.99);
  const [zoom, setZoom] = useState(12);

//주소 검색 시, 주소창의 change event를 감지한다.
  const handleChange = (e) => {
    const { address, value } = e.target;
    const newAddress = { address: value };
    setAddress(newAddress);
  };

//주소 타이핑 후 검색 버튼을 누르면 동작하는 함수
  function searchAddressToCoordinate(address) {
    //geocode에 입력받은 address를 query로써 전달
    naver.maps.Service.geocode( 
      {
        query: address,
      },
      function (status, response) {
        // 문제 발생할 경우
        if (status !== naver.maps.Service.Status.OK)
          return alert("Something wrong!");

        // 제대로 된 query가 들어가 response가 return되는 경우
        var result = response.v2, // 검색 결과의 컨테이너
          items = result.addresses; // 검색 결과의 배열

        let x = parseFloat(items[0].x); // 경도
        let y = parseFloat(items[0].y); // 위도

        setLat(y); //위도 상태 변경
        setLng(x); //경도 상태 변경
        setZoom(15); //주소 검색 후 화면 zoom되도록 zoom level 15로 변경
        setRoadAddress(items[0].roadAddress); //도로명 주소
      }
    );
  }

  //jsx
  return ( 
    <>
      <div className="map-loader">
        <div className="map" style={{ width: "100%", height: "100%" }}>
        //NaverMapAPI 컴포넌트에 zoom 레벨, 경도, 위도, 를 전달한다.
          <NaverMapAPI
            zoom={zoom}
            Latitude={lat}
            Longtitude={lng}
            roadAddress={roadAddress}
          />
        </div>
        <div className="search-container">
          <form>
            <input
              className="findAddress"
              placeholder="주소로 검색"
              onChange={handleChange}
            />
            //검색 button에 click event 발생 시 searchAddressToCoordinate함수 호출
            <button
              className="submitAddress-button"
              type="submit"
              onClick={() => searchAddressToCoordinate(address.address)}
            >
              🔎
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Map;