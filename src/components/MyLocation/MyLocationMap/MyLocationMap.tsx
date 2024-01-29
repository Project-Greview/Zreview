// MODULE
import { useState, useRef, useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";
// RECOIL STATE
import { dummyDateState } from "state/dummyState";
// SVG
// import { ReactComponent as MapMarkerIcon } from "../../../assets/image/icon/map_marker.svg";
import MapMarkerIcon from "../../../assets/image/icon/map_marker.svg";
// PROPS TYPE
declare global {
  interface Window {
    kakao: any;
  }
}

const MyLocationMap: React.FC = () => {
  const myKakaoMaps = useRef(null);
  const dummyData = useRecoilValue(dummyDateState);
  const [map, setMap] = useState(null);
  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);

  console.log("dummyData", dummyData);
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
                background: `url(${MapMarkerIcon}) no-repeat center center`,
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
                background: `url(${MapMarkerIcon}) no-repeat center center`,
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
                background: `url(${MapMarkerIcon}) no-repeat center center`,
                backgroundSize: "70px 80px",
                fontSize: "18px",
                fontWeight: 700,
                color: `let(--point-color)`,
              },
            ],
          });
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
