import React, { useState } from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

export const NaverMapAPI = (props) => {
  return (
    // 검색을 하고싶은 경우 submodules 로써 geocoder를 꼭 추가해줘야한다.
    <RenderAfterNavermapsLoaded
      ncpClientId={process.env.REACT_APP_API_Client_ID}
      submodules={["geocoder"]}
    >
      <NaverMap
        mapDivId={"maps-getting-started-uncontrolled"}
        style={{ width: "100%", height: "100%" }}
        center={{ lat: props.Latitude, lng: props.Longtitude }}
        defaultZoom={12}
        zoom={props.zoom}
        minZoom={12}
        enableWheelZoom={false}
      >
        {props.zoom == 15 && (
          <Marker
            position={{ lat: props.Latitude, lng: props.Longtitude }}
            title={props.roadAddress}
            clickable={true}
          />
        )}
      </NaverMap>
    </RenderAfterNavermapsLoaded>
  );
};

export default NaverMapAPI;