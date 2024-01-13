// MODULE
import { useRef, useState, useEffect } from "react";
// COMPONENT
import HashTag from "../../components/HashTag";

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
        const mapOptions = {
          center: new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          ),
          level: 4,
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOptions);
      });
    }
  };

  useEffect(() => {
    getKakao();
  }, [kakaoMaps]);
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
