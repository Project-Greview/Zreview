// MODULE
import { useState, useEffect, useRef } from "react";
// IMAGE
import MyMarkerIcon from "../../assets/image/icon/my_marker.svg";
const KakaoMap = () => {
  const kakaoMaps = useRef(null);
  const [map, setMap] = useState(null);

  const getKakao = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const mapContainer = document.getElementById("map");
        if (!map) {
          const mapOptions = {
            center: new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            ),
            level: 4,
          };
          const map = new window.kakao.maps.Map(mapContainer, mapOptions);
          const myPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          const myMarker = MyMarkerIcon,
            myMarkerSize = new window.kakao.maps.Size(20, 20),
            myMarkerOption = { offset: new window.kakao.maps.Point(0, 0) };
          const myMarkerPosition = new window.kakao.maps.MarkerImage(
            myMarker,
            myMarkerSize,
            myMarkerOption
          );
          const marker = new window.kakao.maps.Marker({
            map: map,
            image: myMarkerPosition,
            position: myPosition,
          });
          setMap(map);
        }
      });
    } else {
      console.log("내 위치를 사용할 수 없어요.");
    }
  };
  useEffect(() => {
    getKakao();
  }, []);
  return (
    <div
      id="map"
      ref={kakaoMaps}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};

export default KakaoMap;
