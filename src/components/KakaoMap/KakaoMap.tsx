// MODULE
import { useRef, useState, useEffect, useLayoutEffect } from "react";
// COMPONENT
import HashTag from "../HashTag";

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap: React.FC = () => {
  const kakaoMaps = useRef(null);
  const [map, setMap] = useState(null);
  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);

  const getKakao = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserLat(position.coords.latitude);
        setUserLng(position.coords.longitude);
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
          // CURRENT MARKER

          // USER RANGE CIRCLE
          const circle = new window.kakao.maps.Circle({
            center: new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            ),
            radius: 1000,
            strokeWeight: 2,
            strokeColor: "#6556FF",
            strokeOpacity: 0.2,
            strokeStyle: "solid",
            fillColor: "#6556FF",
            fillOpacity: 0.05,
          });
          map.setMinLevel(5);
          map.setMaxLevel(8);
          circle.setMap(map);
          map.setDraggable(false);
          setMap(map);
        }
      });
    } else {
      console.log("내위치 사용 불가");
    }
  };

  useLayoutEffect(() => {
    console.log("useLayoutEffect");
    getKakao();
  }, []);
  return (
    <>
      <HashTag />
      <div
        id="map"
        ref={kakaoMaps}
        style={{
          width: "100%",
          height: `calc(100vh - 11rem)`,
          marginTop: 50,
        }}
      ></div>
    </>
  );
};

export default KakaoMap;
