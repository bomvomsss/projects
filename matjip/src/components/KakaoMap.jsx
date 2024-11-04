import {useEffect, useState} from "react";


function KakaoMap() {
  
  useEffect(() => {
    // Kakao Maps API가 로드되었는지 확인하고, 로드되지 않았으면 스크립트를 동적으로 추가
    if (!window.kakao) {
      const script = document.createElement("script");
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY&autoload=false`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.kakao.maps.load(() => {
          const container = document.getElementById("map");
          const options = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
          };
          new window.kakao.maps.Map(container, options);
        });
      };
    } else {
      // 만약 kakao 객체가 이미 로드되어 있다면 바로 지도 생성
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
        new window.kakao.maps.Map(container, options);
      });
    }
  }, []); // 컴포넌트가 처음 렌더링될 때 지도 띄우기
  
  return (
    <div
      id="map"
      // ref={mapContainer}
      style={{
        width: "100%",
        height: "500px",
      }}
    ></div>
  );
}

export default KakaoMap;