// MODULE
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <CookiesProvider>
      <RecoilRoot>
        {/* <React.StrictMode> */}
        <ReactQueryDevtools />
        <RouterProvider router={Routers} />
        {/* </React.StrictMode> */}
      </RecoilRoot>
    </CookiesProvider>
  </QueryClientProvider>
);
reportWebVitals();
