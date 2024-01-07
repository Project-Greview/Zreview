import { Suspense, useEffect } from "react";

import "./assets/styles/_index.css";

import Layout from "./components/Layout";
import Splash from "./components/Splash";

const App: React.FC = () => {
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
  return (
    <Suspense fallback={<Splash />}>
      <Layout />
    </Suspense>
  );
};

export default App;
