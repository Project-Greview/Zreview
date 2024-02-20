// MODULE
import { useEffect, useLayoutEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
// RECOIL STATE
import { leftMenuState } from "state/userState";
import { toastPopupState } from "state/commonState";
import { locationSearchResultState } from "state/searchState";
import { dummyDateState } from "state/dummyState";
// HOOK
import { setCookie, getCookie } from "utils/cookies";
import { getAllDataFromIndexedDB } from "api/review";
// COMPONENT
import LeftMenu from "../../components/LeftMenu";
import KakaoMap from "../../components/KakaoMap";
import ToastPopup from "components/ToastPopup";

// PROPS TYPE
type MainProps = {};

const Main: React.FC<MainProps> = () => {
  const isLeftMenu = useRecoilValue(leftMenuState);
  const [data, setData] = useRecoilState(dummyDateState);
  const [toastModal, setToastModal] = useRecoilState<boolean>(toastPopupState);
  const [isReady, setIsReady] = useState(false);

  const UserLat = getCookie("UserLat");
  const UserLon = getCookie("UserLon");

  const cleanResult = useResetRecoilState(locationSearchResultState);

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
  useEffect(() => {
    cleanResult();
  }, [isReady]);
  useEffect(() => {
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
  }, []);
  return (
    <>
      <LeftMenu />
      <ToastPopup ready={toastModal} popupType={"main"} />
      {!isReady ? "" : <KakaoMap />}
    </>
  );
};

export default Main;
