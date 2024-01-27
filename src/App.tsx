// MODULE
import { Suspense, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { isMobile } from "react-device-detect";
// RECOIL STATE
import { dummyDateState, dummyModalState } from "state/dummyState";
// STYLE
import "./assets/styles/_index.css";
// HOOK
import { getLocationPathname } from "utils/location";
// COMPONENT
import Layout from "./components/Layout";
import Header from "./components/Header";
import Splash from "./components/Splash";
import PCView from "./pages/PCView";
import Navigation from "./components/Navigation";
import DummyModal from "components/DummyModal";
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
