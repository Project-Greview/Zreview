// MODULE
import { useState, useRef, useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";
// RECOIL STATE
import { dummyDateState } from "state/dummyState";
import { getCookie } from "utils/cookies";
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
    setUserLat(getCookie("user").myLatitude);
    setUserLng(getCookie("user").myLongitude);
    if (userLat === 0 && userLng === 0) {
    } else {
      const mapContainer = document.getElementById("map");
      let locPosition = new window.kakao.maps.LatLng(
        Number(getCookie("user").myLatitude),
        Number(getCookie("user").myLongitude)
      );
      const mapOptions = {
        center: new window.kakao.maps.LatLng(
          Number(getCookie("user").myLatitude),
          Number(getCookie("user").myLongitude)
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
          } else {
            console.log("데이터 로드 실패 오류");
          }
        });
        individualMarkers.push(marker);
      });
      clusterer.addMarkers(individualMarkers);
      marker.setMap(map);
      map.setMinLevel(2);
      map.setMaxLevel(5);
      map.setDraggable(false);
      setMap(map);
    }
  };

  useLayoutEffect(() => {
    getKakao();
  }, []);
  return (
    <>
      {userLat === 0 && userLng === 0 ? (
        <div
          className="flex flex_jc_c flex_ai_c"
          style={{
            width: `100%`,
            height: `25vh`,
            border: "1px solid #d0cfcf",
            borderRadius: 10,
            marginTop: 15,
          }}
        >
          내 동네를 등록하면 내 동네의 지도를 볼 수 있어요!
        </div>
      ) : (
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
      )}
    </>
  );
};

export default MyLocationMap;
