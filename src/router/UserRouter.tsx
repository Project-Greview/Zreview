// MODULE
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
// RECOIL STATE
import { isLoginState } from "state/userState";
// PROPS TYPE
type UserRouterProps = {
  children: any;
};

const UserRouter: React.FC<UserRouterProps> = ({ children }) => {
  const isLogin = useRecoilValue(isLoginState);
  // console.log(children);
  if (children) {
    return children;
  }
  return (
    <Suspense>
      <Outlet />
    </Suspense>
  );
};

export default UserRouter;
