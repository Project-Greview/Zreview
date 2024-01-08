// MODULE
import { Suspense, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
// STYLE
import "./assets/styles/_index.css";
// COMPONENT
import Layout from "./components/Layout";
import Splash from "./components/Splash";
import PCView from "./pages/PCView";

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // 조합 키 체크 (Ctrl + M)
      if (event.ctrlKey && event.key === "m") {
        console.log("test");
      }
    };
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (!isMobile && location.pathname !== "/") {
      console.log("a");
      navigate("/");
    }
  }, [isMobile]);
  return (
    <>
      {isMobile ? (
        <Suspense fallback={<Splash />}>
          <Layout />
        </Suspense>
      ) : (
        <PCView />
      )}
    </>
  );
};

export default App;
