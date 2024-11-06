import {useEffect} from "react";

const {kakao} = window;
function MapKakao(props) {

  useEffect(() => {
    var infowindow = new kakao.maps.InfoWindow({zIndex:1});
    
    const container = document.getElementById('map');
    const options = { 
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3 
    };
    const map = new kakao.maps.Map(container, options);
    var ps = new kakao.maps.services.Places(); // 검색 객체
    ps.keywordSearch(`${props.searchKeyword}`, placesSearchCB);

    function placesSearchCB(data, status, pagination){
      if (status === kakao.maps.services.Status.OK){
        var bounds = new kakao.maps.LatLngBounds();

        for (var i=0; i<data.length; i++) {
            displayMarker(data[i]);    
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }       

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    }
    
    const displayMarker = (place) => {
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });
      // 마커에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(marker, 'click', function() {
      // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      infowindow.open(map, marker);
});
    };

  },[])

  return(
    <div id="map" style={{
      width:'460px',
      height:'460px',
    }}>

    </div>
  )
}

export default MapKakao;