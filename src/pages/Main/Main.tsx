// MODULE
import { useLayoutEffect, useState } from "react";
import { useRecoilValue } from "recoil";
// RECOIL STAET
import { leftMenuState } from "state/userState";
// HOOK
import { setCookie, getCookie } from "utils/cookies";
// COMPONENT
import LeftMenu from "../../components/LeftMenu";
import KakaoMap from "../../components/KakaoMap";

// PROPS TYPE
type MainProps = {};

const Main: React.FC<MainProps> = () => {
  const isLeftMenu = useRecoilValue(leftMenuState);
  const [isReady, setIsReady] = useState(false);
  const UserLat = getCookie("UserLat");
  const UserLon = getCookie("UserLon");
  if (UserLat === undefined || UserLon === undefined) {
    navigator.geolocation.getCurrentPosition(
      (position: any) => {
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        setCookie("UserLat", lat);
        setCookie("UserLon", lng);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  useLayoutEffect(() => {
    setIsReady(true);
  }, []);
  return (
    <>
      <LeftMenu />
      <div className={`bg_section fixed ${isLeftMenu}`}></div>
      {!isReady ? "" : <KakaoMap />}
    </>
  );
};

export default Main;
