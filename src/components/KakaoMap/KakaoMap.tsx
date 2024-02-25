// MODULE
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
// HOOK
import {
  getAllDataFromIndexedDB,
  getAllTargetDataFromIndexedDB,
} from "api/IDBreview";
// RECOIL STATE
import { dummyDateState } from "state/dummyState";
import {
  locationSearchResultState,
  searchKeywordState,
} from "state/searchState";
import { toastPopupState } from "state/commonState";
import { mapMarkerState } from "state/mapMarkerState";
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
interface ReviewDataType {
  id: number;
  place_name: string;
  place_address: string;
  content: string;
  location_lat: number;
  location_lon: number;
  created_at: string;
  updated_at: string;
  hashtag: string[];
  views: number;
  rating: number;
  likes: number;
  comments: number;
  writer: string;
  profile: string;
}
const KakaoMap: React.FC = () => {
  const kakaoMaps = useRef(null);
  const [searchResult, setSearchResult] = useRecoilState(
    locationSearchResultState
  );
  const [map, setMap] = useState(null);
  const [mapMarkerData, setMapMarkerData] = useRecoilState(mapMarkerState);
  const [toastModal, setToastModal] = useRecoilState<boolean>(toastPopupState);
  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);

  const dummyData = useRecoilValue(dummyDateState);
  const keyword = useRecoilValue(searchKeywordState);
  const viewHeight: number = window.innerHeight;

  const getReviewData = async (name: string) => {
    try {
      const response = await getAllTargetDataFromIndexedDB(name);
      console.log("테스트", response);
      setMapMarkerData(response);
    } catch (error) {
      console.log(error);
    }
  };
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
              const clickedData = dummyData.find((data: ReviewDataType) => {
                const latDiff = Math.abs(
                  data.location_lat - clickedPosition.getLat()
                );
                const lngDiff = Math.abs(
                  data.location_lon - clickedPosition.getLng()
                );
                return latDiff < tolerance && lngDiff < tolerance;
              });
              if (clickedData) {
                // setMapMarkerData(clickedData);
                getReviewData(clickedData?.place_name);
                setToastModal(true);
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
            radius: 300,
            strokeWeight: 2,
            strokeColor: "#6556FF",
            strokeOpacity: 0.2,
            strokeStyle: "solid",
            fillColor: "#6556FF",
            fillOpacity: 0.05,
          });
          // LEVEL SIZE CHANGE EVENT
          window.kakao.maps.event.addListener(map, "zoom_changed", function () {
            let level = map.getLevel();
            console.log("level", level);
            circle.setOptions({
              radius:
                level === 7
                  ? 2500
                  : level === 6
                  ? 1300
                  : level === 5
                  ? 700
                  : 300,
              strokeWeight: 2,
              strokeColor: "#6556FF",
              strokeOpacity: 0.2,
              strokeStyle: "solid",
              fillColor: "#6556FF",
              fillOpacity: 0.05,
            });
          });
          map.setMinLevel(2);
          map.setMaxLevel(7);
          circle.setMap(map);
          map.setDraggable(true);
          setMap(map);
        }
      });
    } else {
      console.log("내위치 사용 불가");
    }
  };

  /*   useEffect(() => {
    getAllDataFromIndexedDB()
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        console.log("aaaa", data);
      });
  }, []); */

  // useLayoutEffect(() => {
  //   getKakao();
  // }, []);
  useEffect(() => {
    if (dummyData.length === 0) {
      return;
    }

    // dummyData가 모두 로딩된 후 실행할 코드
    getKakao();
  }, [dummyData]);

  return (
    <>
      <HashTagSlide />
      <div
        id="map"
        ref={kakaoMaps}
        style={{
          width: "100%",
          height: `calc(${viewHeight}px - 11rem)`,
          marginTop: 50,
        }}
      ></div>
    </>
  );
};

export default KakaoMap;
