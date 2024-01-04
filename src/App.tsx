import { Suspense } from "react";

import "./assets/styles/_index.css";

import Layout from "./components/Layout";
import Splash from "./components/Splash";

const App: React.FC = () => {
  return (
    <Suspense fallback={<Splash />}>
      <Layout />
    </Suspense>
  );
};

export default App;
