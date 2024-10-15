import { useState, useEffect } from "react";

const KAKAO_REST_API_KEY = "KakaoAK c8c68103031b80f0a572460361537e9f";

const useCurrentLocation = () => {
  const [location, setLocation] = useState("Loading...");
  const [coordinates, setCoordinates] = useState({ latitude: "", longitude: "" });
  const [locationAccessDenied, setLocationAccessDenied] = useState(false);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
        {
          headers: {
            Authorization: KAKAO_REST_API_KEY,
          },
        }
      );
      const data = await response.json();
      let address = "Address not found";
      if (data.documents.length > 0) {
        address = data.documents[0].road_address 
          ? data.documents[0].road_address.address_name 
          : data.documents[0].address.address_name;
      }
      return address;
    } catch (error) {
      console.error("주소를 가져오는 데 실패했습니다:", error.message);
      return "주소를 가져오는 데 실패했습니다.";
    }
  };

  const checkPermission = async () => {
    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      if (permission.state === 'denied') {
        setLocationAccessDenied(true);
        setLocation("현재 위치를 확인할 수 없습니다.");
        return false;
      }
      return true;
    } catch (error) {
      console.error("위치 권한 확인 실패:", error.message);
      return false;
    }
  };

  useEffect(() => {
    const initializeLocation = async () => {
      // const permissionGranted = await checkPermission();
      // if (!permissionGranted) return; 

      // 우선 로컬 스토리지에서 좌표를 가져온다.
      const savedCoordinates = JSON.parse(localStorage.getItem("savedCoordinates"));
      if (savedCoordinates) {
        const { latitude, longitude } = savedCoordinates;
        setCoordinates({ latitude, longitude });
        const address = await fetchAddress(latitude, longitude);
        setLocation(address);
      } else {
        // 로컬 스토리지에 좌표가 없는 경우 현재 위치를 가져온다.
        try {
          const position = await getCurrentPosition();
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
          const address = await fetchAddress(latitude, longitude);
          setLocation(address);
          localStorage.setItem("savedCoordinates", JSON.stringify({ latitude, longitude }));
        } catch (error) {
          console.error("현재 위치를 가져오는 데 실패했습니다:", error.message);
          setLocation("현재 위치를 확인할 수 없습니다.");
        }
      }
    };

    initializeLocation();
  }, []);

  return { location, coordinates, setCoordinates, setLocation, locationAccessDenied };
};

export default useCurrentLocation;
