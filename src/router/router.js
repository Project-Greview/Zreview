// MODULE
import { createBrowserRouter } from "react-router-dom";
// COMPONENT
import UserRouter from "./UserRouter";
import App from "../App";
import Layout from "../components/Layout";
import Splash from "../components/Splash";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Main from "../pages/Main";

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
            path: "/",
            element: <Login />,
          },
          {
            path: "registration",
            element: <Registration />,
          },
          {
            path: "main",
            element: (
              <UserRouter>
                <Main />
              </UserRouter>
            ),
          },
        ],
      },
    ],
  },
]);

export default Routers;
