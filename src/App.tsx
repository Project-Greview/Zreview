import { Suspense } from "react";

import "./assets/styles/_index.css";

import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <Suspense>
      <Layout />
    </Suspense>
  );
};

export default App;
