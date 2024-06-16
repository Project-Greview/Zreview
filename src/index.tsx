// MODULE
import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import reportWebVitals from "./reportWebVitals";

import { indexedDBStart } from "utils/indexedDB";

import Routers from "./router/router";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
indexedDBStart();

root.render(
  <CookiesProvider>
    <RecoilRoot>
      {/* <React.StrictMode> */}
      <RouterProvider router={Routers} />
      {/* </React.StrictMode> */}
    </RecoilRoot>
  </CookiesProvider>
);
reportWebVitals();
