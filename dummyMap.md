```javascript
// MODULE
import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
// RECOIL STATE
import { messageAlarmState, accessTokenCodeState } from "../../state/userState";
// HOOKS
import { articleSearchGET } from "../../api/article";
import Header from "../Header";
import ClusterSelect from "../ClusterSelect/ClusterSelect";
// IMAGE
import NormalMarker from "../../assets/img/icon/Unselect_marker.svg";
import OneItemMarker from "../../assets/img/icon/oneItem_marker.svg";
import { ReactComponent as CenterIcon } from "../../assets/img/icon/Center_icon.svg";

const KakaoMapMyLocation = () => {
  const [msgAlarm, setMsgAlarm] = useRecoilState(messageAlarmState);

  const navigate = useNavigate();
  const container = useRef(null);
  const [errMsg, setErrMsg] = useState("");
  const [map, setMap] = useState(null);
  const [userLat, setUserLat] = useState(0);
  const [userLng, setUserLng] = useState(0);
  // const [clusterData, setClusterData] = useState([]);
  const [clusterData, setClusterData] = useState(null);
  const [placeSelect, setPlaceSelect] = useState(false);
  const [propsData, setPropsData] = useState();
  const [regionCode, setRegionCode] = useState(null);
  const [errCode, setErrCode] = useRecoilState(accessTokenCodeState);
  const [itemLength, setItemLength] = useState(0);
  // GET DATA
  const getClusterData = async () => {
    const code = localStorage.getItem("userAreaCode");

    try {
      const response = await articleSearchGET(code);
      setClusterData(response.data.responses);
      if (response.data.hasNotification !== undefined) {
        setMsgAlarm(response.data.hasNotification);
      }
    } catch (error) {
      if (error.response.status === 401) {
        setErrCode(error.response.status);
      } else {
        console.log("카카오맵", error);
        setErrMsg(error.response.status);
      }
    }
  };
  const getKakaoMap = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserLat(position.coords.latitude);
        setUserLng(position.coords.longitude);
        setRegionCode(localStorage.getItem("userAreaCode"));
        const mapContainer = document.getElementById("map");
        const mapOptions = {
          center: new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          ),
          level: 8,
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
              background: `url(${NormalMarker}) no-repeat center center`,
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
              background: `url(${NormalMarker}) no-repeat center center`,
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
              background: `url(${NormalMarker}) no-repeat center center`,
              backgroundSize: "70px 80px",
              fontSize: "18px",
              fontWeight: 700,
              color: `let(--point-color)`,
            },
          ],
        });
        const individualMarkers = [];

        // CREATIVE CLUSTER
        clusterData?.forEach((position) => {
          // SETTING MARKER
          const MarkerSrc = OneItemMarker;
          const MarkerSize = new window.kakao.maps.Size(45, 55);
          const MarkerInfo = new window.kakao.maps.MarkerImage(
            MarkerSrc,
            MarkerSize
          );
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(
              position.latitude,
              position.longitude
            ),
            image: MarkerInfo,
          });
          // ONCLICK MARKER EVENT
          window.kakao.maps.event.addListener(marker, "click", function () {
            const tolerance = 0.0001;
            const clickedPosition = marker.getPosition();
            const clickedData = clusterData.find((data) => {
              const latDiff = Math.abs(
                data.latitude - clickedPosition.getLat()
              );
              const lngDiff = Math.abs(
                data.longitude - clickedPosition.getLng()
              );
              return latDiff < tolerance && lngDiff < tolerance;
            });
            if (clickedData) {
              // console.log(clickedData);
              navigate("/cluster-list", {
                state: {
                  listItem: clickedData,
                  placeName: clickedData.placeName,
                },
              });
            } else {
              console.log("데이터 로드 실패 오류");
            }
          });
          individualMarkers.push(marker);
        });
        clusterer.addMarkers(individualMarkers);
        // ONCLICK CLUSTER EVENT
        window.kakao.maps.event.addListener(
          clusterer,
          "clusterclick",
          function (cluster) {
            if (map.getLevel() === 5) {
              const tolerance = 0.0001;
              const markerData = cluster._markers.map((marker) => {
                const markerPosition = marker.getPosition();
                const clickedData = clusterData.find((data) => {
                  const latDiff = Math.abs(
                    data.latitude - markerPosition.getLat()
                  );
                  const lngDiff = Math.abs(
                    data.longitude - markerPosition.getLng()
                  );
                  return latDiff < tolerance && lngDiff < tolerance;
                });
                return clickedData;
              });
              const PlaceNameSet = [
                ...new Set(markerData?.map((item) => item.placeName)),
              ];
              if (PlaceNameSet.length === 1) {
                // console.log('PlaceNameSet', PlaceNameSet);
                navigate("/cluster-list", {
                  state: {
                    listItem: markerData,
                    placeName: PlaceNameSet,
                    regionCode: regionCode,
                  },
                });
              } else {
                setItemLength(markerData?.length);
                setPlaceSelect(true);
                setPropsData(markerData);
                cluster.getClusterMarker().a.classList.add("select_marker_on");
              }
            } else {
              const level = map.getLevel() - 1;
              map.setLevel(level, { anchor: cluster.getCenter() });
              circle.setMap(null);
            }
          }
        );
        // USER RANGE CIRCLE
        const circle = new window.kakao.maps.Circle({
          center: new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          ),
          radius: 5000,
          strokeWeight: 0,
          strokeColor: "#6556FF",
          strokeOpacity: "5%",
          strokeStyle: "dashed",
          fillColor: "#6556FF",
          fillOpacity: 1,
        });
        // LEVEL SIZE CHANGE EVENT
        window.kakao.maps.event.addListener(map, "zoom_changed", function () {
          let level = map.getLevel();
          if (level === 8) {
            circle.setMap(map);
          } else {
            circle.setMap(null);
          }
        });
        map.setMinLevel(5);
        map.setMaxLevel(8);
        circle.setMap(map);
        map.setDraggable(false);
        setMap(map);
      });
    } else {
      setErrMsg("내 위치정보를 가져오는데 실패했어요.");
    }
  };

  useLayoutEffect(() => {
    getClusterData();
  }, [regionCode]);
  useEffect(() => {
    if (clusterData === null) {
    } else {
      getKakaoMap();
    }
  }, [container, clusterData?.length]);

  // CLOSE SELECT BOX EVENT
  const onMarker = document.querySelector(".select_marker_on");
  const handleCloseSelect = () => {
    setPlaceSelect(false);
    onMarker.classList.remove("select_marker_on");
  };
  function zoomIn() {
    let level = map.getLevel();
    map.setLevel(level - 1);
  }
  function zoomOut() {
    let level = map.getLevel();
    map.setLevel(level + 1);
  }
  function setCenter() {
    let centerLatLon = new window.kakao.maps.LatLng(userLat, userLng);
    map.setCenter(centerLatLon);
  }

  return (
    <>
      <div className={`shadow_bg fixed ${placeSelect}`}></div>
      <div className="page_title flex flex_jc_c flex_ai_c">내 근처</div>
      <Header placeNames={itemLength} />
      <div className="level_btn absolute flex flex_dir_c">
        <div
          onClick={setCenter}
          className="set_center flex flex_jc_c flex_ai_c"
        >
          <CenterIcon />
        </div>
        <div onClick={zoomIn} className="zoom_in flex flex_jc_c flex_ai_c">
          <div></div>
          <div></div>
        </div>
        <div onClick={zoomOut} className="zoom_out flex flex_jc_c flex_ai_c">
          <div></div>
        </div>
      </div>
      <ClusterSelect
        placeSelect={placeSelect}
        listItem={propsData}
        close={handleCloseSelect}
      />
      <div
        id="map"
        ref={container}
        style={{ width: "100%", height: "calc(100% - 14.1rem)" }}
      ></div>
    </>
  );
};

export default React.memo(KakaoMapMyLocation);
```
