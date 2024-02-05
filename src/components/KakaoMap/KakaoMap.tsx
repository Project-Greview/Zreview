// MODULE
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
// RECOIL STATE
import { dummyDateState } from "state/dummyState";
import {
  locationSearchResultState,
  searchKeywordState,
} from "state/searchState";
// COMPONENT
import HashTagSlide from "../HashTagSlide";
// SVG
import ClusterMapMarkerIcon from "../../assets/image/icon/cluster_map_marker.svg";
import MapMarkerIcon from "../../assets/image/icon/map_marker.svg";
import ActiveMapMarkerIcon from "../../assets/image/icon/active_map_marker.svg";
import MyMarkerIcon from "../../assets/image/icon/my_marker.svg";

// PROPS TYPE
declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap: React.FC = () => {
  const kakaoMaps = useRef(null);
  const [searchResult, setSearchResult] = useRecoilState(
    locationSearchResultState
  );
  const [map, setMap] = useState(null);
  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);

  const dummyData = useRecoilValue(dummyDateState);
  const keyword = useRecoilValue(searchKeywordState);

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

          // CREATIVE CLUSTER
          const individualMarkers: any[] = [];
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
          // MY POSITION MARKER
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
                background: `url(${ClusterMapMarkerIcon}) no-repeat center center`,
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
                background: `url(${ClusterMapMarkerIcon}) no-repeat center center`,
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
                background: `url(${ClusterMapMarkerIcon}) no-repeat center center`,
                backgroundSize: "70px 80px",
                fontSize: "18px",
                fontWeight: 700,
                color: `let(--point-color)`,
              },
            ],
          });
          clusterer.addMarkers(individualMarkers);

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
          map.setDraggable(true);
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
