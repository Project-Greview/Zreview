// MODULE
import { useState, useRef, useLayoutEffect } from "react";
// PROPS TYPE
declare global {
  interface Window {
    kakao: any;
  }
}

const MyLocationMap: React.FC = () => {
  const myKakaoMaps = useRef(null);
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
            level: 3,
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
    <div
      id="map"
      ref={myKakaoMaps}
      style={{
        width: `100%`,
        height: `25vh`,
        borderRadius: 10,
        marginTop: 15,
      }}
    ></div>
  );
};

export default MyLocationMap;
