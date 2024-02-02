// MODULE
import { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isMobile } from "react-device-detect";
// RECOIL STATE
import { dummyDateState, dummyModalState } from "state/dummyState";
// STYLE
import "./assets/styles/_index.css";
// HOOK
import { getLocationPathname } from "utils/location";
import { setCookie, getCookie } from "utils/cookies";
// COMPONENT
import Layout from "./components/Layout";
import Header from "./components/Header";
import Splash from "./components/Splash";
import PCView from "./pages/PCView";
import Navigation from "./components/Navigation";
import DummyModal from "components/DummyModal";

import { consoleLogo } from "consoleLogo";

// PROPS TYPE

interface DataType {
  id: number;
  title: string;
  member: string;
  content: string;
  location_lat: number;
  location_lon: number;
  created_at: string;
  updated_at: string;
  hashtag: string[];
  views: number;
  rating: number;
}

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [productModal, setProductModal] =
    useRecoilState<Boolean>(dummyModalState);

  const dataCheck = useRecoilValue(dummyDateState);

  const handleCloseModal = () => {
    setProductModal(false);
    console.log(dataCheck);
  };
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // 조합 키 체크 (Ctrl + M)
      if (event.ctrlKey && event.key === "m") {
        setProductModal(true);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (!isMobile && location.pathname !== "/") {
      navigate("/");
    }
  }, [isMobile]);

  useLayoutEffect(() => {
    let DummyId = getCookie("dummyId");
    let DummyPw = getCookie("dummyPw");
    const setDummyUser = () => {
      setCookie("dummyId", "testUser");
      setCookie("dummyPw", "zreview1234!");
      setCookie("dummyEmail", "zreview@test.com");
      setCookie("dummyName", "지리뷰");
      setCookie("dummyNickname", "ZReview");
      setCookie("dummyPhone", "01012345678");
    };
    let titleStyles = `
      padding:10px 50px;
      margin-bottom:10px;
      background:#6656ff;
      font-size:25px;
      font-weight:bold;
    `;
    let dummyInfoKeyStyle = `
      font-size:18px;
    `;
    let dummyInfoValueStyle = `
      padding:5px;
      border:1px solid #6656ff;
      font-size:20px;
      font-weight:bold;
      color:#6656ff;
    `;

    {
      DummyId === undefined ? setDummyUser() : consoleLogo();
      console.log(
        `%c테스트 계정 정보%c\n로그인 ID : %c${DummyId}%c\n로그인 PASSWORD : %c${DummyPw}`,
        titleStyles,
        dummyInfoKeyStyle,
        dummyInfoValueStyle,
        dummyInfoKeyStyle,
        dummyInfoValueStyle
      );
    }
  }, []);

  const activeNum = getLocationPathname(location.pathname);
  return (
    <>
      {isMobile ? (
        <Suspense fallback={<Splash />}>
          {productModal ? <DummyModal close={() => handleCloseModal()} /> : ""}
          {activeNum === 1 ? (
            <Header type={1} title="" />
          ) : activeNum === 2 ? (
            <Header type={3} title="" />
          ) : activeNum === 3 ? (
            <Header type={2} title="리뷰쓰기" />
          ) : activeNum === 4 ? (
            <Header type={2} title="저장목록" />
          ) : activeNum === 5 ? (
            <Header type={4} title="마이페이지" />
          ) : activeNum === 6 ? (
            <Header type={2} title="설정" />
          ) : (
            ""
          )}
          <Layout />
          {activeNum === 1 || activeNum === 2 || activeNum === 4 ? (
            <Navigation />
          ) : (
            ""
          )}
        </Suspense>
      ) : (
        <PCView />
      )}
    </>
  );
};

export default App;
