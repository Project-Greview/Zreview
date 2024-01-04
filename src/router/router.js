// MODULE
import { createBrowserRouter } from "react-router-dom";
// COMPONENT
import UserRouter from "./UserRouter";
import App from "../App";
import Layout from "../components/Layout";
import Splash from "../components/Splash";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Splash />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "registration",
            element: <Registration />,
          },
        ],
      },
    ],
  },
]);

export default Routers;
