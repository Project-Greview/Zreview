// MODULE
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useRecoilState } from "recoil";
// RECOIL STATE
import { dummyDateState } from "state/dummyState";
// COMPONENT
import HashTagSlide from "../HashTagSlide";

// PROPS TYPE
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
  const [dummyData, setDummyData] = useRecoilState(dummyDateState);

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

          // CLUSTER OPTION
          const clusterer = new window.kakao.maps.MarkerClusterer({
            map: map,
            averageCenter: true,
            minLevel: 5,
            calculator: [99, 999, 9999],
            disableClickZoom: true,
            styles: [
              {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "50px",
                paddingBottom: "22%",
                // background: `url(${NormalMarker}) no-repeat center center`,
                backgroundSize: "40px 50px",
                fontSize: "18px",
                fontWeight: 700,
                color: `let(--point-color)`,
              },
              {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "50px",
                height: "60px",
                paddingBottom: "26%",
                // background: `url(${NormalMarker}) no-repeat center center`,
                backgroundSize: "50px 60px",
                fontSize: "18px",
                fontWeight: 700,
                color: `let(--point-color)`,
              },
              {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "70px",
                height: "80px",
                paddingBottom: "26%",
                // background: `url(${NormalMarker}) no-repeat center center`,
                backgroundSize: "70px 80px",
                fontSize: "18px",
                fontWeight: 700,
                color: `let(--point-color)`,
              },
            ],
          });

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
          // map.setMinLevel(5);
          // map.setMaxLevel(8);
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
    getKakao();
  }, []);
  return (
    <>
      <HashTagSlide />
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
