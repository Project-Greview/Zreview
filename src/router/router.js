// MODULE
import { createBrowserRouter } from "react-router-dom";
// COMPONENT
import UserRouter from "./UserRouter";
import App from "../App";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Main from "../pages/Main";
import MyLocation from "../pages/MyLocation";
import WriteReview from "../pages/WriteReview";

const Routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
      {
        path: "mylocation",
        element: (
          <UserRouter>
            <MyLocation />
          </UserRouter>
        ),
      },
      {
        path: "write",
        element: (
          <UserRouter>
            <WriteReview />
          </UserRouter>
        ),
      },
    ],
  },
]);

export default Routers;
