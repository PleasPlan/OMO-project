import { useEffect, useRef } from "react";

const KakaoMap = ({ latitude, longitude, placeName }) => {
  const mapContainer = useRef(null); // 지도를 표시할 div의 ref

  useEffect(() => {
    // 카카오맵 스크립트 로드
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=36a2e85facafe4523773ac62c9e870a8&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapCenter = new window.kakao.maps.LatLng(latitude, longitude); // 지도의 중심 좌표

        const mapOption = {
          center: mapCenter, // 지도의 중심 좌표
          level: 3, // 지도 확대 레벨
          draggable: true, // 지도 이동 가능
          scrollwheel: false, // 마우스 휠 확대/축소 비활성화
        };

        const map = new window.kakao.maps.Map(mapContainer.current, mapOption); // 지도 생성

        const mapTypeControl = new window.kakao.maps.MapTypeControl(); // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤 생성
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT); // window.kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미

        const zoomControl = new window.kakao.maps.ZoomControl(); // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        const marker = new window.kakao.maps.Marker({ position: mapCenter }); // 마커 생성
        marker.setMap(map); // 마커가 지도 위에 표시되도록 설정

        const iwContent = `<div style="padding:5px;">${placeName}<br><a href="https://map.kakao.com/link/map/${placeName},${latitude},${longitude}" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/${placeName},${latitude},${longitude}" style="color:blue" target="_blank">길찾기</a></div>`;
        const infowindow = new window.kakao.maps.InfoWindow({ content: iwContent });
        infowindow.open(map, marker); // 마커 위에 인포윈도우를 표시
      });
    };

    return () => script.remove();
  }, [latitude, longitude, placeName]);

  return <div ref={mapContainer} style={{ width: "100%", height: "500px" }}></div>;
};

export default KakaoMap;
