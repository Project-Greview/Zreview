// MODULE
import { useState, useRef, useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";
// RECOIL STATE
import { dummyDateState } from "state/dummyState";
// SVG
// import { ReactComponent as MapMarkerIcon } from "../../../assets/image/icon/map_marker.svg";
import MapMarkerIcon from "../../../assets/image/icon/map_marker.svg";
import MyMarkerIcon from "../../../assets/image/icon/my_marker.svg";
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

  const getKakao = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserLat(position.coords.latitude);
        setUserLng(position.coords.longitude);
        let locPosition = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        const mapContainer = document.getElementById("map");
        if (!map) {
          const mapOptions = {
            center: new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            ),
            level: 5,
          };

          const map = new window.kakao.maps.Map(mapContainer, mapOptions);
          // CURRENT USER MARKER
          let imageSrc = MyMarkerIcon,
            imageSize = new window.kakao.maps.Size(20, 20),
            imageOption = { offset: new window.kakao.maps.Point(20, 20) };
          let markerImage = new window.kakao.maps.MarkerImage(
            imageSrc,
            imageSize,
            imageOption
          );
          const marker = new window.kakao.maps.Marker({
            map: map,
            image: markerImage,
            position: locPosition,
          });
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
          const individualMarkers: any = [];
          // CREATIVE CLUSTER
          dummyData?.forEach((position) => {
            // SETTING MARKER
            const MarkerSrc = MapMarkerIcon;
            const MarkerSize = new window.kakao.maps.Size(45, 55);
            const MarkerInfo = new window.kakao.maps.MarkerImage(
              MarkerSrc,
              MarkerSize
            );
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(
                position.location_lat,
                position.location_lon
              ),
              image: MarkerInfo,
            });
            // ONCLICK MARKER EVENT
            window.kakao.maps.event.addListener(marker, "click", function () {
              const tolerance = 0.0001;
              const clickedPosition = marker.getPosition();
              const clickedData = dummyData.find((data) => {
                const latDiff = Math.abs(
                  data.location_lat - clickedPosition.getLat()
                );
                const lngDiff = Math.abs(
                  data.location_lon - clickedPosition.getLng()
                );
                return latDiff < tolerance && lngDiff < tolerance;
              });
              if (clickedData) {
                console.log(clickedData);
                // navigate("/cluster-list", {
                //   state: {
                //     listItem: clickedData,
                //     placeName: clickedData.placeName,
                //   },
                // });
              } else {
                console.log("데이터 로드 실패 오류");
              }
            });
            individualMarkers.push(marker);
          });

          // USER RANGE CIRCLE
          const circle = new window.kakao.maps.Circle({
            center: new window.kakao.maps.LatLng(
              position.coords.latitude,
              position.coords.longitude
            ),
            radius: 250,
            strokeWeight: 2,
            strokeColor: "#6556FF",
            strokeOpacity: 0.2,
            strokeStyle: "solid",
            fillColor: "#6556FF",
            fillOpacity: 0.05,
          });
          clusterer.addMarkers(individualMarkers);
          marker.setMap(map);
          circle.setMap(map);
          map.setMinLevel(2);
          map.setMaxLevel(5);
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
