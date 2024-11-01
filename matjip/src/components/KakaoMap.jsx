import {useEffect} from "react";

const {kakao} = window;

function KakaoMap(){
  useEffect(()=>{
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);
  },[]) //지도를 가지고 있는 컴포넌트가 처음 렌더링 될 때 지도 띄우기

  return(
    <div id="map"style={{
      width: '500px',
      height: '500px'
    }}></div>
  )
}

export default KakaoMap;