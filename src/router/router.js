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
import BookMark from "../pages/BookMark";
import MyPage from "../pages/MyPage";
import Setting from "pages/Setting";

import DummyDataList from "pages/DummyDataList";
import ProfileModify from "pages/ProfileModify";
import PlaceReview from "pages/PlaceReview";
import DetailReview from "pages/DetailReview";
const routes = [
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
      {
        path: "bookmark",
        element: (
          <UserRouter>
            <BookMark />
          </UserRouter>
        ),
      },
      {
        path: "mypage",
        element: (
          <UserRouter>
            <MyPage />
          </UserRouter>
        ),
      },
      {
        path: "profile-modify",
        element: (
          <UserRouter>
            <ProfileModify />
          </UserRouter>
        ),
      },
      {
        path: "user-modify",
        element: (
          <UserRouter>
            <Registration />
          </UserRouter>
        ),
      },
      {
        path: "setting",
        element: (
          <UserRouter>
            <Setting />
          </UserRouter>
        ),
      },
      {
        path: "place_review",
        element: (
          <UserRouter>
            <PlaceReview />
          </UserRouter>
        ),
      },
      {
        path: "detail_review",
        element: (
          <UserRouter>
            <DetailReview />
          </UserRouter>
        ),
      },
      // DUMMY
      {
        path: "Dummy_List",
        element: (
          <UserRouter>
            <DummyDataList />
          </UserRouter>
        ),
      },
    ],
  },
];

const Routers = createBrowserRouter(routes, {
  // basename: window.location.hostname === "localhost" ? "/" : process.env.PUBLIC_URL,
  basename:
    process.env.NODE_ENV === "production"
      ? "/<username>/<repository-name>"
      : "/",
});

export default Routers;
